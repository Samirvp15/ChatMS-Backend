import { Request, response, Response } from 'express'
import { userModel } from '../models/User'



export const searchUser = async (req: Request, res: Response): Promise<void> => {

    try {
        const { search } = req.body
        const query = new RegExp(search, 'ig')
        const user = await userModel.find({
            "$or": [
                { name: query },
                { email: query }
            ]
        })
        res.json({
            message: 'Todos los usuarios',
            data: user,
            success: true
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