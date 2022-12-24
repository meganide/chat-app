import { createContext, ReactElement, useState } from 'react';

interface Props {
  children: ReactElement;
}

export interface ISidebarContext {
  isOpenSidebar: boolean;
  setIsOpenSidebar: React.Dispatch<React.SetStateAction<boolean>>;
  isShowChannels: boolean;
  setIsShowChannels: React.Dispatch<React.SetStateAction<boolean>>;
}

export const SidebarContext = createContext<ISidebarContext | undefined >(undefined);

export function SidebarContextProvider({ children }: Props): ReactElement {
  const [isOpenSidebar, setIsOpenSidebar] = useState<boolean>(false);
  const [isShowChannels, setIsShowChannels] = useState<boolean>(false);

  const value = {
    isOpenSidebar,
    setIsOpenSidebar,
    isShowChannels,
    setIsShowChannels,
  };

  return <SidebarContext.Provider value={value}>{children}</SidebarContext.Provider>;
}
