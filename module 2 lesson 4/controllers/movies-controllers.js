import { ctrlWrapper } from "../decorators/index.js";
import { HttpError } from "../helpers/index.js";

import moviesService from "../movies/index.js";

const getAll = async (req, res) => {
	const result = await moviesService.getAllMovies();
	res.json(result);
};

const getById = async (req, res) => {
	const { id } = req.params;
	const result = await moviesService.getMovieById(id);
	if (!result) {
		throw HttpError(404, `Movie with id ${id} not found`);
	}
	res.json(result);
};

const add = async (req, res) => {
	const result = await moviesService.addMovie(req.body);
	res.status(201).json(result);
};

const update = async (req, res) => {
	const { id } = req.params;
	// console.log(id, req.body);
	const result = await moviesService.updateMovieById(id, req.body);
	if (!result) {
		throw HttpError(404, `Movie with id ${id} not found`);
	}
	res.json(result);
};

const deleteById = async (req, res) => {
	const { id } = req.params;
	const result = await moviesService.deleteMovieByID(id);
	if (!result) {
		throw HttpError(404, `Movie with id ${id} not found`);
	}
	res.status(404).json({ message: "Delete success" });
};

export default {
	getAll: ctrlWrapper(getAll),
	getById: ctrlWrapper(getById),
	add: ctrlWrapper(add),
	update: ctrlWrapper(update),
	deleteById: ctrlWrapper(deleteById),
};
