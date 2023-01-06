import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { ChannelContextProvider } from './contexts/ChannelContext';
import { SocketContextProvider } from './contexts/SocketContext';
import { UserContextProvider } from './contexts/UserContext';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <React.StrictMode>
    <UserContextProvider>
      <SocketContextProvider>
        <ChannelContextProvider>
        <App />
        </ChannelContextProvider>
      </SocketContextProvider>
    </UserContextProvider>
  </React.StrictMode>
);
