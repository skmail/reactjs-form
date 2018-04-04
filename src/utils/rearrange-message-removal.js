const removeErrors = (errors,name: string) => {

  let errorsName = name.split('.')

  const index = parseInt(errorsName.pop(), 10)

  errorsName = errorsName.join('.') + '.'

  return Object.keys(errors).reduce((acc, item) => {
    if (item.startsWith(errorsName)) {
      let remainingName = item.substr(errorsName.length, item.length).split('.')
      /* istanbul ignore else */
      if (item.startsWith(name)) {
        return acc
      }
      let fieldIndex = parseInt(remainingName.shift(), 10)
      /* istanbul ignore else */
      if (fieldIndex > index) {
        fieldIndex--
      }
      acc[`${errorsName}${fieldIndex}.${remainingName.join('.')}`] = errors[item]
    } else {
      acc[item] = errors[item]
    }
    return acc
  }, {})

}
export default (name, errors) => {

  if(!Array.isArray(name)){
    name = [name]
  }
  return name.reduce(removeErrors,errors)

}