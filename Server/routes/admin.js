const { Router } = require("express");
const router = Router();
const Admin = require("../Models/admin");
const User = require("../Models/user");
const Image = require("../Models/images");
const Agency = require("../Models/agency");

const adminId = "65d7b6e5287a3933286f914b";

router.post("/delete-post", async (req, res) => {
  const { postId } = req.body;
  try {
    const admin = await Admin.findById(adminId);
    if (admin) {
      admin.postsDeleted.push(postId);
      await admin.save();
      const post = await Image.findByIdAndDelete(postId);
      return res.status(200).json({ message: "Post deleted successfully" });
    } else {
      return res.status(400).json({ message: "Admin not found" });
    }
  } catch (error) {
    console.log("error in delete post admin ", error);
    return res.status(500).json({ error: "Internal server error" });
  }
});

router.post("/unblock-user", async (req, res) => {
  const userId = req.body.userId;

  try {
    const admin = await Admin.findById(adminId);

    if (!admin) {
      return res.status(404).json({ error: "Admin not found" });
    }
    admin.usersBlocked.pull(userId);
    await admin.save();

    const unblockedUser = await User.findByIdAndUpdate(
      userId,
      { blocked: false },
      { new: true }
    );

    if (!unblockedUser) {
      return res.status(404).json({ error: "User not found" });
    }

    return res.status(200).json({ message: "User unblocked successfully" });
  } catch (error) {
    console.log("Error in unblock user admin ", error);
    return res.status(500).json({ error: "Internal server error" });
  }
});

router.post("/block-user", async (req, res) => {
  const userId = req.body.userId;

  try {
    const admin = await Admin.findById(adminId);

    if (!admin) {
      return res.status(404).json({ error: "Admin not found" });
    }
    admin.usersBlocked.push(userId);
    await admin.save();

    const blockedUser = await User.findByIdAndUpdate(
      userId,
      { blocked: true },
      { new: true }
    );

    if (!blockedUser) {
      return res.status(404).json({ error: "User not found" });
    }

    return res.status(200).json({ message: "User blocked successfully" });
  } catch (error) {
    console.log("Error in block user admin ", error);
    return res.status(500).json({ error: "Internal server error" });
  }
});

router.get("/dashboard", async (req, res) => {
  try {
    const totalUsers = await User.countDocuments();
    const totalBlockedUsers = await User.countDocuments({ blocked: true });
    const totalPosts = await Image.countDocuments();
    const totalDeletedPosts = await Admin.findOne({})
      .select("postsDeleted")
      .then((admin) => admin.postsDeleted.length);
    const totalAgencies = await Agency.countDocuments();

    return res.status(200).json({
      totalUsers,
      totalBlockedUsers,
      totalPosts,
      totalDeletedPosts,
      totalAgencies,
    });
  } catch (error) {
    console.error("Error fetching admin dashboard data:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
