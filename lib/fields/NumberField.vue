<template>
  <input :value="value" type="number" :onChange="handleChange" />
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { FieldPropsDefine, Schema } from '../types'
export default defineComponent({
  props: FieldPropsDefine,
  setup() {
    const handleChange = (e: any) => {
      const value = e.target.value
      const num = Number(value)
      if (Number.isNaN(num)) {
        props.onChange(undefined)
      } else {
        props.onChange(e.target.value)
      }
    }
    return { handleChange }
  },
})
declare const props: {
  value: any
  onChange: (v: any) => void
  schema: Schema
}
</script>
