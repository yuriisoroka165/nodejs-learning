import app from "./app.js";
import dbConnect from "./db/connection.js";

const { PORT } = process.env;

const startServer = async () => {
	try {
		await dbConnect();
		app.listen(PORT, () => {
			console.log(`Server runjing on port ${PORT}`);
		});
	} catch (error) {
		console.log(error);
	}
};

startServer();
