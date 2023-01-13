import axios from 'axios';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createTheme, ThemeProvider } from '@mui/material';
import App from './App';
import { store } from './redux/store';
import 'bootstrap/dist/css/bootstrap.min.css';

const theme = createTheme({
  palette: {
    // mode: 'dark',
    primary: {
      main: '#4d603b',
    },
    secondary: { main: '#FFFFFF' },
  },
});

axios.defaults.baseURL = 'http://localhost:3001';
axios.defaults.withCredentials = true;
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <ThemeProvider theme={theme}>
    <BrowserRouter>
      <Provider store={store}>
        <App />
      </Provider>
    </BrowserRouter>
  </ThemeProvider>,
);
