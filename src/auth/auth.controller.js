import bcrypt from 'bcrypt';
import Usuario from "../user/user.model.js"
import { generateJWT } from "../helpers/generate-jwt.js"

export const register = async (req, res, next) =>{
    try{
        const data = req.body;
        let profilePicture = req.file ? req.file.filename : null;
        const skips = bcrypt.genSaltSync(10);
        const encryptedPassword = bcrypt.hashSync(data.password, skips)
        data.password = encryptedPassword
        data.profilePicture = profilePicture

        const user = await Usuario.create(data)

        return res.status(201).json({
            message: "User registered successfully",
            name: user.name,
            mail: user.mail
        });
    }catch(err){
        return res.status(500).json({
            success: false,
            message: "Error while registering user",
            error: err.message

        })
    }
}

export const login = async (req, res) => {
    const { mail, username, password } = req.body
    try{
        const user = await Usuario.findOne({
            $or:[{mail: mail}, {username: username}]
        })
        if(!user){
            return res.status(400).json({
                message: "Invalid credentials",
                error:"User or Email not found"
            })
        }

        const validPassword = await bcrypt.compare(password, user.password);
        if (!validPassword) {
            return res.status(400).json({
                message: "Invalid credentials",
                error: "Incorrect password"
            });
        }
        const token = await generateJWT(user._id)

        return res.status(200).json({
            message: "Login successful",
            userDetails: {
                token: token
            }
        })
    }catch(err){
        return res.status(500).json({
            message: "Login failed",
            error: err.message
        })
    }
}