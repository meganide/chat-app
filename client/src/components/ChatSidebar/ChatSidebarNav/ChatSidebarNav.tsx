import { useContext } from 'react';
import { useMediaQuery } from 'react-responsive';

import { ISidebarContext, SidebarContext } from '../../../contexts/SidebarContext';
import './chatsidebarnav.css';
import CloseIcon from '@mui/icons-material/Close';
import AddIcon from '@mui/icons-material/Add';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';

function ChatSidebarNav() {
  const { setIsOpenSidebar, setIsShowChannels, isShowChannels, setShowAddNewChannel } = useContext(
    SidebarContext
  ) as ISidebarContext;
  
  const isTabletOrMobile = useMediaQuery({ query: '(max-width: 1000px)' });

  return (
    <section className="chat-sidebar__nav chat-sidebar__nav--sidebar">
      <ArrowBackIosNewIcon
        className="arrowBack"
        onClick={() => setIsShowChannels(!isShowChannels)}
      />
      {isShowChannels ? (
        <section className="chat-sidebar__channels">
          <p>Channels</p>
          <AddIcon className="chat-sidebar__add" onClick={() => setShowAddNewChannel(true)} />
        </section>
      ) : (
        <p>All channels</p>
      )}
      {isTabletOrMobile && (
        <CloseIcon className="chat-sidebar__close-icon" onClick={() => setIsOpenSidebar(false)} />
      )}
    </section>
  );
}

export default ChatSidebarNav;
