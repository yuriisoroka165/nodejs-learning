import express from "express";

const app = express(); //вебсервер

app.get("/", (request, response) => {
	response.send("<h1>home</h1>");
});
// request всш дані про запит який прийшов
// respons обєкт налаштовує відповідь та надсилає її
// next

app.get("/contacts", (request, response) => {
	console.log(request.url);
	console.log(request.method);
	response.send("<h1>contacts page</h1>");
});

app.get("/products", (request, response) => {
	response.send("<h1>products page</h1>");
});

app.listen(3000, () => {
	console.log("Server runnig on port 3000");
});
