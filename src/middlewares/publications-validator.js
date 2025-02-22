import { body, param } from "express-validator";
import { handleErrors } from "./handleErrors.js";
import { validateJWT } from "./validate-jwt.js";
import { hasRoles } from "./validate-role.js";
import { validateFields } from "./validate-fields.js";

export const newPublicationValidator =[
    validateJWT,
    body("title").notEmpty().withMessage("The title is required"),
    body("category").isMongoId().withMessage("It is not a valid MongoDB ID"),
    body("text").notEmpty().withMessage("The text is required"),
    validateFields,
    handleErrors
]

export const updateDeletePublicationValidator=[
    validateJWT,
    param("pid").isMongoId().withMessage("It is not a valid MongoDB ID"),
    validateFields,
    handleErrors
]

