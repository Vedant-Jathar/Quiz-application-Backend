import { Router } from "express";
import { getUser, login, logout, register } from "../controllers/auth-controller";
import { validate } from "../validators/validate";
import { userLoginSchema, userRegisterSchema } from "../validators/userAuth-validators";

const router = Router()

router.post("/register", validate(userRegisterSchema), register)
router.post("/login", validate(userLoginSchema), login)
router.get("/get-user", getUser)
router.post("/logout", logout)

export default router
