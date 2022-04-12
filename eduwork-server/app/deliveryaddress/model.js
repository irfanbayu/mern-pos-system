const { Schema, model } = require("mongoose");

const derliveryAddressSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Name address is required"],
      maxlength: [255, "Name address must be less than 255 characters"],
    },

    kelurahan: {
      type: String,
      required: [true, "Kelurahan is required"],
      maxlength: [255, "Kelurahan must be less than 255 characters"],
    },

    kecamatan: {
      type: String,
      required: [true, "Kecamatan is required"],
      maxlength: [255, "Kecamatan must be less than 255 characters"],
    },

    kabupaten: {
      type: String,
      required: [true, "Kabupaten is required"],
      maxlength: [255, "Kabupaten must be less than 255 characters"],
    },

    provinsi: {
      type: String,
      required: [true, "Provinsi is required"],
      maxlength: [1000, "Provinsi must be less than 1000 characters"],
    },

    detail: {
      type: String,
      required: [true, "Detail is required"],
      maxlength: [1000, "Detail must be less than 1000 characters"],
    },

    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

module.exports = model("DeliveryAddress", derliveryAddressSchema);
