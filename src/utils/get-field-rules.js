import replaceIndexWithWildCard from './replace-index-with-wildcard'

export default (name, rules) => {
  const wildcardRule = replaceIndexWithWildCard(name)
  const resultRules = [];
  /* istanbul ignore else */
  if (rules[name]) {
    resultRules.push(rules[name])
  }
  /* istanbul ignore else */
  if (rules[wildcardRule]) {
    resultRules.push(rules[wildcardRule])
  }
  return {
    [name]: resultRules
      .reduce((acc, item) => {
        if (typeof item === 'string') {
          acc = [...acc, ...item.split('|')]
        } else {
          acc = [...acc, ...item]
        }
        return acc
      }, [])
      .filter((elem, pos, arr) => arr.indexOf(elem) === pos)
  }
};
