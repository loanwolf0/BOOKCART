const router = require("express").Router();
const User = require("../models/user");
const jwt = require("jsonwebtoken");
const { authenticateToken } = require("../routes/userAuth");
const Book = require("../models/book");
const Order = require("../models/order");

router.post("/place-order", authenticateToken, async (req, res) => {
  try {
    const { id } = req.headers;
    const { order } = req.body;

    if (!id || !order || !Array.isArray(order)) {
      return res.status(400).json({ message: "Invalid input data" });
    }

    for (const orderData of order) {
      console.log(orderData, "orderData");

      if (!orderData._id) {
        throw new Error("Invalid order data, missing _id");
      }

      const newOrder = new Order({ user: id, book: orderData._id });

      console.log(newOrder, "newOrder");

      const orderDataFromDb = await newOrder.save();

      console.log(orderDataFromDb, "orderDataFromDb");

      // Push order to user's orders
      await User.findByIdAndUpdate(id, {
        $push: { orders: orderDataFromDb._id },
      });

      // Remove from cart
      await User.findByIdAndUpdate(id, {
        $pull: { cart: orderDataFromDb._id },
      });
    }

    return res.json({
      status: "Success",
      message: "Order Placed Successfully",
    });
  } catch (error) {
    console.error("Error in /place-order:", error.message);
    console.error(error.stack);
    res.status(500).json({ message: "Internal server error" });
  }
});

// get order history of a user
router.post("/get-order-history", authenticateToken, async (req, res) => {
  try {
    const { id } = req.headers;
    const userData = await User.findById(id).populate({
      path: "orders",
      populate: { path: "book" },
    });

    const ordersData = userData.orders.reverse();

    return res.json({
      status: "Success",
      data: ordersData,
    });
  } catch (error) {
    console.log("/get-order-history");
    res.status(500).json({ message: "Internal server error" });
  }
});

// admin roles
// get all orders

router.post("/get-all-orders", authenticateToken, async (req, res) => {
  try {
    const userData = await Order.find()
      .populate({
        path: "book",
      })
      .populate({
        path: "user",
      })
      .sort({ createdAt: -1 });

    return res.json({
      status: "Success",
      data: userData,
    });
  } catch (error) {
    console.log("/get-all-order");
    res.status(500).json({ message: "Internal server error" });
  }
});

// update the satatus orders
router.post("/update-status/:id", authenticateToken, async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body.status;

    // check if user is admin or not , do it latter

    await Order.findByIdAndUpdate(id, {
      status: status,
    });

    return res.json({
      status: "Success",
      message: "Status Updated Successfully",
    });
  } catch (error) {
    console.log("/update-status/:id");
    res.status(500).json({ message: "Internal server error" });
  }
});
module.exports = router;
