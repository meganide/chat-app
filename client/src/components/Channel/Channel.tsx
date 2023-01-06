import { useEffect, useRef, useState, useContext } from 'react';
import { ChannelContext, IChannelContext } from '../../contexts/ChannelContext';
import { ISocketContext, SocketContext } from '../../contexts/SocketContext';
import { iChannels } from '../ChatSidebar/ChatSidebarChannel/ChatSidebarChannel';
import './channel.css';

function Channel({ name, description }: iChannels) {
  const { setActiveChannel } = useContext(ChannelContext) as IChannelContext;
  const { socket } = useContext(SocketContext) as ISocketContext;
  
  const channelNameRef = useRef<HTMLParagraphElement>(null);
  const [thumbnailName, setThumbnailName] = useState('C');

  useEffect(() => {
    if (channelNameRef) {
      const firstLetters =
        channelNameRef.current?.innerText
          .split(' ')
          .map((word) => word[0])
          .join('') || 'C';

      setThumbnailName(firstLetters);
    }
  }, []);

  function handleJoinChannel() {
    setActiveChannel({
      name,
      description,
    });

    socket.emit('join_channel', name);

  }

  return (
    <article className="channel" onClick={handleJoinChannel}>
      <article className="channel_thumbnail">{thumbnailName}</article>
      <p ref={channelNameRef}>{name}</p>
    </article>
  );
}

export default Channel;
