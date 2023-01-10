import { useContext, useState } from 'react';

import './addnewchannel.css';
import { ISidebarContext, SidebarContext } from '../../../contexts/SidebarContext';
import CloseIcon from '@mui/icons-material/Close';
import Overlay from '../../Overlay/Overlay';

function AddNewChannel() {
  const { showAddNewChannel, setShowAddNewChannel } = useContext(SidebarContext) as ISidebarContext;
  
  const [channelInfo, setChannelInfo] = useState({
    name: '',
    description: '',
  });
  const [error, setError] = useState('');

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

    try {
      setError('');

      const res = await fetch('/api/channels', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(channelInfo),
      });

      const data = await res.json();

      if (res.ok) {
        setShowAddNewChannel(false);
      }

      if (data.error) {
        setError(data.error);
      }

    } catch (err: any) {
      console.log(err);
      setError('Something went wrong!');
    }
  }

  if (showAddNewChannel) {
    return (
      <Overlay>
        <div className="add-channel">
          <CloseIcon
            className="chat-sidebar__close-icon add-channel__close"
            onClick={() => {
              setShowAddNewChannel(false);
              setError('');
            }}
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
            {<p className='add-channel__error'>{error}</p>}
          </form>
        </div>
      </Overlay>
    );
  } else {
    return <></>;
  }
}

export default AddNewChannel;
