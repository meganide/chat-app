import './usertooltip.css';
import CloseIcon from '@mui/icons-material/Close';
import Overlay from '../Overlay/Overlay';

interface iProps {
  displayName: string;
  setShowUserTooltip: React.Dispatch<React.SetStateAction<boolean>>;
}

function Usertooltip({ displayName, setShowUserTooltip }: iProps) {
  return (
    <Overlay>
      <aside className="usertooltip add-channel">
        <CloseIcon className="chat-sidebar__close-icon add-channel__close" onClick={() => setShowUserTooltip(false)} />
        <div className="usertooltip__top">
          <img
            src="http://t1.gstatic.com/licensed-image?q=tbn:ANd9GcRRv9ICxXjK-LVFv-lKRId6gB45BFoNCLsZ4dk7bZpYGblPLPG-9aYss0Z0wt2PmWDb"
            alt=""
          />
          <p>{displayName}</p>
        </div>
      </aside>
    </Overlay>
  );
}

export default Usertooltip;
