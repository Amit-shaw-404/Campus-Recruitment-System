import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import Homepage from './pages/homepage';
import Profile from './pages/profile';
import JobFeed from './Student/JobFeed';
import AddJob from './Admin/addJob'

import reportWebVitals from './reportWebVitals';

ReactDOM.render(
  <React.StrictMode>
    <AddJob />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
