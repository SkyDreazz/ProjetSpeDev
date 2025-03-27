import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom'; // Import de React Router
import App from './App.tsx';
import reportWebVitals from './reportWebVitals.js';
import { Cards } from './pages/cards/cards.tsx';
import { User } from './pages/user/user.tsx';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/home" element={<App />} />
        <Route path="/cards" element={<Cards />} />
        <Route path="/user" element={<User />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);

// Si tu veux mesurer les performances de ton app, passe une fonction pour loguer les résultats
reportWebVitals();