import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import './index.scss';
import App from './App';
import { configureStore, ProviderWrapper } from '@/redux/root';

const { store } = configureStore({});

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <ProviderWrapper store={store}>
        <App />
      </ProviderWrapper>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);
