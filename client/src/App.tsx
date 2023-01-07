import { useContext, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import io from 'socket.io-client';

import './app.css';
import LoadingSpinner from './components/LoadingSpinner/LoadingSpinner';
import { IUserContext, UserContext } from './contexts/UserContext';
import Home from './pages/Home/Home';
import Login from './pages/Login/Login';
import NoPage from './pages/NoPage/NoPage';
import Profile from './pages/Profile/Profile';
import Register from './pages/Register/Register';
import EditProfile from './pages/EditProfile/EditProfile';
import { ISocketContext, SocketContext } from './contexts/SocketContext';

interface Props {
  children: JSX.Element;
}

function App() {
  const { isAuthenticated, httpIsAuthenticated, userData } = useContext(UserContext) as IUserContext;
  const { isConnected, setIsConnected, setSocket, socket } = useContext(SocketContext) as ISocketContext;

  useEffect(() => {
    httpIsAuthenticated();
  }, []);

  // const isAuthenticated: any = true; // TODO: remove this when in production!

  useEffect(() => {
    function initializeSocket() {
      const newSocket = io('/');
      setSocket(newSocket);

      return () => {
        newSocket.close();
      };
    }

    return initializeSocket();
  }, [setSocket]);

  useEffect(() => {
    function connectSocket() {
      if (socket) {
        socket.on('connect', () => {
          console.log('connected as...', socket.id);
          setIsConnected(true);
        });

        socket.on('disconnect', () => {
          setIsConnected(false);
        });

        return () => {
          socket.off('connect');
          socket.off('disconnect');
        };
      }
    }

    return connectSocket();
  }, [socket]);

  useEffect(() => {
    isConnected && socket.emit('add_online_user', userData.displayName);
  }, [isConnected])

  function RequireAuth({ children }: Props) {
    return isAuthenticated ? children : <Navigate to="/login" />;
  }

  if (isAuthenticated === true || isAuthenticated === false) {
    return (
      <div className="App">
        <BrowserRouter>
          <Routes>
            <Route path="/">
              <Route path="register" element={<Register />} />
              <Route
                index
                element={
                  <RequireAuth>
                    <Home />
                  </RequireAuth>
                }
              />
            </Route>
            <Route path="login" element={<Login />} />
            <Route path="profile">
              <Route
                index
                element={
                  <RequireAuth>
                    <Profile />
                  </RequireAuth>
                }
              />
              <Route
                path="edit"
                element={
                  <RequireAuth>
                    <EditProfile />
                  </RequireAuth>
                }
              />
            </Route>
            <Route path="*" element={<NoPage />} />
          </Routes>
        </BrowserRouter>
      </div>
    );
  } else {
    return <LoadingSpinner />;
  }
}

export default App;
