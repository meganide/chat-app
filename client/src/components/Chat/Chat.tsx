import './chat.css';
import Message from './Message/Message';
import SendIcon from '@mui/icons-material/Send';

function Chat() {
  return (
    <section className="chat">
      <section className="chat-sidebar__nav chat__channel-name">
        <p>Front-end developers</p>
      </section>
      <section className="chat-container">
        <section className="messages">
          <Message />
          <Message />
          <Message />
          <Message />
          <Message />
          <Message />
          <Message />
          <Message />

        </section>
        <form className="chat__send">
          <textarea name="message" id="message" placeholder='Type a message here'></textarea>
          <button id="send"><SendIcon style={{color: 'white'}} /></button>
        </form>
      </section>
    </section>
  );
}

export default Chat;
