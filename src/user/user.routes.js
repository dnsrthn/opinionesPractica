import { Router } from "express";
import { updateUser, updatePassword } from "./user.controller.js";
import { actualizarUsuarioValidator, actualizarContraValidator } from "../middlewares/user-validator.js";

const router = Router()

router.put("/updateUser", actualizarUsuarioValidator, updateUser);

router.patch("/updatePassword", actualizarContraValidator, updatePassword)

export default router;