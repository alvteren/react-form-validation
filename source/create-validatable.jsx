import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default validator => WrappedComponent =>
  class extends Component {
    static displayName = `Validatable(${WrappedComponent.displayName || WrappedComponent.name})`;

    static propTypes = {
      _onValidate: PropTypes.func,
      _onValidatorChange: PropTypes.func,
      _onValidatorMount: PropTypes.func,
      _onValidatorUnmount: PropTypes.func,
      _values: PropTypes.object,
      name: PropTypes.string,
      validate: PropTypes.string,
      value: PropTypes.any.isRequired
    };

    static defaultProps = {
      _onValidatorChange: () => {},
      _onValidatorMount: () => {},
      _onValidatorUnmount: () => {},
      _values: {}
    };

    state = {
      isTouched: false
    };

    componentDidMount() {
      const { _onValidatorMount, name, value, validate } = this.props;
      _onValidatorMount({ name, value, validate });
    }

    componentWillUnmount() {
      const { _onValidatorUnmount, name } = this.props;
      _onValidatorUnmount(name);
    }

    componentDidUpdate(prevProps) {
      const { _onValidatorChange, name, value } = this.props;
      if (prevProps.value !== value) {
        _onValidatorChange({ target: { name, value } });
      }
    }

    onValidatorBlur = event => {
      const { isTouched } = this.state;
      const { onBlur, _onValidate, validate } = this.props;
      if (onBlur) {
        onBlur(event);
      }
      if (isTouched && validate) {
        this.validate().then(result => _onValidate(result));
      }
    };

    onValidatorChange = event => {
      if (this.props.onChange) {
        this.props.onChange(event);
      }
      this.props._onValidatorChange(event);
      if (!this.state.isTouched) {
        this.setState({ isTouched: true });
      }
    };

    validate = () => {
      const { isTouched } = this.state;
      const { name, value, _values, validate } = this.props;

      return new Promise(resolve => {
        if (validate) {
          if (!isTouched) {
            this.setState({ isTouched: true });
          }
          validator(name, validate, value, _values).then(error => resolve(error));
        } else {
          resolve({ name, error: null });
        }
      });
    };

    render() {
      /* eslint-disable */
      const {
        _onValidate,
        _onValidatorChange,
        _onValidatorMount,
        _onValidatorUnmount,
        _values,
        ...props
      } = this.props;
      /* eslint-enable */

      return (
        <WrappedComponent
          {...props}
          onChange={this.onValidatorChange}
          onBlur={this.onValidatorBlur}
        />
      );
    }
  };
