import { useRef, useEffect, useState, useContext } from 'react';

import { ISocketContext, SocketContext } from '../../../contexts/SocketContext';
import { iMsg } from '../Chat';
import Message from '../Message/Message';

interface iProps {
  allMessages: iMsg[];
  setAllMessages: React.Dispatch<React.SetStateAction<iMsg[]>>;
}

function Messages({ allMessages, setAllMessages }: iProps) {
  const { socket } = useContext(SocketContext) as ISocketContext;

  const [typingStatus, setTypingStatus] = useState<undefined | string>('');
  const lastMessageRef = useRef<null | HTMLDivElement>(null);

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
  }, [allMessages, typingStatus]);

  useEffect(() => {
    socket.on('typingResponse', (data: string) => setTypingStatus(data));
  }, [socket]);

  return (
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
  );
}

export default Messages;
