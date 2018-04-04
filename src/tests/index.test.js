import React from 'react'
import ReactDOM from 'react-dom'
import {shallow, mount, configure} from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import Form from '../'
configure({adapter: new Adapter()})
const findInputProps = (rendered, findBy) => (
  rendered
    .find(MyForm)
    .find(findBy)
    .first()
    .children()
    .props()
)
const MyForm = ({inputComponent:Input}) => (
  <Input
    name="name"
    component={({input}) => (
      <div>
        <input
          {...input}
        />
      </div>
    )}
  />
)

const hocOptions = {
  rules: {
    name: "required",
    email: "required",
    "items.*.name": "required"
  },
  messages: {
    "required.email": "email is required.",
    "required.items.0.name": "Item 0 is required"
  }
}

const getComponent = () => (
  Form(MyForm, hocOptions)
)
const getSyncComponent = () => (
  Form(MyForm, {
    sync: true,
    ...hocOptions
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

it('renders without crashing - Check output', () => {
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
  const Component = getComponent()
  const rendered = mount(<Component/>)

  const formProps = rendered.find(MyForm).first().props()
  const inputProps = findInputProps(rendered, {name: "name"})


  inputProps.input.onChange({
    target: {
      type: "text",
      name: "name",
      value: "solaiman"
    }
  })
  expect(formProps.value("name")).toEqual("solaiman")
})

it('Changing checkbox input', () => {
  const Component = getComponent()
  const rendered = mount(<Component/>)

  const formProps = rendered.find(MyForm).first().props()
  const inputProps = findInputProps(rendered, {name: "name"})

  inputProps.input.onChange({
    target: {
      type: "checkbox",
      name: "name",
      value: "solaiman",
      checked: true
    }
  })
  expect(formProps.value("name")).toBe(true)
})

describe('Changing Select Option', () => {
  const Component = getComponent()
  const rendered = mount(<Component/>)

  const formProps = rendered.find(MyForm).first().props()
  const inputProps = findInputProps(rendered, {name: "name"})

  inputProps.input.onChange({
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
  it('Input component has value function', () => {
    expect(inputProps.value("name")).toEqual([1, 2])
  })
  it('Form component has value function', () => {
    expect(formProps.value("name")).toEqual([1, 2])
  })
})


describe('#1 Validation with default messages', () => {
  const Component = getComponent()
  const rendered = mount(<Component/>)
  const name = "name"

  const formProps = rendered.find(MyForm).first().props()
  const inputProps = findInputProps(rendered, {name: "name"})


  inputProps.input.onChange({
    target: {
      name,
      type: "text",
      value: ""
    }
  })

  formProps.validate().then(() => {

  }).catch(() => {

  })

  it('Print Messages JSX element', () => {
    expect(shallow(formProps.error("name")).html()).toEqual('<span class="">The name field is required.</span>')
  })

  it('Print Messages JSX element with className', () => {
    expect(shallow(formProps.error("name", "is-invalid")).html()).toEqual('<span class="is-invalid">The name field is required.</span>')
  })

  it('Print plain text error', () => {
    expect(formProps.error("name", true)).toEqual('The name field is required.')
  })
})

describe('#2 Validation onBlur with default messages', () => {
  const Component = getSyncComponent()
  const rendered = mount(<Component/>)
  const name = "name"

  const formProps = rendered.find(MyForm).first().props()
  const inputProps = findInputProps(rendered, {name: "name"})


  inputProps.input.onBlur({
    target: {
      name,
      type: "text",
      value: ""
    }
  }).then(() => {

  }).catch(() => {

  })

  it('Print Messages JSX element', () => {
    expect(shallow(formProps.error("name")).html()).toEqual('<span class="">The name field is required.</span>')
  })

  it('Print Messages JSX element with class Name', () => {
    expect(shallow(formProps.error("name", "is-invalid")).html()).toEqual('<span class="is-invalid">The name field is required.</span>')
  })


  it('Print plain text message', () => {
    expect(formProps.error("name", true)).toEqual('The name field is required.')
  })

  it('Return null if no errors', () => {
    expect(formProps.error("email", true)).toEqual(null)
  })

})

describe('#3 Validation with custom messages', () => {
  const Component = getComponent()
  const rendered = mount(<Component/>)
  const name = "email"

  const formProps = rendered.find(MyForm).first().props()
  const inputProps = findInputProps(rendered, {name: "name"})


  inputProps.input.onChange({
    target: {
      name,
      type: "text",
      value: ""
    }
  })

  formProps.validate().then(() => {

  }).catch(() => {

  })

  it('Print Messages JSX element', () => {
    expect(shallow(inputProps.error("name")).html()).toEqual('<span class="">The name field is required.</span>')
  })

  it('Print Messages JSX element with className', () => {
    expect(shallow(inputProps.error("name", "is-invalid")).html()).toEqual('<span class="is-invalid">The name field is required.</span>')
  })

  it('Print plain text message', () => {
    expect(inputProps.error("name", true)).toEqual('The name field is required.')
  })

  it('Print Messages JSX element', () => {
    expect(shallow(inputProps.error("email")).html()).toEqual('<span class="">email is required.</span>')
  })

  it('Print Messages JSX element with className', () => {
    expect(shallow(inputProps.error("email", "is-invalid")).html()).toEqual('<span class="is-invalid">email is required.</span>')
  })

  it('Print plain text message', () => {
    expect(inputProps.error("email", true)).toEqual('email is required.')
  })

})

describe('Validation Array with custom messages', () => {

  const Component = getComponent()

  const rendered = mount(<Component/>)

  const formProps = rendered.find(MyForm).first().props()

  formProps.addValue("items", {
    name: ""
  })

  formProps.validate().then(() => {

  }).catch(() => {

  })

  it('Print Messages JSX element', () => {
    expect(shallow(formProps.error("items.0.name")).html()).toEqual('<span class="">Item 0 is required</span>')
  })
  //
  // it('Print Messages JSX element with className', () => {
  //   expect(shallow(rendered.props().error("name", "is-invalid")).html()).toEqual('<span class="is-invalid">The name field is required.</span>')
  // })
  //
  // it('Print plain text message', () => {
  //   expect(rendered.props().error("name", true)).toEqual('The name field is required.')
  // })
  //
  // it('Print Messages JSX element', () => {
  //   expect(shallow(rendered.props().error("email")).html()).toEqual('<span class="">email is required.</span>')
  // })
  //
  // it('Print Messages JSX element with className', () => {
  //   expect(shallow(rendered.props().error("email", "is-invalid")).html()).toEqual('<span class="is-invalid">email is required.</span>')
  // })
  //
  // it('Print plain text message', () => {
  //   expect(rendered.props().error("email", true)).toEqual('email is required.')
  // })

})


describe('Validation Passed', () => {
  const Component = getComponent()
  const rendered = mount(<Component/>)

  const formProps = rendered.find(MyForm).first().props()
  const inputProps = findInputProps(rendered, {name: "name"})


  inputProps.input.onChange({
    target: {
      name: "name",
      type: "text",
      value: "solaiman"
    }
  })

  inputProps.input.onChange({
    target: {
      name: "email",
      type: "text",
      value: "psokmail@gmail.com"
    }
  })

  formProps.validate().then(() => {

  }).catch(() => {

  })

  it('Passes errors object to Input component', () => {
    expect(Object.keys(formProps.errors()).length).toEqual(0)
  })
  it('Passes errors object to Form component', () => {
    expect(Object.keys(inputProps.errors()).length).toEqual(0)
  })

})

it('Validation onBlur Passes', () => {
  const Component = getSyncComponent()
  const rendered = mount(<Component/>)
  const name = "name"
  const inputProps = findInputProps(rendered, {name: "name"})

  inputProps.input.onChange({
    target: {
      name,
      type: "text",
      value: "Solaiman"
    }
  })
  inputProps.input.onBlur({
    target: {
      name,
      type: "text"
    }
  })
  expect(inputProps.error(name, true)).toEqual(null)
})


it('Add an item to array', () => {
  const Component = getComponent()
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

  const Component = getComponent()

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

  const Component = getComponent()

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


it('Rearrange messages after Remove multiple items from array', () => {

  const Component = getComponent()

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

  rendered.props().removeValue(['items.0'])

  expect(rendered.props().error("items.0.name", true)).toEqual('The items.1.name field is required.')

})

it('Rearrange messages after Remove item from array', () => {

  const Component = getComponent()

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

  const Component = getComponent()

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

  const Component = getComponent()

  const rendered = mount(<Component/>)
  const formProps = rendered.find(MyForm).first().props()
  const inputProps = findInputProps(rendered, {name: "name"})

  inputProps.input.onChange({
    target: {
      name: "name",
      type: "text",
      value: ""
    }
  })

  inputProps.input.onChange({
    target: {
      name: "email",
      type: "text",
      value: "psokmail@gmail.com"
    }
  })

  inputProps.addValue('items', {
    name: "solaiman"
  })

  inputProps.addValue('items', {
    name: ""
  })

  formProps.validate().then(() => {

  }).catch(() => {

  })

  it('Direct field is invalid', () => {
    expect(formProps.hasError('name')).toBe(true)
  })

  it('direct field is valid', () => {
    expect(formProps.hasError('email')).toBe(false)
  })

  it('Deep Field is invalid', () => {
    expect(formProps.hasError('items.1.name')).toBe(true)
  })

  it('Deep Field is valid', () => {
    expect(formProps.hasError('items.0.name')).toBe(false)
  })

  it('Return a string on invalid  ', () => {
    expect(formProps.hasError('items.1.name', 'is-invalid')).toBe('is-invalid')
  })

  it('Return a string on valid  ', () => {
    expect(formProps.hasError('items.0.name', 'is-invalid', 'is-valid')).toBe('is-valid')
  })

})

describe('setValues', () => {
  const Component = getComponent()
  const rendered = mount(<Component/>)

  const formProps = rendered.find(MyForm).first().props()
  const inputProps = findInputProps(rendered, {name: "name"}).input

  inputProps.onChange({
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
  }

  formProps.setValues(values)

  it('Return all values', () => {
    expect(formProps.values()).toEqual(values)
  })

  it('Return single value', () => {
    expect(formProps.value('name')).toEqual(values.name)
  })

  it('Return array', () => {
    expect(formProps.value('items')).toEqual(values.items)
  })

  it('Return default value', () => {
    expect(formProps.value('age', 28)).toEqual(28)
  })

})

describe('Reset', () => {

  const Component = getComponent()
  const rendered = mount(<Component/>)

  const formProps = rendered.find(MyForm).first().props()
  const inputProps = findInputProps(rendered, {name: "name"}).input
  inputProps.onChange({
    target: {
      name: "name",
      type: "text",
      value: "123"
    }
  })

  formProps.reset()

  it('Return all values', () => {
    expect(formProps.submitted).toBe(false)
    expect(formProps.submitting).toBe(false)
  })
})