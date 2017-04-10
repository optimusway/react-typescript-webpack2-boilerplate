import * as React from 'react';
import { render } from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import { App } from './containers/App/index';

const renderApp = (app: any) => render(
  <AppContainer>
    {app}
  </AppContainer>,
  document.getElementById('root'),
);

renderApp(<App />);

if (module.hot) {
  module.hot.accept('./containers/App', () => {
    const newApp = require('./containers/App').default;
    renderApp(React.createElement(newApp));
  });
}
