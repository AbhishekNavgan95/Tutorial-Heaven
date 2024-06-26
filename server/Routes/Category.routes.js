const express = require("express");
const router = express.Router();

/********************* import *****************************/

const {
  createCategory,
  deleteCategory,
  updateCategory,
  getAllCategories,
} = require("../Controllers/Category.controller");
const { auth, isMod } = require("../Middlewares/Auth");

/********************* routes *****************************/

// get all categories
router.get("/get-all-categories", getAllCategories);

// create category
router.post("/create-category", auth, isMod, createCategory);

// update category
router.put("/update-category", auth, isMod, updateCategory);

// delete category
router.post("/delete-category", auth, isMod, deleteCategory);

module.exports = router;
