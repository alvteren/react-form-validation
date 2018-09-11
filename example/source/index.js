import React from 'react';
import ReactDOM from 'react-dom';

// Theme
import JssProvider from 'react-jss/lib/JssProvider';
import { create } from 'jss';
import { jssPreset } from '@material-ui/core/styles';

const jss = create({
  ...jssPreset(),
  insertionPoint: document.getElementById('jss-insertion-point')
});

import Application from './Application';
import ErrorBoundary from './ErrorBoundary';

ReactDOM.render(
  <ErrorBoundary>
    <JssProvider jss={jss}>
      <Application />
    </JssProvider>
  </ErrorBoundary>,
  document.getElementById('root')
);
