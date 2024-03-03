const mongoose = require("mongoose");

const PASSWORD_REQUIRED = require('../errors/mongoose')

const AgencySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    destination: {
        type: String,
        required: false,
    },
    enrolledUsers: 
    {
        type: [mongoose.Schema.Types.ObjectId],
        ref: "User",
        default : [],
    },
    description: {
        type: String,
    },
    password: {
      type: String,
      required: [true, PASSWORD_REQUIRED],
      unique: false,
    },
},
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Agency", AgencySchema);
