import { useRef, useEffect, useContext } from 'react';
import { v4 as uuidv4 } from 'uuid';

import { ChannelContext, IChannelContext } from '../../../contexts/ChannelContext';
import { ISocketContext, SocketContext } from '../../../contexts/SocketContext';
import { iMsg } from '../Chat';
import Message from '../Message/Message';

interface iProps {
  allMessages: iMsg[];
  setAllMessages: React.Dispatch<React.SetStateAction<iMsg[]>>;
}

function Messages({ allMessages, setAllMessages }: iProps) {
  const { socket } = useContext(SocketContext) as ISocketContext;
  const { typingStatus, setTypingStatus } = useContext(ChannelContext) as IChannelContext;

  const lastMessageRef = useRef<null | HTMLDivElement>(null);

  useEffect(() => {
    function receiveMessage() {
      socket.on('message', (msgData: iMsg) => {
        msgData.date = new Date(msgData.date).toLocaleString();

        setAllMessages((prev) => [...prev, msgData]);
      });

      return () => {
        socket.off('message');
      };
    }

    return receiveMessage();
  }, [allMessages, setAllMessages]);

  useEffect(() => {
    function scrollToBottom() {
      lastMessageRef?.current?.scrollIntoView({
        behavior: 'smooth',
        block: 'end',
        inline: 'nearest',
      });
    }

    scrollToBottom();
  }, [allMessages, setAllMessages, typingStatus]);

  useEffect(() => {
    function userIsTyping() {
      socket.on('typingResponse', (data: string) => setTypingStatus(data));

      return () => {
        socket.off('typingResponse')
      }
    }

    return userIsTyping()
  }, [socket]);

  return (
    <section className="messages">
      {allMessages.map((message) => {
        return (
          <Message
            key={uuidv4()}
            img={message.profilePic}
            displayName={message.displayName}
            date={message.date}
            message={message.message}
          />
        );
      })}
      {typingStatus && <p>{typingStatus}</p>}
      <div ref={lastMessageRef}></div>
    </section>
  );
}

export default Messages;
