import { createChannel, getChannels, saveUserToChannel } from '../../models/channels.model.js';
import { io } from '../../server.js';
import { iChannelData } from '../../socket.js';

async function httpCreateChannel(req: any, res: any) {
  const data = req.body;

  try {
    await createChannel(data);
    const allChannels = await getChannels();
    io.emit('new_channel', allChannels);
    return res.status(201).json({ message: 'Successfully created channel!' });
  } catch (err: any) {
    console.log(err);
    if (err.code === 'ER_DUP_ENTRY') {
      return res.status(400).json({ error: 'Channel name already exists!' });
    }
  }
}

async function httpGetChannels(req: any, res: any) {
  try {
    const channels = await getChannels();
    return res.status(200).json(channels);
  } catch (error) {
    console.log(error);
  }
}

async function httpSaveUserToChannel(channelData: iChannelData) {
  try {
    const resp = await saveUserToChannel(channelData);
    console.log(resp);
  } catch (error) {
    console.log(error);
  }
}

export { httpCreateChannel, httpGetChannels, httpSaveUserToChannel };
