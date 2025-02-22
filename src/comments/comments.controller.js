import Comments from "./comments.model.js"
import Publications from "../publications/publications.model.js"

export const addComment = async (req, res) =>{
    try{
        const {usuario} = req
        const {pid} = req.params
        const {text} = req.body

        const publication = await Publications.findById(pid)
        if (!publication) {
            return res.status(404).json({
                success: false,
                message: "Post not found"
            })
        }
        const newComment = new Comments({
             text,
            user: user._id
        })
        const savedComment = await newComment.save()

        publication.comments.push(savedComment._id)
        await publication.save()

        await publication.populate({
            path: "Comments", 
            select: "texto -_id", 
            populate: {
                path: "user", 
                select: "username -_id"
            }
        })

        return res.status(200).json({
            success: true,
            message: "Comment added successfully",
            
            postWithComments: {
                user: publication.user, 
                title: publication.title,
                text: publication.text,
                comments: publication.comments 
            }

        })

    }catch(err){
        return res.status(500).json({
            success: false,
            message: "Error while adding the comment",
            error: err.message
        });
    }
}

export const editComment = async (req, res) =>{
    try{
        const {user} = req
        const {cid} = req.params
        const {text} = req.body

        const comment = await Comments.findById(cid)
        if (!comment) {
            return res.status(404).json({
                success: false,
                message: "Comment not found"
            })
        }
        console.log(comment)
        if (!comment.user.equals(user._id)) {
            return res.status(400).json({
                success: false,
                message: "You don't have permission to edit this comment"
            })
        }

        comment.text = text;
        const newComment = await comment.save();


        const respuesta = {
            text: newComment.text,
            user: newComment.user.name
        }
        return res.status(200).json({
            success: true,
            message: "Comment edited successfully",
            respuesta
        })
    }catch(err){
        return res.status(500).json({
            success: false,
            message: "Error while editing the comment",
            error: err.message
        })
    }
}

export const deleteComment = async (req, res) =>{
    try{
        const {usuario} = req;
        const {cid} = req.params;

        const comment = await Comments.findById(cid);
        if (!comment) {
            return res.status(404).json({
                success: false,
                message: "comment not found"
            })
        }
        if (!comment.usuario.equals(usuario._id)) {
            return res.status(403).json({
                success: false,
                message: "You don't have permission to delete this comment"
            });
        }
        const publication = await Publications.findOne({ commets: cid })
        if (publication) {
            publication.commets = publication.commets.filter(
                comentarioId => comentarioId.toString() !== cid.toString()
            )
            await publication.save()
        }

        await Comments.findByIdAndDelete(cid)


        return res.status(200).json({
            success: true,
            message: "Comment deleted successfully"
        })

    }catch(err){
        return res.status(500).json({
            success: false,
            message: "error while deleting the comment",
            error: err.message
        })
    }
}