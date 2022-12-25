import { useContext } from 'react';

import { ISidebarContext, SidebarContext } from '../../../contexts/SidebarContext';
import './addnewchannel.css';

function AddNewChannel() {
  const { showAddNewChannel } = useContext(SidebarContext) as ISidebarContext;

  if (showAddNewChannel) {
    return <div className="add-channel">
      <p>New channel</p>
      <form className='add-channel__form' action="">
        <input type="text" name="channel-name" id="channel-name" placeholder='Channel name' required />
        <textarea name="channel-desc" id="channel-desc" placeholder='Channel Description' required ></textarea>
        <input className='add-channel__submit' type="submit" value="Save" />
      </form>
    </div>;
  } else {
    return <></>;
  }
}

export default AddNewChannel;
