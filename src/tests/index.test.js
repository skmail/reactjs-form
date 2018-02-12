import React from 'react'
import ReactDOM from 'react-dom'
import {shallow, configure} from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import Form from '../'
configure({adapter: new Adapter()})

const getComonent = () => (
  Form(({onChange}) => (
    <div>
      <input
        name="email"
        onChange={onChange}
      />
    </div>
  ), {
    rules: {
      name: "required",
      email: "required",
      "items.*.name": "required"
    },
    messages: {
      "required.email": "email is required.",
      "required.items.0.required" : "Item 0 is required"
    }
  })
)

it('renders without crashing', () => {
  const div = document.createElement('div')
  const Component = Form(({onChange}) => (
    <div>
      <input
        name="email"
        onChange={onChange}
      />
    </div>
  ))
  ReactDOM.render(<Component />, div)
  ReactDOM.unmountComponentAtNode(div)
})

it('renders without crashing', () => {
  const Component = Form(({onChange}) => (
    <div>
      <input
        name="email"
        onChange={onChange}
      />
    </div>
  ))
  const rendered = shallow(<Component/>)
  expect(rendered.html()).toEqual("<div><input name=\"email\"/></div>")
})


it('Changing text input', () => {
  const Component = getComonent()
  const rendered = shallow(<Component/>)
  rendered.props().onChange({
    target: {
      type: "text",
      name: "name",
      value: "solaiman"
    }
  })
  expect(rendered.props().value("name")).toEqual("solaiman")
})

it('Changing text input', () => {
  const Component = getComonent()
  const rendered = shallow(<Component/>)
  rendered.props().onChange({
    target: {
      type: "checkbox",
      name: "name",
      value: "solaiman",
      checked: true
    }
  })
  expect(rendered.props().value("name")).toBe(true)
})

it('Changing text input', () => {
  const Component = getComonent()
  const rendered = shallow(<Component/>)
  rendered.props().onChange({
    target: {
      type: "select-multiple",
      name: "name",
      selectedOptions: [
        {
          value: 1
        },
        {
          value: 2
        }
      ]
    }
  })
  expect(rendered.props().value("name")).toEqual([1, 2])
})


describe('#1 Validation with default messages', () => {
  const Component = getComonent()
  const rendered = shallow(<Component/>)
  const name = "name"
  rendered.props().onChange({
    target: {
      name,
      type: "text",
      value: ""
    }
  })

  rendered.props().validate().then(() => {

  }).catch(() => {

  })

  it('Print Messages JSX element', () => {
    expect(shallow(rendered.props().error("name")).html()).toEqual('<span class="">The name field is required.</span>')
  })

  it('Print Messages JSX element with className', () => {
    expect(shallow(rendered.props().error("name", "is-invalid")).html()).toEqual('<span class="is-invalid">The name field is required.</span>')
  })

  it('Print plain text error', () => {
    expect(rendered.props().error("name", true)).toEqual('The name field is required.')
  })
})

describe('#2 Validation onBlur with default messages', () => {
  const Component = getComonent()
  const rendered = shallow(<Component/>)
  const name = "name"

  rendered.props().onBlur({
    target: {
      name,
      type: "text",
      value: ""
    }
  })

  it('Print Messages JSX element', () => {
    expect(shallow(rendered.props().error("name")).html()).toEqual('<span class="">The name field is required.</span>')
  })

  it('Print Messages JSX element with class Name', () => {
    expect(shallow(rendered.props().error("name", "is-invalid")).html()).toEqual('<span class="is-invalid">The name field is required.</span>')
  })


  it('Print plain text message', () => {
    expect(rendered.props().error("name", true)).toEqual('The name field is required.')
  })

  it('Return null if no errors', () => {
    expect(rendered.props().error("email", true)).toEqual(null)
  })

})

describe('#3 Validation with custom messages', () => {
  const Component = getComonent()
  const rendered = shallow(<Component/>)
  const name = "email"

  rendered.props().onChange({
    target: {
      name,
      type: "text",
      value: ""
    }
  })

  rendered.props().validate().then(() => {

  }).catch(() => {

  })

  it('Print Messages JSX element', () => {
    expect(shallow(rendered.props().error("name")).html()).toEqual('<span class="">The name field is required.</span>')
  })

  it('Print Messages JSX element with className', () => {
    expect(shallow(rendered.props().error("name", "is-invalid")).html()).toEqual('<span class="is-invalid">The name field is required.</span>')
  })

  it('Print plain text message', () => {
    expect(rendered.props().error("name", true)).toEqual('The name field is required.')
  })

  it('Print Messages JSX element', () => {
    expect(shallow(rendered.props().error("email")).html()).toEqual('<span class="">email is required.</span>')
  })

  it('Print Messages JSX element with className', () => {
    expect(shallow(rendered.props().error("email", "is-invalid")).html()).toEqual('<span class="is-invalid">email is required.</span>')
  })

  it('Print plain text message', () => {
    expect(rendered.props().error("email", true)).toEqual('email is required.')
  })

})


it('Validation Passed', () => {
  const Component = getComonent()
  const rendered = shallow(<Component/>)
  rendered.props().onChange({
    target: {
      name: "name",
      type: "text",
      value: "solaiman"
    }
  })

  rendered.props().onChange({
    target: {
      name: "email",
      type: "text",
      value: "psokmail@gmail.com"
    }
  })

  rendered.props().validate().then(() => {

  }).catch(() => {

  })

  expect(Object.keys(rendered.props().errors()).length).toEqual(0)

})

