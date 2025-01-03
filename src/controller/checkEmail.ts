import { Request, Response } from 'express'
import { userModel } from '../models/User'



async function checkEmail(req: Request, res: Response): Promise<void> {

    try {

        const { email } = req.body
        const checkEmail = await userModel.findOne({ email })

        if (!checkEmail) {
            res.status(400).json({
                message: 'Usuario no encontrado',
                error: true,
                data: checkEmail
            })
        }

        res.status(200).json({
            message: 'Usuario verificado',
            success: true
        })

    } catch (error) {
        res.status(500).json({
            message: (error as Error).message,
            error: true
        })
    }

}

export default checkEmail