const mongoose = require("mongoose");
const { Schema, model } = mongoose;
const AutoIncrement = require("mongoose-sequence")(mongoose);
const bcrpyt = require("bcrypt");

let userSchema = Schema(
  {
    full_name: {
      type: String,
      required: [true, "Full name is required"],
      maxlength: [255, "Full name must be less than 255 characters"],
      minlength: [3, "Full name must be at least 3 characters"],
    },

    customer_id: {
      type: Number,
    },

    email: {
      type: String,
      required: [true, "Email is required"],
      maxlength: [255, "Email must be less than 255 characters"],
    },

    password: {
      type: String,
      required: [true, "Password is required"],
      maxlength: [255, "Password must be less than 255 characters"],
    },

    role: {
      type: String,
      enum: ["admin", "user"],
      default: "user",
    },

    token: [String],
  },
  { timestamps: true }
);

//validasi email
userSchema.path("email").validate(
  function (value) {
    const EMAIL_RE = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return EMAIL_RE.test(value);
  },
  (attr) => `${attr.value} is not a valid email`
);

//cek validasi jika email sudah ada yang terdaftar
userSchema.path("email").validate(
  async function (value) {
    try {
      // lakukan pencarian ke _collection_ User berdasarkan 'email'
      const count = await this.model("User").count({ email: value });

      // kode mengindikasikan bahwa jika user ditemukan akan mengmbalikan falase (false)
      // jika 'false' maka validasi gagal
      // jika 'true' maka validasi berhasil
      return !count;
    } catch (err) {
      throw err;
    }
  },
  (attr) => `${attr.value} is already in use`
);

// membuat hash password
const HASH_ROUND = 10;
userSchema.pre("save", async function (next) {
  this.password = bcrpyt.hashSync(this.password, HASH_ROUND);
  next();
});

//mongoose auto increment
userSchema.plugin(AutoIncrement, { inc_field: "customer_id" });

module.exports = model("User", userSchema);
