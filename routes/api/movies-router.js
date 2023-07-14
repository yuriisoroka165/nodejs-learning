import express from "express";
import Joi from "joi";

import moviesService from "../../models/movies/index.js";
import { HttpError } from "../../helpers/index.js";

const moviesRouter = express.Router();

const moviesAddSchema = Joi.object({
	title: Joi.string().required(),
	director: Joi.string().required(),
});

moviesRouter.get("/", async (req, res) => {
	try {
		const result = await moviesService.getAllMovies();
		res.json(result);
	} catch (error) {
		next(error);
	}
});

moviesRouter.get("/:id", async (req, res, next) => {
	try {
		const { id } = req.params;
		const result = await moviesService.getMovieById(id);
		if (!result) {
			throw HttpError(404, `Movie with id ${id} not found`);
		}
		res.json(result);
	} catch (error) {
		next(error); //шукати функцію обробник помилок яка має 4 параметри (err,req,res,next)
	}
});

moviesRouter.post("/", async (req, res, next) => {
	try {
		const { error } = moviesAddSchema.validate(req.body);
		if (error) {
			throw HttpError(400, error.message);
		}
		const result = await moviesService.addMovie(req.body);
		res.status(201).json(result);
	} catch (error) {
		next(error);
	}
});

moviesRouter.put("/:id", async (req, res, next) => {
	try {
		const { error } = moviesAddSchema.validate(req.body);
		if (error) {
			throw HttpError(400, error.message);
		}
		const { id } = req.params;
		const result = await moviesService.updateMovieById(id, req.body);
		if (!result) {
			throw HttpError(404, `Movie with id ${id} not found`);
		}
		res.json(result);
	} catch (error) {
		next(error); //шукати функцію обробник помилок яка має 4 параметри (err,req,res,next)
	}
});

moviesRouter.delete("/:id", async (req, res, next) => {
	try {
		const { id } = req.params;
		const result = await moviesService.deleteMovieByID(id);
		if (!result) {
			throw HttpError(404, `Movie with id ${id} not found`);
		}
		res.status(404).json({ message: "Delete success" });
	} catch (error) {
		next(error); //шукати функцію обробник помилок яка має 4 параметри (err,req,res,next)
	}
});

export default moviesRouter;
