import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import Homepage from './pages/homepage';
import Profile from './pages/profile';
import JobFeed from './Student/JobFeed'
import JobDetails from './Student/JobDetails';
import AddJob from './Admin/addJob'
import { createMuiTheme, ThemeProvider } from "@material-ui/core";

import reportWebVitals from './reportWebVitals';
import StudentRegistration from './Student/Register/studentRegistration';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#4E51CE',
      contrastText: '#fff',
    },
    secondary: {
      main: '#faa146',
      contrastText: '#000',
    },
  },
  //fontFamily: Roboto // as an aside, highly recommend importing roboto font for Material UI projects! Looks really nice
});

ReactDOM.render(
  <ThemeProvider theme={theme}>
    <App />
  </ThemeProvider>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
