const express = require("express");
const router = express.Router();
const {
  createOrder,
  getMyOrders,
  getAllOrders,
 
  getOrderById 
} = require("../controllers/orderController");
const { protect, admin } = require("../middleware/authMiddleware");

// Routes
router.post("/", protect, createOrder);          // create order
router.get("/myorders", protect,  getMyOrders);  // user orders
router.get("/:id", protect, getOrderById);       // order details
router.get("/", protect, admin,getAllOrders);         // admin: all orders


module.exports = router;
