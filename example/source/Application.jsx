import React, { Component } from 'react';
import Form from './components/UI/Form';
import FormGroup from './components/UI/FormGroup';
import Input from './components/UI/Input';
import Checkbox from './components/UI/Checkbox';

export default class Application extends Component {
  state = {
    name: '',
    password: '',
    accept: false,
    errors: {}
  };

  onChange = event => {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  };

  onErrorsChange = errors => {
    this.setState({ errors });
  };

  onSubmit = () => {
    console.log('OK');
  };

  render() {
    const { name, password, accept, errors } = this.state;

    return (
      <div className="container">
        <Form onSubmit={this.onSubmit} onErrorsChange={this.onErrorsChange} autoComplete="false">
          <input autoComplete="false" name="hidden" type="text" style={{ display: 'none' }} />
          <FormGroup label="Name" error={errors.name}>
            <Input
              name="name"
              value={name}
              onChange={this.onChange}
              validate="required"
              autoComplete="off"
            />
          </FormGroup>
          <FormGroup label="Password" error={errors.password}>
            <Input
              type="password"
              name="password"
              value={password}
              onChange={this.onChange}
              validate="required|min:8"
              autoComplete="new-password"
            />
          </FormGroup>
          <Checkbox
            label="I accept the terms..."
            name="accept"
            value={accept}
            onChange={this.onChange}
            validate="required|min:8"
            invalid={!!errors.accept}
          />
          <button type="submit" className="btn btn-primary">
            {' '}
            Submit{' '}
          </button>
        </Form>
      </div>
    );
  }
}
