import Joi from "joi";

const moviesAddSchema = Joi.object({
	title: Joi.string().required(),
	director: Joi.string().required(),
});

export default moviesAddSchema;
