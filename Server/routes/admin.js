const { Router } = require("express");
const router = Router();
const Admin = require('../Models/admin')
const User = require("../Models/user")

const adminId = "" // admin 
router.post("/delete-post/:postId", async (req, res) => {
    const { postId } = req.params;

    try {
        const admin = await Admin.findById(adminId);
        if (admin) {
            admin.postsDeleted.push(postId);
            await admin.save();
            return res.status(200).json({ message: "Post deleted successfully" });
        } else {
            return res.status(400).json({ message: "Admin not found" })
        }
    } catch (error) {
        console.log("error in delete post admin ", error);
        return res.status(500).json({ error: "Internal server error" });
    }
});
router.post("/block-user/:userId", async (req, res) => {
    const { userId } = req.params;

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
router.get("/users-not-followed", async (req, res) => {
    const currentUser = req.user.userId;

    try {
        const user = await User.findById(currentUser);

        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        const usersNotFollowed = await User.find({ _id: { $nin: user.following } });

        return res.status(200).json({ users: usersNotFollowed });
    } catch (error) {
        console.log("Error in get users not followed API ", error);
        return res.status(500).json({ error: "Internal server error" });
    }
});
module.exports = router;