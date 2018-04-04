// @flow

import getValue from './get-value'
import {unflatten as unflattenObject} from 'flat'

export const unflatten = (path: string | Array<string>, value: any): Object => {

  let object

  if (Array.isArray(path)) {
    object = path.reduce((acc, path, index) => {
      if (Array.isArray(value)) {
        acc[path] = value[index]
      } else {
        acc[path] = value
      }
      return acc
    }, {})
  } else {
    object = {
      [`${path}`]: value
    }
  }

  return unflattenObject(object, {object: true})
}


export const unflattenArrayStateUpdate = (state: Object, path: string, value: any): Object => {
  const pathValue = getValue(state, path)

  if (Array.isArray(pathValue)) {

    return unflatten(`${path}.$push`, [value])

  } else {

    return unflatten(`${path}.$set`, [value])

  }
}


export const unflattenRemoveArrayStateUpdate = (path: string | Array<string>): Object => {

  if (!Array.isArray(path)) {
    path = [path]
  }

  const {paths, removals} = path.reduce((acc, path) => {

    const pathSegments: Array<any> = path.split('.')

    const index: number = parseInt(pathSegments.pop(), 10)

    const splice = `${pathSegments.join('.')}.$splice`

    let pathIndex = acc.paths.indexOf(splice)

    if(pathIndex === -1){
      acc.paths.push(splice)
      acc.removals.push([[index, 1]])
    }else{
      acc.removals[pathIndex].push([index, 1])
    }

    return acc

  }, {paths: [], removals: []})

  return unflatten(paths, removals)
}


// export const unflattenRemoveArrayStateUpdate = (path: string): Object => {
//   const pathSegments: Array<any> = path.split('.')
//   const index: number = parseInt(pathSegments.pop(), 10)
//   return unflatten(`${pathSegments.join('.')}.$splice`, [[index, 1]])
// }

