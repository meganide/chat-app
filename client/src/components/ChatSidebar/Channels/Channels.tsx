import { useState } from 'react';

import Channel from '../../Channel/Channel';
import { iChannels } from '../ChatSidebarChannel/ChatSidebarChannel';

interface iProps {
  channels: iChannels[];
  setChannels: React.Dispatch<React.SetStateAction<iChannels[]>>;
}

function Channels({ setChannels, channels }: iProps) {
  const [searchChannelQuery, setSearchChannelQuery] = useState('');

  return (
    <>
      <input
        className="channel-input input"
        type="text"
        placeholder="Search for a channel..."
        value={searchChannelQuery}
        onChange={(e) => setSearchChannelQuery(e.target.value)}
      />
      {channels &&
        channels
          .filter((channel) => {
            if (searchChannelQuery === '') {
              return channel;
            } else if (channel.name.toLowerCase().includes(searchChannelQuery.toLowerCase())) {
              return channel;
            }
          })
          .map((channel) => {
            return (
              <Channel
                key={crypto.randomUUID()}
                name={channel.name}
                description={channel.description}
              />
            );
          })}
    </>
  );
}

export default Channels;
