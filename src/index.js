import React from "react"
import Validator from 'validatorjs'
import update from 'immutability-helper'

import getValue from './utils/get-value'
import getFieldRules from './utils/get-field-rules'
import getFieldMessages from './utils/get-field-messages'
import parseCallbackRules from './utils/parse-callback-rules'

import {
  unflatten,
  unflattenArrayStateUpdate,
  unflattenRemoveArrayStateUpdate
} from './utils/unflatten-object'

const Form = (WrappedComponent, {
  rules = {},
  messages = {},
  defaultValues = {},
  sync = false
} = {}) => class extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      inputs: defaultValues,
      errors: {},
      submitting: false,
      submitted: false
    }

    this.validate = this.validate.bind(this)

    this.error = this.error.bind(this)
    this.errors = this.errors.bind(this)
    this.hasError = this.hasError.bind(this)

    this.value = this.value.bind(this)
    this.setValue = this.setValue.bind(this)
    this.addValue = this.addValue.bind(this)
    this.removeValue = this.removeValue.bind(this)

    this.values = this.values.bind(this)
    this.setValues = this.setValues.bind(this)

    this.onChange = this.onChange.bind(this)
    this.onBlur = this.onBlur.bind(this)
    this.reset = this.reset.bind(this)
    this.inputComponent = this.inputComponent.bind(this)
  }

  render() {
    const {...rest} = this.props
    return (
      <WrappedComponent
        {...rest}
        hasError={this.hasError}
        error={this.error}
        value={this.value}
        values={this.values}
        setValue={this.setValue}
        setValues={this.setValues}
        validate={this.validate}
        addValue={this.addValue}
        errors={this.errors}
        removeValue={this.removeValue}
        reset={this.reset}
        submitting={this.state.submitting}
        submitted={this.state.submitted}
        inputComponent={this.inputComponent}
      />
    )
  }

  onChange(el) {
    let value
    switch (el.target.type) {
    case 'select-multiple':
      value = [...el.target.selectedOptions].map(option => option.value)
      break
    case 'checkbox':
      value = el.target.checked
      break
    default:
      value = el.target.value
    }
    this.setValue(el.target.name,value)
  }

  onBlur(el) {
    const fieldRules = getFieldRules(el.target.name, parseCallbackRules(rules, [this.props]))
    const fieldMessages = getFieldMessages(el.target.name, messages)
    let validation = new Validator(this.state.inputs, fieldRules, fieldMessages)
    return new Promise((accept, reject) => {
      validation.fails(() => {
        this.setState({
          errors: {
            ...this.state.errors,
            ...validation.errors.errors
          },
          submitting: false,
          submitted: true
        })
        reject()
      })
      validation.passes(() => {
        this.setState({
          errors: {},
          submitting: false,
          submitted: true
        })
        accept()
      })
    })
  }


  addValue(name, value) {
    this.setState({
      inputs: update(this.state.inputs, unflattenArrayStateUpdate(this.state.inputs, name, value))
    })
  }

  removeValue(name) {
    /**
     * While removing value from an array we need to remove the related errors to that index too
     * @type {*}
     */
    let errorsName = name.split('.')
    const index = parseInt(errorsName.pop(), 10)
    errorsName = errorsName.join('.') + '.'
    const errors = Object.keys(this.state.errors).reduce((acc, item) => {
      if (item.startsWith(errorsName)) {
        let remainingName = item.substr(errorsName.length, item.length).split('.')

        /* istanbul ignore else */
        if (item.startsWith(name)) {
          return acc
        }
        let fieldIndex = parseInt(remainingName.shift(), 10)
        /* istanbul ignore else */
        if (fieldIndex > index) {
          fieldIndex--
        }
        acc[`${errorsName}${fieldIndex}.${remainingName.join('.')}`] = this.state.errors[item]
      } else {
        acc[item] = this.state.errors[item]
      }
      return acc
    }, {})
    this.setState({
      inputs: update(this.state.inputs, unflattenRemoveArrayStateUpdate(name)),
      errors
    })
  }

  validate() {
    let validation = new Validator(this.state.inputs, parseCallbackRules(rules, [this.props]), messages)
    this.setState({
      submitting: true,
      submitted: false
    })
    return new Promise((accept, reject) => {
      validation.fails(() => {
        this.setState({
          errors: validation.errors.errors,
          submitting: false,
          submitted: true
        })
        reject()
      })
      validation.passes(() => {
        this.setState({
          errors: {},
          submitting: false,
          submitted: true
        })
        accept()
      })
    })
  }

  error(name, classNameOrPlain = false) {
    if (this.hasError(name)) {
      const error = this.state.errors[name]
      if (classNameOrPlain === true) {
        return error[0]
      }
      return <span className={classNameOrPlain !== false ? classNameOrPlain : ""}>{error}</span>
    }
    return null
  }

  errors() {
    return this.state.errors
  }

  hasError(name, stringToReturnOnInvalid = false, stringToReturnOnValid = false) {
    const hasError = typeof this.state.errors[name] !== "undefined"
    if (hasError && stringToReturnOnInvalid !== false) {
      return stringToReturnOnInvalid
    } else if (hasError === false && stringToReturnOnValid) {
      return stringToReturnOnValid
    }
    return hasError
  }

  value(name, defaultValue = "") {
    return getValue(this.state.inputs, name, defaultValue)
  }

  values() {
    return this.state.inputs
  }

  setValues(inputs) {
    this.setState({inputs})
  }

  reset() {
    this.setState({
      inputs: {},
      errors: {},
      submitted: false,
      submitting: false
    })
  }

  setValue(name, value) {
    this.setState({
      inputs: update(this.state.inputs, unflatten(`${name}.$set`, value))
    })
  }

  inputComponent({
    component:InputComponent,
    sync:fieldSync = false,
    ...rest
  }) {
    rest.onChange = this.onChange
    rest.value = this.value(rest.name)
    if (sync || fieldSync) {
      rest.onBlur = this.onBlur
    }
    return (
      <InputComponent
        input={rest}
        hasError={this.hasError}
        error={this.error}
        errors={this.errors}
        value={this.value}
        values={this.values}
        setValue={this.setValue}
        setValues={this.setValues}
        validate={this.validate}
        addValue={this.addValue}
        removeValue={this.removeValue}
        reset={this.reset}
        submitting={this.state.submitting}
        submitted={this.state.submitted}
        inputComponent={this.inputComponent}
      />
    )
  }
}

export default Form
