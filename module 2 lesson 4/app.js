import express from "express";
import logger from "morgan";
import cors from "cors";

import moviesRouter from "./routes/api/movies-router.js";

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/movies", moviesRouter);

app.use((err, req, res, next) => {
	//фція обробник помилок
	const { status = 500, message = "Error" } = err;
	res.status(status).json({ message });
});

export default app;
