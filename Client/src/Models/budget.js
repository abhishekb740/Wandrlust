const { mongoose } = require("mongoose");

const BudgetSchema = new mongoose.Schema(
  {
    authhr: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    items: [
      {
        itemName: {
          type: String,
        },
        itemPrice: {
          type: Number,
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);
