import { useContext, useEffect } from 'react';

import './usertooltip.css';
import CloseIcon from '@mui/icons-material/Close';
import Overlay from '../Overlay/Overlay';
import { ISidebarContext, SidebarContext } from '../../contexts/SidebarContext';

function Usertooltip() {
  const { showUsertooltip, setShowUserTooltip, clickedOnUser } = useContext(
    SidebarContext
  ) as ISidebarContext;

  useEffect(() => {
    async function getUserProfile() {
      try {
        const resp = await fetch('/api/user/profile/' + clickedOnUser);
        const data = await resp.json();
        console.log(data);
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
              src="http://t1.gstatic.com/licensed-image?q=tbn:ANd9GcRRv9ICxXjK-LVFv-lKRId6gB45BFoNCLsZ4dk7bZpYGblPLPG-9aYss0Z0wt2PmWDb"
              alt=""
            />
            <p>{clickedOnUser}</p>
          </section>
          <div className="usertooltip__info">
            <p>Bio: </p>
          </div>
        </aside>
      </Overlay>
    );
  } else {
    return <></>;
  }
}

export default Usertooltip;
