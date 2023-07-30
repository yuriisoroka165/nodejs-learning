import express from "express";

import userControllers from "../controllers/userControllers.js";
import validateBody from "../middlewares/validation.js";
import { signupSchema, signinSchema } from "../schemas/signSchemas.js";
import authenticate from "../middlewares/authenticate.js";

const userRouter = express.Router();

userRouter.post(
	"/signup",
	validateBody(signupSchema),
	userControllers.signupController
);
userRouter.post(
	"/login",
	validateBody(signinSchema),
	userControllers.loginController
);
userRouter.post("/logout", authenticate);
userRouter.get("/current", authenticate);

export default userRouter;
