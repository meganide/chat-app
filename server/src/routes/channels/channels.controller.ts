import { createChannel, getChannels } from '../../models/channels.model.js';
import { io } from '../../server.js';

async function httpCreateChannel(req: any, res: any) {
  const data = req.body;

  try {
    await createChannel(data);
    const allChannels = await getChannels();
    io.emit('new_channel', allChannels);
    return res.status(201).json({ message: 'Successfully created channel!' });
  } catch (err) {
    console.log(err);
  }
}

async function httpGetChannels(req: any, res: any) {
  try {
    const channels = await getChannels()
    return res.status(200).json(channels)
  } catch (error) {
    console.log(error)
  }
}

export { httpCreateChannel, httpGetChannels };
