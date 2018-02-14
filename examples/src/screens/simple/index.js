import React, {Component} from 'react'
import Form from 'reactjs-form'
import ReactJson from 'react-json-view'
import TextInput from '../../components/text-input'
import CheckboxInput from '../../components/checkbox-input'

class Simple extends Component {

  constructor(props) {
    super(props)
    this.onSubmit = this.onSubmit.bind(this)
  }

  render() {
    const {
      inputComponent:Input,
      submitting,
      reset
    } = this.props
    return (
      <form onSubmit={this.onSubmit}>

        <div className="columns">
          <div className="column is-6">
            <Input
              name="email"
              email="email"
              label="Email Address"
              component={TextInput}
              sync
            />
            <Input
              name="password"
              type="password"
              label="Password"
              component={TextInput}
            />
            <Input
              name="confirm_password"
              type="password"
              label="Confirm Password"
              component={TextInput}
            />

            <Input
              name="accept_terms"
              component={CheckboxInput}
              label="Accept terms and conditions"
            />

            <div className="form-group">
              <button
                className="button is-primary"
                disabled={this.props.submitting}>Submit
              </button>
              {' '}
              <button
                className="button is-text"
                disabled={submitting}
                type="button"
                onClick={reset}>
                Reset
              </button>
            </div>
          </div>
          {
            this.props.submitted === true &&
            <div className="column is-6">
              <section className="section">
                <ReactJson name={false} displayDataTypes={false} src={this.props.values()}/>
              </section>
            </div>
          }
        </div>
      </form>
    )
  }

  onSubmit(e) {
    e.preventDefault()
    this.props.validate().then(() => {
      // continue
    }).catch(err => {})
  }
}

export default Form(Simple, {
  rules: {
    email: "required|email",
    password: "required",
    confirm_password: "required|same:password",
    accept_terms: "accepted"
  }
})
