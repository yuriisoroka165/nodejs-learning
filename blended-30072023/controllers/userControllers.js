import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import User from "../db/models/userModel.js";

const { SECRET_KEY } = process.env;

const signupController = async (req, res) => {
	const { name, email, password } = req.body;
	const currentUser = await User.findOne({ email });
	if (currentUser) {
		res.status(409).json({ message: "Email in use" });
		return;
	}

	const newUser = new User({ name, email, password });
	await newUser.hashPassword(password);
	await newUser.save();

	const payload = { id: newUser._id };

	const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "23h" });
	await User.findByIdAndUpdate(newUser._id, { token });

	res.status(201).json({
		token,
		user: {
			name: newUser.name,
			email: newUser.email,
		},
	});
};

const loginController = async (req, res) => {
	const { email, password } = req.body;
	const currentUser = await User.findOne({ email });
	if (!currentUser) {
		res.status(401).json({ message: "Email is incorrect" });
	}

	const { _id: id } = currentUser;

	const comparePass = await currentUser.comparePassword(password);
	if (!comparePass) {
		res.status(401).json({ message: "Email is incorrect" });
		return;
	}

	const payload = {
		id: currentUser._id,
	};

	const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "23h" });

	await User.findByIdAndUpdate(id, { token });

	res.status(201).json({
		token,
		user: {
			name: currentUser.name,
			email: currentUser.email,
		},
	});
};

export default { signupController, loginController };
