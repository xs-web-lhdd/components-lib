<template>
  <div class="hello">
    <h1>{{ age }}</h1>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

const propType = {
  msg: String,
  age: {
    type: Number,
    required: true,
  },
} as const
export default defineComponent({
  name: 'HelloWorld',
  props: propType,
  mounted() {
    this.age
  },
})
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
