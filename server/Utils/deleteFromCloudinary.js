const cloudinary = require("cloudinary").v2;

exports.deleteImageFromCloudinary = async (file) => {
  const publicId = file.public_id;
  const resource_type = file.resource_type;
  // console.log("resource type : ", resource_type);

  if (!publicId) {
    console.log("No valid public_id provided for deletion.");
    return;
  }

  const options = {
    resource_type : resource_type
  }

  try {
    const result = await cloudinary.uploader.destroy(publicId, options);
  } catch (e) {
    console.log(
      "Something went wrong while deleting the file from Cloudinary:",
      e?.message
    );
  }
};
