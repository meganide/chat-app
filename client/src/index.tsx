import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { SocketContextProvider } from './contexts/SocketContext';
import { UserContextProvider } from './contexts/UserContext';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <React.StrictMode>
    <UserContextProvider>
      <SocketContextProvider>
        <App />
      </SocketContextProvider>
    </UserContextProvider>
  </React.StrictMode>
);
