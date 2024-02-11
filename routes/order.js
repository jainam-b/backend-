const express = require("express");
const jwt = require("jsonwebtoken");
const { Router } = require("express");
const router = Router();
const { User,Order } = require("../db");
const { JWT_SECRET } = require("../config");
const userMiddleware = require("../middlewares/user");

// Create a new order
// router.post("/orders", userMiddleware,async (req, res) => {
//     try {
//       const itemId=req.body.items
//       const id= await User.findOne({
//         username:req.username
//       })
//       const userId=(id._id);  
//       const order = await Order.create({
//         customerId:userId
//       },{
//         "$push":{
//           items:itemId
//         }
//       });
//       res.json(order);
//     } catch (error) {
//       res.status(500).json({ error: error.message });
//     }
//   });
router.post("/orders", userMiddleware, async (req, res) => {
  try {
      // Extract order item IDs from the request body
      const itemIds = req.body.items;
      
      // Find the user based on the username
      const user = await User.findOne({ username: req.username });
      
      // If user not found, return 404
      if (!user) {
          return res.status(404).json({ msg: "User not found" });
      }
      
      // Create the order with customer ID and order items
      const order = await Order.create({
          customerId: user._id,
          items: itemIds
      });
      
      // Return the created order
      res.json(order);
  } catch (error) {
      // Handle errors
      res.status(500).json({ error: error.message });
  }
});


  
  // Retrieve all orders
  router.get("/orders", async (req, res) => {
    try {
      const orders = await Order.find();
      res.json(orders);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });
  
  // Retrieve a specific order by ID
  router.get("/orders/:orderId", async (req, res) => {
    try {
      const order = await Order.findById(req.params.orderId);
      if (!order) {
        return res.status(404).json({ msg: "Order not found" });
      }
      res.json(order);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });
  
  // Update a specific order by ID
  router.put("/orders/:orderId", async (req, res) => {
    try {
      const order = await Order.findByIdAndUpdate(req.params.orderId, req.body, { new: true });
      if (!order) {
        return res.status(404).json({ msg: "Order not found" });
      }
      res.json(order);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });
  
  // Update the status of a specific order by ID
  router.put("/orders/:orderId/status", async (req, res) => {
    try {
      const order = await Order.findByIdAndUpdate(req.params.orderId, { status: req.body.status }, { new: true });
      if (!order) {
        return res.status(404).json({ msg: "Order not found" });
      }
      res.json(order);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });
  
  // Delete a specific order by ID
  router.delete("/orders/:orderId", async (req, res) => {
    try {
      const order = await Order.findByIdAndDelete(req.params.orderId);
      if (!order) {
        return res.status(404).json({ msg: "Order not found" });
      }
      res.json({ msg: "Order deleted successfully" });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });
  
  module.exports = router;
