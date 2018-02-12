// @flow
export default (state: Object, path: string, defaultValue: any): any => {
  return path.split('.').reduce((acc, item) => {
    if (typeof acc[item] === "undefined") {
      return defaultValue
    }
    return acc[item]
  }, state)
}