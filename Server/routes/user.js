const { Router } = require("express");
const router = Router();
const path = require("path");
const multer = require("multer");
const ImageModel = require("../Models/images");
const { downloadFile } = require("../utils/file");
const user = require("../Models/user");
const jwt = require("jsonwebtoken");
const { log } = require("console");
const cookieParser = require("cookie-parser")
const Post = require('../Models/images')

router.use(cookieParser());

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

router.post("/signup", async (req, res) => {
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
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.post("/signin", async (req, res) => {
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

router.post("/follow/:userIdToFollow", async (req, res) => {
  const { userIdToFollow } = req.params;
  const followerUserId = req.body.userId;

  try {
    const followedUser = await user.findById(userIdToFollow);

    if (!followedUser) {
      return res.status(404).json({ error: "User to follow not found" });
    }

    const isAlreadyFollowing = followedUser.followers.includes(followerUserId);

    if (isAlreadyFollowing) {
      followedUser.followers = followedUser.followers.filter(
        (follower) => follower.toString() !== followerUserId
      );
    } else {
      followedUser.followers.push(followerUserId);
    }
    await followedUser.save();
    const followerUser = await user.findByIdAndUpdate(
      followerUserId,
      { $addToSet: { following: userIdToFollow } },
      { new: true }
    );

    if (!followerUser) {
      return res.status(404).json({ error: "Follower user not found" });
    }

    return res.status(200).json({ message: "User follow status updated successfully" });
  } catch (error) {
    console.log("Error in follow/unfollow user API ", error);
    return res.status(500).json({ error: "Internal server error" });
  }
});

router.get("/getPhotos", async (req, res) => {
  const images = await ImageModel.find().populate("author");
  res.send(images);
});

// router.get("/getUserPosts/:userId", async (req, res) => {
//   const { userId } = req.params;
//   const images = await ImageModel.find({ userId });
//   console.log(images);
//   res.send(images);
// })

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

router.get("/", (req, res) => {
  console.log(req.body);
});

module.exports = router;
