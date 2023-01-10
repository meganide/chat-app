import { useContext, useEffect, useState } from 'react';
import { ChannelContext, IChannelContext } from '../../../contexts/ChannelContext';

import { ISidebarContext, SidebarContext } from '../../../contexts/SidebarContext';
import { ISocketContext, SocketContext } from '../../../contexts/SocketContext';
import Channels from '../Channels/Channels';
import Members from '../Members/Members';
import './chatsidebarchannel.css';

export interface iChannels {
  name: string;
  description: string;
}

export interface iMembers {
  displayName: string;
  profilePic: string;
}

export interface iOnlineUsers {
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
    function listenForNewChannels() {
      socket.on('new_channel', (channels: any) => {
        setChannels(channels);
      });

      return () => {
        socket.off('new_channel');
      };
    }

    return listenForNewChannels();
  }, [channels]);

  useEffect(() => {
    function listenForNewMembers() {
      socket.on('members_in_channel', (members: iMembers[]) => {
        setMembers(members);
      });

      return () => {
        socket.off('members_in_channel');
      };
    }
    return listenForNewMembers();
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
        {!isShowChannels && (
          <h2 className="chat-sidebar__channel-members-title">Members ({members.length})</h2>
        )}
        <section className="chat-sidebar__channel-members">
          {!isShowChannels ? (
            <Members
              members={members}
              setAllOnlineUsers={setAllOnlineUsers}
              allOnlineUsers={allOnlineUsers}
            />
          ) : (
            <Channels channels={channels} />
          )}
        </section>
      </section>
    </section>
  );
}

export default ChatSidebarChannel;
