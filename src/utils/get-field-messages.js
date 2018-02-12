// @flow

import replaceIndexWithWildCard from './replace-index-with-wildcard'

export default (name: string, messages: Object) : Object => {
  const wildcardRule = replaceIndexWithWildCard(name)
  return Object.keys(messages).reduce((acc, item) => {
    let fieldName = item.split('.')
    fieldName.shift()
    fieldName = fieldName.join('.')
    const wildcardName = item.replace(wildcardRule, name)
    if (fieldName === name) {
      acc[item] = messages[item]
    } else if (fieldName === wildcardRule && !acc[wildcardName]) {
      acc[wildcardName] = messages[item]
    }
    return acc
  }, {})
}
