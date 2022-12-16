import { createContext, useState } from 'react';

export const UserContext = createContext();

export function UserContextProvider({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(null);
  const [userData, setUserData] = useState({
    id: 1,
    userId: 1,
    displayName: 'Name',
    profilePic: '../images/dummypics/cat.png',
    provider: 'google',
    email: 'haha@gmail.com',
    emailVerified: true,
  });

  const value = { isAuthenticated, setIsAuthenticated, userData, setUserData };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
}
