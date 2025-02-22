import { Router } from "express"
import { addComment, deleteComment, editComment } from "./comments.controller"
import { addCommentValidator, deleteCommentValidator, updateCommentValidator } from "../middlewares/comments-validator";

const router = Router()

router.post("/addComment/:pid", addCommentValidator, addComment)

router.patch("/updateComment/:cid", updateCommentValidator, editComment)

router.delete("/deleteComment/:cid", deleteCommentValidator, deleteComment)


export default router