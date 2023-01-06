import { createChannel, getChannels, saveUserToChannel } from '../../models/channels.model.js';
import { io } from '../../server.js';
async function httpCreateChannel(req, res) {
    const data = req.body;
    try {
        await createChannel(data);
        const allChannels = await getChannels();
        io.emit('new_channel', allChannels);
        return res.status(201).json({ message: 'Successfully created channel!' });
    }
    catch (err) {
        console.log(err);
        if (err.code === 'ER_DUP_ENTRY') {
            return res.status(400).json({ error: 'Channel name already exists!' });
        }
    }
}
async function httpGetChannels(req, res) {
    try {
        const channels = await getChannels();
        return res.status(200).json(channels);
    }
    catch (error) {
        console.log(error);
    }
}
async function httpSaveUserToChannel(channelData) {
    try {
        const resp = await saveUserToChannel(channelData);
    }
    catch (error) {
        console.log(error);
    }
}
export { httpCreateChannel, httpGetChannels, httpSaveUserToChannel };
