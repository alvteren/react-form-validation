import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Provider } from './context';
import parseEvent from './parse-event';

export default () =>
  class Form extends Component {
    static propTypes = {
      children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]).isRequired,
      onErrorsChange: PropTypes.func,
      onSubmit: PropTypes.func.isRequired
    };

    static defaultProps = {
      onErrorsChange: function() {}
    };

    inputs = {};
    values = {};
    errors = {};
    validators = {};

    constructor(props) {
      super(props);
      this.contextValue = {
        createInput: this.createInput,
        deleteInput: this.deleteInput,
        onChange: this.onChange,
        onBlur: this.onBlur
      };
    }

    onValidate = ({ name, error }) => {
      this.errors[name] = error;
      this.props.onErrorsChange(this.errors);
    };

    onBlur = name => {
      const { values } = this;
      this.validators[name](values[name], values).then(this.onValidate);
    };

    onChange = (event, isBlured) => {
      const { name, value } = parseEvent(event);
      this.values[name] = value;
      if (isBlured) {
        this.validators[name](value, this.values).then(this.onValidate);
      }
    };

    createInput = input => {
      const { name, value, validator } = input;
      this.values[name] = value;
      this.errors[name] = null;
      this.validators[name] = validator;
      this.inputs[name] = input;
    };

    deleteInput = name => {
      delete this.values[name];
      delete this.errors[name];
      delete this.validators[name];
      delete this.inputs[name];
    };

    onSubmit = event => {
      event.preventDefault();
      const { values } = this;
      const promises = [];
      Object.keys(values).forEach(name => {
        promises.push(this.validators[name](values[name], values));
        this.inputs[name].touch();
      });
      Promise.all(promises).then(results => {
        const errors = {};
        results.forEach(result => {
          errors[result.name] = result.error;
        });
        this.errors = errors;
        this.props.onErrorsChange(errors);

        if (results.every(result => !result.error)) {
          this.props.onSubmit(event);
        }
      });
    };

    render() {
      //eslint-disable-next-line
      const { children, onErrorsChange, onSubmit, ...props } = this.props;

      return (
        <form onSubmit={this.onSubmit} {...props}>
          <Provider value={this.contextValue}>{children}</Provider>
        </form>
      );
    }
  };
