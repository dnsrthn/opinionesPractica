import bcrypt from "bcrypt"
import Usuarios from "../src/user/user.model.js"

export const defaultAdmin = async() =>{
    try{
        const administratorExists = await Usuarios.findOne({ rol: "ADMIN" })

        if (administratorExists) {
            console.log("Default administrator already exists.")
            return;
        }

        const adminData = {
            name: "Administrador",
            lastName: "Default",
            username: "defaultAdmin",
            mail: "defaul@admin.com",
            password: "DefAdmin!78",
            rol: "ADMIN"
        }

        const skips = await bcrypt.genSalt(10)
        adminData.password = await bcrypt.hash(adminData.password, skips)

        const newAdministrator = new Usuarios(adminData)
        await newAdministrator.save()

        console.log("Default administrator created successfully.")
    }catch(error){
        console.error("Error while creating defaul Administrator:", error.message)
    }
}