export default (rules, ownProps = []) => (
  Object.keys(rules).reduce((acc, name) => {
    if (Array.isArray(rules[name])) {
      acc[name] = rules[name].map((item) => {
        if (typeof item === "object") {
          return Object.keys(item).reduce((acc, validator) => {
            if (typeof item[validator] === "function") {
              acc[validator] = item[validator](...ownProps)
            } else {
              acc[validator] = item[validator]
            }
            return acc;
          }, {});
        }
        return item
      })
    } else {
      acc[name] = rules[name]
    }
    return acc
  }, {})
)