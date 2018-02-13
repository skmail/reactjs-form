# Synchronous Validation

---

Synchronous Validation can be done by 4 Ways



## OnBlur - Form Level

---

```
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
  sync: true,
  rules: {
    email: "required|email"
  }
})

```

## OnBlur - Field Level 

---

```js
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
          onBlur={this.props.onBlur}
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



