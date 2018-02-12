import replaceIndexWithWildCard from '../utils/replace-index-with-wildcard'

describe('Test replaceIndexWithWildCard function', () => {

  it('Replace index between two dots with wild ard', () => {
    expect(replaceIndexWithWildCard('employees.1.name')).toBe('employees.*.name')
  })

  it('Replace Last index with wild card', () => {
    expect(replaceIndexWithWildCard('employees.1')).toBe('employees.*')
  })

  it('Don\'t non numeric indexes ', () => {
    expect(replaceIndexWithWildCard('employees.1s')).toBe('employees.1s')
  })

  it('Don\'t  indexes if starts with the path ', () => {
    expect(replaceIndexWithWildCard('1.field')).toBe('1.field')
  })

  it('Replace every thing but not the first index even if numeric', () => {
    expect(replaceIndexWithWildCard('1.field.items.1.items.2')).toBe('1.field.items.*.items.*')
  })

  it('Replace Multiple indexes with wildcard', () => {
    expect(replaceIndexWithWildCard('employees.1.items.1')).toBe('employees.*.items.*')
  })


})