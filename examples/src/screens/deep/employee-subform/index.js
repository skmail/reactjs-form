import React from 'react'
import SkillsForm from '../skills-form'
import TextInput from '../../../components/text-input'
import CheckboxInput from '../../../components/checkbox-input'


export default ({
  inputComponent:Input,
  error,
  hasError,
  value,
  addValue,
  removeValue,
  input:{label, ...input}
}) => (

  <div className="box is-clearfix">
    <Input
      type="text"
      label="Employee Name"
      name={`${input.name}.name`}
      component={TextInput}
    />
    <Input
      email="email"
      label="Employee Email Address"
      name={`${input.name}.email`}
      component={TextInput}
    />

    <SkillsForm
      skills={value(`${input.name}.skills`, [])}
      addSkill={(skill) => addValue(`${input.name}.skills`, skill) }
      formError={error(`${input.name}.skills`,'help is-danger')}
    />

    <div className="field is-grouped is-grouped-multiline">
      {
        value(`${input.name}.skills`, []).map((skill, skillIndex) => (
          <div className="control" key={skillIndex}>
            <div className="tags has-addons">
              <span className="tag is-danger">{skill}</span>
              <a
                href="#delete"
                className="tag is-delete"
                onClick={() => removeValue(`${input.name}.skills.${skillIndex}`)}/>
            </div>
          </div>
        ))
      }
    </div>

    <Input
      label="Is Active?"
      name={`${input.name}.active`}
      component={CheckboxInput}
    />

    <hr/>

    <button
      onClick={() => removeValue(input.name)}
      type="button"
      className="button is-danger is-pulled-right is-small">Delete
    </button>

  </div>
)