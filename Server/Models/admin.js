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
    usersBlocked: {
      type: [mongoose.Schema.Types.ObjectId], 
      default: [],
    },
    postsDeleted: {
      type: [mongoose.Schema.Types.ObjectId], 
      default: [],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Admin", AdminSchema);
