// @flow

import getValue from './get-value'
import {unflatten as unflattenObject} from 'flat'

export const unflatten = (path: string, value: any): Object => {
  return unflattenObject({
    [`${path}` ]: value
  }, {object: true})
}


export const unflattenArrayStateUpdate = (state: Object, path: string, value: any): Object => {
  const pathValue = getValue(state, path)
  if (Array.isArray(pathValue)) {
    return unflatten(`${path}.$push`, [value])
  } else {
    return unflatten(`${path}.$set`, [value])
  }
}


export const unflattenRemoveArrayStateUpdate = (path: string): Object => {
  const pathSegments: Array<any> = path.split('.')
  const index: number = parseInt(pathSegments.pop(), 10)
  return unflatten(`${pathSegments.join('.')}.$splice`, [[index, 1]])
}

