import { useContext, useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

import './app.css';
import { UserContext } from './contexts/UserContext';
import EditProfile from './pages/EditProfile/EditProfile';
import Home from './pages/Home/Home';
import Login from './pages/Login/Login';
import NoPage from './pages/NoPage/NoPage';
import Profile from './pages/Profile/Profile';
import Register from './pages/Register/Register';

interface Props {
  children: JSX.Element;
}

// export interface iUserData {
//   id: number;
//   userId: string;
//   displayName: string;
//   profilePic: string | undefined;
//   provider: string;
//   email: string;
//   emailVerified: boolean;
// }

function App() {
  // To DO: Create context for these global values
  // const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  // const [userData, setUserData] = useState<any>({
  //   id: 1,
  //   userId: 1,
  //   displayName: 'Name',
  //   profilePic: '../images/dummypics/cat.png',
  //   provider: 'google',
  //   email: 'haha@gmail.com',
  //   emailVerified: true,
  // });

  const { isAuthenticated, setIsAuthenticated, userData, setUserData } = useContext(UserContext);

  useEffect(() => {
    async function HTTPisAuthenticated() {
      try {
        const response = await fetch('/api/auth/authenticated');
        const data = await response.json();

        setIsAuthenticated(data.isAuthenticated);
        HttpGetUserData(data.userId);
      } catch (err) {
        console.error(err);
      }
    }

    async function HttpGetUserData(userID: any) {
      try {
        const response = await fetch('/api/auth/google/user/' + userID);
        console.log('link is: ', '/api/auth/google/user/' + userID);
        const data = await response.json();

        setUserData(data[0]);
      } catch (err) {
        console.error(err);
      }
    }

    HTTPisAuthenticated();
  }, []);

  console.log('bara userData', userData);

  // const isAuthenticated: any = true; // TODO: remove this when in production!

  function RequireAuth({ children }: Props) {
    console.log('Current user is: ', isAuthenticated);
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
    //TODO: add loading spinner
    return <>Loading...</>;
  }
}

export default App;
