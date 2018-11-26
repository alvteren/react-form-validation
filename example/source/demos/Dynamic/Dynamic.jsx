import './Dynamic.scss';

import React, { PureComponent } from 'react';

import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

import Checkbox from '../../components/UI/Checkbox';
import Form from '../../components/UI/Form';
import TextField from '../../components/UI/TextField';

export default class Dynamic extends PureComponent {
  state = {
    username: '',
    isLimited: false,
    email: '',
    isRequired: true,
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
    const { username, isLimited, email, isRequired, errors } = this.state;

    return (
      <Paper className="dynamic">
        <Typography variant="headline" align="center">
          Dynamic rules
        </Typography>
        <Form onSubmit={this.onSubmit} onErrorsChange={this.onErrorsChange}>
          <TextField
            name="username"
            label="Username *"
            value={username}
            onChange={this.onChange}
            validate={`required${isLimited ? '|max:8' : ''}`}
            error={errors.username}
            margin="dense"
            fullWidth
          />
          <Checkbox
            name="isLimited"
            label="Limit username length by 8 characters"
            value={isLimited}
            onChange={this.onChange}
          />
          <TextField
            name="email"
            label={isRequired ? 'E-Mail *' : 'E-Mail'}
            value={email}
            onChange={this.onChange}
            validate={isRequired ? 'required|email' : null}
            error={errors.email}
            margin="dense"
            fullWidth
          />
          <Checkbox
            name="isRequired"
            label="Require email"
            value={isRequired}
            onChange={this.onChange}
          />
          <Button
            className="dynamic__submit"
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
