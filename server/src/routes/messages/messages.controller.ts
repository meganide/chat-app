import { saveMessage } from "../../models/messages.model.js";
import { iMsg } from "../../socket.js";

async function httpSaveMessage(msg: iMsg) {
  const resp = await saveMessage(msg)
  console.log(resp)
}

export {httpSaveMessage}