import express from 'express'
import { registerUser } from '../controller/registerUser'
import checkEmail from '../controller/checkEmail'
import checkPassword from '../controller/chekPassword'



export const router = express.Router()


router.post('/register', registerUser)

router.post('/email', checkEmail)
router.post('/password', checkPassword)