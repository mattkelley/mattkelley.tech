import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import App from './App';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();

// Get master branch commit sha
// curl -s https://api.github.com/repos/mattkelley/mattkelley.tech/branches/master

// Get information about the deployment Job on Travis
// https://api.travis-ci.com/repo/mattkelley%2Fmattkelley.tech/builds
