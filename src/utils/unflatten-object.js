// @flow

import getValue from './get-value'
import {unflatten as unflattenObject} from 'flat'
import isObject from "./is-object"

export const unflatten = (path: string | { [string]: any }, value: any): Object => {

  if (typeof path === "string") {
    path = {
      [`${path}`]: value
    }
  }

  return unflattenObject(path, {object: true})
}


export const unflattenArrayStateUpdate = (state: Object, path: any, value: any): Object => {


  if(!isObject(path)){
    path = {[path]:value}
  }

  const o = Object.keys(path).reduce((acc,item) => {

    const pathValue = getValue(state, item)

    if (Array.isArray(pathValue)) {

      acc[`${item}.$push`] = [path[item]]

    } else {

      acc[`${item}.$set`] = [path[item]]

    }

    return acc
  },{})


  return unflatten(o)

}


export const unflattenRemoveArrayStateUpdate = (path: string | Array<string>): Object => {

  if (!Array.isArray(path)) {
    path = [path]
  }

  const paths = path.reduce((acc, path) => {

    const pathSegments: Array<any> = path.split('.')

    const index: number = parseInt(pathSegments.pop(), 10)

    const splicePath = `${pathSegments.join('.')}.$splice`

    if (acc[splicePath]) {
      acc[splicePath].push([index, 1])
    } else {
      acc[splicePath] = [[index, 1]]
    }

    return acc

  }, {})

  return unflatten(paths)
}


// export const unflattenRemoveArrayStateUpdate = (path: string): Object => {
//   const pathSegments: Array<any> = path.split('.')
//   const index: number = parseInt(pathSegments.pop(), 10)
//   return unflatten(`${pathSegments.join('.')}.$splice`, [[index, 1]])
// }

