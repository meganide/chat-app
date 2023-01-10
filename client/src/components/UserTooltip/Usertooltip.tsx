import { useContext, useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

import './usertooltip.css';
import CloseIcon from '@mui/icons-material/Close';
import Overlay from '../Overlay/Overlay';
import { ISidebarContext, SidebarContext } from '../../contexts/SidebarContext';
import ProfileRow from '../ProfileForm/ProfileRow/ProfileRow';

interface iUserProfile {
  bio: null | string;
  profilePic: string;
  timeCreated: string;
}

function Usertooltip() {
  const { showUsertooltip, setShowUserTooltip, clickedOnUser } = useContext(
    SidebarContext
  ) as ISidebarContext;

  const [userProfile, setUserProfile] = useState<iUserProfile | null>(null);

  const rowInfo = {
    photo: userProfile?.profilePic || '../public/images/icons/avatar.png',
    name: clickedOnUser,
    bio: userProfile?.bio || 'No bio assigned...',
    registered: userProfile?.timeCreated || '',
  };

  useEffect(() => {
    async function getUserProfile() {
      try {
        const resp = await fetch('/api/user/profile/' + clickedOnUser);
        const data = await resp.json();

        data[0].timeCreated = new Date(data[0].timeCreated).toLocaleDateString();
        setUserProfile(data[0]);
      } catch (error) {
        console.log(error);
      }
    }

    clickedOnUser && getUserProfile();
  }, [clickedOnUser]);

  if (showUsertooltip) {
    return (
      <Overlay>
        <aside className="usertooltip">
          <CloseIcon
            className="usertooltip__close-icon"
            onClick={() => setShowUserTooltip(false)}
          />
          {Object.entries(rowInfo).map(([key, value]) => {
            return <ProfileRow key={uuidv4()} keys={key} value={value} />;
          })}
        </aside>
      </Overlay>
    );
  } else {
    return <></>;
  }
}

export default Usertooltip;
