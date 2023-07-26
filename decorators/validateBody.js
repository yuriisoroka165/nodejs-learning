import { HttpError } from "../helpers/index.js";

const validateBody = (schemas) => {
	const func = (req, res, next) => {
		const { error } = moviesAddSchema.validate(req.body);
		if (error) {
			throw HttpError(400, error.message);
		}
		next();
	};
	return func;
};

export default validateBody;
