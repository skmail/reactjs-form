import {
  unflatten,
  unflattenArrayStateUpdate,
  unflattenRemoveArrayStateUpdate
} from '../utils/unflatten-object'


test('Unflatten single path without notation to object ', () => {
  expect(unflatten('path', {})).toEqual({
    path: {}
  })
});


test('Unflatten path with dot notation to object', () => {
  expect(unflatten('path.1', [])).toEqual({
    path: {
      1: []
    }
  })
});

test('Unflatten  dot notation path to deep object', () => {
  expect(unflatten('path.1.x.$set', [])).toEqual({
    path: {
      1: {
        x: {
          $set: []
        }
      }
    }
  })
});

test('(Array exists) Unflatten  dot notation path to $push state [update - immutability-helper]  ', () => {
  const state = {
    path: {
      items: []
    }
  };
  expect(unflattenArrayStateUpdate(state, 'path.items', {})).toEqual({
    path: {
      items: {
        $push: [{}]
      }
    }
  })
});

test('(Array not exists) Unflatten  dot notation path to $set state  [update - immutability-helper]', () => {
  const state = {
    path: {}
  };
  expect(unflattenArrayStateUpdate(state, 'path.items', {})).toEqual({
    path: {
      items: {
        $set: [{}]
      }
    }
  })
});


test('Unflatten  dot notation path to $splice / remove  array state [update - immutability-helper] ', () => {
  expect(unflattenRemoveArrayStateUpdate('path.items.0')).toEqual({
    path: {
      items: {
        $splice: [[0, 1]]
      }
    }
  })
});

