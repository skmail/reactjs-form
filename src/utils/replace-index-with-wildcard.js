// @flow
export default (path: string): string => {
  return path.replace(/(\.[0-9]\.\s?)/g, '.*.').replace(/(\.[0-9]$)/g, '.*')
}