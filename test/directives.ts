import { useSeparatedDirectives } from 'separated-directives'

export const enterButton = useSeparatedDirectives(
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
