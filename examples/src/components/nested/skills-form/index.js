import React from 'react'
import Form from 'reactjs-form'

class SkillsForm extends React.Component {

  constructor(props) {
    super(props)
    this.onSubmit = this.onSubmit.bind(this)
  }

  render() {
    return (
      <div className="field">
        <label className="label">Skills</label>
        <div className="field is-grouped">
          <p className="control is-expanded">
            <input
              name="skill"
              onChange={this.props.onChange}
              className={`input ${this.props.hasError('skill', 'is-danger')}`} type="text" placeholder="Add as skill"/>
          </p>
          <p className="control">
            <button
              onClick={this.onSubmit}
              type="button" className="button is-info">
              Add
            </button>
          </p>
        </div>
        {
          this.props.error("skill", "help is-danger")
        }
        {
          this.props.formError
        }
      </div>
    )
  }

  onSubmit() {
    this.props.validate().then(() => {
      this.props.addSkill(this.props.value("skill"))
    })
  }
}

export default Form(SkillsForm, {
  rules: {
    skill: ['required',
      {
        not_in: (ownProps) => {
          console.log(ownProps)
          return ownProps.skills;
        }
      }
    ]
  },
  messages: {
    "not_in.skill": "Skill already selected!"
  }
})