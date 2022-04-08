const mongoose = require("mongoose");
const { model, Schema } = mongoose;

const productSchema = new Schema(
  {
    name: {
      type: String,
      minlength: [3, "Product name must be at least 3 characters long"],
      required: [true, "Product name is required"],
    },

    description: {
      type: String,
      maxlength: [
        500,
        "Product description must be at most 50 characters long",
      ],
    },
    price: {
      type: Number,
      default: 0,
    },
    image_url: String,
  },
  { timestamps: true }
);

module.exports = model("Product", productSchema);
