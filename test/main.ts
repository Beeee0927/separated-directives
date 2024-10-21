import { createApp } from 'vue'
import App from './App.vue'
import { x } from './directives'

const app = createApp(App)
app.directive('x', x)
app.mount('#app')
