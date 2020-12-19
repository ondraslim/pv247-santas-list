import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import './utils/i18';

import * as serviceWorkerRegistration from './utils//serviceWorkerRegistration';

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

serviceWorkerRegistration.register();