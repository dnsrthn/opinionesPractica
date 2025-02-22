import Publications from "./publications.model.js"
import Usuarios from "../user/user.model.js"

export const newPublication = async (req, res) =>{
    
    try{
        const {usuario} = req

        const {title, category, text} = req.body

        const newPost = new Publications({
            title,
            category,
            text,
            user: usuario._id 
        })

        const savePost = await newPublication.save()

        return res.status(201).json({
            success: true,
            message: "Post created successfully",
            publication: savePost
        })

    }catch(error){
        return res.status(500).json({
            success: false,
            message: "Error while creating post",
            error: error.message
        })
    }
}

export const updatePublication = async (req, res) =>{
    try{
        const {usuario} = req
        const {pid} = req.params
        const data = req.body
        
        const publication = await Publications.findById(pid)

        if (!publication) {
            return res.status(404).json({
                success: false,
                message: "Post not found"
            })
        }
        if (!publication.usuario.equals(usuario._id)) {
            return res.status(403).json({
                success: false,
                message: "You don't have permission to update this post"
            })
        }

        const updatedPost = await Publications.findOneAndUpdate(
            {_id: pid}, {$set: data}, { new: true }
           )
           return res.status(200).json({
               success: true,
               message: "Post updated successfully",
               updatedPost
           })

    }catch(error){
        return res.status(500).json({
            success: false,
            message: "Error while updating post",
            error: error.message
        })
    }
}

export const deletePublication = async (req, res) =>{

    try{
        const {usuario} = req
        const {pid} = req.params

        const publication = await Publications.findById(pid);

        if (!publication) {
            return res.status(404).json({
                success: false,
                message: "Post not found"
            })
        }
        if (!publication.usuario.equals(usuario._id)) {
            return res.status(403).json({
                success: false,
                message: "You don't have permission to delete this post"
            })
        }

        await Publications.findByIdAndDelete(pid);

        return res.status(200).json({
            success: true,
            message: "Post deleted successfully"
        })
    }catch(error){
        return res.status(500).json({
            success: false,
            message: "Error while deleting post",
            error: error.message
        })
    }
}