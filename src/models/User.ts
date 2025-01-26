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

userSchema.set('toJSON',{
    transform: (document, returnedObject,) => {
       
        //delete returnedObject._id
        delete returnedObject.__v
        delete returnedObject.password
    }
})

export const userModel = mongoose.model('User', userSchema)