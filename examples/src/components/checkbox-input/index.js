import React from 'react'
export default ({hasError, value, error, input:{label, ...input}}) => (
  <div className="field">
    <div className={`control ${hasError(input.name, "is-danger", "")}`}>
      <label className="checkbox" htmlFor={`checkbox-${input.name}`}>
        <input
          id={`checkbox-${input.name}`}
          type="checkbox"
          checked={value(input.name)}
          {...input}
        />{ ' ' }
        {label}</label>
    </div>
    {error(input.name, "help is-danger")}
  </div>
)