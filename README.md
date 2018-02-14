## ReactJS-Form 

---

[![NPM Version](https://img.shields.io/npm/v/reactjs-form.svg?style=flat)](https://www.npmjs.com/package/reactjs-form)   [![NPM Downloads](https://img.shields.io/npm/dm/reactjs-form.svg?style=flat)](https://www.npmjs.com/package/reactjs-form)   [![Build Status](https://img.shields.io/travis/skmail/reactjs-form/master.svg?style=flat)](https://travis-ci.org/skmail/reactjs-form)   [![codecov.io](https://codecov.io/gh/skmail/reactjs-form/branch/master/graph/badge.svg)](https://codecov.io/gh/skmail/reactjs-form)

`reactjs-form` is a react library that allows html form validation within component state with the minimal code

## Why ReactJS-Form

Well! Forms and it's validation process is the most boring task in  developers life, it's like ...  create a text input, make it required max length X  then create email input make it required, email validation ... text input make  it required .. or required if first input is empty ... then another required text input and required text input numeric then  text input text input .. .Arghhh!! .. text input text input. etc, With ReactJS-form , forms are easily validated.

## Simple Example

```jsx
import React, {Component} from 'react'
import Form from 'reactjs-form'
import TextInput from '../../components/text-input'

class SingleInput extends Component {
  constructor(props) {
    super(props)
    this.onSubmit = this.onSubmit.bind(this)
  }
  render() {
    const {
      inputComponent:Input,
      submitting
    } = this.props
    return (
      <form onSubmit={this.onSubmit}>
        <Input
          name="email"
          type="email"
          label="Email Address"
          component={TextInput}
        /> 
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

export default Form(SingleInput, { 
  rules: {
    email: "required|email"
  }
})
```

## Installation

`npm install --save reactjs-form`

OR using Yarn

`yarn add reactjs-form`

## Demo

`npm run examples`

Or

`yarn examples`

If you started examples before then you can run

`npm run examples:start`


## Docs

Check out the [Documentation](https://reactjs-form.codeiin.com)