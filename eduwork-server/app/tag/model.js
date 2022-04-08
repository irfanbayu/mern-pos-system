const mongoose = require("mongoose");
const { model, Schema } = mongoose;

const tagSchema = new Schema({
  name: {
    type: String,
    minlength: [3, "Name must be at least 3 characters long"],
    maxlength: [20, "Name must be at most 20 characters long"],
    required: [true, "Name is required"],
  },
});

module.exports = model("Tag", tagSchema);
