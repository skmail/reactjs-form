## ReactJS-Form 

---

[![NPM Version](https://img.shields.io/npm/v/reactjs-form.svg?style=flat)](https://www.npmjs.com/package/reactjs-form)   [![NPM Downloads](https://img.shields.io/npm/dm/reactjs-form.svg?style=flat)](https://www.npmjs.com/package/reactjs-form)   [![Build Status](https://img.shields.io/travis/skmail/reactjs-form/master.svg?style=flat)](https://travis-ci.org/skmail/reactjs-form)   [![codecov.io](https://codecov.io/gh/skmail/reactjs-form/branch/master/graph/badge.svg)](https://codecov.io/gh/skmail/reactjs-form)

`reactjs-form` is a react library that allows html form validation within component state using minimal code and declarative way, 
our validator uses [skaterdav85/validatorjs](https://github.com/skaterdav85/validatorjs) package that  inspired by [Laravel PHP Validator](https://laravel.com/docs/master/validation) 
  
  

## Example

```js
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
    }).catch(() => {})
  }
}

export default Form(SingleInput, { 
  rules: {
    email: "required|email"
  }
})
```

## Installation

`npm install --save reactjs-form` or  `yarn add reactjs-form`

## Docs

Check out the [Documentation](https://reactjs-form.codeiin.com)



## Demo

`npm run examples` or `yarn examples`


