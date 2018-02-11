
export default (path) => {
  return path.replace(/(\.[0-9]\.\s?)/g, '.*.').replace(/(\.[0-9]$)/g, '.*')
};