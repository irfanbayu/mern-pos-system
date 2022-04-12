const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const cartItemSchema = Schema({
  name: {
    type: String,
    required: [true, "Name is required"],
    minlength: [3, "Name must be at least 3 characters"],
  },

  qty: {
    type: Number,
    required: [true, "Qty is required"],
    min: [1, "Qty must be at least 1"],
  },

  price: {
    type: Number,
    default: 0,
  },

  image_url: String,

  usr: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },

  product: {
    type: Schema.Types.ObjectId,
    ref: "Product",
  },
});

module.exports = model("CartItem", cartItemSchema);
