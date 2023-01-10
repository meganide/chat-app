import { useEffect, useRef, useState, useContext } from 'react';

import { ChannelContext, IChannelContext } from '../../contexts/ChannelContext';
import { ISidebarContext, SidebarContext } from '../../contexts/SidebarContext';
import { ISocketContext, SocketContext } from '../../contexts/SocketContext';
import { IUserContext, UserContext } from '../../contexts/UserContext';
import { iChannels } from '../ChatSidebar/ChatSidebarChannel/ChatSidebarChannel';
import './channel.css';

interface iProps extends iChannels {
  setSearchChannelQuery: React.Dispatch<React.SetStateAction<string>>;
}

function Channel({ name, description, setSearchChannelQuery }: iProps) {
  const { setActiveChannel, setTypingStatus } = useContext(ChannelContext) as IChannelContext;
  const { socket } = useContext(SocketContext) as ISocketContext;
  const { userData } = useContext(UserContext) as IUserContext;
  const { setIsShowChannels } = useContext(SidebarContext) as ISidebarContext;

  const channelNameRef = useRef<HTMLParagraphElement>(null);
  const [thumbnailName, setThumbnailName] = useState('C');

  useEffect(() => {
    function createChannelThumbnail() {
      if (channelNameRef) {
        const firstLetters =
          channelNameRef.current?.innerText
            .split(' ')
            .map((word, index) => {
              if (index < 3) {
                return word[0];
              }
            })
            .join('') || 'C';

        setThumbnailName(firstLetters);
      }
    }

    createChannelThumbnail()
  }, []);

  function handleJoinChannel() {
    setActiveChannel({
      name,
      description,
    });

    setTypingStatus('');
    setSearchChannelQuery('');

    const channelData = {
      name,
      userId: userData.userId,
    };

    socket.emit('join_channel', channelData);

    setIsShowChannels(false);
  }

  return (
    <article className="channel" onClick={handleJoinChannel}>
      <article className="channel_thumbnail">{thumbnailName}</article>
      <p ref={channelNameRef}>{name}</p>
    </article>
  );
}

export default Channel;
