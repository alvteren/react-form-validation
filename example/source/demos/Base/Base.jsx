import './Base.scss';

import React, { PureComponent } from 'react';

import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

import Checkbox from '../../components/UI/Checkbox';
import Form from '../../components/UI/Form';
import TextField from '../../components/UI/TextField';

export default class Base extends PureComponent {
  state = {
    username: '',
    password: '',
    confirm: '',
    accept: false,
    showEmail: false,
    email: '',
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

  addError = () => {
    this.validator.addError({
      name: 'username',
      error: 'This username is already in use'
    });
  };

  removeError = () => {
    this.validator.removeError('username');
  };

  render() {
    const { username, password, confirm, accept, showEmail, email, errors } = this.state;

    return (
      <Paper className="base">
        <Typography variant="headline" align="center">
          Sign In
        </Typography>
        <Form
          onSubmit={this.onSubmit}
          onErrorsChange={this.onErrorsChange}
          ref={validator => (this.validator = validator)}
        >
          <TextField
            name="username"
            label="Username *"
            value={username}
            onChange={this.onChange}
            validate="required|between:6,20"
            error={errors.username}
            margin="normal"
            fullWidth
          />
          <TextField
            type="password"
            name="password"
            label="Password *"
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
            label="Confirm password *"
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
          <Checkbox
            name="showEmail"
            label="Add E-Mail address"
            value={showEmail}
            onChange={this.onChange}
          />
          {showEmail && (
            <TextField
              name="email"
              label="E-Mail *"
              value={email}
              onChange={this.onChange}
              validate="required|email"
              error={errors.email}
              margin="dense"
              fullWidth
            />
          )}
          <Button
            className="base__submit"
            type="submit"
            color="primary"
            variant="contained"
            fullWidth
          >
            Submit
          </Button>
          <Button
            className="base__submit"
            type="button"
            color="secondary"
            onClick={this.addError}
            fullWidth
          >
            Add error to username
          </Button>
          <Button type="button" color="secondary" onClick={this.removeError} fullWidth>
            Remove error from username
          </Button>
        </Form>
      </Paper>
    );
  }
}
