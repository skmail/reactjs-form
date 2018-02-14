## `<Input/>` Component 

---

 the Form Decorator passes `inputComponent`
 prop to your form component in order to use
 the minimal code to render your inputs, 
 [Input Props](#props)
 
 ### Example
 ---
 ```js
render() {
    const {
      inputComponent:Input,    
    } = this.props
    return (
      <Input
        name="email"
        email="email"
        label="Email Address"
        component={TextInput} 
      />
    )
  }
```

### TextInput
---
```js
import React from 'react'
export default ({hasError, error, input:{label, ...input}}) => (
  <div className="field">
    <label className="label">{label}</label>
    <input
      className={`input ${hasError(input.name, "is-danger", "")}`}
      {...input} />
    {error(input.name, "help is-danger")}
  </div>
)
```


### Props
---

**input**  

 it contains the html input props like onChange, onBlur, value and name,
  moreover it contains the props passed to the Input component, Invalid DOM props must be destructed

```js
({input:{InvalidDomProps, ...input}}) => <input {...input} />
```

---

**hasError : `(name, name, stringToReturnOnInvalid = false, stringToReturnOnValid = false)`**

it checks if the input name is valid or not , 
by default it returns `boolean` but can you force it to return a 
provided string on invalid(second parameter) or valid(third parameter), 
this useful if you want to return className for input state without using if statements 

---

**error: `(name, classNameOrPlain = false)`**

it return the error message `<span>{error}</span>` ,
if not exists it returns null, 
these are valid react elements to avoid hasError check with JSX markup, 
passing `true` to the second parameter will return `string` messages instead of react element, 
also pass the second parameter a string value will add a className to the message Element

---

**value: `(name, defaultValue = "")`**

returns a value of giving input name
 
 
---
  

** values: `()` **

returns form values object

---
  
** setValue: `(name, value)` **

set input value

---

** setValues: `(values)` **

replace form values

---

** validate : `()` **

Validate the values

---

** addValue: `(arrayInputName, value)` **

add element to array input

---

** removeValue: `(name)` **

remove an element from array input, name must be dot notation  `removeValue(arrayInputName.${itemIndex})`

---

** reset: `()` **

Reset the form values

---

** submitting : `bool` ** 

Indicate that validating process is running 

---

** submitted : `bool` **

Indicate that validating process is finished
 
---

** inputComponent : `Input Component` **

Hello! its me 🖐 , you may need it to render some grouped inputs without headache see Array Input example




  