import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import FormControlLabel from '@material-ui/core/FormControlLabel';
import MaterialCheckbox from '@material-ui/core/Checkbox';

import Validatable from '../../HOC/Validatable';

@Validatable
class Checkbox extends Component {
  static propTypes = {
    className: PropTypes.string,
    invalid: PropTypes.bool,
    label: PropTypes.string,
    value: PropTypes.bool
  };

  render() {
    const { className, invalid, label, value, ...props } = this.props;
    return (
      <FormControlLabel
        className={classNames(className, 'checkbox', { checkbox_invalid: invalid })}
        control={<MaterialCheckbox checked={value} color="primary" {...props} />}
        label={label}
      />
    );
  }
}

Checkbox.muiName = 'FormControlLabel';

export default Checkbox;
