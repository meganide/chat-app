import { useContext } from 'react';

import './usertooltip.css';
import CloseIcon from '@mui/icons-material/Close';
import Overlay from '../Overlay/Overlay';
import { ISidebarContext, SidebarContext } from '../../contexts/SidebarContext';


function Usertooltip() {
  const { showUsertooltip, setShowUserTooltip, clickedOnUser } = useContext(SidebarContext) as ISidebarContext;

  if (showUsertooltip) {
    return (
      <Overlay>
        <aside className="usertooltip">
          <CloseIcon
            className="usertooltip__close-icon"
            onClick={() => setShowUserTooltip(false)}
          />
          <div className="usertooltip__top">
            <img
              src="http://t1.gstatic.com/licensed-image?q=tbn:ANd9GcRRv9ICxXjK-LVFv-lKRId6gB45BFoNCLsZ4dk7bZpYGblPLPG-9aYss0Z0wt2PmWDb"
              alt=""
            />
            <p>{clickedOnUser}</p>
          </div>
        </aside>
      </Overlay>
    );
  } else {
    return (
      <></>
    )
  }
}

export default Usertooltip;
