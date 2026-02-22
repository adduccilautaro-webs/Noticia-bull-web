import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import Parse from 'parse';

// --- CONEXIÓN A BACK4APP ---
// Tus claves de Back4app (¡cámbialas por las tuyas!)
Parse.initialize('AjKHqv4GNRQgypSK4iaubgqvDMlZGxuMIvWPqSO3', '3YwB1LwUr8wSzVBOS0Tj2zY5WTJ44dF9akREb8S8');
Parse.serverURL = 'https://parseapi.back4app.com/';
// ---------------------------

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
      <App />
        </React.StrictMode>
        );