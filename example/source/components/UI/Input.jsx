import React, { Component } from 'react';
import Validatable from '../HOC/Validatable';

class Input extends Component {
  render() {
    return <input {...this.props} />;
  }
}

export default Validatable(Input);
