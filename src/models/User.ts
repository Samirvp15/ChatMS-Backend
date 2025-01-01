import mongoose from "mongoose";



const userSchema = new mongoose.Schema({
    name:{
        type: String,
        required: [true, 'Nombre requerido']
    },
    email:{
        type: String,
        required: [true, 'Correo requerido']
    },
    password:{
        type: String,
        required: [true, 'Contraseña requerido']
    },
    profile_pic:{
        type: String,
        default: ''
    },
},{
    timestamps: true
})

export const userModel = mongoose.model('User', userSchema)