import { Schema, model } from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new Schema(
	{
		name: { type: String, required: true },
		email: {
			type: String,
			unique: true,
			required: true,
		},
		password: { type: String, minlength: 6, required: true },
		token: { type: String },
	},
	{ versionKey: false, timestamps: true }
);

// метод обєкту
userSchema.methods.hashPassword = async function (password) {
	this.password = await bcrypt.hash(password, 10);
};

userSchema.methods.comparePassword = async function (password) {
	return await bcrypt.compare(password, this.password);
};

const User = model("user", userSchema);

export default User;
