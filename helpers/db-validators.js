import Usuario from "../user/user.model.js";

export const emailExists = async (correo = "") => {
    const exists = await Usuario.findOne({correo})
    if(exists){
        throw new Error(`Email ${correo} is already registered`)
    }
}

export const userExists = async (uid = " ") => {
    const exists = await Usuario.findById(uid)
    if(!exists){
        throw new Error("No user found with that ID")
    }
}

export const usernameExists = async (username = " ") =>{
    const exists = await Usuario.findOne({username})
    if(exists){
        throw new Error(`Username ${username} is already taken`)
    }
}