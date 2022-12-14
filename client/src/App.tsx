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
  function RequireAuth({ children }: Props) {
    // TODO get currentUser auth from server
    const currentUser = false;
    return currentUser ? children : <Navigate to="/login" />;
  }


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
          <Route path='login' element={<Login />} />
          <Route path="*" element={<NoPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
