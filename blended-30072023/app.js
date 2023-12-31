import "dotenv/config";
import express from "express";
import logger from "morgan";
import cors from "cors";

import userRouter from "./routes/userRoutes.js";

const app = express();

const formatsLogger = app.get("env") === "development" ? "dev" : "short";

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());

app.use("/users", userRouter);

app.use((req, res) => {
	res.status(404).json({ message: "Not found" });
});

app.use((err, req, res, next) => {
	//фція обробник помилок
	const { status = 500, message = "Error" } = err;
	res.status(status).json({ message });
});

export default app;
