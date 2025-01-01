import express from 'express'
import {registerUser} from '../controller/registerUser'



export const router = express.Router()


router.post('/register', registerUser)