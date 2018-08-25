import React from 'react';
import ReactDOM from 'react-dom';

import Application from './Application';
import ErrorBoundary from './ErrorBoundary';

const root = document.getElementById('root');

ReactDOM.render(
  <ErrorBoundary>
    <Application />
  </ErrorBoundary>,
  root
);
