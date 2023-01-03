import { useContext, useState, useEffect, useRef } from 'react';
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
  const [typingStatus, setTypingStatus] = useState<undefined | string>('');
  const [allMessages, setAllMessages] = useState<iMsg[]>([]);
  const lastMessageRef = useRef<null | HTMLDivElement>(null);

  const isTabletOrMobile = useMediaQuery({ query: '(max-width: 1000px)' });

  function onSendMessage(e: any) {
    e.preventDefault();
    
    socket.emit('typing', '');

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

  function handleTyping() {
    socket.emit('typing', `${userData.displayName} is typing...`);
  }

  useEffect(() => {
    socket.on('message', (msgData: iMsg) => {
      setAllMessages((prev) => [...prev, msgData]);
    });

    return () => {
      socket.off('message');
    };
  }, [allMessages, setAllMessages]);

  useEffect(() => {
    lastMessageRef?.current?.scrollIntoView({
      behavior: 'smooth',
      block: 'end',
      inline: 'nearest',
    });
  }, [allMessages]);

  useEffect(() => {
    socket.on('typingResponse', (data: string) => setTypingStatus(data));
  }, [socket]);

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
          {typingStatus && <p>{typingStatus}</p>}
          <div ref={lastMessageRef}></div>
        </section>
        <form className="chat__send" onSubmit={onSendMessage}>
          <textarea
            name="message"
            id="message"
            placeholder="Type a message here"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={handleTyping}
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
