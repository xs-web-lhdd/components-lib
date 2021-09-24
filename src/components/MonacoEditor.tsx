import {
  defineComponent,
  ref,
  onMounted,
  onBeforeUnmount,
  watch,
  shallowRef,
} from 'vue'
/* eslint-disable @typescript-eslint/no-var-requires */
import * as Monaco from 'monaco-editor'

import type { PropType } from 'vue'

import { createUseStyles } from 'vue-jss'

const useStyles = createUseStyles({
  container: {
    border: '1px solid #eee',
    display: 'flex',
    flexDirection: 'column',
    borderRadius: 5,
  },
  title: {
    backgroundColor: '#eee',
    padding: '10px 0',
    paddingLeft: 20,
  },
  code: {
    flexGrow: 1,
  },
})

export default defineComponent({
  props: {
    code: {
      type: String as PropType<string>,
      required: true,
    },
    onChange: {
      type: Function,
      required: true,
    },
    title: {
      type: String as PropType<string>,
      required: true,
    },
  },
  setup(props) {
    const editorRef = shallowRef()

    const containerRef = ref()

    let _subscription: Monaco.IDisposable | undefined
    let __prevent_trigger_change_event = false

    onMounted(() => {
      const editor = (editorRef.value = Monaco.editor.create(
        containerRef.value,
        {
          value: props.code,
          language: 'json',
          formatOnPaste: true,
          tabSize: 2,
          minimap: {
            enabled: false,
          },
        },
      ))

      _subscription = editor.onDidChangeModelContent((event) => {
        console.log('---------------->', __prevent_trigger_change_event)
        if (!__prevent_trigger_change_event) {
          props.onChange(editor.getValue(), event)
        }
      })
    })

    onBeforeUnmount(() => {
      if (_subscription) {
        _subscription.dispose()
      }
    })

    watch(
      () => props.code,
      (v) => {
        const editor = editorRef.value
        const model = editor.getModel()
        if (v !== model.getValue()) {
          editor.pushUndoStop()
          __prevent_trigger_change_event = true
          model.pushEditOperations(
            [],
            [
              {
                range: model.getFullModelRange(),
                text: v,
              },
            ],
          )
          editor.pushUndoStop()
          false
        }
      },
    )

    const classesRef = useStyles()

    return () => {
      const classes = classesRef.value

      return (
        <div class={classes.container}>
          <div class={classes.title}>
            <span>{props.title}</span>
          </div>
          <div class={classes.code} ref={containerRef}></div>
        </div>
      )
    }
  },
})
