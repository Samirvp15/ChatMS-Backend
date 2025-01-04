import express from 'express'
import { registerUser } from '../controller/registerUser'
import checkEmail from '../controller/checkEmail'
import checkPassword from '../controller/checkPassword'
import userDetails from '../controller/userDetails'
import logout from '../controller/logout'
import updateUserDetails from '../controller/updateUserDetails'



export const router = express.Router()


router.post('/register', registerUser)

router.post('/email', checkEmail)
router.post('/password', checkPassword)
router.get('/user-details', userDetails)
router.get('/logout', logout)
router.post('/update-user', updateUserDetails)
