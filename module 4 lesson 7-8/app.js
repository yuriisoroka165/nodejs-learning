import express from "express";
import logger from "morgan";
import cors from "cors";

// import movies from "./movies/index.js";

import moviesRouter from "./routes/api/movies-router.js";
import authRouter from "./routes/api/auth-router.js";

const app = express();

const formatsLogger = app.get("env") === "development" ? "dev" : "short";

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());

app.use("/api/auth", authRouter);
app.use("/api/movies", moviesRouter);

app.use((req, res) => {
	res.status(404).json({ message: "Not found" });
});

app.use((err, req, res, next) => {
	//фція обробник помилок
	const { status = 500, message = "Error" } = err;
	res.status(status).json({ message });
});

export default app;
