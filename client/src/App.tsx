import { useContext, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

import './app.css';
import LoadingSpinner from './components/LoadingSpinner/LoadingSpinner';
import { UserContext } from './contexts/UserContext';
import Home from './pages/Home/Home';
import Login from './pages/Login/Login';
import NoPage from './pages/NoPage/NoPage';
import Profile from './pages/Profile/Profile';
import Register from './pages/Register/Register';
import EditProfile from './pages/EditProfile/EditProfile';

interface Props {
  children: JSX.Element;
}

function App() {
  // const { isAuthenticated, httpIsAuthenticated } = useContext(UserContext);

  // useEffect(() => {
  //   httpIsAuthenticated();
  // }, []);

  const isAuthenticated: any = true; // TODO: remove this when in production!

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
