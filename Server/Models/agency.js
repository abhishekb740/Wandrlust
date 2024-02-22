const mongoose = require("mongoose");

const AgencySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    destination: {
        type: String,
        required: true,
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
},
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Agency", AgencySchema);
