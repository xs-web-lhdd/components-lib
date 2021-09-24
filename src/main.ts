/* eslint-disable @typescript-eslint/no-var-requires */
import { createApp } from 'vue'
// import App from './App.vue'
import App from './App'
// const IMG = require('./assets/logo.png')

// const App = defineComponent({
//   setup () {
//     const state = ref(1)
//     setInterval(() => {
//       state.value += 1
//     }, 1000)

//     return () => {
//       const value = state.value
//       return h('div', { id: 'app' }, [
//         h('img', {
//           alt: 'vue img',
//           src: IMG,
//         }),
//         h('h1', { id: 'h1' }, value),
//       ])
//     }
//   }
// })

createApp(App).mount('#app')
