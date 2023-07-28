import { ctrlWrapper } from "../decorators/index.js";
import { HttpError } from "../helpers/index.js";

import Movie from "../models/movie.js";

const getAll = async (req, res) => {
	// const result = await Movie.find({}, "-createdAt -updatedAt"); взяти все без цих полів
	// const result = await Movie.find({}, "createdAt updatedAt"); взяти тільки ці поля
	const { _id: owner } = req.user;
	const { page = 1, limit = 10 } = req.query;
	const skip = (page - 1) * limit;
	const result = await Movie.find({ owner }, "-createdAt -updatedAt", {
		skip,
		limit,
	}).populate("owner", "name email");
	res.json(result);
};

const getById = async (req, res) => {
	const { id } = req.params;
	const result = await Movie.findById(id);
	if (!result) {
		throw HttpError(404, `Movie with id ${id} not found`);
	}
	res.json(result);
};

const add = async (req, res) => {
	const { _id: owner } = req.user;
	const result = await Movie.create({ ...req.body, owner });
	res.status(201).json(result);
};

const update = async (req, res) => {
	const { id } = req.params;
	const result = await Movie.findByIdAndUpdate(id, req.body, { new: true });
	//{ new: true } повертає змінений обєкт бо без цього повертає старий до зміни
	if (!result) {
		throw HttpError(404, `Movie with id ${id} not found`);
	}
	res.json(result);
};

const updateFavorite = async (req, res) => {
	const { id } = req.params;
	const result = await Movie.findByIdAndUpdate(id, req.body, { new: true });
	//{ new: true } повертає змінений обєкт бо без цього повертає старий до зміни
	if (!result) {
		throw HttpError(404, `Movie with id ${id} not found`);
	}
	res.json(result);
};

const deleteById = async (req, res) => {
	const { id } = req.params;
	const result = await Movie.findByIdAndDelete(id);
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
	updateFavorite: ctrlWrapper(updateFavorite),
	deleteById: ctrlWrapper(deleteById),
};
