# separated-directives

This is a plugin including a hook which could help to simulate a closure for Vue3 directive objects.

## Setup

```sh
pnpm install separated-directives
```

## Use

Juejin link: https://juejin.cn/post/7420597224516157477.

Package separated-directives exports a function "useSeparatedDirectives" to create a Vue3 directive object.

This is a little demo.

```ts
// directives.ts
export const enterButton = useSeparatedDirectives(
  () => {
    const locked = false
    let cnt = 0
    const logCnt = () => console.log(cnt++)
    return {
      locked,
      logCnt
    }
  },
  (data) => {
    return {
      bindingMounted(el: HTMLInputElement, binding) {
        console.log('mouted: ', el, binding.value)
        el.addEventListener('keydown', (e) => {
          if (data.locked) return
          data.locked = true
          if (e.key === 'Enter') {
            e.preventDefault()
            binding.value.click()
            data.logCnt()
          }
        })
        el.addEventListener('keyup', () => (data.locked = false))
      }
    }
  }
)
```

```ts
// main.ts
import { createApp } from 'vue'
import App from './App.vue'
import { enterButton } from 'directives'

const app = createApp(App)
app.directive(enterButton)
app.mount('#app')
```
