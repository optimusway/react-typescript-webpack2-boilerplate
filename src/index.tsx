import * as React from 'react';
import { render } from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import { App } from './containers/App/index';

const renderApp = (App: any) => render(
  <AppContainer>
    <App />
  </AppContainer>,
  document.getElementById('root'),
);

renderApp(App);

if (module.hot) {
  module.hot.accept('./containers/App', () => {
    const newApp = require('./containers/App').default;
    renderApp(newApp);
  });
}
