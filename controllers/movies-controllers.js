import Joi from "joi";

import { ctrlWrapper } from "../decorators/index.js";
import { HttpError } from "../helpers/index.js";

import moviesService from "../movies/index.js";

const getAll = async (req, res) => {
	const result = await moviesService.getAllMovies();
	res.json(result);
};

const getById = async (req, res, next) => {
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
};

const add = async (req, res, next) => {
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
};

const update = async (req, res, next) => {
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
};

const deleteById = async (req, res, next) => {
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
};

export default {
	getAll: ctrlWrapper(getAll),
	getById: ctrlWrapper(getById),
	add: ctrlWrapper(add),
	update: ctrlWrapper(update),
	deleteById: ctrlWrapper(deleteById),
};
