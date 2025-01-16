import { type ObjectDirective } from 'vue'

class AutoInitMap<K extends WeakKey, V> extends WeakMap {
  createDefaultValue: () => V
  constructor(createDefaultValue: () => V) {
    super()
    this.createDefaultValue = createDefaultValue
  }
  get(key: K): V {
    // 如果 get 时键值对不存在则自动设置默认值
    if (!super.has(key)) super.set(key, this.createDefaultValue())
    return super.get(key)
  }
}

export const createSeparatedDirectives = <T>(
  ctxSetup: () => T,
  callback: (
    ctx: T
  ) => ObjectDirective & { bindingMounted?: ObjectDirective['updated'] }
) => {
  const isBindingMountedMap = new AutoInitMap(() => false) // el -> 其挂载是否完成 (boolean)
  // middleObj 表示要返回的指令对象，
  // 实际上它在这里只是用来获取键，最后再将其钩子函数全部自动指向真实对象的钩子函数
  const middleObj = callback(ctxSetup())
  let newCallback = callback // 指令对象的工厂函数
  const objMap = new AutoInitMap(() => newCallback(ctxSetup()))

  // 如果定义了 bindingMounted 钩子函数，则要将其加入 updated 钩子函数
  if ('bindingMounted' in middleObj) {
    // 将 bindingMounted 内容与 updated 内容合并为新的 updated
    const newlUpdated = (
      oldBindingMounted: ObjectDirective['updated'],
      oldUpdated: ObjectDirective['updated'],
      ...args: Parameters<NonNullable<ObjectDirective['updated']>>
    ) => {
      const el = args[0] // 指令所在的元素
      const binding = args[1] // 指令绑定的内容
      // 如果挂载未完成
      if (!isBindingMountedMap.get(el)) {
        if (
          (() => {
            /* 数组 */
            if (Array.isArray(binding.value)) {
              if (binding.value.every((ins) => ins)) return true
            } /* 对象 */ else if ('nodes' in binding.value) {
              if (binding.value.nodes) return true
            } /* 单个 */ else {
              if (binding.value) return true
            }
            return false
          })()
        ) {
          // 挂载完成标记并触发 bindingMounted 回调
          isBindingMountedMap.set(el, true)
          oldBindingMounted!(...args)
        }
      }
      // 如果定义了 updated，那么也要触发
      if (oldUpdated) oldUpdated(...args)
    }

    // 修正 middleObj 的 keys
    delete middleObj.bindingMounted
    middleObj.updated = () => {}
    // 更新 newCallback
    newCallback = (ctx) => {
      const res = callback(ctx)
      const oldBindingMounted = res.bindingMounted
      delete res.bindingMounted
      const oldUpdated = res.updated
      res.updated = (...args) =>
        newlUpdated(oldBindingMounted, oldUpdated, ...args)
      return res
    }
  }

  // 修改 middleObj 的钩子函数，使其自动转发到不同 el 对应的内部指令对象的对应钩子函数
  for (const key in middleObj) {
    ;(middleObj as any)[key] = (...args: any[]) => {
      ;(objMap.get(args[0]) as any)[key](...args)
    }
  }
  return middleObj
}
