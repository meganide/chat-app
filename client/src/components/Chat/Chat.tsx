import { useContext, useState, useEffect } from 'react';
import { ISidebarContext, SidebarContext } from '../../contexts/SidebarContext';
import { useMediaQuery } from 'react-responsive';

import './chat.css';
import Message from './Message/Message';
import SendIcon from '@mui/icons-material/Send';
import MenuIcon from '@mui/icons-material/Menu';
import AddNewChannel from '../ChatSidebar/AddNewChannel/AddNewChannel';
import { ISocketContext, SocketContext } from '../../contexts/SocketContext';
import { IUserContext, UserContext } from '../../contexts/UserContext';

interface iMsg {
  displayName: string;
  date: string;
  img: string;
  message: string;
}

function Chat() {
  const { setIsOpenSidebar, isOpenSidebar } = useContext(SidebarContext) as ISidebarContext;
  const { userData } = useContext(UserContext) as IUserContext;
  const { socket } = useContext(SocketContext) as ISocketContext;

  const [message, setMessage] = useState('');
  const [allMessages, setAllMessages] = useState<iMsg[]>([]);

  const isTabletOrMobile = useMediaQuery({ query: '(max-width: 1000px)' });

  function onSendMessage(e: any) {
    e.preventDefault();
    const newMessage = {
      displayName: userData.displayName,
      date: new Date().toLocaleString(),
      img: userData.profilePic,
      message: message,
    };

    setAllMessages((prev) => [...prev, newMessage]);

    socket.emit('message', newMessage);

    setMessage('');
  }

  useEffect(() => {
    socket.on('message', (msgData: iMsg) => {
      setAllMessages((prev) => [...prev, msgData]);
    });

    return () => {
      socket.off('message');
    };
  }, [allMessages, setAllMessages]);

  return (
    <section className="chat">
      <AddNewChannel />
      <section className="chat-sidebar__nav chat__channel-name">
        {isTabletOrMobile && (
          <MenuIcon className="chat__hamburger" onClick={() => setIsOpenSidebar(!isOpenSidebar)} />
        )}
        <p>Front-end developers</p>
      </section>
      <section className="chat-container">
        <section className="messages">
          {allMessages.map((message) => {
            return (
              <Message
                key={crypto.randomUUID()}
                img={message.img}
                displayName={message.displayName}
                date={message.date}
                message={message.message}
              />
            );
          })}
        </section>
        <form className="chat__send" onSubmit={onSendMessage}>
          <textarea
            name="message"
            id="message"
            placeholder="Type a message here"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          ></textarea>
          <button id="send">
            <SendIcon style={{ color: 'white' }} />
          </button>
        </form>
      </section>
    </section>
  );
}

export default Chat;
