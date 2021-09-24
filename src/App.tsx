import { defineComponent, Ref, ref } from 'vue'

/* eslint-disable @typescript-eslint/no-var-requires */

import MonacoEditor from './components/MonacoEditor'
import { createUseStyles } from 'vue-jss'

function toJson(data: any) {
  return JSON.stringify(data, null, 2)
}
const schema = {
  type: 'string',
}

const useStyles = createUseStyles({
  editor: {
    minHeight: 400,
  },
})

export default defineComponent({
  setup() {
    const schemaRef = ref(schema)
    const handleCodeChange = (code: string) => {
      let data
      try {
        data = JSON.parse(code)
      } catch (err) {
        console.log(err)
      }
      schemaRef.value = data
    }

    const classesRef = useStyles()

    return () => {
      const classes = classesRef.value

      const code = toJson(schemaRef.value)
      return (
        <div>
          <MonacoEditor
            code={code}
            onChange={handleCodeChange}
            title="schema"
            class={classes.editor}
          />
        </div>
      )
    }
  },
})
