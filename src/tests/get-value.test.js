import getValue from '../utils/get-value'


test('Return undefined when not exists', () => {
  const state = {}
  const path = 'employees'
  expect(getValue(state, path)).toEqual(undefined)
});

test('Get array of objects value  from state by path', () => {
  const state = {
    employees: [
      {
        id: 1
      }
    ]
  }
  const expectedResults = 1
  const path = 'employees.0.id'
  expect(getValue(state, path)).toEqual(expectedResults)
});


test('Get deep array item from state by path', () => {
  const state = {
    employees: [
      {
        id: 1
      }
    ]
  }
  const expectedResults = state.employees[0]
  const path = 'employees.0'
  expect(getValue(state, path)).toEqual(expectedResults)
});


test('Get direct item from state  by path', () => {
  const state = {
    employees: [
      {
        id: 1
      }
    ]
  };
  const expectedResults = state.employees
  const path = 'employees'
  expect(getValue(state, path)).toEqual(expectedResults)
});

