import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Provider } from './context';
import parseEvent from './parse-event';

export default validator =>
  class Form extends Component {
    static propTypes = {
      children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]).isRequired,
      onErrorsChange: PropTypes.func,
      onSubmit: PropTypes.func.isRequired
    };

    static defaultProps = {
      onErrorsChange: function() {}
    };

    state = {
      values: {},
      errors: {},
      validations: {}
    };

    onValidate = ({ name, error }) => {
      this.setState(
        prevState => ({
          errors: {
            ...prevState.errors,
            [name]: error
          }
        }),
        () => {
          this.props.onErrorsChange(this.state.errors);
        }
      );
    };

    onChange = event => {
      const { name, value } = parseEvent(event);
      this.setState(prevState => ({
        values: {
          ...prevState.values,
          [name]: value
        }
      }));
    };

    createInput = ({ name, value, validate }) => {
      this.setState(prevState => ({
        values: {
          ...prevState.values,
          [name]: value
        },
        errors: {
          ...prevState.errors,
          [name]: null
        },
        validations: {
          ...prevState.validations,
          [name]: validate
        }
      }));
    };

    deleteInput = name => {
      this.setState(prevState => {
        const { ...values } = prevState.values;
        const { ...errors } = prevState.errors;
        const { ...validations } = prevState.validations;

        delete values[name];
        delete errors[name];
        delete validations[name];

        return { values, errors, validations };
      });
    };

    onSubmit = event => {
      event.preventDefault();
      const { values, validations } = this.state;
      const promises = [];
      Object.keys(values).forEach(name => {
        promises.push(validator(name, validations[name], values[name], values));
      });
      Promise.all(promises).then(results => {
        const errors = {};
        results.forEach(result => {
          errors[result.name] = result.error;
        });
        this.setState({ errors });
        this.props.onErrorsChange(errors);

        if (results.every(result => !result.error)) {
          this.props.onSubmit(event);
        }
      });
    };

    getContextValue = () => ({
      createInput: this.createInput,
      deleteInput: this.deleteInput,
      onChange: this.onChange,
      onValidate: this.onValidate,
      values: this.state.values
    });

    render() {
      //eslint-disable-next-line
      const { children, onErrorsChange, onSubmit, ...props } = this.props;

      return (
        <form onSubmit={this.onSubmit} {...props}>
          <Provider value={this.getContextValue()}>{children}</Provider>
        </form>
      );
    }
  };
