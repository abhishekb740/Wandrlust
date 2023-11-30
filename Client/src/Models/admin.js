const { mongoose } = require("mongoose");
const { USERNAME_REQUIRED } = require("../errors/mongoose");

const AdminSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, USERNAME_REQUIRED],
    },
    password: {
      type: String,
      unique: false,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Admin", AdminSchema);
