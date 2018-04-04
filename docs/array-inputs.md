## Array Inputs  

---

Using the  ``<Input/>`` component you can render the array inputs, 
add them using  ``addValue('input_name')``  function and remove them using ``removeValue('input_name.index')``


## Example
```js
import React, {Component} from 'react'
import Form from 'reactjs-form'
import TextInput from '../../components/text-input'


class ArrayInputs extends Component {

  constructor(props) {
    super(props)
    this.onSubmit = this.onSubmit.bind(this)
  }

  render() {
    const {
      inputComponent:Input,
      value,
      addValue,
      removeValue,
      submitting,
      reset
    } = this.props
    return (
      <form onSubmit={this.onSubmit}>
        <button
          onClick={() => addValue('employees', {id: Math.random()})}
          type="button">Add Employee
        </button>
        {
          value('employees', []).map((item, index) => (
            <div key={item.id}>
              <Input
                name={`employees.${index}.name`}
                component={TextInput}
              />
              <button
                type="button"
                onClick={() => removeValue(`employees.${index}`)}>
                Delete
              </button>
            </div>
          ))
        }
        <div>
          <button disabled={submitting}>Submit</button>
          {' '}
          <button
            type="button"
            onClick={reset}
            disabled={submitting}>
            Reset
          </button>
        </div>
      </form>
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

export default Form(ArrayInputs, {
  rules: {
    'employees.*.name': "required",
  },
})

```
 

### Warning
 
 1. Don't use the array index as key prop,use a unique id instead, [Why?](https://reactjs.org/docs/lists-and-keys.html#keys).
 2. Always use `[]` as second argument in ``value('input_name',[])`` to ensure you always use `map` on array.