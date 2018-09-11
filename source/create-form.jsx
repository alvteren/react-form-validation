import React, { Component } from 'react';
import PropTypes from 'prop-types';
import parseEvent from './parse-event';

export default validator =>
  class Form extends Component {
    static propTypes = {
      children: PropTypes.any,
      onErrorsChange: PropTypes.func,
      onSubmit: PropTypes.func.isRequired
    };

    static defaultProps = {
      onErrorsChange: () => {}
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

    onValidatorChange = event => {
      const { name, value } = parseEvent(event);
      this.setState(prevState => ({
        values: {
          ...prevState.values,
          [name]: value
        }
      }));
    };

    onValidatorMount = ({ name, value, validate }) => {
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

    onValidatorUnmount = name => {
      this.setState(prevState => {
        const { ...values } = prevState.values;
        const { ...errors } = prevState.errors;
        const { ...validations } = prevState.validations;

        delete values[name];
        delete errors[name];
        delete validations[name];

        return { values, errors };
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

    renderChildren = children => {
      const elements = Array.isArray(children) ? children : [children];
      return React.Children.map(elements, element => {
        if (element && element.props && element.props.validate) {
          return React.cloneElement(element, {
            _onValidate: this.onValidate,
            _onValidatorChange: this.onValidatorChange,
            _onValidatorMount: this.onValidatorMount,
            _onValidatorUnmount: this.onValidatorUnmount,
            _values: this.state.values
          });
        } else if (element && element.props && element.props.children) {
          return React.cloneElement(element, {}, this.renderChildren(element.props.children));
        }
        return element;
      });
    };

    render() {
      //eslint-disable-next-line
      const { children, onErrorsChange, onSubmit, ...props } = this.props;

      return (
        <form onSubmit={this.onSubmit} {...props}>
          {this.renderChildren(children)}
        </form>
      );
    }
  };
