import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { Provider } from 'react-redux';
import store from './reducers';
import './index.css';
import { PersistGate } from 'redux-persist/integration/react'
import { persistStore } from 'redux-persist'
import { BrowserRouter as Router } from 'react-router-dom';
let persistor = persistStore(store);
ReactDOM.render(
  <Provider store={store} >
    <PersistGate loading={null} persistor={persistor}>

      <Router>
        <App />
      </Router>

    </PersistGate>
  </Provider>
  ,
  document.getElementById('root')
);
