import getFieldMessages from '../utils/get-field-messages'


describe('getFieldMessages', () => {

  it('#1 Get messages of field - various rules messages', () => {
    expect(getFieldMessages('employees.0.name', {
      'required.employees.*.name': 'Employee * name is required',
      'email.employees.0.name': 'Employee * email is require',
      'required.employees.1.name': 'Employee first name is required',
      'required.employees.1.name.employees.1.name': 'Employee first name is required',
    })).toEqual({
      'required.employees.0.name': 'Employee * name is required',
      'email.employees.0.name': 'Employee * email is require',
    })
  })

  it('#2 Get messages of field [explicit numeric key precedence]', () => {
    expect(getFieldMessages('employees.0.name', {
      'required.employees.*.name': 'Employees first name is required',
      'required.employees.0.name': 'Employee name is required',
      'required.employees.1.name.employees.1.name': 'Employee first name is required',
    })).toEqual({
      'required.employees.0.name': 'Employee name is required',
    })
  })

  it('#2 Get messages of field [explicit numeric key precedence]', () => {
    expect(getFieldMessages('employees.0.name', {
      'required.employees.0.name': 'Employee name is required',
      'required.employees.*.name': 'Employees first name is required',
      'required.employees.1.name.employees.1.name': 'Employee first name is required',
    })).toEqual({
      'required.employees.0.name': 'Employee name is required',
    })
  })

  it('#3 Get messages of field (no matches)', () => {
    expect(getFieldMessages('employees.0.name', {
      'required.employees.1.name.employees.1.name': 'Employee first name is required',
      'required.employees.2.name': 'Employee name is required',
    })).toEqual({})
  })

  it('#4 Get messages of field (wildcard)', () => {
    expect(getFieldMessages('employees.0.name', {
      'required.employees.*.name': 'Employee first name is required',
      'required.employees.1.name.employees.1.name': 'Employee first name is required',
    })).toEqual({
      'required.employees.0.name': 'Employee first name is required',
    })
  })

  it('#5 Get messages of field (wildcard)', () => {
    expect(getFieldMessages('employees.0.name', {
      'required.employees.*.name': 'Employee first name is required',
      'email.employees.*.name': 'Employee email is required',
      'required.employees.1.name.employees.1.name': 'Employee first name is required',
    })).toEqual({
      'required.employees.0.name': 'Employee first name is required',
      'email.employees.0.name': 'Employee email is required',
    })
  })
  
})


