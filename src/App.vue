<template>
  <h1>hello world</h1>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'

interface Config {
  name: string
}
const propType = {
  name: {
    type: Number as PropType<number>,
  },
  config: {
    type: Object as PropType<Config>,
    required: true,
  },
} as const
export default defineComponent({
  name: 'App',
  props: propType,
  setup() {
    const a = 1
    return { a }
  },
  mounted() {
    this.name
    this.config
  },
})
</script>
