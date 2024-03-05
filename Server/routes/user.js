const { Router } = require("express");
const router = Router();
const path = require("path");
const multer = require("multer");
const ImageModel = require("../Models/images");
const { downloadFile } = require("../utils/file");
const user = require("../Models/user");
const jwt = require("jsonwebtoken");
const { log } = require("console");
const cookieParser = require("cookie-parser");
const Post = require("../Models/images");
const axios = require("axios");

router.use(cookieParser());

const errorHandler = (err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Internal server ERROR' });
};
const logRequest = (req, res, next) => {
    console.log(`Received ${req.method} request for ${req.url}`);
    next();
    console.error(err.stack);
    res.status(500).json({ error: "Internal server ERROR" });
};

router.use(logRequest);
router.use(errorHandler);
const fileStorageEngine = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "./images");
    },
    filename: (req, file, cb) => {
        cb(false, Date.now() + "--" + file.originalname);
    },
});

const upload = multer({ storage: fileStorageEngine });

router.post(
    "/uploadPhoto",
    upload.single("myImage"),
    async (req, res, next) => {
        console.log(req.file);
        const userId = req.body.userId;
        const caption = req.body.caption;
        const description = req.body.description;
        const newImage = await new ImageModel({
            image: req.file.filename,
            caption: caption,
            description: description,
            author: userId,
        });
        res.send(await newImage.save());
    }
);

const fileStorageEngine2 = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "./profileImages");
    },
    filename: (req, file, cb) => {
        cb(false, Date.now() + "--" + file.originalname);
    },
});

const upload2 = multer({ storage: fileStorageEngine2 });

