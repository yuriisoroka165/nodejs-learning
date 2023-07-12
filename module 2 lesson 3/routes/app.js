import express from "express";

import movies from "./data/movies.js";
import moviesRouter from "./routes/api/movies-router.js";

const app = express();

app.use("/api/movies", moviesRouter);

app.listen(3000, () => {
	"server running on 3000 port";
});
