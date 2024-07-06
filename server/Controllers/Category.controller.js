const Category = require("../Models/Category.model");
const { uploadImageTocloudinary } = require("../Utils/uploadToCloudinary");
const { deleteImageFromCloudinary } = require("../Utils/deleteFromCloudinary");

// create category ✅
exports.createCategory = async (req, res) => {
  try {
    const { title, description } = req.body;
    const thumbnail = req.files?.thumbnail;

    if (!title || !description) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    if (!thumbnail) {
      return res.status(400).json({
        success: false,
        message: "thumbnail is required",
      });
    }

    // check if already exist
    const categoryExists = await Category.findOne({ title: title });
    if (categoryExists) {
      return res.status(400).json({
        success: false,
        message: "Category already exist",
      });
    }

    // upload thumbnail
    const uploadedImage = await uploadImageTocloudinary(
      thumbnail,
      process.env.FOLDER_NAME
    );

    if (!uploadedImage) {
      return res.status(400).json({
        success: false,
        message: "something went wrong while uploading the thumbnail",
      });
    }

    const createdCategory = await Category.create({
      title,
      description,
      image: uploadedImage,
    });

    return res.status(200).json({
      success: true,
      message: "Category Created successfully",
      data: createdCategory,
    });
  } catch (e) {
    console.log("error occurred while creating a category : ", e);
    return res.status(500).json({
      success: false,
      message: "Something went wrong while creating the category",
    });
  }
};

// update category ✅
exports.updateCategory = async (req, res) => {
  try {
    // recieve data
    let { title, description } = req.body;
    const { categoryId } = req.params;
    const thumbnail = req?.files?.thumbnail;
    let image;

    // validate category
    const categoryDetails = await Category.findById(categoryId);

    if (!categoryDetails) {
      return res.status(400).json({
        success: false,
        message: "Category not found!",
      });
    }

    // if new thumbnail is provided delete the old one
    if (thumbnail) {
      // delete old image from cloud
      await deleteImageFromCloudinary(categoryDetails.image);

      // upload new image
      image = await uploadImageTocloudinary(thumbnail, process.env.FOLDER_NAME);
    }

    // if no title is provided
    if (!title) {
      title = categoryDetails.title;
    }

    // if no description is provided
    if (!description) {
      description = categoryDetails.description;
    }

    // if no image is provided
    if (!image) {
      image = categoryDetails.image;
    }

    // update new details in db
    const updatedCategory = await Category.findByIdAndUpdate(
      categoryId,
      { title, description, image },
      { new: true }
    );

    return res.status(200).json({
      success: true,
      message: "Category updated successfully",
      data: updatedCategory,
    });
  } catch (e) {
    console.error("Error updating category:", e);
    return res.status(500).json({
      success: false,
      message: "An error occurred while updating the category",
    });
  }
};

// delete category ✅
exports.deleteCategory = async (req, res) => {
  try {
    const { categoryId } = req.params;

    if(!categoryId) {
      return res.status(404).json({
        success: false,
        message: "Category id is required",
      });
    }

    const categoryExist = await Category.findById(categoryId);

    if (!categoryExist) {
      return res.status(404).json({
        success: false,
        message: "Category does not exist",
      });
    }
    
    console.log("category : ", categoryExist)

    if (categoryExist?.posts?.length > 0) {
      return res.status(402).json({
        success: false,
        message: "Category with active posts cannot be deleted",
      });
    }

    deleteImageFromCloudinary(categoryExist.image);
    await Category.findByIdAndDelete(categoryId);

    res.status(200).json({
      success: true,
      message: "Category deleted successfully!",
    });
  } catch (e) {
    res.status(500).json({
      success: false,
      message: "something went wrong while deleting the category!",
    });
  }
};

// get all categories ✅
exports.getAllCategories = async (req, res) => {
  try {
    const allCategories = await Category.find();

    return res.status(200).json({
      success: true,
      message: "Fetched all categories successfully",
      data: allCategories,
    });
  } catch (e) {
    return res.status(500).json({
      success: false,
      message: "Something went wrong while getting all categories",
    });
  }
};
