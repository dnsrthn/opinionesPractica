import { body } from "express-validator"
import { validateJWT } from "./validate-jwt.js"
import { handleErrors } from "./handleErrors.js"
import { validateFields } from "./validate-fields.js"
import { hasRoles } from "./validate-role.js"

export const addCategoryValidator =[
        validateJWT,
        hasRoles("ADMIN"),
        body("name").notEmpty().withMessage("Name for the category is required"),
        validateFields,
        handleErrors
]


export const editCategoryValidator =[
    validateJWT,
    hasRoles("ADMIN"),
    body("name").notEmpty().withMessage("Name for the category is required"),
    validateFields,
    handleErrors
]

export const deleteCategoryValidator =[
    validateJWT,
    hasRoles("ADMIN"),
    validateFields,
    handleErrors
]
