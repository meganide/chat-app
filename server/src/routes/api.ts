import express from 'express'

import { googleRouter } from './googleAuth/googleAuth.router.js'
import { userRouter } from './user/user.router.js'

const api = express.Router()

api.use('/auth', googleRouter)
api.use('/user', userRouter)



export {api}