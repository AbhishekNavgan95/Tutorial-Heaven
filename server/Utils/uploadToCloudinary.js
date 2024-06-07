const cloudinary = require("cloudinary").v2;
const fs = require("fs");

exports.uploadImageTocloudinary = async (file, folder, height, quality) => {
  try {
    const options = { folder };
    if (height) {
      options.height = height;
    }
    if (quality) {
      options.quality = quality;
    }

    options.resource_type = "auto";

    const response = await cloudinary.uploader.upload(
      file.tempFilePath,
      options
    );

    const result = {
      resource_type: response?.resource_type,
      public_id: response?.public_id,
      url: response?.url,
    };

    return result;
  } catch (e) {
    console.log(
      "something went wrong while uplaoding the file to cloud",
      e?.message
    );
    fs.unlink(file);
  }
};
