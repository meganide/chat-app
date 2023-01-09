import { getMessages, saveMessage } from "../../models/messages.model.js";
async function httpSaveMessage(msg) {
    console.log(msg);
    await saveMessage(msg);
}
async function httpGetMessages(channelData) {
    const messages = await getMessages(channelData);
    return messages;
}
export { httpSaveMessage, httpGetMessages };
