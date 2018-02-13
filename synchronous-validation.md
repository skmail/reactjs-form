# Synchronous Validation

---

Synchronous Validation can be done on 2 Levels [Form Level](#form-level) and [Field Level](#field-level)

## [Form Level](#form-level)

---

`sync:true`  in the HOC component options will allow the form onBlur validation

```js
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
        <button
          className="button is-primary"
          disabled={submitting}>Submit
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

export default Form(SingleInput, {
  sync: true,
  rules: {
    email: "required|email"
  }
})
```

## Field Level

---

```js
class SimpleInput extends Component {
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
          sync={true}
          name="email"
          type="email"
          label="Email Address"
          component={TextInput}
        />
        <Input
          name="first_name"
          type="text"
          label="First Name"
          component={TextInput}
        />
        <button
          className="button is-primary"
          disabled={submitting}>Submit
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

export default Form(SimpleInput, {
  rules: {
    name: "required",
    email: "required|email",
  }
})
```



