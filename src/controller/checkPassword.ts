import { CookieOptions, Request, Response } from 'express'
import { userModel } from '../models/User'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'



async function checkPassword(req: Request, res: Response): Promise<void> {

    try {

        const { password, id } = req.body

        const user = await userModel.findById(id)

        const verifyPassword = await bcrypt.compare(password, user?.password || '')

        if (!verifyPassword) {
            res.status(400).json({
                message: 'Porfavor verifica tu contraseña',
                error: true
            })
            return

        }

        const tokenData = {
            id: user?._id,
            email: user?.email
        }

        const token = await jwt.sign(tokenData, process.env.SECRET_JWT_KEY || '', {
            expiresIn: '1d'
        })

        const cookieOptions: CookieOptions  = {
            httpOnly: true,
            secure: process.env.NODE_ENV_COOKIES === 'production',
            sameSite: process.env.NODE_ENV_COOKIES === 'production' ? 'none' : 'lax',
        }


        res.cookie('token', token, cookieOptions).status(200).json({
            message: 'Inicio de Sesion exitoso',
            success: true,
            token: token
        })
        return

    } catch (error) {
        res.status(500).json({
            message: (error as Error).message,
            error: true
        })
        return
    }

}

export default checkPassword