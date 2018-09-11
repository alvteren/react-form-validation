import React, { Component } from 'react';

export default class FormGroup extends Component {
  render() {
    const { children, label, error } = this.props;
    return (
      <div className="form-group">
        <label>
          <div> {label} </div>
          {children}
        </label>
        {!!error && <div> {error} </div>}
      </div>
    );
  }
}
