import { createValidator } from 're-validate';

const rules = {
  required: (name, value, values, checkbox) => {
    if (checkbox ? !value : !`${value}`.length) {
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

export default createValidator(rules);
