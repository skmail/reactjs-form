import  parseCallbackRules from '../utils/parse-callback-rules'

test('Parse empty rules object :/', () => {
  const rules = {};
  const expected = {}
  expect(parseCallbackRules(rules)).toEqual(expected)
});

test('Parse without callbacks (1) ', () => {
  const rules = {
    name: 'required'
  };
  expect(parseCallbackRules(rules)).toEqual(rules)
});

test('Parse without callbacks (2)', () => {
  const rules = {
    name: [
      'required'
    ]
  };
  expect(parseCallbackRules(rules)).toEqual(rules)
});

test('Parse with callbacks (1)', () => {
  const rules = {
    name: [
      'required',
      {
        email: (ownProps) => [1, 2]
      }
    ]
  };
  const expected = {
    name: [
      'required',
      {
        'email': [1, 2]
      }
    ]
  }
  expect(parseCallbackRules(rules)).toEqual(expected)
});


test('Parse with callbacks (2)', () => {
  const rules = {
    name: [
      'required',
      {
        not_in: (ownProps) => ownProps.results
      },
      {
        required_if: ['age', 30]
      }
    ]
  };
  const expected = {
    name: [
      'required',
      {
        not_in: [1, 2]
      },
      {
        required_if: ['age', 30]
      }
    ]
  };
  expect(parseCallbackRules(rules,
  [
    {
      results: [1, 2]
    }
  ]
  )).toEqual(expected)
});