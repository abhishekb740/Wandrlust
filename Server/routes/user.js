const { Router } = require("express");
const router = Router();
const path = require("path");
const multer = require("multer");
const ImageModel = require("../Models/images");
const { downloadFile } = require("../utils/file");
const user = require("../Models/user");
const jwt = require('jsonwebtoken');

const upload = multer();

router.post("/uploadPhoto", upload.single("myImage"), async (req, res) => {
  const body = req.body;
  console.log(body);
  const downloaded = await downloadFile(
    req.file.originalname /*userid add krdo */,
    req.file.buffer
  );
  const newImage = await new ImageModel({
    image: downloaded,
    caption: req.body.caption,
    description: req.body.description,
    //   author: "1",
  });
  res.send(await newImage.save());
});

router.post('/signup', async (req, res) => {
  try {
    const { name, email, phone,username,password,age,gender } = req.body;

    if (!name || !email || !phone || !username || !password || !age || !gender) {
      return res.status(400).json({ error: 'Please provide all required fields' });
    }

    const newUser = new user({ name, phone ,email,username,password,age,gender });
    await newUser.save();

    res.status(201).json({ message: 'User created successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

router.post('/signin', async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({ error: 'Please provide username and password' });
    }

    const User = await user.findOne({ username });

    if (!User || User.password !== password) {
      return res.status(401).json({ error: 'Invalid username or password' });
    }

    const token = jwt.sign({ userId: User._id }, process.env.JWT_SECRET_KEY, { expiresIn: '24h' });
    console.log(token)
    res.status(200).json({ token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});
router.get('/userInfo', async (req, res) => {
  try {
    const {userId} = req.body;

    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ error: 'Invalid user ID' });
    }

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.status(200).json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

router.get("/", (req, res) => {
  console.log(req.body);
});

module.exports = router;
