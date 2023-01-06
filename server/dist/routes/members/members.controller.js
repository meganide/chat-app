import { getMembers } from '../../models/members.model.js';
async function httpGetMembers(channelData) {
    const membersInChannel = await getMembers(channelData);
    return membersInChannel;
}
export { httpGetMembers };
