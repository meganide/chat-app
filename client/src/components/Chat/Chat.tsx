import { useContext, useState } from 'react';
import { useMediaQuery } from 'react-responsive';

import MenuIcon from '@mui/icons-material/Menu';
import { ISidebarContext, SidebarContext } from '../../contexts/SidebarContext';
import AddNewChannel from '../ChatSidebar/AddNewChannel/AddNewChannel';
import Messages from './Messages/Messages';
import ChatFooter from './ChatFooter/ChatFooter';
import './chat.css';

export interface iMsg {
  displayName: string;
  date: string;
  img: string;
  message: string;
}

function Chat() {
  const { setIsOpenSidebar, isOpenSidebar } = useContext(SidebarContext) as ISidebarContext;

  const [allMessages, setAllMessages] = useState<iMsg[]>([]);

  const isTabletOrMobile = useMediaQuery({ query: '(max-width: 1000px)' });

  return (
    <section className="chat">
      <AddNewChannel />
      <section className="chat-sidebar__nav chat__channel-name">
        {isTabletOrMobile && (
          <MenuIcon className="chat__hamburger" onClick={() => setIsOpenSidebar(!isOpenSidebar)} />
        )}
        <p>General</p>
      </section>
      <section className="chat-container">
        <Messages allMessages={allMessages} setAllMessages={setAllMessages} />
        <ChatFooter setAllMessages={setAllMessages} />
      </section>
    </section>
  );
}

export default Chat;
