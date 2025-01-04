import jwt from 'jsonwebtoken'
import { userModel } from '../models/User'


interface userDetails {
    name: string,
    email: string,
    profile_pic: string,
    _id: string
}


export const getUserDetailsFromToken = async (token: string): Promise<userDetails> => {
    // if (!token) {
    //     return {
    //         message: 'Sesion terminada',
    //         logout: true,
    //     }
    // }

    const decode = jwt.verify(token, process.env.SECRET_JWT_KEY || '') as { id: string }
    const user = await userModel.findById(decode.id).select('name email profile_pic _id') // selecciona solo los campos necesarios

    const userDetails: userDetails = {
        _id: user!._id.toString(),
        name: user!.name,
        email: user!.email,
        profile_pic: user!.profile_pic
    }

    return userDetails


}

