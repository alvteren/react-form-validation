# react-form-validation
Yet another form validation library for React ಠ_ಠ

[DEMO](https://feerzlay.github.io/react-form-validation/)

## Usage

Define your rules and create validator:
```javascript
import { createValidator } from 'react-form-validation';

const rules = {
  required: (name, value, values, checkbox) => {
    if (checkbox ? !value : !value.length) {
      return 'Can\'t be empty';
    }
    return null;
  },
  min: (name, value, values, min) => {
    if (value.length < min) {
      return `Must be at least ${min} characters long`;
    }
    return null;
  }
};

const validator = createValidator(rules);
```

Create Validatable HOC:
```javascript
import { createValidatable } from 'react-form-validation';
const Validatable = createValidatable(validator);
```

Wrap your inputs with Validatable HOC. Note that input should make use of `name`, `value`, `onChange`, `onBlur` props.
```javascript
const Input = Validatable(props => <input {...props} />);
```

Create Form component:
```javascript
import { createForm } from 'react-form-validation';
const Form = createForm(validator);
```

Now you have everything you need:
```javascript
class Page extends React.Component {
  state = {
    name: '',
    password: '',
    errors: {}
  };

  onChange = event => {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  };

  onErrorsChange = errors => {
    this.setState({ errors });
  };

  onSubmit = () => {
    console.log('No validation errors');
  };

  render() {
    const { name, password, errors } = this.state;

    return (
      <Form onSubmit={this.onSubmit} onErrorsChange={this.onErrorsChange}>
        <Input
          name="name"
          value={name}
          onChange={this.onChange}
          validate="required"
        />
        <div> {errors.name} </div>
        <div>
          { /* Inputs can be nested into another elements */ }
          <Input
            type="password"
            name="password"
            value={password}
            onChange={this.onChange}
            validate="required|min:8"
          />
          <div> {errors.password} </div>
        </div>
      </Form>
    );
  }
}
```
