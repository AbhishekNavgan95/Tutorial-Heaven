const cloudinary = require("cloudinary").v2;

exports.cloudinaryConnect = () => {
	try {
		cloudinary.config({
			cloud_name: process.env.CLOUD_NAME,
			api_key: process.env.API_KEY,
			api_secret: process.env.API_SECRET,
		});
		console.log("connected to cloudinary")
	} catch (error) {
		console.log(error);
	}
};


cloudinary.config({ 
	cloud_name: 'sample', 
	api_key: '874837483274837', 
	api_secret: 'a676b67565c6767a6767d6767f676fe1'
  });