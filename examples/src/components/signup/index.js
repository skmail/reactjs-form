import React, {Component} from 'react';
import Form from 'reactjs-form'
import ReactJson from 'react-json-view'


const TextInput = ({label, hasError, onChange, error, value, ...rest}) => (
  <div className="field">
    <label className="label">{label}</label>
    <div className="control">
      <input
        value={value(rest.name)}
        className={`input ${hasError(rest.name, "is-danger", "")}`}
        onChange={onChange}
        {...rest}
      />
    </div>
    {error(rest.name, "help is-danger")}
  </div>
)


const CheckboxInput = ({label, hasError, onChange, error, ...rest}) => (
  <div className="field">
    <div className={`control ${hasError(rest.name, "is-danger", "")}`}>
      <label className="checkbox" htmlFor={`checkbox-${rest.name}`}>
        <input
          id={`checkbox-${rest.name}`}
          onChange={onChange}
          type="checkbox"
          {...rest}
        />{ ' ' }
        {label}</label>
    </div>
    {error(rest.name, "help is-danger")}
  </div>
)

class Signup extends Component {

  constructor(props) {
    super(props)
    this.onSubmit = this.onSubmit.bind(this)
  }

  render() {
    return (
      <form onSubmit={this.onSubmit}>

        <div className="columns">
          <div className="column is-6">
            <TextInput
              name="email"
              email="email"
              value={this.props.value}
              error={this.props.error}
              hasError={this.props.hasError}
              onChange={this.props.onChange}
              label="Email Address"
            />
            <TextInput
              name="password"
              type="password"
              value={this.props.value}
              error={this.props.error}
              hasError={this.props.hasError}
              onChange={this.props.onChange}
              label="Password"
            />
            <TextInput
              name="confirm_password"
              type="password"
              value={this.props.value}
              error={this.props.error}
              hasError={this.props.hasError}
              onChange={this.props.onChange}
              label="Confirm Password"
            />

            <CheckboxInput
              name="accept_terms"
              error={this.props.error}
              hasError={this.props.hasError}
              onChange={this.props.onChange}
              checked={this.props.value('accept_terms')}
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
                disabled={this.props.submitting}
                type="button"
                onClick={this.props.reset}>
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
    );
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
    email: "required|email",
    password: "required",
    confirm_password: "required|same:password",
    accept_terms: "accepted"
  }
});
