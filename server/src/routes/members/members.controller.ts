import { getMembers } from '../../models/members.model.js';
import { iChannelData } from '../../socket.js';

async function httpGetMembers(channelData: iChannelData) {
  const membersInChannel = await getMembers(channelData);
  return membersInChannel;
}

export { httpGetMembers };
