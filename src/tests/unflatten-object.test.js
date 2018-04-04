import {
  unflatten,
  unflattenArrayStateUpdate,
  unflattenRemoveArrayStateUpdate
} from '../utils/unflatten-object'

describe('unflatten', () => {
  it('Unflatten single path without notation to object ', () => {
    expect(unflatten('path', {})).toEqual({
      path: {}
    })
  })


  it('Unflatten path with dot notation to object', () => {
    expect(unflatten('path.1', [])).toEqual({
      path: {
        1: []
      }
    })
  })

  it('Unflatten  dot notation path to deep object', () => {
    expect(unflatten('path.1.x.$set', [])).toEqual({
      path: {
        1: {
          x: {
            $set: []
          }
        }
      }
    })
  })
})

describe('unflattenArrayStateUpdate', () => {
  it('(Array exists) Unflatten  dot notation path to $push state [update - immutability-helper]  ', () => {
    const state = {
      path: {
        items: []
      }
    }
    expect(unflattenArrayStateUpdate(state, 'path.items', {})).toEqual({
      path: {
        items: {
          $push: [{}]
        }
      }
    })
  })

  it('(Array not exists) Unflatten  dot notation path to $set state  [update - immutability-helper]', () => {
    const state = {
      path: {}
    }
    expect(unflattenArrayStateUpdate(state, 'path.items', {})).toEqual({
      path: {
        items: {
          $set: [{}]
        }
      }
    })
  })

})

describe('unflattenRemoveArrayStateUpdate', () => {

  it('Unflatten  dot notation path to $splice / remove  array state [update - immutability-helper] ', () => {
    expect(unflattenRemoveArrayStateUpdate('path.items.0')).toEqual({
      path: {
        items: {
          $splice: [[0, 1]]
        }
      }
    })
  })

  it('Unflatten dot notation array of paths to $splice / remove  array state [update - immutability-helper] ', () => {
    expect(unflattenRemoveArrayStateUpdate(['path.items.0','path.items.1'])).toEqual({
      path: {
        items: {
          $splice: [[0, 1],[1, 1]]
        }
      }
    })
  })

  it('Unflatten dot notation  array of different path indexes to $splice / remove  array state [update - immutability-helper] ', () => {
    expect(unflattenRemoveArrayStateUpdate(['path.items.0','path.items.1','path.logs.0'])).toEqual({
      path: {
        items: {
          $splice: [[0, 1],[1, 1]]
        },
        logs: {
          $splice: [[0, 1]]
        }
      }
    })
  })

})