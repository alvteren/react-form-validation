import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Validatable from '../HOC/Validatable';

class Checkbox extends Component {
  static propTypes = {
    invalid: PropTypes.bool,
    label: PropTypes.string,
    name: PropTypes.string.isRequired,
    value: PropTypes.bool
  };
  render() {
    const { invalid, label, name, value, ...props } = this.props;
    return (
      <div className="form-check">
        <input
          className={classNames('form-check-input', { 'is-invalid': invalid })}
          id={name}
          name={name}
          type="checkbox"
          checked={value}
          {...props}
        />
        <label className="form-check-label" htmlFor={name}>
          {' '}
          {label}{' '}
        </label>
      </div>
    );
  }
}

export default Validatable(Checkbox);
