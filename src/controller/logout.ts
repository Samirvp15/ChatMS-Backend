import { CookieOptions, Request, Response } from 'express'



async function logout(req: Request, res: Response): Promise<void> {

    try {
        const cookieOptions: CookieOptions  = {
            httpOnly: true,
            secure: process.env.NODE_ENV_COOKIES === 'production',
            sameSite: process.env.NODE_ENV_COOKIES === 'production' ? 'none' : 'lax',
        }


        res.cookie('token', '', cookieOptions).status(200).json({
            message: 'Sesion Finalizada',
            success: true,
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

export default logout