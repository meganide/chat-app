import { useContext } from 'react';
import { ISidebarContext, SidebarContext } from '../../../contexts/SidebarContext';
import { useMediaQuery } from 'react-responsive';

import CloseIcon from '@mui/icons-material/Close';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';


function ChatSidebarNav() {
  const {setIsOpenSidebar, setIsShowChannels} = useContext(SidebarContext) as ISidebarContext;
  const isTabletOrMobile = useMediaQuery({ query: '(max-width: 1000px)' });

  return (
    <section className="chat-sidebar__nav chat-sidebar__nav--sidebar">
      <ArrowBackIosNewIcon className="arrowBack" onClick={() => setIsShowChannels(true)} />
      <p>All channels</p>
      {isTabletOrMobile && (
        <CloseIcon
          className="chat-sidebar__close-icon"
          onClick={() => setIsOpenSidebar(false)}
        />
      )}
    </section>
  );
}

export default ChatSidebarNav;
