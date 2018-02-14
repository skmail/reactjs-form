# Synchronous Validation

---

Synchronous Validation can be done on 2 Levels [Form Level](#form-level) and [Field Level](#field-level)

## Form Level

---

`sync:true`  in the HOC component options will allow the form onBlur validation

```js
class FormSync extends Component {

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
          name="name"
          type="text"
          label="Your Name"
          component={TextInput}
        />
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

export default Form(FormSync, {
  sync: true,
  rules: {
    name: "required",
    email: "required|email",
  }
})
```
 

## Field Level

---

Pass `sync` prop  to the Input component to allow field level synchronous validation

```js
class SyncInput extends Component {

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
          name="name"
          type="text"
          label="Your Name"
          placeholder="sync"
          component={TextInput}
          sync
        />
        <Input
          name="email"
          type="email"
          label="Email Address"
          placeholder="Im not"
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
    }).catch(() => {})
  }
}

export default Form(SyncInput, {
  rules: {
    name: "required",
    email: "required|email",
  }
})
```


