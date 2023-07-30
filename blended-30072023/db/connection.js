import mongoose from "mongoose";

const { DB_HOST } = process.env;

const dbConnect = async () => {
	await mongoose.connect(DB_HOST);
};

export default dbConnect;
