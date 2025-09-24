import { Router } from "express";
import { login, register } from "../controllers/auth-controller";
import { validate } from "../validators/validate";
import { userLoginSchema, userRegisterSchema } from "../validators/userAuth-validators";

const router = Router()

router.post("/register", validate(userRegisterSchema), register)
router.post("/login", validate(userLoginSchema), login)

export default router
