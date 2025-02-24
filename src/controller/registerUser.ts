import { Request, Response } from 'express'
import { userModel } from '../models/User'
import bcrypt from 'bcryptjs'

export const registerUser = async (req: Request, res: Response): Promise<void> => {

    try {

        const { name, email, password } = req.body
        const checkEmail = await userModel.findOne({ email })
        const nameTrimmed = name.trim()

        if (checkEmail) {
            res.status(400).json({
                message: 'Usuario ya registrado',
                error: true
            })
            return
        }

        const salt = await bcrypt.genSalt(10)
        const hashPassword = await bcrypt.hash(password, salt)

        const payload = {
            ...req.body,
            name: nameTrimmed,
            password: hashPassword
        }

        const newUser = new userModel(payload)
        const userSave = await newUser.save()

        res.status(201).json({
            message: 'Usuario Creado con exito',
            data: userSave,
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

