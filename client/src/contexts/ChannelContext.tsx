import { createContext, ReactElement, useState } from 'react';

export interface IChannelContext {
  activeChannel: iActiveChannel;
  setActiveChannel: React.Dispatch<React.SetStateAction<iActiveChannel>>;
}

interface iActiveChannel {
  name: string;
  description: string;
}

interface Props {
  children: ReactElement;
}

export const ChannelContext = createContext<IChannelContext | undefined>(undefined);

export function ChannelContextProvider({ children }: Props): ReactElement {
  const [activeChannel, setActiveChannel] = useState<iActiveChannel>({
    name: 'Welcome',
    description:
      'Welcome to the community! Feel free to introduce yourself and join in on the conversation.',
  });

  const value = {
    activeChannel,
    setActiveChannel,
  };

  return <ChannelContext.Provider value={value}>{children}</ChannelContext.Provider>;
}
