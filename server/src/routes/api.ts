import express from 'express'

import { googleRouter } from './googleAuth/googleAuth.router.js'

const api = express.Router()

api.use('/auth', googleRouter)



export {api}