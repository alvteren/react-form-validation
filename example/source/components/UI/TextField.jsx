import React, { Component } from 'react';
import PropTypes from 'prop-types';

import MaterialTextField from '@material-ui/core/TextField';

import Validatable from '../HOC/Validatable';

@Validatable
class TextField extends Component {
  static propTypes = {
    error: PropTypes.string
  };

  static defaultProps = {
    error: null
  };

  render() {
    const { error, ...props } = this.props;
    return <MaterialTextField error={!!error} helperText={error} {...props} />;
  }
}

TextField.muiName = 'TextField';

export default TextField;
