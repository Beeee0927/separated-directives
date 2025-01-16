// import { createSeparatedDirectives } from "lib"
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
