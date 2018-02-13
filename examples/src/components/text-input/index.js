import React from 'react'
export default ({hasError, error, input:{label, ...input}}) => (
  <div className="field">
    <label className="label">{label}</label>
    <div className="control">
      <input
        className={`input ${hasError(input.name, "is-danger", "")}`}
        {...input}
      />
    </div>
    {error(input.name, "help is-danger")}
  </div>
)