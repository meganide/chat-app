import { useContext, useState } from 'react';

import { ISidebarContext, SidebarContext } from '../../../contexts/SidebarContext';
import './addnewchannel.css';
import CloseIcon from '@mui/icons-material/Close';
import Overlay from '../../Overlay/Overlay';
import { ISocketContext, SocketContext } from '../../../contexts/SocketContext';

function AddNewChannel() {
  const { socket } = useContext(SocketContext) as ISocketContext;
  const { showAddNewChannel, setShowAddNewChannel } = useContext(SidebarContext) as ISidebarContext;
  const [channelInfo, setChannelInfo] = useState({
    name: '',
    description: '',
  });

  function handleOnChange(e: any) {
    const name = e.target.name;
    const value = e.target.value;

    setChannelInfo((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  async function handleCreateChannel(e: any) {
    e.preventDefault();
    console.log(channelInfo);

    try {
      const res = await fetch('/api/channels', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(channelInfo),
      });

      const data = await res.json();
      console.log(data);

      if (res.ok) {
        setShowAddNewChannel(false);
      }
    } catch (err) {
      console.error(err);
    }
  }

  if (showAddNewChannel) {
    return (
      <Overlay>
        <div className="add-channel">
          <CloseIcon
            className="chat-sidebar__close-icon add-channel__close"
            onClick={() => setShowAddNewChannel(false)}
          />
          <p>New channel</p>
          <form className="add-channel__form" onSubmit={handleCreateChannel}>
            <input
              type="text"
              name="name"
              id="channel-name"
              placeholder="Channel name"
              required
              maxLength={20}
              onChange={handleOnChange}
            />
            <textarea
              name="description"
              id="channel-desc"
              placeholder="Channel Description"
              required
              maxLength={100}
              onChange={handleOnChange}
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
