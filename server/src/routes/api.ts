import express from 'express'

import { googleRouter } from './googleAuth/googleAuth.router.js'
import { userRouter } from './user/user.router.js'
import { channelsRouter } from './channels/channels.router.js'

const api = express.Router()

api.use('/auth', googleRouter)
api.use('/user', userRouter)
api.use('/channels', channelsRouter)


export {api}