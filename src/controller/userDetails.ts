import { Request, Response } from 'express'
import { getUserDetailsFromToken } from '../helpers/getDetailsFromToken'



async function userDetails(req: Request, res: Response): Promise<void> {
    try {
        const token = req.cookies.token || '';

        if(token === ''){
            res.status(401).json({
                message: 'Debe proporcionar token',
                error: true,
            })
            return
        }

        const user = await getUserDetailsFromToken(token);

        if(!user){
            res.status(401).json({
                message: 'Usuario no encontrado',
                error: true,
            })
            return
        }
  
        res.status(200).json({
            message: 'Detalles de Usuario',
            data: user,
        })
        return
    } catch (error) {
        res.status(500).json({
            message: (error as Error).message,
            error: true,
        })
        return
    }
}

export default userDetails