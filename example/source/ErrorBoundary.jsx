import React from 'react';

export default class ErrorBoundary extends React.PureComponent {
  state = {
    error: null
  };

  componentDidCatch(error) {
    this.setState({ error });
  }

  render() {
    if (this.state.error) {
      return null;
    }
    return this.props.children;
  }
}
