<template>
  <input type="text" :value="value" :onChange="handleChange" />
</template>

<script lang="ts">
import { FieldPropsDefine } from '../types'
export default {
  props: FieldPropsDefine,
}

declare const props: {
  value: any
  onChange: (v: string) => void
  // schema: Schema
}
export const handleChange = (e: any) => {
  console.log(e)
  props.onChange(e.target)
}
</script>
