import { createContext, useState } from 'react';

export const UserContext = createContext();

export function UserContextProvider({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(null);
  const [userData, setUserData] = useState({
    id: 1,
    userId: 1,
    displayName: 'Name',
    profilePic: './images/icons/avatar.png',
    provider: 'google',
    email: 'example@gmail.com',
    emailVerified: true,
  });

  async function httpIsAuthenticated() {
    try {
      const response = await fetch('/api/auth/authenticated');
      const data = await response.json();

      setIsAuthenticated(data.isAuthenticated);
      httpGetUserData(data.userId);
    } catch (err) {
      console.error(err);
    }
  }

  async function httpGetUserData(userID) {
    try {
      const response = await fetch('/api/auth/google/user/' + userID);
      console.log('link is: ', '/api/auth/google/user/' + userID);
      const data = await response.json();

      setUserData(data[0]);
    } catch (err) {
      console.error(err);
    }
  }

  const value = { isAuthenticated, setIsAuthenticated, userData, setUserData, httpIsAuthenticated, httpGetUserData };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
}
