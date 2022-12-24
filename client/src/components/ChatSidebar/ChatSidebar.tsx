import './chatsidebar.css';
import { ISidebarContext, SidebarContext } from '../../contexts/SidebarContext';
import { useContext } from 'react';

import NavbarProfile from '../Navbar/NavbarProfile/NavbarProfile';
import ChatSidebarNav from './ChatSidebarNav/ChatSidebarNav';
import ChatSidebarChannel from './ChatSidebarChannel/ChatSidebarChannel';

function ChatSidebar() {
  const {isOpenSidebar} = useContext(SidebarContext) as ISidebarContext;

  return (
    <aside
      className={
        isOpenSidebar ? 'chat-sidebar chat-sidebar__open' : 'chat-sidebar chat-sidebar__close'
      }
    >
      <ChatSidebarNav />
      <ChatSidebarChannel />
      <section className="chat-sidebar__profile">
        <NavbarProfile page="home" />
      </section>
    </aside>
  );
}

export default ChatSidebar;
