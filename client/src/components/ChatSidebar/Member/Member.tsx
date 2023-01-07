import { useContext, useEffect, useState } from 'react';
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

        // Object.values(onlineUsers).forEach((user) => {
        //   if (user === displayName) {
        //   }
        // });
      },
      []
    );

    console.log(allOnlineUsers);

    return () => {
      socket.off('online_list');
    };
  }, []);

  return (
    <article className="chat-sidebar__channel-member">
      <img src={profilePic} alt="" className="chat-sidebar__image" />
      <p className="chat-sidebar__username">{displayName}</p>

      {Object.values(allOnlineUsers).map((user) => {
        if (user === displayName) {
          return (
            <div
              key={user}
              className="chat-sidebar__circle"
              style={{ backgroundColor: 'green' }}
            ></div>
          );
        }
      })}
    </article>
  );
}

export default Member;
