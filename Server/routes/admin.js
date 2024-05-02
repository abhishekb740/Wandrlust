const { Router } = require("express");
const router = Router();
const Admin = require("../Models/admin");
const User = require("../Models/user");
const Image = require("../Models/images");
const Agency = require("../Models/agency");
const client = require('../utils/redis');
const adminId = "65d7b6e5287a3933286f914b";

/**
 * @swagger
 * /admin/delete-post:
 *   post:
 *     summary: Delete a post by admin
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               postId:
 *                 type: string
 *     responses:
 *       200:
 *         description: Post deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *       400:
 *         description: Admin not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 */

/**
 * @swagger
 * /admin/unblock-user:
 *   post:
 *     summary: Unblock a user by admin
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userId:
 *                 type: string
 *     responses:
 *       200:
 *         description: User unblocked successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *       404:
 *         description: Admin or User not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 */
/**
 * @swagger
 * /admin/block-user:
 *   post:
 *     summary: Block a user by admin
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userId:
 *                 type: string
 *     responses:
 *       200:
 *         description: User blocked successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *       404:
 *         description: Admin or User not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 */

/**
 * @swagger
 * /admin/dashboard:
 *   get:
 *     summary: Get admin dashboard data
 *     responses:
 *       200:
 *         description: Admin dashboard data retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 totalUsers:
 *                   type: number
 *                 totalBlockedUsers:
 *                   type: number
 *                 totalPosts:
 *                   type: number
 *                 totalDeletedPosts:
 *                   type: number
 *                 totalAgencies:
 *                   type: number
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 */


router.post("/delete-post", async (req, res) => {
  const { postId } = req.body;
  try {
    const admin = await Admin.findById(adminId);
    if (admin) {
      admin.postsDeleted.push(postId);
      await admin.save();
      const post = await Image.findByIdAndDelete(postId);
      const cacheKey = 'allPhotos4';
      let data = await client.get(cacheKey);
      if (data) {
        data = JSON.parse(data);
        console.log(data);
        let filteredData = data.data.filter((photo) => photo._id !== postId);
        data = {
          data: filteredData,
          custom: "Post deleted Success"
        };
        await client.set(cacheKey, JSON.stringify(data));
      }
      else{
        console.log("cache miss");
      }
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
