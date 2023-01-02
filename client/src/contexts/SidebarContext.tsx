import { createContext, ReactElement, useState } from 'react';

export interface ISidebarContext {
  isOpenSidebar: boolean;
  setIsOpenSidebar: React.Dispatch<React.SetStateAction<boolean>>;
  isShowChannels: boolean;
  setIsShowChannels: React.Dispatch<React.SetStateAction<boolean>>;
  showAddNewChannel: boolean;
  setShowAddNewChannel: React.Dispatch<React.SetStateAction<boolean>>;
}

interface Props {
  children: ReactElement;
}

export const SidebarContext = createContext<ISidebarContext | undefined>(undefined);

export function SidebarContextProvider({ children }: Props): ReactElement {
  const [isOpenSidebar, setIsOpenSidebar] = useState<boolean>(false);
  const [isShowChannels, setIsShowChannels] = useState<boolean>(false);
  const [showAddNewChannel, setShowAddNewChannel] = useState<boolean>(false);

  const value = {
    isOpenSidebar,
    setIsOpenSidebar,
    isShowChannels,
    setIsShowChannels,
    showAddNewChannel,
    setShowAddNewChannel,
  };

  return <SidebarContext.Provider value={value}>{children}</SidebarContext.Provider>;
}
