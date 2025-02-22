import { body, param } from "express-validator"
import { validateJWT } from "./validate-jwt.js"
import { handleErrors } from "./handleErrors.js"
import { validateFields } from "./validate-fields.js"

export const addCommentValidator =[
    validateJWT,
        body("texto").notEmpty().withMessage("Text is requerido"),
        param("pid").isMongoId().withMessage("It is not a valid MongoDB ID"),
        validateFields,
        handleErrors
]

export const updateCommentValidator =[
    validateJWT,
    body("texto").notEmpty().withMessage("texto es requerido"),
    param("cid").isMongoId().withMessage("it is not a valid MongoDB ID"),
    validateFields,
    handleErrors
]

export const deleteCommentValidator =[
    validateJWT,
    param("cid").isMongoId().withMessage("itss not a valid MongoDB ID"),
    validateFields,
    handleErrors
]