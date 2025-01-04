import { Request, Response } from 'express'
import { getUserDetailsFromToken } from '../helpers/getDetailsFromToken';
import { userModel } from '../models/User';



async function updateUserDetails(req: Request, res: Response): Promise<void> {

    try {
        const token = req.cookies.token || '';

        if(token === ''){
            res.status(401).json({
                message: 'Debe proporcionar token.',
                error: true,
            })
            return
        }

        const user = await getUserDetailsFromToken(token);
        
        const { name, profile_pic } = req.body
        await userModel.updateOne(
            { _id: user._id },
            {
                name,
                profile_pic
            }
        )

        const userInfo = await userModel.findById(user._id)

        res.status(200).json({
            message: 'Informacion actualizada corrrectamente',
            data: userInfo,
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

export default updateUserDetails