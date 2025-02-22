import { Router } from "express"
import { deletePublication, newPublication, updatePublication } from "./publications.controller.js"
import { newPublicationValidator, updateDeletePublicationValidator } from "../../middlewares/publications-validator.js"

const router = Router()

router.post("/newPost", newPublicationValidator, newPublication)
router.put("/updatePost/:pid", updateDeletePublicationValidator, updatePublication)
router.delete("/deletPost/:pid", updateDeletePublicationValidator, deletePublication)

export default router