import getFieldRules from '../utils/get-field-rules'


test('#1 Get rules of field', () => {
  expect(getFieldRules('employees.1.name', {
    'employees.*.name': 'required',
    'employees.1.name': 'required',
    'employees.*.email': 'required|email',
    'employees.*.age': ''
  })).toEqual({
    'employees.1.name': ['required'],
  })
});


test('#2 Get rules of field', () => {
  expect(getFieldRules('employees.1.name', {
    'employees.*.name': ['required', {not_in: [1, 2]}],
    'employees.1.name': 'required',
  })).toEqual({
    'employees.1.name': ['required', {not_in: [1, 2]}],
  })
});


test('#3 Get rules of field', () => {
  expect(getFieldRules('employees.1.name', {
    'employees.*.name': ['required', {not_in: [1, 2]}],
    'employees.1.name': 'required|email',
  })).toEqual({
    'employees.1.name': ['required', 'email', {not_in: [1, 2]}],
  })
});


test('#4 Get rules of field', () => {
  expect(getFieldRules('employees.1.name', {
    'employees.*.name': ['required', {not_in: [1, 2]}],
    'employees.1.name': 'required|email|same:password',
  })).toEqual({
    'employees.1.name': ['required', 'email', 'same:password', {not_in: [1, 2]}],
  })
});

