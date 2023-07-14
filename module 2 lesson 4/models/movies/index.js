import fs from "fs/promises";
import path from "path";
import { nanoid } from "nanoid";

const moviesPath = path.resolve("models", "movies", "movies.json"); //обєднує в один шлях і нормалізує його відносно операційної системи //зробити абсолютнгий шлях
// console.log(moviesPath); // шлях відпершоджерела
// console.log(path.join("movies", "movies.json")); //join просто обєднує шляхи
// __dirname це common js застаріле в ES6 модулях її немає

const updateMoviesStorage = (movies) =>
	fs.writeFile(moviesPath, JSON.stringify(movies, null, 2)); //щоб все не було в одну строку

export const getAllMovies = async () => {
	const data = await fs.readFile(moviesPath, "utf-8"); // підставлено абсолютний шлях
	return JSON.parse(data); //навіть якщо передати буфер без вказання кодування то джсон парс сам все зробить
};

export const getMovieById = async (id) => {
	const movies = await getAllMovies();
	const result = movies.find((item) => item.id === id);
	return result || null; //якщо нема то краще вертати null
};

export const addMovie = async ({ title, director }) => {
	const movies = await getAllMovies();
	const newMovie = {
		id: nanoid(),
		title,
		director,
	};
	movies.push(newMovie);
	await updateMoviesStorage(movies);
	return newMovie;
};

export const updateMovieById = async ({ id, title, director }) => {
	const movies = await getAllMovies();
	const index = movies.findIndex((item) => item.id === id);
	console.log(id);
	if (index === -1) {
		return null;
	} else {
		movies[index] = { id, title, director };
		await updateMoviesStorage(movies);
		return movies[index];
	}
};

export const deleteMovieByID = async (id) => {
	const movies = await getAllMovies();
	const index = movies.findIndex((item) => item.id === id);
	if (index === -1) {
		return null;
	}
	const [result] = movies.splice(index, 1);
	await updateMoviesStorage(movies);
	return result;
};

export default {
	getAllMovies,
	getMovieById,
	addMovie,
	updateMovieById,
	deleteMovieByID,
};
