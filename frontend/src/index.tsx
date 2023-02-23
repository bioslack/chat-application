import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import AuthProvider from './context/AuthProvider';
import SidebarProvider from './context/SidebarProvider';
import ChatProvider from './context/ChatProvider';
import UsersProvider from './context/UsersProvider';

import './scss/main.scss';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <UsersProvider>
          <SidebarProvider>
            <ChatProvider>
              <App />
            </ChatProvider>
          </SidebarProvider>
        </UsersProvider>
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);
