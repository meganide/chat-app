import { useContext, useEffect } from 'react';

import { ISocketContext, SocketContext } from '../../../contexts/SocketContext';

interface iProps {
  displayName: string;
  profilePic: string;
  allOnlineUsers: any;
  setAllOnlineUsers: any;
}

function Member({ displayName, profilePic, allOnlineUsers, setAllOnlineUsers }: iProps) {
  const { socket } = useContext(SocketContext) as ISocketContext;

  useEffect(() => {
    socket.on(
      'online_list',
      (onlineUsers: any) => {
        setAllOnlineUsers(onlineUsers);
      },
      []
    );
    return () => {
      socket.off('online_list');
    };
  }, [allOnlineUsers, setAllOnlineUsers]);

  return (
    <article className="chat-sidebar__channel-member">
      <img src={profilePic} alt="" className="chat-sidebar__image" />
      <p className="chat-sidebar__username">{displayName}</p>

      {Object.values(allOnlineUsers).includes(displayName) ? (
        <div
          key={displayName}
          className="chat-sidebar__circle"
          style={{ backgroundColor: '#004e00' }}
        ></div>
      ) : (
        <div
          key={displayName}
          className="chat-sidebar__circle"
          style={{ backgroundColor: '#620505' }}
        ></div>
      )}
    </article>
  );
}

export default Member;
