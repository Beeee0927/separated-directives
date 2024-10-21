import { useSeparatedDirectives } from 'separated-directives'

export const x = useSeparatedDirectives(
  () => ({
    cnt: 0
  }),
  (ctx) => ({
    mounted(el) {
      console.log(el)
      console.log(1)
    },
    bindingMounted(el, binding) {
      el.addEventListener('input', () => {
        binding.value.click()
        console.log(ctx.cnt++)
      })
    }
  })
)
