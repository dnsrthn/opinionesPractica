import bcrypt from "bcrypt"
import Usuarios from "./user.model.js"

export const updateUser = async (req, res) =>{
    try{
        const {usuario} = req;
        const data = req.body;
        
        const updatedUser = await Usuarios.findOneAndUpdate(
            usuario, {$set: data}, { new: true }
           );
   
           if (!updatedUser) {
               return res.status(403).json({
                   success: false,
                   message: "Admins cannot be updated or user not found" 
               });
           }
           return res.status(200).json({
               success: true,
               message: "User updated successfully",
               updatedUser
           });
    }catch(err){
        return res.status(500).json({
            success: false,
            message: "Error while updating user",
            error: err.message
        })
    }
}

export const updatePassword = async (req, res) =>{
    try{
        const {usuario} = req
        const {oldPassword, newPassword} = req.body

        const user = await Usuarios.findById(usuario._id)

        if(!user){
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }
        const igual = await bcrypt.compare(oldPassword, user.password)

        if (!igual) {
            return res.status(400).json({
                success: false,
                message: "Old password is incorrect"
            })
        }
        user.password = newPassword
        const skips = await bcrypt.genSalt(10)
        const hashNewPass = await bcrypt.hash(newPassword, skips)

        user.password = hashNewPass
        await user.save()

        return res.status(200).json({
            success: true,
            message: "Password updated successfully"
        })
    }catch(err){
        return res.status(500).json({
            success: false,
            message: "Error while updating password",
            error: err.message
        })
    }
}