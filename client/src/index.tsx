import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { App } from './components/App';
import './normalize.css';
import { store } from './store';

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter basename='/'>
      <Provider store={store}>
        <App />
      </Provider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);
