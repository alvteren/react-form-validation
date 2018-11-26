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

import ErrorBoundary from './ErrorBoundary';

import Base from './demos/Base';
import Dynamic from './demos/Dynamic';

ReactDOM.render(
  <ErrorBoundary>
    <JssProvider jss={jss}>
      <>
        <Base />
        <Dynamic />
      </>
    </JssProvider>
  </ErrorBoundary>,
  document.getElementById('root')
);
