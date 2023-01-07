import { createContext, ReactElement, useState } from 'react';

export interface IUserContext {
  isAuthenticated: boolean | null;
  setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean | null>>;
  userData: iUserData;
  setUserData: React.Dispatch<React.SetStateAction<iUserData>>;
  httpIsAuthenticated(): Promise<void>;
  httpGetUserData(userID: string): Promise<void>;
}

interface iUserData {
  id: number;
  userId: number;
  displayName: string;
  profilePic: string;
  provider: string;
  email: string;
  emailVerified: boolean;
  bio: string;
}

interface iProps {
  children: ReactElement;
}

export const UserContext = createContext<IUserContext | undefined>(undefined);

export function UserContextProvider({ children }: iProps): ReactElement {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

  const initialUserData: iUserData = {
    id: 1,
    userId: 1,
    displayName: 'Name',
    profilePic: './images/icons/avatar.png',
    provider: 'google',
    email: 'example@gmail.com',
    emailVerified: true,
    bio: 'No bio assigned yet...',
  };
  const [userData, setUserData] = useState(initialUserData);

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

  async function httpGetUserData(userID: string) {
    try {
      const response = await fetch('/api/auth/google/user/' + userID);

      const data = await response.json();
      setUserData(data[0]);
    } catch (err) {
      console.error(err);
    }
  }

  

  const value = {
    isAuthenticated,
    setIsAuthenticated,
    userData,
    setUserData,
    httpIsAuthenticated,
    httpGetUserData,
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
}