it('Validation onBlur Passes', () => {
  const Component = getComonent()
  const rendered = shallow(<Component/>)
  const name = "name"
  rendered.props().onChange({
    target: {
      name,
      type: "text",
      value: "Solaiman"
    }
  })
  rendered.props().onBlur({
    target: {
      name,
      type: "text"
    }
  })
  expect(rendered.props().error(name, true)).toEqual(null)
})


it('Add an item to array', () => {
  const Component = getComonent()
  const rendered = shallow(<Component/>)

  expect(rendered.props().value('items', []).length).toEqual(0)

  rendered.props().addValue('items', {
    id: 1
  })
  expect(rendered.props().value('items.0')).toEqual({
    id: 1
  })
  rendered.props().addValue('items', {
    id: 1
  })
  expect(rendered.props().value('items', []).length).toEqual(2)
})

describe('Remove item from array', () => {

  const Component = getComonent()

  const rendered = shallow(<Component/>)

  it('value return default value', () => {
    expect(rendered.props().value('items', []).length).toEqual(0)
  })


  it('Array updated', () => {
    rendered.props().addValue('items', 1)
    rendered.props().addValue('items', 2)
    rendered.props().addValue('items', 3)
    rendered.props().addValue('items', 4)
    rendered.props().addValue('items', 5)
    expect(rendered.props().value('items', []).length).toEqual(5)
  })


  it('Array updated', () => {
    rendered.props().removeValue('items.3')
    expect(rendered.props().value('items', []).length).toEqual(4)
  })

  it('Array updated', () => {
    rendered.props().removeValue('items.0')
    rendered.props().removeValue('items.1')
    expect(rendered.props().value('items', []).length).toEqual(2)
  })


})

it('Rearrange messages after Remove item from array', () => {

  const Component = getComonent()

  const rendered = shallow(<Component/>)

  rendered.props().addValue('items', {
    name: "solaiman"
  })

  rendered.props().addValue('items', {
    name: ""
  })

  rendered.props().validate().then(() => {

  }).catch(() => {

  })

  rendered.props().removeValue('items.0')

  expect(rendered.props().error("items.0.name", true)).toEqual('The items.1.name field is required.')

})
it('Rearrange messages after Remove item from array', () => {

  const Component = getComonent()

  const rendered = shallow(<Component/>)

  rendered.props().addValue('items', {
    name: ""
  })

  rendered.props().addValue('items', {
    name: "Solaiman"
  })

  rendered.props().validate().then(() => {

  }).catch(() => {

  })

  rendered.props().removeValue('items.0')

  expect(rendered.props().error("items.0.name", true)).toEqual(null)

})

it('Get values', () => {

  const Component = getComonent()

  const rendered = shallow(<Component/>)

  rendered.props().addValue('items', {
    name: "solaiman"
  })

  rendered.props().addValue('items', {
    name: ""
  })

  expect(rendered.props().values()).toEqual({
    items: [
      {
        name: "solaiman"
      },
      {
        name: ""
      }
    ]
  })

})
describe('hasErrors', () => {

  const Component = getComonent()

  const rendered = shallow(<Component/>)

  rendered.props().onChange({
    target: {
      name: "name",
      type: "text",
      value: ""
    }
  })

  rendered.props().onChange({
    target: {
      name: "email",
      type: "text",
      value: "psokmail@gmail.com"
    }
  })

  rendered.props().addValue('items', {
    name: "solaiman"
  })

  rendered.props().addValue('items', {
    name: ""
  })

  rendered.props().validate().then(() => {

  }).catch(() => {

  })

  it('Direct field is invalid', () => {
    expect(rendered.props().hasError('name')).toBe(true)
  })

  it('direct field is valid', () => {
    expect(rendered.props().hasError('email')).toBe(false)
  })

  it('Deep Field is invalid', () => {
    expect(rendered.props().hasError('items.1.name')).toBe(true)
  })

  it('Deep Field is valid', () => {
    expect(rendered.props().hasError('items.0.name')).toBe(false)
  })

  it('Return a string on invalid  ', () => {
    expect(rendered.props().hasError('items.1.name', 'is-invalid')).toBe('is-invalid')
  })

  it('Return a string on valid  ', () => {
    expect(rendered.props().hasError('items.0.name', 'is-invalid', 'is-valid')).toBe('is-valid')
  })

})

describe('setValues', () => {
  const Component = getComonent()
  const rendered = shallow(<Component/>)

  rendered.props().onChange({
    target: {
      name: "name",
      type: "text",
      value: ""
    }
  })

  const values = {
    name: "Solaiman",
    email: "psokmail@gmail.com",
    items: [{id: 1}],
    tags: ["javascript", "react"]
  };

  rendered.props().setValues(values)

  it('Return all values', () => {
    expect(rendered.props().values()).toEqual(values)
  })

  it('Return single value', () => {
    expect(rendered.props().value('name')).toEqual(values.name)
  })

  it('Return array', () => {
    expect(rendered.props().value('items')).toEqual(values.items)
  })

  it('Return default value', () => {
    expect(rendered.props().value('age', 28)).toEqual(28)
  })

})

describe('Reset', () => {

  const Component = getComonent()
  const rendered = shallow(<Component/>)

  rendered.props().onChange({
    target: {
      name: "name",
      type: "text",
      value: ""
    }
  })

  const values = {
    name: "Solaiman",
    email: "psokmail@gmail.com",
    items: [{id: 1}],
    tags: ["javascript", "react"]
  };

  rendered.props().reset()

  it('Return all values', () => {
    expect(rendered.props().values()).toEqual({})
    expect(rendered.props().submitted).toBe(false)
    expect(rendered.props().submitted).toBe(false)
  })
})