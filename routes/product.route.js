const express = require("express");
const router = express.Router();
const {
  getProducts,
  getProduct,
  postProduct,
  updateProduct,
  deleteProduct,
} = require("../controllers/product.controller");

router.get("/", getProducts); //Get All
router.get("/:id", getProduct); //Get by ID
router.post("/", postProduct); //Add
router.put("/:id", updateProduct); //Update
router.delete("/:id", deleteProduct);

module.exports = router;
