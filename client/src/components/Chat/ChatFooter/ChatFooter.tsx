import { useContext, useState } from 'react';

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
  const { activeChannel } = useContext(ChannelContext) as IChannelContext;

  const [message, setMessage] = useState('');

  function onSendMessage(e: any) {
    e.preventDefault();

    socket.emit('typing', '');

    const newMessage = {
      userId: userData.id, //this is not the google id
      displayName: userData.displayName,
      date: new Date().toLocaleString(),
      img: userData.profilePic,
      message: message,
      channelName: activeChannel.name,
    };

    setAllMessages((prev) => [...prev, newMessage]);

    socket.emit('message', newMessage);

    setMessage('');
  }

  function handleTyping() {
    socket.emit('typing', `${userData.displayName} is typing...`);
  }

  return (
    <form className="chat__send" onSubmit={onSendMessage}>
      <textarea
        name="message"
        id="message"
        placeholder="Type a message here"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        onKeyDown={handleTyping}
        minLength={1}
        required
      ></textarea>
      <button id="send">
        <SendIcon style={{ color: 'white' }} />
      </button>
    </form>
  );
}

export default ChatFooter;
