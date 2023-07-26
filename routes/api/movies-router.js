import express from "express";


import moviesControllers from "../../controllers/movies-controllers.js";
import { validateBody } from "../../decorators/index.js";
import moviesAddSchema from "../../schemas/movies-chemas.js";

const moviesRouter = express.Router();

moviesRouter.get("/", moviesControllers.getAll);

moviesRouter.get("/:id", moviesControllers.getById);

moviesRouter.post("/", validateBody(moviesAddSchema), moviesControllers.add);

moviesRouter.put(
	"/:id",
	validateBody(moviesAddSchema),
	moviesControllers.update
);

moviesRouter.delete("/:id", moviesControllers.deleteById);

export default moviesRouter;
