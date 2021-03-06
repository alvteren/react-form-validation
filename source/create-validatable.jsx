import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Consumer } from './context';

export default validator => WrappedComponent => {
  class Validatable extends PureComponent {
    static displayName = `Validatable(${WrappedComponent.displayName || WrappedComponent.name})`;

    static propTypes = {
      context: PropTypes.object,
      name: PropTypes.string,
      validate: PropTypes.string,
      value: PropTypes.any
    };

    state = {
      isTouched: false,
      isBlured: false
    };

    constructor(props) {
      super(props);

      const { name, validate } = props;
      if (validate) {
        this.validator = validator(name, validate);
      }
    }

    componentDidMount() {
      if (this.props.validate) {
        const { context, name, value } = this.props;
        const validator = this.validator;
        context.createInput({
          name,
          value,
          validator,
          touch: () => this.setState({ isTouched: true, isBlured: true })
        });
      }
    }

    componentWillUnmount() {
      if (this.props.validate) {
        const { context, name } = this.props;
        context.deleteInput(name);
      }
    }

    componentDidUpdate(prevProps) {
      const { context, name, validate } = this.props;

      if (validate !== prevProps.validate) {
        context.deleteInput(name);
      }

      if (validate) {
        const { value } = this.props;

        if (validate !== prevProps.validate) {
          this.validator = validator(name, this.props.validate);
          context.createInput({
            name,
            value,
            validator: this.validator,
            touch: () => this.setState({ isTouched: true, isBlured: true })
          });
          context.onChange({ target: { name, value } }, this.state.isBlured);
        } else if (prevProps.value !== value) {
          context.onChange({ target: { name, value } });
        }
      }
    }

    onBlur = event => {
      const { isTouched } = this.state;
      const { name, context, onBlur, validate } = this.props;
      if (onBlur) {
        onBlur(event);
      }
      if (isTouched && validate) {
        if (!this.state.isBlured) {
          this.setState({ isBlured: true });
        }
        context.onBlur(name);
      }
    };

    onChange = event => {
      const { context, validate, onChange } = this.props;
      if (onChange) {
        onChange(event);
      }
      if (validate) {
        if (!this.state.isTouched) {
          this.setState({ isTouched: true });
        }
        context.onChange(event, this.state.isBlured);
      }
    };

    render() {
      /* eslint-disable no-unused-vars */
      const { context, validate, ...props } = this.props;
      /* eslint-enable no-unused-vars */

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
