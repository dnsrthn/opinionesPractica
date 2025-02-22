import { Router } from "express"
import { addCategoryValidator, deleteCategoryValidator, editCategoryValidator } from "../../middlewares/category-validator"
import { addCategory, deleteCategory, editCategory } from "./category.controller.js"

const router = Router()

router.post("/addCategoy", addCategoryValidator, addCategory)

router.patch("/editCategory/:caid", editCategoryValidator, editCategory)

router.delete("/deletCategory/:caid", deleteCategoryValidator, deleteCategory)

export default router