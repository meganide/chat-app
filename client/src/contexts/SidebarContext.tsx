import { createContext, ReactElement, useState } from 'react';

export interface ISidebarContext {
  isOpenSidebar: boolean;
  setIsOpenSidebar: React.Dispatch<React.SetStateAction<boolean>>;
  isShowChannels: boolean;
  setIsShowChannels: React.Dispatch<React.SetStateAction<boolean>>;
  showAddNewChannel: boolean;
  setShowAddNewChannel: React.Dispatch<React.SetStateAction<boolean>>;
  showUsertooltip: boolean;
  setShowUserTooltip: React.Dispatch<React.SetStateAction<boolean>>;
  clickedOnUser: string;
  setClickedOnUser: React.Dispatch<React.SetStateAction<string>>;
}

interface Props {
  children: ReactElement;
}

export const SidebarContext = createContext<ISidebarContext | undefined>(undefined);

export function SidebarContextProvider({ children }: Props): ReactElement {
  const [isOpenSidebar, setIsOpenSidebar] = useState<boolean>(false);
  const [isShowChannels, setIsShowChannels] = useState<boolean>(false);
  const [showAddNewChannel, setShowAddNewChannel] = useState<boolean>(false);
  const [showUsertooltip, setShowUserTooltip] = useState(false);
  const [clickedOnUser, setClickedOnUser] = useState('');

  const value = {
    isOpenSidebar,
    setIsOpenSidebar,
    isShowChannels,
    setIsShowChannels,
    showAddNewChannel,
    setShowAddNewChannel,
    showUsertooltip,
    setShowUserTooltip,
    clickedOnUser,
    setClickedOnUser,
  };

  return <SidebarContext.Provider value={value}>{children}</SidebarContext.Provider>;
}
