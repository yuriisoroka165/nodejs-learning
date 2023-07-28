import { Schema, model } from "mongoose";

import { handleSaveError, validateAtUpdate } from "./hooks.js";
import { emailRegexp } from "../constants/user-constants.js";

const userSchema = new Schema(
	{
		name: { type: String, required: true },
		email: {
			type: String,
			match: emailRegexp,
			unique: true, //щоб реєструватися з одним емайлом 1 раз
			required: true,
		},
		password: { type: String, minlength: 6, required: true },
	},
	{ versionKey: false, timestamps: true }
);

// перед тим як знайти та оновити потрібно зробити додавання валідатора це прехук
userSchema.pre("findOneAndUpdate", validateAtUpdate);

// якщо при збереженні викинеться помилка то обробляємо її тут для правильної передчі статусу
userSchema.post("save", handleSaveError);
userSchema.post("findOneAndUpdate", handleSaveError);

const User = model("user", userSchema);

export default User;
