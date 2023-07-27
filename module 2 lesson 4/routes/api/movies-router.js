import express from "express";

import moviesControllers from "../../controllers/movies-controllers.js";
import { validateBody } from "../../decorators/index.js";
import moviesSchemas from "../../schemas/movies-chemas.js";
import { isEmptyBody } from "../../middlewars/index.js";

const moviesRouter = express.Router();

moviesRouter.get("/", moviesControllers.getAll);

moviesRouter.get("/:id", moviesControllers.getById);

moviesRouter.post(
	"/",
	isEmptyBody,
	validateBody(moviesSchemas.moviesAddSchema),
	moviesControllers.add
);

moviesRouter.put(
	"/:id",
	isEmptyBody,
	validateBody(moviesSchemas.moviesAddSchema),
	moviesControllers.update
);

moviesRouter.delete("/:id", moviesControllers.deleteById);

export default moviesRouter;
