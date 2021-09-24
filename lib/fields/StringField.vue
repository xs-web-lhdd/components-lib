<template>
  <input type="text" :value="value" :onChange="handleChange" />
</template>

<script setup lang="ts">
import { FieldPropsDefine, Schema } from '../types'
export default {
  props: FieldPropsDefine,
}

declare const props: {
  value: any
  onChange: (v: any) => void
  schema: Schema
}
export const handleChange = (e: any) => {
  console.log(e)
  props.onChange(e.target)
}
</script>
