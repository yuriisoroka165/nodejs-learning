import { v2 as cloudinary } from "cloudinary";

const { CLOUDINATY_CLOUD_NAME, CLOUDINATY_API_KEY, CLOUDINATY_API_SECRET } =
	process.env;

cloudinary.config({
	cloud_name: CLOUDINATY_CLOUD_NAME,
	api_key: CLOUDINATY_API_KEY,
	api_secret: CLOUDINATY_API_SECRET,
});

export default cloudinary;
