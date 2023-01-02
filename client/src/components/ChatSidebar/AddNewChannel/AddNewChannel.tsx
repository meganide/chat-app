import { useContext } from 'react';

import { ISidebarContext, SidebarContext } from '../../../contexts/SidebarContext';
import './addnewchannel.css';
import CloseIcon from '@mui/icons-material/Close';
import Overlay from '../../Overlay/Overlay';

function AddNewChannel() {
  const { showAddNewChannel, setShowAddNewChannel } = useContext(SidebarContext) as ISidebarContext;

  if (showAddNewChannel) {
    return (
      <Overlay>
        
      <div className="add-channel">
        <CloseIcon
          className="chat-sidebar__close-icon add-channel__close"
          onClick={() => setShowAddNewChannel(false)}
          />
        <p>New channel</p>
        <form className="add-channel__form" action="">
          <input
            type="text"
            name="channel-name"
            id="channel-name"
            placeholder="Channel name"
            required
            maxLength={20}
            />
          <textarea
            name="channel-desc"
            id="channel-desc"
            placeholder="Channel Description"
            required
            maxLength={100}
            ></textarea>
          <input className="add-channel__submit" type="submit" value="Save" />
        </form>
      </div>
    </Overlay>
    );
  } else {
    return <></>;
  }
}

export default AddNewChannel;
