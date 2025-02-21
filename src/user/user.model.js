import { Schema, model } from "mongoose";

const userSchema = Schema({
    name:{
        type: String,
        required: [true, "Name is required"],
        maxLength: [30, "Name cannot exceed 30 characters"]
    },
    lastName:{
        type: String,
        required: [true, "Last name is required"],
        maxLength: [30, "Last name cannot exceed 30 characters"]
    },
    username:{
        type: String,
        required: [true, "Username is required"],
        unique: true,
        maxLength: [15, "Username cannot exceed 15 characters"]
    },
    mail:{
        type: String,
        required: [true, "Email is required"],
        unique: true
    },
    password:{
        type: String,
        required: [true, "Password is required"]
    },
    rol:{
        type: String,
        required: true,
        enum: ["ADMIN", "CLIENT"],
        default: "CLIENT"
    },
    status:{
        type: Boolean,
        default: true
    },
    profilePicture:{
        type: String
    }
})

userSchema.methods.toJSON = function(){
    const {contra, _id, ...usuario} = this.toObject()
    usuario.uid = _id
    return usuario
}

export default model("User", userSchema)