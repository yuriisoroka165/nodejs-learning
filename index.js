// import users from ".users.js"
// import { getCurrentMonth } from "./date/index.js" //indxe.js обовязково дописувати

// import fs from "fs"; // стара версія яка працює з колбеками

// import fs from "fs/promises";

// fs.readFile("./files/file.txt")
// 	.then((data) => console.log(data))
//     .catch((error) => console.log(error.message));

// const func = async () => {
// 	const filePath = "./files/file.txt";
// 	const data = await fs.readFile(filePath);
// 	console.log(data); //буфер 16річне представлення
// };

// const func = async () => {
// 	const filePath = "./files/file.txt";
// 	const buffer = await fs.readFile(filePath);
// 	const text = buffer.toString();
// 	console.log(text);
// };

// const func = async () => {
// 	const filePath = "./files/file.txt";
// 	const text = await fs.readFile(filePath, "utf-8"); //другий аргумент кодування в яке перевести
// 	console.log(text);
// };

// додати нове
// const func = async () => {
// 	const filePath = "./files/file.txt";
// 	const result = await fs.appendFile(filePath, "\ntest test"); //якщо файла нема він створиться
// 	console.log(result);
// };

// перезапис файлу
// const func = async () => {
// 	const filePath = "./files/file.txt";
// 	await fs.writeFile(filePath, "\ntest test"); //якщо файла нема він створиться
// 	console.log(result);
// };

// const func = async () => {
// 	const filePath = "./files/file.txt";
// 	await fs.unlink(filePath); //видалити
// };

// func();
