<h1 align="center"> react-form-validation </h1>

<div align="center">
  <img src="https://img.shields.io/npm/v/@feerzlay/react-form-validation.svg" alt="Version" />
  <img src="https://img.shields.io/npm/dm/@feerzlay/react-form-validation.svg" alt="Downloads" />
  <img src="https://travis-ci.org/feerzlay/react-form-validation.svg?branch=develop" alt="Build Status" />
  <img src="http://isitmaintained.com/badge/resolution/feerzlay/react-form-validation.svg" alt="Average time to resolve an issue" />
  <img src="http://isitmaintained.com/badge/open/feerzlay/react-form-validation.svg" alt="Percentage of issues still open" />
  <img src="https://img.shields.io/github/license/mashape/apistatus.svg" alt="License" />
</div>

<h3 align="center">
  <a href="https://feerzlay.github.io/react-form-validation/"> Demo </a>
  <span> | </span>
  <a href="https://github.com/feerzlay/react-form-validation/tree/master/example"> Example </a>
</h3>

## Table of Contents
- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
- [License](#license)

## Features
- Simple usage by using higher-order component.
- You define your own validation rules.
- Support for both synchronous and asynchronous validations.
- Automatically validates every input inside a form. Even the ones nested into another component.
- Easy integration with UI frameworks.

## Installation

### npm
```bash
npm install feerzlay/react-form-validation --save
```

### yarn
```bash
yarn add feerzlay/react-form-validation
```

## Usage

### Create a validator
This library does not contain any built-in validation rules. So before creating a validator you need to define you own rules. A rule is a function of following signature - `(name, value, values, ..args)`. This function should return `null` on validation pass, and error message on validation fail. You can also return a `Promise` which resolves to `null` or `String`.

So, you can define your rules like this:
```javascript
const rules = {
  required: (name, value) => {
    if (value.length > 0) return null;
    return '${name} can\'t be empty';
  },
  min: (name, value, values, min) => {
    if (value.length >= min) return null;
    return `${name} must be at least ${min} characters long`;
  }
};
```
Note that `values` agrument contains values of every validatable input inside a form. You can use it to define rules like a password confirmation.

Now you can import a validator creator and pass previously defined rules as an agrument:
```javascript
import { createValidator } from '@feerzlay/react-form-validation';
const validator = createValidator(rules);
```

### Create a higher-order component
This step is pretty simple. Just import a HOC creator and previously created validator as an agrument.
```javascript
import { createValidatable } from '@feerzlay/react-form-validation';
const Validatable = createValidatable(validator);
```

### Wrap your inputs
Wrap your inputs with created higher-order component.
```javascript
const BasicInput = props => <input {...props} />;
const Input = Validatable(BasicInput);
```
Take a note that HOC expects input to recieve `name` and `value` props and emit `onChange` and `onBlur` values.

### Create a `Form` component
For a basic usage you only need to import a form creator function and call it.
```javascript
import { createForm } from '@feerzlay/react-form-validation';
const Form = createForm();
```
This function also accepts an object of options. For now this object have only one entry:
```javascript
{ event: 'onChange' }
```
You can override it to be `onBlur` or just an empty string. If `onBlur` is used, then only form submit and input blur will trigger validation. If empty string is used, then only form submit will trigger validation.

Created component can be used almost as a regular `<form>` tag, but with two differences:
- `onSubmit` event triggered only on successful validation.
- It has an additional `onErrorsChange` event, which you should use to store information about errors and display them to the user.

### Done :tada:
Now when you have form and input components you are ready to start building your forms.
```javascript
<Form onSubmit={...} onErrorsChange={...}>
  <Input
    value={...} onChange={...} name="username"
    validate="required"
  />
  <Input
    value={...} onChange={...} name="password"
    validate="required|min:8"
  />
  <Input
    value={...} onChange={...} name="optional"
  />
</Form>
```
We use `validate` prop do describe which rules must be used for input validation. Individual rules should be separated by `|`. To pass agruments use `:` and then write a list of arguments separated by `,`.

You can also manually add and remove errors from inputs by calling `addError({ name, error })` and `removeError(name)` methods on a form component.

See [example](https://github.com/feerzlay/react-form-validation/tree/master/example) for more usage details.

## License

[MIT](LICENSE) - Denis Yakshov - 2018