router.post(
    "/uploadProfilePhoto",
    upload2.single("profileImage"),
    async (req, res, next) => {
        console.log(req.file);
        try {
            const userId = req.body.userId;
            console.log(userId);
            const profileImage = req.file.filename;
            console.log(profileImage);

            const User = await user.findById(userId);

            if (!User) {
                return res.status(404).json({ error: "User not found" });
            }

            User.profileImage = profileImage;

            await User.save();

            res.json({ message: "Profile photo updated successfully" });
        } catch (error) {
            console.error("Error updating profile photo:", error);
            res.status(500).json({ error: "Internal server error" });
        }
);

router.post("/authenticate", async (req, res) => {
    const { username } = req.body;
    // Get or create user on Chat Engine!
    try {
        const r = await axios.put(
            "https://api.chatengine.io/users/",
            { username: username, secret: username, first_name: username },
            { headers: { "Private-Key": "d2bccd07-e285-4816-a873-693e5fb18b09" } }
        );
        return res.status(r.status).json(r.data);
    } catch (e) {
        return res.status(e.response.status).json(e.response.data);
    }
});


router.post("/signup", async (req, res, next) => {
    log(req.body);
    try {
        console.log(req.body);
        const { name, email, phone, username, password, age } = req.body;

        const newUser = new user({
            name,
            phone,
            email,
            username,
            password,
            age,
            gender: "male",
        });
        await newUser.save();

        res.status(201).json({ message: "User created successfully" });
    } catch (error) {
        next(error);
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

router.post("/signin", logRequest, async (req, res, next) => {
    try {
        const { username, password } = req.body;
        if (!username || !password) {
            return res
                .status(400)
                .json({ error: "Please provide username and password" });
        }
        const User = await user.findOne({ username });

        if (!User || User.password !== password) {
            return res.status(401).json({ error: "Invalid username or password" });
        }
        const token = jwt.sign({ userId: User._id }, process.env.JWT_SECRET_KEY, {
            expiresIn: "24h",
        });
        res.cookie("userId", User._id, {
            httpOnly: true,
            maxAge: 5000000,
        });
        res.status(200).json({ message: "successful signin", token });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

router.put("/follow/:userIdToFollow", async (req, res) => {
    const { userIdToFollow } = req.params;
    const followingId = req.body.followingId;

    try {
        const userToFollow = await user.findById(userIdToFollow);
        const currentUser = await user.findById(followingId);

        if (!userToFollow || !currentUser) {
            return res.status(404).json({ error: "User not found" });
        }

        const isFollowing = currentUser.following.includes(userIdToFollow);

        if (isFollowing) {
            return res.status(400).json({ error: "Already following this user" });
        }

        await currentUser.updateOne({ $push: { following: userIdToFollow } });
        await userToFollow.updateOne({ $push: { followers: followingId } });

        res.status(200).json({ message: "User followed successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

// Unfollow
router.put("/unfollow/:userIdToUnfollow", async (req, res) => {
    const { userIdToUnfollow } = req.params;
    const followingId = req.body.followingId;

    try {
        const userToUnfollow = await user.findById(userIdToUnfollow);
        const currentUser = await user.findById(followingId);

        if (!userToUnfollow || !currentUser) {
            return res.status(404).json({ error: "User not found" });
        }

        const isNotFollowing = !currentUser.following.includes(userIdToUnfollow);

        if (isNotFollowing) {
            return res.status(400).json({ error: "Not following this user" });
        }

        await currentUser.updateOne({ $pull: { following: userIdToUnfollow } });
        await userToUnfollow.updateOne({ $pull: { followers: followingId } });

        res.status(200).json({ message: "User unfollowed successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

router.put("/like/:postId", async (req, res) => {
    const postId = req.params.postId;
    try {
        await ImageModel.findByIdAndUpdate(
            postId,
            {
                $push: { likes: req.body.userId },
            },
            {
                new: true,
            }
        );
        res.status(200).json({ message: "Liked successfully" });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

router.put("/dislike/:postId", async (req, res) => {
    const postId = req.params.postId;
    try {
        await ImageModel.findByIdAndUpdate(
            postId,
            {
                $pull: { likes: req.body.userId },
            },
            {
                new: true,
            }
        );
        res.status(200).json({ message: "Disliked successfully" });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

router.get("/getPhotos", async (req, res) => {
    let images = await ImageModel.find().populate("author").populate(
        {
            path: "comments",
            populate: {
                path: "user",
                model: "User",
            },
        }
    );
    images = images.reverse();
    res.send(images);
});

router.post("/getAllUsers", logRequest, async (req, res, next) => {
    try {
        const users = await user.find();
        return res.status(200).json({ users });
    } catch (error) {
        console.log("Error in get users not followed API ", error);
        return res.status(500).json({ error: "Internal server error" });
    }
});

router.get("/:userId", async (req, res) => {
    const { userId } = req.params;
    console.log(userId);
    try {
        const userDetails = await user.findById(userId);
        if (!userDetails) {
            return res.status(404).json({ error: "User Not Found" });
        }
        res.status(200).json(userDetails);
    } catch (err) {
        console.log(err);
    }
});

router.put("/:userId/about", async (req, res) => {
    const { userId } = req.params;
    const { about } = req.body;

    try {
        const User = await user.findById(userId);

        if (!User) {
            return res.status(404).json({ error: "User not found" });
        }

        User.about = about;

        await User.save();

        res.json({ message: "About section updated successfully" });
    } catch (error) {
        console.error("Error updating about section:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});

router.post("/userDetails", async (req, res, next) => {
    const userId = req.body.userId;

    try {
        const User = await user.findById(userId);

        if (!User) {
            return res.status(404).json({ error: "User not found" });
        }

        const totalLikes = await Post.aggregate([
            { $match: { author: userId } },
            { $project: { _id: 0, likes: 1 } },
            { $unwind: "$likes" },
            { $group: { _id: null, totalLikes: { $sum: 1 } } },
        ]);

        const totalPosts = await Post.countDocuments({ author: userId });

        const totalFollowers = User.followers.length;
        const totalFollowing = User.following.length;

        const userDetails = {
            userId: User._id,
            name: User.name,
            totalLikes: totalLikes.length > 0 ? totalLikes[0].totalLikes : 0,
            totalPosts: totalPosts,
            totalFollowers: totalFollowers,
            totalFollowing: totalFollowing,
        };

        return res.status(200).json({ userDetails });
    } catch (error) {
        next(error);
        console.log("Error in get user details API ", error);
        return res.status(500).json({ error: "Internal server error" });
    }
});

router.get("/getPhotos/:userId", async (req, res) => {
    const { userId } = req.params;
    try {
        const userPosts = await Post.find({ author: userId }).populate("author");
        res.send(userPosts);
    } catch (error) {
        console.log("Error fetching user's posts:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});

router.delete("/deletePost/:postId", async (req, res) => {
    const { postId } = req.params;

    try {
        await Post.findByIdAndDelete(postId);

        res.status(200).json({ message: "Post deleted successfully" });
    } catch (error) {
        console.error("Error deleting post:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});

router.post("/comment/:postId", async (req, res) => {
    const { postId } = req.params;
    const { userId, text } = req.body;

    try {
        const post = await Post.findById(postId);

        if (!post) {
            return res.status(404).json({ error: "Post not found" });
        }

        const newComment = {
            user: userId,
            text: text,
        };

        post.comments.push(newComment);
        await post.save();

        res.status(200).json({ message: "Comment added successfully", newComment });
    } catch (error) {
        console.error("Error adding comment:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});

router.get("/", (req, res) => {
    console.log(req.body);
});

module.exports = router;
