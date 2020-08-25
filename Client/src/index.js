import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import './assets/css/fonts.css'
import App from './App/App';
import * as serviceWorker from './serviceWorker';

import history from './utils/history';

import { BrowserRouter } from 'react-router-dom';

import Amplify, { Auth } from 'aws-amplify';

Amplify.configure({
  Auth: {

      // REQUIRED only for Federated Authentication - Amazon Cognito Identity Pool ID
      identityPoolId: 'us-east-2_86ZemgUAF',

      // REQUIRED - Amazon Cognito Region
      region: 'us-east-2',

      // OPTIONAL - Amazon Cognito Web Client ID (26-char alphanumeric string)
      userPoolWebClientId: 'aluu9k2i3cb48f29sub579fpk',

  }
});


const onRedirectCallback = appState => {
  history.push(
    appState && appState.targetUrl
      ? appState.targetUrl
      : window.location.pathname
  );
};

ReactDOM.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
