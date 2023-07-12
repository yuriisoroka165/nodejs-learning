import express, { response } from "express";
import moment from "moment";
import fs from "fs/promises";
import cors from "cors";

import { movies } from "./movies.js";

const app = express();

app.use(cors());

// app.use(async (req, res, next) => {
// 	const { method, url } = req;
// 	const date = moment().format("DD-MM-YYYY_hh:mm:ss");
// 	await fs.appendFile("./server.log", `\n${method} ${url} ${date}`);
// 	next();
// });
//логування

// app.use((req, res, next) => {
// 	// middleware це дія яку треба зробити перед основною.
// 	//без додавання маршруту працює для всіх маршрутів
// 	// після цього іншого маруту не шукає
// 	//
// 	console.log("first middleware");
// 	next();
// 	//некст каже шукай далі а не зупиниться на першому
// });

// app.use((req, res, next) => {
// 	console.log("second middleware");
// 	next();
// });

app.get("/products", (req, res) => {
	// const databaseResponse = null;
	// res.json(databaseResponse); //для відправки в форматі json бо send null не відправить
	// // res.send(movies);
	res.json([]);
});

app.get("/movies", (req, res) => {
	res.json(movies);
});

app.use((req, res) => {
	res.status(404).json({ message: "Not found" });
});
// якщо нічого не підійшло (маршрут) то виконається це

app.listen(3000, () => {
	console.log("Server runnig on 3000 port");
});
