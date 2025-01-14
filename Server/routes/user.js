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
const redis = require('redis');
const client = require('../utils/redis');

router.use(cookieParser());

const errorHandler = (err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: "Internal server ERROR" });
};
const logRequest = (req, res, next) => {
  console.log(`Received ${req.method} request for ${req.url}`);
  next();
  // console.error(err.stack);
  // res.status(500).json({ error: "Internal server ERROR" });
};

router.use(logRequest);
router.use(errorHandler);

//uploadphoto
/**
 * @swagger
 * /uploadPhoto:
 *   post:
 *     summary: Upload a photo
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               myImage:
 *                 type: string
 *                 format: binary
 *               userId:
 *                 type: string
 *               caption:
 *                 type: string
 *               description:
 *                 type: string
 *     responses:
 *       200:
 *         description: Photo uploaded successfully
 *       404:
 *         description: User not found
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /signin:
 *   post:
 *     summary: Sign in user
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Successful signin
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 token:
 *                   type: string
 *       400:
 *         description: Bad request
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
 * /follow/{userIdToFollow}:
 *   put:
 *     summary: Follow a user
 *     parameters:
 *       - in: path
 *         name: userIdToFollow
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the user to follow
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               followingId:
 *                 type: string
 *     responses:
 *       200:
 *         description: User followed successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *       400:
 *         description: Bad request or already following this user
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *       404:
 *         description: User not found
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
 * /unfollow/{userIdToUnfollow}:
 *   put:
 *     summary: Unfollow a user
 *     parameters:
 *       - in: path
 *         name: userIdToUnfollow
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the user to unfollow
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               followingId:
 *                 type: string
 *     responses:
 *       200:
 *         description: User unfollowed successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *       400:
 *         description: Bad request or not following this user
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *       404:
 *         description: User not found
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
 * /like/{postId}:
 *   put:
 *     summary: Like a post
 *     parameters:
 *       - in: path
 *         name: postId
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the post to like
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
 *         description: Liked successfully
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
 * /dislike/{postId}:
 *   put:
 *     summary: Dislike a post
 *     parameters:
 *       - in: path
 *         name: postId
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the post to dislike
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
 *         description: Disliked successfully
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
 * /getPhotos:
 *   get:
 *     summary: Get all photos
 *     responses:
 *       200:
 *         description: Photos fetched successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Photo'
 *                 custom:
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
 * /getAllUsers:
 *   post:
 *     summary: Get all users
 *     responses:
 *       200:
 *         description: Users fetched successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 users:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/User'
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
 * /{userId}:
 *   get:
 *     summary: Get user details by ID
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the user
 *     responses:
 *       200:
 *         description: User details fetched successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UserDetails'
 *       404:
 *         description: User not found
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
 * /{userId}/about:
 *   put:
 *     summary: Update user's about section
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the user
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               about:
 *                 type: string
 *     responses:
 *       200:
 *         description: About section updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *       404:
 *         description: User not found
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
 * /userDetails:
 *   post:
 *     summary: Get user details
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
 *         description: User details fetched successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UserDetails'
 *       404:
 *         description: User not found
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
 * /getPhotos/{userId}:
 *   get:
 *     summary: Get user's photos by ID
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the user
 *     responses:
 *       200:
 *         description: User's photos fetched successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Photo'
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
 * /deletePost/{postId}:
 *   delete:
 *     summary: Delete a post by ID
 *     parameters:
 *       - in: path
 *         name: postId
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the post to delete
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
 * /comment/{postId}:
 *   post:
 *     summary: Add a comment to a post
 *     parameters:
 *       - in: path
 *         name: postId
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the post to comment on
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userId:
 *                 type: string
 *               text:
 *                 type: string
 *     responses:
 *       200:
 *         description: Comment added successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 newComment:
 *                   $ref: '#/components/schemas/Comment'
 *       404:
 *         description: Post not found
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

const fileStorageEngine = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./images");
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + '-' + file.originalname);
  }
});

const upload = multer({ 
  storage: fileStorageEngine,
  limits: {
    fileSize: 5 * 1024 * 1024 // 5MB limit
  }
});

router.post("/uploadPhoto", upload.single("myImage"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "No file uploaded" });
    }

    const { userId, caption, description } = req.body;

    const newImage = new ImageModel({
      image: req.file.filename,
      caption: caption || "",
      description: description || "",
      author: userId
    });

    await newImage.save();

    // Update Redis cache
    const cacheKey = 'allPhotos4';
    try {
      let data = await client.get(cacheKey);
      if (data) {
        data = JSON.parse(data);
        const populatedImage = await newImage.populate("author");
        data.data.unshift(populatedImage); // Add to start of array
        await client.set(cacheKey, JSON.stringify(data), {
          EX: 3600 // 1 hour expiration
        });
      }
    } catch (redisError) {
      console.error("Redis error:", redisError);
      // Continue even if Redis fails
    }

    res.status(200).json(newImage);
  } catch (error) {
    console.error("Upload error:", error);
    res.status(500).json({ 
      error: "Internal server error",
      message: error.message 
    });
  }
});


//upload profile photo
/**
 * @swagger
 * /uploadProfilePhoto:
 *   post:
 *     summary: Upload a profile photo
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               profileImage:
 *                 type: string
 *                 format: binary
 *               userId:
 *                 type: string
 *     responses:
 *       200:
 *         description: Profile photo updated successfully
 *       404:
 *         description: User not found
 *       500:
 *         description: Internal server error
 */
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
  }
);


//authenticate
/**
 * @swagger
 * /authenticate:
 *   post:
 *     summary: Authenticate user
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *     responses:
 *       200:
 *         description: Authentication successful
 *       400:
 *         description: Bad request
 */
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
  } catch (error) {
    return res.status(400);
  }
});

