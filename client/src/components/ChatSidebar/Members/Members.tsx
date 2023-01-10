import { v4 as uuidv4 } from 'uuid';

import { iMembers, iOnlineUsers } from '../ChatSidebarChannel/ChatSidebarChannel';
import Member from '../Member/Member';

interface iProps {
  members: iMembers[];
  allOnlineUsers: iOnlineUsers;
  setAllOnlineUsers: React.Dispatch<React.SetStateAction<iOnlineUsers>>;
}

function Members({ members, allOnlineUsers, setAllOnlineUsers }: iProps) {
  return (
    <>
      {members &&
        members.map((member) => {
          return (
            <Member
              key={uuidv4()}
              displayName={member.displayName}
              profilePic={member.profilePic}
              setAllOnlineUsers={setAllOnlineUsers}
              allOnlineUsers={allOnlineUsers}
            />
          );
        })}
    </>
  );
}

export default Members;
