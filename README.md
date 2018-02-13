# reactjs-form

---

[![NPM Version](https://img.shields.io/npm/v/reactjs-form.svg?style=flat)](https://www.npmjs.com/package/reactjs-form)  
[![NPM Downloads](https://img.shields.io/npm/dm/reactjs-form.svg?style=flat)](https://www.npmjs.com/package/reactjs-form)  
[![Build Status](https://img.shields.io/travis/skmail/reactjs-form/master.svg?style=flat)](https://travis-ci.org/skmail/reactjs-form)  
[![codecov.io](https://codecov.io/gh/skmail/reactjs-form/branch/master/graph/badge.svg)](https://codecov.io/gh/skmail/reactjs-form)

`reactjs-form` is a react library that allows html form validation within component state with the minimal code

## Why ReactJS-Form

Well! Forms and it's validation process is the most boring task in  developers life, it's like ...  create a text input, make it required max length X  then create email input make it required, email validation ... text input make  it required .. or required if first input is empty ... then another required text input and required text input numeric then  text input text input .. .Arghhh!! .. text input text input. etc, With ReactJS-form , forms are easily validated.

## Simple Example

```js
import React, {Component} from 'react'
import Form from 'reactjs-form'
import TextInput from '../../components/text-input'

class Signup extends Component {
  constructor(props) {
    super(props)
    this.onSubmit = this.onSubmit.bind(this)
  }
  render() {
    return (
      <form onSubmit={this.onSubmit}>
        <TextInput
          name="email"
          type="email"
          value={this.props.value}
          error={this.props.error}
          hasError={this.props.hasError}
          onChange={this.props.onChange}
          label="Email Address"
        />
        <button
          className="button is-primary"
          disabled={this.props.submitting}>Submit
        </button>
      </form>
    )
  }

  onSubmit(e) {
    e.preventDefault()
    this.props.validate().then(() => {
      // continue
    })
  }
}

export default Form(Signup, {
  rules: {
    email: "required|email"
  }
})

```

## Installation

`npm install --save reactjs-form`

OR Using Yarn

`yarn add reactjs-form`

## Demo

`npm run examples`

Or

`yarn examples`

If you started examples before then you can run

`npm run examples:start`

