import { body } from "express-validator"
import { emailExists, userExists, usernameExists } from "../helpers/db-validators.js"
import { handleErrors } from "./handleErrors.js"
import { validateJWT } from "./validate-jwt.js"
import { hasRoles } from "./validate-role.js"
import { validateFields } from "./validate-fields.js"
import { deleteFileOnError } from "./delete-file-on-error.js"

export const registerValidator = [
    body("name").notEmpty().withMessage("Name is required"),
    body("username").notEmpty().withMessage("Username is required"),
    body("mail").notEmpty().withMessage("Email is required"),
    body("mail").isEmail().withMessage("Provide a valid email"),
    body("mail").custom(emailExists),
    body("username").custom(usernameExists),
    body("password").isStrongPassword({
        minLength: 8,
        minLowercase:1,
        minUppercase: 1,
        minNumbers: 1,
        minSymbols: 1,
        maxLength: 15
    }),
    validateFields,
    deleteFileOnError,
    handleErrors
]

export const loginValidator = [
    body("correo").optional().isEmail().withMessage("Email invalid"),
    validateFields
]

export const updateUserValidator = [
    validateJWT,
    hasRoles("CLIENT", "ADMIN"),
    body("username").custom(usernameExists),
    validateFields,
    handleErrors
]

export const updatePasswordValidator = [
    validateJWT,
    hasRoles("CLIENT", "ADMIN"),
    validateFields,
    handleErrors
]