//Signup 
/**
 * @swagger
 * /signup:
 *   post:
 *     summary: Create a new user
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               phone:
 *                 type: string
 *               username:
 *                 type: string
 *               password:
 *                 type: string
 *               age:
 *                 type: number
 *     responses:
 *       201:
 *         description: User created successfully
 *       400:
 *         description: Bad request
 *       500:
 *         description: Internal server error
 */

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
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});


//signin

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
    // First check if the post exists
    const post = await ImageModel.findById(postId);
    if (!post) {
      return res.status(404).json({ error: "Post not found" });
    }

    // Check if user hasn't already liked the post
    if (post.likes.includes(req.body.userId)) {
      return res.status(400).json({ error: "Post already liked" });
    }

    // Update the post with the new like
    const updatedPost = await ImageModel.findByIdAndUpdate(
      postId,
      {
        $push: { likes: req.body.userId },
      },
      {
        new: true, // Return the updated document
        runValidators: true // Run model validators
      }
    );

    // Update Redis cache if it exists
    const cacheKey = 'allPhotos4';
    try {
      let data = await client.get(cacheKey);
      if (data) {
        data = JSON.parse(data);
        const postIndex = data.data.findIndex(photo => photo._id === postId);
        if (postIndex !== -1) {
          data.data[postIndex].likes.push(req.body.userId);
          await client.set(cacheKey, JSON.stringify(data), {
            EX: 3600 // 1 hour expiration
          });
        }
      }
    } catch (redisError) {
      console.error("Redis error:", redisError);
      // Continue even if Redis fails
    }

    res.status(200).json({ 
      message: "Liked successfully",
      post: updatedPost 
    });
  } catch (err) {
    console.error("Like error:", err);
    res.status(500).json({ 
      error: "Internal Server Error",
      message: err.message 
    });
  }
});

router.put("/dislike/:postId", async (req, res) => {
  const postId = req.params.postId;
  try {
    // First check if the post exists
    const post = await ImageModel.findById(postId);
    if (!post) {
      return res.status(404).json({ error: "Post not found" });
    }

    // Check if user has liked the post
    if (!post.likes.includes(req.body.userId)) {
      return res.status(400).json({ error: "Post not liked yet" });
    }

    // Remove the like
    const updatedPost = await ImageModel.findByIdAndUpdate(
      postId,
      {
        $pull: { likes: req.body.userId },
      },
      {
        new: true, // Return the updated document
        runValidators: true // Run model validators
      }
    );

    // Update Redis cache
    const cacheKey = 'allPhotos4';
    try {
      let data = await client.get(cacheKey);
      if (data) {
        data = JSON.parse(data);
        const postIndex = data.data.findIndex(photo => photo._id === postId);
        if (postIndex !== -1) {
          data.data[postIndex].likes = data.data[postIndex].likes.filter(
            like => like !== req.body.userId
          );
          await client.set(cacheKey, JSON.stringify(data), {
            EX: 3600 // 1 hour expiration
          });
        }
      }
    } catch (redisError) {
      console.error("Redis error:", redisError);
      // Continue even if Redis fails
    }

    res.status(200).json({ 
      message: "Disliked successfully",
      post: updatedPost 
    });
  } catch (err) {
    console.error("Dislike error:", err);
    res.status(500).json({ 
      error: "Internal Server Error",
      message: err.message 
    });
  }
});

// router.get("/getPhotos", async (req, res) => {
//   let images = await ImageModel.find().populate("author").populate(
//     {
//       path: "comments",
//       populate: {
//         path: "user",
//         model: "User",
//       },
//     }
//   );
//   images = images.reverse();
//   res.send(images);
// });

router.get("/getPhotos", async (req, res) => {
  try {
    const posts = await Post.find()
      .populate("author")
      .populate("comments.author");
    
    if (!posts) {
      return res.status(404).json({ 
        message: 'No posts found',
        data: [] 
      });
    }

    const response = {
      data: posts.reverse(),
      custom: "Photos Fetched Successfully!!"
    };

    // Set Redis cache - using new Redis API
    const cacheKey = 'allPhotos4';
    try {
      await client.set(cacheKey, JSON.stringify(response), {
        EX: 3600 // expires in 1 hour
      });
    } catch (redisError) {
      console.error('Redis error:', redisError);
      // Continue even if Redis fails
    }

    res.status(200).json(response);
  } catch (error) {
    console.error('Error in getPhotos:', error);
    res.status(500).json({ 
      error: 'Internal server error',
      message: error.message 
    });
  }
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
      author: userId,
      text: text,
      date: new Date()
    };

    // Add comment to post
    post.comments.push(newComment);
    await post.save();

    // Populate the author details for the new comment
    const populatedPost = await Post.findById(postId)
      .populate('comments.author', 'username profileImage');

    const addedComment = populatedPost.comments[populatedPost.comments.length - 1];

    // Update Redis cache
    const cacheKey = 'allPhotos4';
    try {
      let data = await client.get(cacheKey);
      if (data) {
        data = JSON.parse(data);
        const cachedPostIndex = data.data.findIndex((photo) => photo._id === postId);
        if (cachedPostIndex !== -1) {
          data.data[cachedPostIndex].comments.push(addedComment);
          await client.set(cacheKey, JSON.stringify(data), {
            EX: 3600 // 1 hour expiration
          });
        }
      }
    } catch (redisError) {
      console.error("Redis error:", redisError);
      // Continue even if Redis fails
    }

    res.status(200).json(addedComment);
  } catch (error) {
    console.error("Error adding comment:", error);
    res.status(500).json({ 
      error: "Internal server error",
      message: error.message 
    });
  }
});

router.get("/", (req, res) => {
  console.log(req.body);
});

module.exports = router;
