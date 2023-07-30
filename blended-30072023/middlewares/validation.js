const validateBody = (schema) => {
	const func = (req, res, next) => {
		const { error } = schema.validate(req.body);
		if (error) {
			next(res.status(400).json({ mesage: error.message }));
			return;
		}
		next();
	};
	return func;
};

export default validateBody;
