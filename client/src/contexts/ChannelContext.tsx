import { createContext, ReactElement, useState } from 'react';

export interface IChannelContext {
  activeChannel: iActiveChannel;
  setActiveChannel: React.Dispatch<React.SetStateAction<iActiveChannel>>;
  typingStatus: string | undefined;
  setTypingStatus: React.Dispatch<React.SetStateAction<string | undefined>>;
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

  const [typingStatus, setTypingStatus] = useState<undefined | string>('');


  const value = {
    activeChannel,
    setActiveChannel,
    typingStatus,
    setTypingStatus
  };

  return <ChannelContext.Provider value={value}>{children}</ChannelContext.Provider>;
}
