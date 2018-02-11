import getValue from './get-value'
import {unflatten as unflattenObject} from 'flat'

export const unflatten = (path, value) => {
  return unflattenObject({
    [`${path}` ]: value
  }, {object: true})
};


export const unflattenArrayStateUpdate = (state, path, value) => {
  const pathValue = getValue(state, path)
  if (Array.isArray(pathValue)) {
    return unflatten(`${path}.$push`, [value])
  } else {
    return unflatten(`${path}.$set`, [value])
  }
};


export const unflattenRemoveArrayStateUpdate = (path) => {
  const pathSegments = path.split('.')
  const index = parseInt(pathSegments.pop(),10)
  return unflatten(`${pathSegments.join('.')}.$splice`, [[index, 1]])
};

