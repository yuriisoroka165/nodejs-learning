import express from "express";

import { validateBody } from "../../decorators/index.js";
import userSchemas from "../../schemas/users-schemas.js";
import authController from "../../controllers/auth-controllers.js";

const authRouter = express.Router();

authRouter.post(
	"/signup",
	validateBody(userSchemas.usersSignupSchema),
	authController.signup
);
authRouter.post(
	"/signin",
	validateBody(userSchemas.usersSigninSchema),
	authController.signin
);

export default authRouter;
