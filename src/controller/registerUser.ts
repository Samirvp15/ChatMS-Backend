import { Request, Response } from 'express'
import { userModel } from '../models/User'
import bcrypt from 'bcryptjs'

export const registerUser = async (req: Request, res: Response): Promise<void> => {

    try {

        const { name, email, password, profile_pic } = req.body
        const checkEmail = await userModel.findOne({ email })

        if (checkEmail) {
            res.status(400).json({
                message: 'Usuario ya registrado',
                error: true
            })
        }

        const salt = await bcrypt.genSalt(10)
        const hashPassword = await bcrypt.hash(password, salt)

        const payload = {
            ...req.body,
            password: hashPassword
        }

        const newUser = new userModel(payload)
        const userSave = await newUser.save()

        res.status(201).json({
            message: 'Usuario Creado con exito',
            data: userSave,
            success: true
        })

    } catch (error) {
        res.status(500).json({
            message: (error as Error).message,
            error: true
        })
    }
}

