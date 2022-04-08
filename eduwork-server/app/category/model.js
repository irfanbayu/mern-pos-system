const mongoose = require("mongoose");
const { model, Schema } = mongoose;

let categorySchema = new Schema({
  name: {
    type: String,
    minlength: [3, "Category name must be at least 3 characters long"],
    maxlength: [20, "Category name must be at most 20 characters long"],
    required: [true, "Category name is required"],
  },
});

module.exports = model("Category", categorySchema);
