import { useContext, useEffect, useState } from 'react';

import './usertooltip.css';
import CloseIcon from '@mui/icons-material/Close';
import Overlay from '../Overlay/Overlay';
import { ISidebarContext, SidebarContext } from '../../contexts/SidebarContext';

interface iUserProfile {
  bio: null | string;
  profilePic: string;
  timeCreated: string;
}

function Usertooltip() {
  const { showUsertooltip, setShowUserTooltip, clickedOnUser } = useContext(
    SidebarContext
  ) as ISidebarContext;

  const [userProfile, setUserProfile] = useState<iUserProfile | null>(null)

  useEffect(() => {
    async function getUserProfile() {
      try {
        const resp = await fetch('/api/user/profile/' + clickedOnUser);
        const data = await resp.json();

        data[0].timeCreated = new Date(data[0].timeCreated).toLocaleDateString()
        setUserProfile(data[0])
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
          <section className="usertooltip__top">
            <img
              src={userProfile?.profilePic}
              alt=""
            />
            <p>{clickedOnUser}</p>
          </section>
          <section className="usertooltip__info">
            <p>Bio:</p>
            <p> {userProfile?.bio || 'No bio assigned...'}</p>
            <p>Member since:</p>
            <p>{userProfile?.timeCreated}</p>
          </section>
          <button className='add-channel__submit'>Send Private Message</button>
        </aside>
      </Overlay>
    );
  } else {
    return <></>;
  }
}

export default Usertooltip;
