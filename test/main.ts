import { createApp } from 'vue'
import App from './App.vue'
import { enterButton } from './directives'

const app = createApp(App)
app.directive('enterButton', enterButton)
app.mount('#app')
