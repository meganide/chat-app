import { createContext, ReactElement, useState } from 'react';

export interface ISocketContext {
  isConnected: boolean | null;
  setIsConnected: React.Dispatch<React.SetStateAction<boolean>>;
  socket: any;
  setSocket: any;
}

interface Props {
  children: ReactElement;
}

export const SocketContext = createContext<ISocketContext | undefined>(undefined);

export function SocketContextProvider({ children }: Props): ReactElement {
  const [socket, setSocket] = useState<any>(null);
  const [isConnected, setIsConnected] = useState<boolean>(socket ? socket.connected : false);


  const value = {
    isConnected,
    setIsConnected,
    socket,
    setSocket
  };

  return <SocketContext.Provider value={value}>{children}</SocketContext.Provider>;
}
