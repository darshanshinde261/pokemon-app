import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { Provider } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";
import App from './App';
import { store } from './redux/store';
import reportWebVitals from './reportWebVitals';
import { FavoritesProvider } from "./contexts/FavoritesContext";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <FavoritesProvider>
      <Router>
        <App />
      </Router>
    </FavoritesProvider>
  </Provider>
);

reportWebVitals();
