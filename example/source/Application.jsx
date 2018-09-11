import './Application.scss';

import React, { Component } from 'react';

import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

import Checkbox from './components/UI/Checkbox';
import Form from './components/UI/Form';
import TextField from './components/UI/TextField';

export default class Application extends Component {
  state = {
    name: '',
    password: '',
    confirm: '',
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
    const { name, password, confirm, accept, errors } = this.state;

    return (
      <Paper className="application">
        <Typography variant="headline" align="center">
          Sign In
        </Typography>
        <Form onSubmit={this.onSubmit} onErrorsChange={this.onErrorsChange}>
          <TextField
            name="name"
            label="Name"
            value={name}
            onChange={this.onChange}
            validate="required"
            error={errors.name}
            margin="normal"
            fullWidth
          />
          <TextField
            type="password"
            name="password"
            label="Password"
            value={password}
            onChange={this.onChange}
            validate="required|min:8"
            error={errors.password}
            autoComplete="new-password"
            margin="normal"
            fullWidth
          />
          <TextField
            type="password"
            name="confirm"
            label="Confirm password"
            value={confirm}
            onChange={this.onChange}
            validate="required|confirms:password"
            error={errors.confirm}
            autoComplete="new-password"
            margin="normal"
            fullWidth
          />
          <Checkbox
            name="accept"
            label="I accept the terms in the license agreement"
            value={accept}
            onChange={this.onChange}
            validate="required:true"
            invalid={!!errors.accept}
          />
          <Button
            className="application__submit"
            type="submit"
            color="primary"
            variant="contained"
            fullWidth
          >
            Submit
          </Button>
        </Form>
      </Paper>
    );
  }
}
