import React, {Component} from 'react'
import Form from 'reactjs-form'
import ReactJson from 'react-json-view'
import {default as uuidV4} from 'uuid/v4'

import EmployeeSubForm from './employee-subform'

class DeepInputs extends Component {

  constructor(props) {
    super(props)
    this.onSubmit = this.onSubmit.bind(this)
  }

  render() {
    const {
      inputComponent:Input,
      submitting,
      reset
    } = this.props
    return (
      <form onSubmit={this.onSubmit}>

        <div className="columns">
          <div className="column is-6">
            <div className="field">
              <button
                onClick={() => this.props.addValue('employees', {id: uuidV4()})}
                type="button"
                className="button is-primary">Add Employee
              </button>
            </div>

            {
              this.props.value('employees', []).map((item, employeeIndex) => (
                <Input
                  name={`employees.${employeeIndex}`}
                  component={EmployeeSubForm}
                />
              ))
            }
            {
              this.props.value('employees', []).length > 0 &&
              <div className="field">
                <button
                  className="button is-primary"
                  disabled={submitting}>Submit
                </button>
                {' '}
                <button
                  className="button is-text"
                  disabled={submitting}
                  type="button"
                  onClick={reset}>
                  Reset
                </button>
              </div>
            }
          </div>

          {
            this.props.submitted === true &&
            <div className="column is-6">
              <section className="section">
                <ReactJson
                  name={false}
                  displayDataTypes={false} src={this.props.values()}/>
              </section>
            </div>
          }
        </div>
      </form>
    )
  }

  onSubmit(e) {
    e.preventDefault()
    this.props.validate().then(() => {
      // continue
    }).catch(() => {

    })
  }
}


export default Form(DeepInputs, {
  rules: {
    'employees.*.name': "required",
    'employees.*.email': "required|email",
    'employees.*.skills': 'required'
  },
  messages: {
    'required.employees.*.name': "Employee name is required",
    'required.employees.*.email': "Employee email is required",
    'email.employees.*.email': "Invalid email address",
    'required.employees.*.skills': "You must add 1 skill at least"
  },
  defaultValues: {
    employees: [
      {
        id: uuidV4()
      }
    ]
  }
})
