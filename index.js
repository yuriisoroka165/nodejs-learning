const argv = require("yargs").argv;
// const Joi = require("joi");

const { createFile } = require("./files.js");

function invokeAction({ action, fileName, content }) {
	switch (action) {
		case "create":
			createFile(fileName, content);
			break;

		case "":
			// ... id
			break;

		case "":
			// ... name email phone
			break;

		default:
			console.warn("\x1B[31m Unknown action type!");
	}
}

invokeAction(argv);
