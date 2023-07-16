const checkExtension = (fileName) => {
	const EXTENSIONS = ["txt", "html", "css", "js", "json"];
	const temp = fileName.split(".");
	const extension = temp[temp.length - 1];
	const result = EXTENSIONS.includes(extension);
	return { extension, result };
};

module.exports = checkExtension;
