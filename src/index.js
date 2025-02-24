import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import store from './Components/Store';
import{Provider} from "react-redux"

import { BrowserRouter } from 'react-router-dom';
import { AuthContextProvider } from './Components/Context/Context';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store} >
  <AuthContextProvider>

    <BrowserRouter>
   
      <App />
    </BrowserRouter>
  </AuthContextProvider>
  </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals

