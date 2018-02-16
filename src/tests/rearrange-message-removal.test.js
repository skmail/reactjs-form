import rearrangeMessageRemoval from '../utils/rearrange-message-removal'

describe('rearrangeMessageRemoval' , () => {
  it('Rearrange messages after Remove item from array', () => {
    const errors = {
      'items.0.name' : "Item 1 is required"
    }
    const results = rearrangeMessageRemoval('items.0.name', errors)
    const expected = {}
    expect(results).toEqual(expected)
  })


  it('Rearrange messages after Remove item from array', () => {
    const errors = {
      'items.0.name' : "Item 1 is required",
      "items.1.name" : "Item 2 is required"
    }
    const results = rearrangeMessageRemoval('items.0.name', errors)
    const expected = {
      "items.1.name" : "Item 2 is required"
    }
    expect(results).toEqual(expected)
  })


})

