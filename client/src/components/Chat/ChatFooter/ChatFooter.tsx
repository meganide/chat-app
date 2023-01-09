import { useContext, useEffect, useState } from 'react';

import SendIcon from '@mui/icons-material/Send';
import { ISocketContext, SocketContext } from '../../../contexts/SocketContext';
import { IUserContext, UserContext } from '../../../contexts/UserContext';
import { iMsg } from '../Chat';
import { ChannelContext, IChannelContext } from '../../../contexts/ChannelContext';

interface iProps {
  setAllMessages: React.Dispatch<React.SetStateAction<iMsg[]>>;
}

function ChatFooter({ setAllMessages }: iProps) {
  const { userData } = useContext(UserContext) as IUserContext;
  const { socket } = useContext(SocketContext) as ISocketContext;
  const { activeChannel, setTypingStatus } = useContext(ChannelContext) as IChannelContext;

  const [message, setMessage] = useState('');

  function onSendMessage(e: any) {
    e.preventDefault();

    if (message.length > 0) {
      socket.emit('typing', '');

      const newMessage = {
        userId: userData.id, //this is not the google id
        displayName: userData.displayName,
        date: new Date().toLocaleString(),
        profilePic: userData.profilePic,
        message: message,
        channelName: activeChannel.name,
      };

      setAllMessages((prev) => [...prev, newMessage]);

      socket.emit('message', newMessage);

      setMessage('');
    }
  }

  function handleTyping() {
    if (message.length > 0) {
      socket.emit('typing', `${userData.displayName} is typing...`);
    }
  }

  function handleOnKeyDown(e: any) {
    if (e.key === 'Enter' && e.shiftKey === false) {
      onSendMessage(e);
    }
  }

  useEffect(() => {
    if (message.length === 0) {
      socket.emit('typing', ``);
    }
  }, [message, setMessage]);

  return (
    <form className="chat__send" onSubmit={onSendMessage} onKeyDown={handleOnKeyDown}>
      <textarea
        name="message"
        id="message"
        placeholder="Type a message here"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        onKeyDown={handleTyping}
        minLength={1}
        required
        autoFocus
      ></textarea>
      <button id="send">
        <SendIcon style={{ color: 'white' }} />
      </button>
    </form>
  );
}

export default ChatFooter;
