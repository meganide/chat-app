import { saveMessage } from "../../models/messages.model.js";
async function httpSaveMessage(msg) {
    const resp = await saveMessage(msg);
    console.log(resp);
}
export { httpSaveMessage };
