import { useContext, useEffect, useState } from 'react';
import { ChannelContext, IChannelContext } from '../../../contexts/ChannelContext';

import { ISidebarContext, SidebarContext } from '../../../contexts/SidebarContext';
import { ISocketContext, SocketContext } from '../../../contexts/SocketContext';
import Channel from '../../Channel/Channel';
import Member from '../Member/Member';

export interface iChannels {
  name: string;
  description: string;
}

function ChatSidebarChannel() {
  const { socket } = useContext(SocketContext) as ISocketContext;
  const { isShowChannels } = useContext(SidebarContext) as ISidebarContext;
  const { activeChannel } = useContext(ChannelContext) as IChannelContext;

  const [channels, setChannels] = useState<iChannels[]>([]);

  const allMembers = [
    {
      displayName: 'Renas',
      profilePic:
        'https://res.cloudinary.com/chatttify/image/upload/v1671866490/users/111302558466971942566/profile/profile_pic.jpg',
    },
    {
      displayName: 'Tellus',
      profilePic:
        'https://res.cloudinary.com/chatttify/image/upload/v1671866490/users/111302558466971942566/profile/profile_pic.jpg',
    },
    {
      displayName: 'Pikachu',
      profilePic:
        'https://res.cloudinary.com/chatttify/image/upload/v1671866490/users/111302558466971942566/profile/profile_pic.jpg',
    },
  ];

  useEffect(() => {
    async function getChannels() {
      try {
        const res = await fetch('/api/channels');
        const data = await res.json();
        setChannels(data);
      } catch (error) {
        console.log(error);
      }
    }

    getChannels();
  }, []);

  useEffect(() => {
    socket.on('new_channel', (channels: any) => {
      setChannels(channels);
    });

    return () => {
      socket.off('new_channel');
    };
  }, [channels]);

  return (
    <section className="chat-sidebar__channel">
      {!isShowChannels && (
        <section className="chat-sidebar__top">
          <h1 className="chat-sidebar__channel-name">{activeChannel?.name}</h1>
          <h2 className="chat-sidebar__channel-description">
            {activeChannel?.description}
          </h2>
        </section>
      )}
      <section className="chat-sidebar__bot">
        {!isShowChannels && <h2 className="chat-sidebar__channel-members-title">Members</h2>}
        <section className="chat-sidebar__channel-members">
          {!isShowChannels ? (
            <>
              {allMembers &&
                allMembers.map((member) => {
                  return (
                    <Member
                      key={crypto.randomUUID()}
                      displayName={member.displayName}
                      profilePic={member.profilePic}
                    />
                  );
                })}
            </>
          ) : (
            <>
              {channels &&
                channels.map((channel) => {
                  return <Channel key={crypto.randomUUID()} name={channel.name} description={channel.description} />;
                })}
            </>
          )}
        </section>
      </section>
    </section>
  );
}

export default ChatSidebarChannel;
