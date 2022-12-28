import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

import { Amplify } from 'aws-amplify';
import awsExports from './aws-exports';
import OIDC_ENV from './oidc-env';

// Append Amplify OAuth Settings w/ OIDC Provider
const {NODE_ENV} = process.env
console.log('RUNNING IN:', NODE_ENV)

const oidcConfiguration = OIDC_ENV[NODE_ENV]
const appendAWSExports = {
  ...awsExports,
  oauth: oidcConfiguration
}
console.log('APPEND AWS EXPORTS:', appendAWSExports)
Amplify.configure(appendAWSExports);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
