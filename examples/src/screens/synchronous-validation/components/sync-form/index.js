import React, {Component} from 'react'
import Form from 'reactjs-form'
import TextInput from '../../../../components/text-input'

class SyncForm extends Component {

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
      <div className="columns">
        <div className="column is-6">
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
        </div>
      </div>
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

export default Form(SyncForm, {
  sync: true,
  rules: {
    name: "required",
    email: "required|email",
  }
})