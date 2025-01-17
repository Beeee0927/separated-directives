# separated-directives

**This is a plugin including a hook which could help to simulate a closure for Vue3 directive objects.**

**It mainly solved 2 probloms:**

- One directive object always has only one context. When we use it at different places, all of them use the same context which is created along with the directive object.
- The hook 'mounted' of directive object means the time when its parent component and all of its children component mounted, instead of when all components mounted. So sometimes when we need to wait some conponents to be mounted, we can only put those code into hook 'updated', but it alse cause too many problems.

**The corresponding solutions are:**

- According to different argument 'el', we could distinguish the applications at different places, and then trigger the function which depends on the context correspond to this 'el'.
- A new hook 'bindingMounted' is added. It means when all of the values(components and doms) has been not undefined/null, and only be triggered once.

## Setup

```sh
npm install separated-directives
```

## Use

###### Juejin link: https://juejin.cn/post/7420597224516157477.

Package separated-directives exports a function "createSeparatedDirectives" to create a Vue3 directive object.

###### There is a demo below.

```ts
// directives.ts
import { createSeparatedDirectives } from 'separated-directives'

export const enterButton = createSeparatedDirectives(
  () => ({
    cnt: 0
  }),
  (ctx) => ({
    bindingMounted(el, binding) {
      el.addEventListener('keydown', (e: any) => {
        if (e.key !== 'Enter') return
        binding.value.click()
        console.log(ctx.cnt++)
      })
    }
  })
)
```

```ts
// main.ts
import { createApp } from 'vue'
import App from './App.vue'
import { enterButton } from './directives'

const app = createApp(App)
app.directive('enterButton', enterButton)
app.mount('#app')
```

```ts
// App.vue
<script setup lang="ts">
import { useTemplateRef } from 'vue'

const buttonRef1 = useTemplateRef('buttonRef1')
const buttonRef2 = useTemplateRef('buttonRef2')
</script>

<template>
  App
  <input type="text" v-enterButton="buttonRef1" />
  <button @click="console.log('button1')" ref="buttonRef1"></button>
  <input type="text" v-enterButton="buttonRef2" />
  <button @click="console.log('button2')" ref="buttonRef2"></button>
</template>
```

In this demo, if we press 'Enter' in the first input dom twice, and then the second, we would see the console log:

```js
button1
0
button1
1
button2
0
button2
1
```

It shows that the context has been separated, and hook 'bindingMounted' only been triggered once.

## Other Notes

###### All element binding ways supported by 'bindingMounted':

- **single:** v-enterButton="buttonRef1"
- **array:** v-enterButton="[buttonRef1, buttonRef2]"
- **object:** v-enterButton = { nodes: buttonRef1, ... } or { nodes: [buttonRef1, buttonRef2], ... }
