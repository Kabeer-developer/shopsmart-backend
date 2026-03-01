const express = require("express");
const router = express.Router();
const { protect, admin } = require("../middleware/authMiddleware");
const { createProduct, getProducts, getProductById, updateProduct, deleteProduct } = require("../controllers/productController");

const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("../utils/cloudinary");

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "products",
    allowed_formats: ["jpg", "png", "jpeg"],
  },
});

const upload = multer({ storage });

router.post("/", protect, admin, upload.single("image"), createProduct); // updated for image upload
router.get("/", getProducts);
router.get("/:id", getProductById);
router.put("/:id", protect, admin, upload.single("image"), updateProduct); // also allow image update
router.delete("/:id", protect, admin, deleteProduct);

module.exports = router;
