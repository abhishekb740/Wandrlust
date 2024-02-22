const mongoose = require("mongoose");

const AgencySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    travelPlans: [
      {
        destination: {
          type: String,
          required: true,
        },
        enrolledUsers: [
          {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
          },
        ],
        description: {
            type: String,
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Agency", AgencySchema);
