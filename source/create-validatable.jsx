import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Consumer } from './context';

export default validator => WrappedComponent => {
  class Validatable extends Component {
    static displayName = `Validatable(${WrappedComponent.displayName || WrappedComponent.name})`;

    static propTypes = {
      context: PropTypes.object,
      name: PropTypes.string,
      validate: PropTypes.string,
      value: PropTypes.any.isRequired
    };

    state = {
      isTouched: false
    };

    componentDidMount() {
      if (this.props.validate) {
        const { context, name, value, validate } = this.props;
        context.createInput({ name, value, validate });
      }
    }

    componentWillUnmount() {
      if (this.props.validate) {
        const { context, name } = this.props;
        context.deleteInput(name);
      }
    }

    componentDidUpdate(prevProps) {
      if (this.props.validate) {
        const { context, name, value } = this.props;
        if (prevProps.value !== value) {
          context.onChange({ target: { name, value } });
        }
      }
    }

    onBlur = event => {
      const { isTouched } = this.state;
      const { context, onBlur, validate } = this.props;
      if (onBlur) {
        onBlur(event);
      }
      if (isTouched && validate) {
        this.validate().then(result => context.onValidate(result));
      }
    };

    onChange = event => {
      const { context, validate, onChange } = this.props;
      if (onChange) {
        onChange(event);
      }
      if (validate) {
        context.onChange(event);
        if (!this.state.isTouched) {
          this.setState({ isTouched: true });
        }
      }
    };

    validate = () => {
      const { isTouched } = this.state;
      const { context, name, value, validate } = this.props;

      return new Promise(resolve => {
        if (validate) {
          if (!isTouched) {
            this.setState({ isTouched: true });
          }
          validator(name, validate, value, context.values).then(error => resolve(error));
        } else {
          resolve({ name, error: null });
        }
      });
    };

    render() {
      // eslint-disable-next-line
      const { context, validate, ...props } = this.props;

      return <WrappedComponent {...props} onChange={this.onChange} onBlur={this.onBlur} />;
    }
  }

  const WithContext = props => (
    <Consumer>{context => <Validatable context={context} {...props} />}</Consumer>
  );
  WithContext.displayName = `WithContext(Validatable(${WrappedComponent.displayName ||
    WrappedComponent.name}))`;

  return WithContext;
};
