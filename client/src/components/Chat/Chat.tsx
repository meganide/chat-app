import { useContext, useEffect, useState } from 'react';
import { useMediaQuery } from 'react-responsive';

import MenuIcon from '@mui/icons-material/Menu';
import { ISidebarContext, SidebarContext } from '../../contexts/SidebarContext';
import { ChannelContext, IChannelContext } from '../../contexts/ChannelContext';
import AddNewChannel from '../ChatSidebar/AddNewChannel/AddNewChannel';
import Messages from './Messages/Messages';
import ChatFooter from './ChatFooter/ChatFooter';
import './chat.css';
import { ISocketContext, SocketContext } from '../../contexts/SocketContext';
import { IUserContext, UserContext } from '../../contexts/UserContext';
import Usertooltip from '../UserTooltip/Usertooltip';

export interface iMsg {
  displayName: string;
  date: number | string;
  profilePic: string;
  message: string;
}

function Chat() {
  const { setIsOpenSidebar, isOpenSidebar } = useContext(SidebarContext) as ISidebarContext;
  const { activeChannel } = useContext(ChannelContext) as IChannelContext;
  const { socket } = useContext(SocketContext) as ISocketContext;
  const { userData } = useContext(UserContext) as IUserContext;

  const [allMessages, setAllMessages] = useState<iMsg[]>([]);

  const isTabletOrMobile = useMediaQuery({ query: '(max-width: 1000px)' });

  useEffect(() => {
    const channelData = {
      name: activeChannel.name,
      userId: userData.userId,
    };

    socket.emit('join_channel', channelData);
  }, []);

  useEffect(() => {
    socket.on('messages_in_channel', (channelMessages: iMsg[]) => {
      channelMessages.sort((a, b) => {
        // const aDate = new Date(a.date).getTime();
        // const bDate = new Date(b.date).getTime();
        return (a.date as number) - (b.date as number);
      });

      channelMessages.forEach((message) => {
        message.date = new Date(message.date).toLocaleString();
      });

      setAllMessages(channelMessages);
    });

    return () => {
      socket.off('messages_in_channel');
    };
  }, [activeChannel]);

  return (
    <section className="chat">
      <AddNewChannel />
      <Usertooltip />
      <section className="chat-sidebar__nav chat__channel-name">
        {isTabletOrMobile && (
          <MenuIcon className="chat__hamburger" onClick={() => setIsOpenSidebar(!isOpenSidebar)} />
        )}
        <p>{activeChannel?.name}</p>
      </section>
      <section className="chat-container">
        <Messages allMessages={allMessages} setAllMessages={setAllMessages} />
        <ChatFooter setAllMessages={setAllMessages} />
      </section>
    </section>
  );
}

export default Chat;
