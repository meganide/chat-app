import { useContext, useEffect, useState } from 'react';

import SendIcon from '@mui/icons-material/Send';
import { ISocketContext, SocketContext } from '../../../contexts/SocketContext';
import { IUserContext, UserContext } from '../../../contexts/UserContext';
import { iMsg } from '../Chat';
import { ChannelContext, IChannelContext } from '../../../contexts/ChannelContext';

interface iProps {
  setAllMessages: React.Dispatch<React.SetStateAction<iMsg[]>>;
}

interface iNewMessage {
  userId: number;
  displayName: string;
  date: number | string;
  profilePic: string;
  message: string;
  channelName: string;
}

function ChatFooter({ setAllMessages }: iProps) {
  const { userData } = useContext(UserContext) as IUserContext;
  const { socket } = useContext(SocketContext) as ISocketContext;
  const { activeChannel } = useContext(ChannelContext) as IChannelContext;

  const [message, setMessage] = useState('');

  function onSendMessage(e: any) {
    e.preventDefault();

    if (message.length > 0) {
      socket.emit('typing', '');

      const utcTimestamp = Date.now();

      const newMessage: iNewMessage = {
        userId: userData.id, //this is not the google id
        displayName: userData.displayName,
        date: utcTimestamp,
        profilePic: userData.profilePic,
        message: message,
        channelName: activeChannel.name,
      };

      socket.emit('message', newMessage);

      newMessage.date = new Date(newMessage.date).toLocaleString();

      setAllMessages((prev) => [...prev, newMessage]);

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
    function resetTypingStatus() {
      if (message.length === 0) {
        socket.emit('typing', ``);
      }
    }

    resetTypingStatus();
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
