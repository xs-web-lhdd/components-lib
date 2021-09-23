/* eslint-disable @typescript-eslint/no-var-requires */
import { createApp } from 'vue'
import App from './App.vue'
// const IMG = require('./assets/logo.png')

// const App = defineComponent({
//   render() {
//     return h('div', { id: 'app' }, [
//       h('img', {
//         alt: 'vue img',
//         src: IMG,
//       }),
//       h('h1', { id: 'h1' }, 'hello vue3'),
//     ])
//   },
// })

createApp(App).mount('#app')
