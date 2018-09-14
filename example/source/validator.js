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
  },
  confirms: (name, value, values, target) => {
    if (value !== values[target]) {
      return 'Passwords must match';
    }
    return null;
  },
  email: (name, value) => {
    if (!/^.+@.+\..+$/.test(value)) {
      return 'Invalid E-Mail address';
    }
    return null;
  }
};

export default createValidator(rules);
