import * as React from 'react';
import { render } from 'react-dom';
import { Counter } from './components/Counter/index';
import { App } from './containers/App/index';

render(
  <App>
    <Counter />
  </App>,
  document.getElementById('root'),
);
