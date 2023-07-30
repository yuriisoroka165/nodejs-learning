import User from "../db/models/userModel.js";
import jwt from "jsonwebtoken";

const { SECRET_KEY } = process.env;

const authenticate = async (req, res, next) => {
	const { authorization = "" } = req.headers;
	const [bearer, token] = authorization.split(" ");
	if (bearer !== "Bearer") {
		res.status(401).json({ message: "Token error" });
	}
	try {
		const { id } = jwt.verify(token, SECRET_KEY);
		const user = await User.findById(id);
		if (!user || !user.token) {
			throw HttpError(401);
		}
		req.user = user;
		next();
	} catch (error) {
		res.status(401).json({ message: error.message });
	}
};

export default authenticate;
