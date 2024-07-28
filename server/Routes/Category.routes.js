const express = require("express");
const router = express.Router();

/********************* import *****************************/

const {
  createCategory,
  deleteCategory,
  updateCategory,
  getAllCategories,
} = require("../Controllers/Category.controller");
const { auth } = require("../Middlewares/Auth");

/********************* routes *****************************/

// get all categories
router.get("/get-all-categories", getAllCategories);

// create 
router.post("/create-category", auth, createCategory);

// update category
router.put("/update-category/:categoryId", auth, updateCategory);

// delete category
router.delete("/delete-category/:categoryId", auth, deleteCategory);

module.exports = router;
