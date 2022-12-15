import { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

import './app.css';
import Home from './pages/Home/Home';
import Login from './pages/Login/Login';
import NoPage from './pages/NoPage/NoPage';
import Register from './pages/Register/Register';

interface Props {
  children: JSX.Element;
}

function App() {
  // const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

  // useEffect(() => {
  //   async function HTTPisAuthenticated() {
  //     try {
  //       const response = await fetch('/api/auth/authenticated');
  //       const data = await response.json();

  //       setIsAuthenticated(data.isAuthenticated);
  //     } catch (err) {
  //       console.error(err);
  //     }
  //   }

  //   HTTPisAuthenticated();
  // }, []);


  const isAuthenticated = true; // TODO: remove this when in production!

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
            <Route path="*" element={<NoPage />} />
          </Routes>
        </BrowserRouter>
      </div>
    );
  } else { //TODO: add loading spinner
    return <>Loading...</>;
  }
}

export default App;
