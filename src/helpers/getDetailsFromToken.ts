import jwt, { TokenExpiredError } from 'jsonwebtoken'
import { userModel } from '../models/User'

interface userDetails {
  message?: string,
  logout?: boolean,
  name?: string,
  email?: string,
  profile_pic?: string,
  _id?: string
}

export const getUserDetailsFromToken = async (token: string): Promise<userDetails> => {
  if (!token) {
    return {
      message: 'Sesión terminada',
      logout: true,
    }
  }

  try {
    const decoded = jwt.verify(token, process.env.SECRET_JWT_KEY || '') as { id: string }
    const user = await userModel.findById(decoded.id).select('name email profile_pic _id')
    
    if (!user) {
      return {
        message: 'Usuario no encontrado',
        logout: true,
      }
    }

    return {
      _id: user._id.toString(),
      name: user.name,
      email: user.email,
      profile_pic: user.profile_pic
    }
  } catch (error) {
    if (error instanceof TokenExpiredError) {
      return {
        message: 'Token expirado',
        logout: true,
      }
    }
    return {
      message: 'Token inválido',
      logout: true,
    }
  }
}
