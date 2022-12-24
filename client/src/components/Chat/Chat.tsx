import { useMediaQuery } from 'react-responsive';

import './chat.css';
import Message from './Message/Message';
import SendIcon from '@mui/icons-material/Send';
import MenuIcon from '@mui/icons-material/Menu';
import { messages } from './Message/messagesExample';

interface iProps {
  setIsOpenSidebar: React.Dispatch<React.SetStateAction<boolean>>;
  isOpenSidebar: boolean;
}

function Chat(props: iProps) {
  const isTabletOrMobile = useMediaQuery({ query: '(max-width: 1000px)' });

  return (
    <section className="chat">
      <section className="chat-sidebar__nav chat__channel-name">
        {isTabletOrMobile && (
          <MenuIcon
            className="chat__hamburger"
            onClick={() => props.setIsOpenSidebar(!props.isOpenSidebar)}
          />
        )}
        <p>Front-end developers</p>
      </section>
      <section className="chat-container">
        <section className="messages">
          {messages.map((message) => {
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
        <form className="chat__send">
          <textarea name="message" id="message" placeholder="Type a message here"></textarea>
          <button id="send">
            <SendIcon style={{ color: 'white' }} />
          </button>
        </form>
      </section>
    </section>
  );
}

export default Chat;
