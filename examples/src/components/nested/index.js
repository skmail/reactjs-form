import React, {Component} from 'react'
import Form from 'reactjs-form'

import SkillsForm from './skills-form'
import ReactJson from 'react-json-view'

import {default as uuidV4} from 'uuid/v4'

const TextInput = ({label, hasError, error, value, ...rest}) => (
  <div className="field">
    <label className="label">{label}</label>
    <div className="control">
      <input
        value={value(rest.name)}
        className={`input ${hasError(rest.name, "is-danger", "")}`}
        {...rest}
      />
    </div>
    {error(rest.name, "help is-danger")}
  </div>
)


class DeepInputs extends Component {

  constructor(props) {
    super(props)
    this.onSubmit = this.onSubmit.bind(this)
  }

  render() {
    console.log(
      this.props.errors()
    )
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
                <div className="box is-clearfix" key={employeeIndex}>
                  <TextInput
                    name={`employees.${employeeIndex}.name`}
                    type="text"
                    value={this.props.value}
                    error={this.props.error}
                    hasError={this.props.hasError}
                    onChange={this.props.onChange}
                    label="Employee Name"
                  />
                  <TextInput
                    name={`employees.${employeeIndex}.email`}
                    email="email"
                    value={this.props.value}
                    error={this.props.error}
                    onBlur={this.props.onBlur}
                    hasError={this.props.hasError}
                    onChange={this.props.onChange}
                    label="Employee Email Address"
                  />

                  <SkillsForm
                    skills={this.props.value(`employees.${employeeIndex}.skills`, [])}
                    addSkill={(skill) => this.props.addValue(`employees.${employeeIndex}.skills`, skill) }
                    formError={this.props.error(`employees.${employeeIndex}.skills`,'help is-danger')}
                  />

                  <div className="field is-grouped is-grouped-multiline">
                    {
                      this.props.value(`employees.${employeeIndex}.skills`, []).map((skill, skillIndex) => (
                        <div className="control" key={skillIndex}>
                          <div className="tags has-addons">
                            <span className="tag is-danger">{skill}</span>
                            <a className="tag is-delete"
                               onClick={() => this.props.removeValue(`employees.${employeeIndex}.skills.${skillIndex}`)}/>
                          </div>
                        </div>
                      ))
                    }
                  </div>


                  <div className="field">
                    <label className="checkbox">
                      <input type="checkbox" name={`employees.${employeeIndex}.active`} onChange={this.props.onChange}/>
                      {' '}
                      Active?
                    </label>
                  </div>
                  <hr/>

                  <button
                    onClick={() => this.props.removeValue(`employees.${employeeIndex}`)}
                    type="button"
                    className="button is-danger is-pulled-right is-small">Delete
                  </button>

                </div>

              ))
            }
            {
              this.props.value('employees', []).length > 0 &&
              <div className="field">
                <button
                  className="button is-primary"
                  disabled={this.props.submitting}>Submit
                </button>
                {' '}
                <button
                  className="button is-text"
                  disabled={this.props.submitting}
                  type="button"
                  onClick={this.props.reset}>
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
    employees: []
  }
})
