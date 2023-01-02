import { useContext } from 'react';
import { ISidebarContext, SidebarContext } from '../../../contexts/SidebarContext';
import { useMediaQuery } from 'react-responsive';

import './chatsidebarnav.css';
import CloseIcon from '@mui/icons-material/Close';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import AddIcon from '@mui/icons-material/Add';

function ChatSidebarNav() {
  const { setIsOpenSidebar, setIsShowChannels, isShowChannels, setShowAddNewChannel, showAddNewChannel } = useContext(
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
