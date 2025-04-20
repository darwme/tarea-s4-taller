import { Router } from "express";
import { AuthController } from "../controllers/auth.js";

const authAPIRouter = Router();

authAPIRouter.post("/login", AuthController.login);
authAPIRouter.post("/register", AuthController.register);
authAPIRouter.post("/logout", AuthController.logout);

export default authAPIRouter;
