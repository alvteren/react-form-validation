import React from 'react';

const mock = function() {};

export const { Provider, Consumer } = React.createContext({
  createInput: mock,
  deleteInput: mock,
  onChange: mock,
  onBlur: mock,
  onValidate: mock
});
