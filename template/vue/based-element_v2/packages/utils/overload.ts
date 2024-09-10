export function creatOverload() {

  const callMap = new Map()

  function overload(...args) {
    const key = args.map(arg => typeof arg).join(',')
    const fn = callMap.get(key)
    if (fn) {
      return fn.apply(this, args)
    }
  }

  overload.addImpl = function (...args) {
    const fn = args.pop()
    if (!fn || typeof fn !== "function") return
    const types = args
    callMap.set(types.join(','), fn)
  }

  return overload
}

export default creatOverload;