import express from "express";

import moviesControllers from "../../controllers/movies-controllers.js";
import { validateBody } from "../../decorators/index.js";
import moviesSchemas from "../../schemas/movies-schemas.js";
import {
	authenticate,
	isEmptyBody,
	isValidId,
} from "../../middlewars/index.js";

const moviesRouter = express.Router();

moviesRouter.use(authenticate);

moviesRouter.get("/", moviesControllers.getAll);

moviesRouter.get("/:id", isValidId, moviesControllers.getById);

moviesRouter.post(
	"/",
	isEmptyBody,
	validateBody(moviesSchemas.moviesAddSchema),
	moviesControllers.add
);

moviesRouter.put(
	"/:id",
	isValidId,
	isEmptyBody,
	validateBody(moviesSchemas.moviesAddSchema),
	moviesControllers.update
);
moviesRouter.patch(
	"/:id/favorite",
	isValidId,
	isEmptyBody,
	validateBody(moviesSchemas.movieUpdateFavoriteSchema),
	moviesControllers.updateFavorite
);

moviesRouter.delete("/:id", isValidId, moviesControllers.deleteById);

export default moviesRouter;
