const fs = require("fs/promises");
const path = require("path");
const chalk = require("chalk");

const dataValidator = require("./helpers/dataValidator");
const checkExtension = require("./helpers/checkExtension");

const createFile = async (fileName, content) => {
	const file = { fileName, content };
	const result = dataValidator(file);
	if (result.error) {
		const { details } = result.error;
		console.log(
			chalk.red(`Please specify ${details[0].path[0]} parameter.`)
		);
		return;
	}
	const resultCheckExtension = checkExtension(fileName);
	if (!resultCheckExtension.result) {
		console.log(
			chalk.red(
				`Sorry ${resultCheckExtension.extension} extension do not suported`
			)
		);
		return;
	}
	const filePath = path.join(__dirname, "./files", fileName);
	try {
		await fs.writeFile(filePath, content, "utf-8");
		console.log(chalk.green(`File ${fileName} successfuly created.`));
	} catch (error) {
		throw error.message;
	}
};

const getFiles = async () => {
	const filesPath = path.join(__dirname, "files");
	try {
		const result = await fs.readdir(filesPath);
		if (result.length === 0) {
			console.log(chalk.red(`The directory has not files`));
			return;
		}
	} catch (error) {}
};

const getInfo = async (fileName) => {
	const filePath = path.join(__dirname, "files");
	try {
		const result = await fs.readdir(filePath);
		if (!result.includes(fileName)) {
			console.log(chalk.red(`File ${fileName} not found`));
			return;
		}
		const currentFileData = await fs.readFile(
			path.join(__dirname, "files", fileName),
			"utf-8"
		);
		const extension = path.extname(fileName);
		const name = path.basename(
			path.join(__dirname, "files", fileName),
			extension
		);
		console.log({
			name,
			extension: extension.slice(1),
			content: currentFileData,
		});
		return { name, extension: extension.slice(1), content: currentFileData };
	} catch (error) {
		console.log(error);
	}
};

module.exports = { createFile, getFiles, getInfo };
