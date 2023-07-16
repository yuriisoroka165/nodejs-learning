const fs = require("fs/promises");
const path = require("path");
const chalk = require("chalk");

const dataValidator = require("./helpers/dataValidator");
const checkExtension = require("./helpers/checkExtension");
const { writeFile } = require("fs");

const createFile = async (fileName, content) => {
	const file = { fileName, content };
	const result = dataValidator(file);
	// console.log(result.error.details);
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

module.exports = { createFile };
