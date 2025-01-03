import jwt from 'jsonwebtoken'
import { userModel } from '../models/User'





export const getUserDetailsFromToken = async (token: string): Promise<typeof userModel | {}> => {
    if (!token) {
        return {
            message: 'Sesion terminada',
            logout: true,
        }
    }

    try {
        const decode = jwt.verify(token, process.env.SECRET_JWT_KEY || '') as { id: string }
        const user = await userModel.findById(decode.id) as typeof userModel

        if (!user) {
            return {
                message: 'Usuario no encontrado',
                logout: true,
            }
        }

        return user
    } catch (error) {
        return {
            message: 'Token inválido o error en la verificación',
            logout: true,
        }
    }
}

