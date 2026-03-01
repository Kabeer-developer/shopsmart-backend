const express = require("express");
const router = express.Router();
const { getAllUsers, deleteUser, getStats ,  getAllOrders} = require("../controllers/adminController");

const {
  updateOrderStatus
} = require("../controllers/orderController");
const  { protect, admin } = require("../middleware/authMiddleware");

// Admin routes
router.get("/users", protect, admin,getAllUsers);       // get all users
router.delete("/users/:id", protect, admin, deleteUser); // delete user
router.get("/orders", protect, admin, getAllOrders);
router.get("/stats", protect, admin, getStats);          // sales stats
router.put("/:id/status", protect, admin, updateOrderStatus); 

module.exports = router;
