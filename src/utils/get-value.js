export default (state, path, defaultValue) => {
  return path.split('.').reduce((acc, item) => {
    if (typeof acc[item] === "undefined") {
      return defaultValue
    }
    return acc[item];
  }, state)
};