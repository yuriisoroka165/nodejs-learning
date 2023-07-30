import { Schema, model } from "mongoose";

import { genreList, releaseDateRegexp } from "../constants/movie-constants.js";
import { handleSaveError, validateAtUpdate } from "./hooks.js";

const movieSchema = new Schema(
	{
		title: { type: String, required: true },
		director: { type: String, required: true },
		favorite: { type: Boolean, default: false },
		genre: {
			type: String,
			required: true,
			enum: genreList, //перечислення дозволених значень
		},
		releaseDate: { type: String, required: true, match: releaseDateRegexp }, //регулярний вираз для 4 цифр
		owner: {
			type: Schema.Types.ObjectId,
			ref: "user",
			required: true,
		},
	},
	{ versionKey: false, timestamps: true }
);

// перед тим як знайти та оновити потрібно зробити додавання валідатора це прехук
movieSchema.pre("findOneAndUpdate", validateAtUpdate);

// якщо при збереженні викинеться помилка то обробляємо її тут для правильної передчі статусу
movieSchema.post("save", handleSaveError);
movieSchema.post("findOneAndUpdate", handleSaveError);

const Movie = model("movie", movieSchema);

export default Movie;
