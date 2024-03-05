const { mongoose } = require("mongoose");

const PostSchema = new mongoose.Schema(
  {
    image: String,
    caption: {
      type: String,
    },
    description: {
      type: String,
    },
    likes: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    date: {
      type: Date,
      default: Date.now,
    },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    name: {
      type: String,
    },
    comments: {
      type: [
        {
          text: String,
          date: {
            type: Date,
            default: Date.now,
          },
          author: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
          },
        },
      ],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Post", PostSchema);
