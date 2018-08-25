import React from 'react';

export default class Form extends React.PureComponent {
  onSubmit = event => {
    event.preventDefault();
    this.props.onSubmit(event);
  };

  render() {
    const { children, ...props } = this.props;
    delete props.onSubmit;

    return (
      <form {...props} onSubmit={this.onSubmit}>
        {children}
      </form>
    );
  }
}
