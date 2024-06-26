const mongoose = require("mongoose");
require('dotenv').config();
// mongoose url 
mongoose.connect(
  process.env.DB_URL
);
 
// Admin schema {admin to login }
const userSchema = new mongoose.Schema({
  username: { type: String },
  password: { type: String},
  role: {
    type: String,
    enum: ["customer", "staff", "admin"],
    default: "staff",
  },
  name: String,
  email: String,

  createdAt: { type: Date, default: Date.now },
});

// storing  itemId from menu table and quantity
const orderItemSchema = new mongoose.Schema({
  itemId: { type: mongoose.Schema.Types.ObjectId, ref: "MenuItem" },
  quantity: { type: Number, default: 1 },
});
// storing customer id ,item form the orderItemSchema and status
const orderSchema = new mongoose.Schema({
  customerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
     
  },
  items: [orderItemSchema],
  status: {
    type: String,
    enum: ["pending", "preparing", "ready", "completed"],
    default: "pending",
  },
  createdAt: { type: Date, default: Date.now },
});
// menu items 
const menuItemSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: String,
  price: { type: Number, required: true },
  category: { type: String, enum: ['appetizer', 'main course', 'dessert'], required: true },
  available: { type: Boolean, default: true },
  createdAt: { type: Date, default: Date.now }
});
const Menu= mongoose.model('MenuItem', menuItemSchema);
const Order = mongoose.model("Order", orderSchema);
const User = mongoose.model("User", userSchema);
 

module.exports = {
  User,
  Order,
  Menu,
  
};
