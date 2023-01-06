import express from 'express';
import { httpCreateChannel, httpGetChannels } from './channels.controller.js';
const channelsRouter = express.Router();
channelsRouter.get('/', httpGetChannels);
channelsRouter.post('/', httpCreateChannel);
export { channelsRouter };
