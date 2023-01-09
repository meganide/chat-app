import { getMessages, saveMessage } from "../../models/messages.model.js";
import { iChannelData, iMsg } from "../../socket.js";

async function httpSaveMessage(msg: iMsg) {
  console.log(msg)
  await saveMessage(msg)
}

async function httpGetMessages(channelData: iChannelData) {
  const messages = await getMessages(channelData);
  return messages;
}

export {httpSaveMessage, httpGetMessages}