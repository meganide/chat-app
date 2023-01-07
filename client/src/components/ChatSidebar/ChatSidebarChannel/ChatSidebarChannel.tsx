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

interface iMembers {
  displayName: string;
  profilePic: string;
}

interface iOnlineUsers {
  [key: string]: string;
}

function ChatSidebarChannel() {
  const { socket } = useContext(SocketContext) as ISocketContext;
  const { isShowChannels } = useContext(SidebarContext) as ISidebarContext;
  const { activeChannel, setActiveChannel } = useContext(ChannelContext) as IChannelContext;

  const [channels, setChannels] = useState<iChannels[]>([]);
  const [members, setMembers] = useState<iMembers[]>([]);
  const [allOnlineUsers, setAllOnlineUsers] = useState<iOnlineUsers>({});

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


  useEffect(() => {
    socket.on('members_in_channel', (members: iMembers[]) => {
      setMembers(members);
    });

    return () => {
      socket.off('members_in_channel');
    };
  }, [activeChannel, setActiveChannel]);




  return (
    <section className="chat-sidebar__channel">
      {!isShowChannels && (
        <section className="chat-sidebar__top">
          <h1 className="chat-sidebar__channel-name">{activeChannel?.name}</h1>
          <h2 className="chat-sidebar__channel-description">{activeChannel?.description}</h2>
        </section>
      )}
      <section className="chat-sidebar__bot">
        {!isShowChannels && <h2 className="chat-sidebar__channel-members-title">Members</h2>}
        <section className="chat-sidebar__channel-members">
          {!isShowChannels ? (
            <>
              {members &&
                members.map((member) => {
                  return (
                    <Member
                      key={crypto.randomUUID()}
                      displayName={member.displayName}
                      profilePic={member.profilePic}
                      setAllOnlineUsers={setAllOnlineUsers}
                      allOnlineUsers={allOnlineUsers}
                    />
                  );
                })}
            </>
          ) : (
            <>
              {channels &&
                channels.map((channel) => {
                  return (
                    <Channel
                      key={crypto.randomUUID()}
                      name={channel.name}
                      description={channel.description}
                    />
                  );
                })}
            </>
          )}
        </section>
      </section>
    </section>
  );
}

export default ChatSidebarChannel;
