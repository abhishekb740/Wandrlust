const { Router } = require("express");
const router = Router();
// const agency = require("../Models/agency");
// const User = require("../Models/user");
// const admin = require("../Models/admin");
const jwt = require("jsonwebtoken");
const { log } = require("console");
const cookieParser = require("cookie-parser");
const Agency = require("../Models/agency");
// async function insertAgencyData() {
//     try {
//         const agencyData = {
//             name: "Mystic Travels",
//             destination: "Marrakech, Morocco",
//             enrolledUsers: [],
//             description: "Immerse yourself in the rich history, vibrant markets, and exotic flavors of Marrakech.",
//           };

//       const agency = new Agency(agencyData);

//       const savedAgency = await agency.save();

//       console.log("Agency data inserted successfully:", savedAgency);
//     } catch (error) {
//       console.error("Error inserting agency data:", error);
//     }
//   }
//   insertAgencyData()

/**
 * @swagger
 * /agency/login:
 *   post:
 *     summary: Log in to the agency system
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Successful login
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
 *       401:
 *         description: Unauthorized
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
 * /agency/signup:
 *   post:
 *     summary: Create a new agency
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       201:
 *         description: Agency created successfully
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
 * /agency/getAllAgency:
 *   get:
 *     summary: Get all agencies
 *     responses:
 *       200:
 *         description: Agencies fetched successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Agency'
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 */

/**
 * @swagger
 * /agency/enroll/{agencyId}:
 *   post:
 *     summary: Enroll a user to an agency
 *     parameters:
 *       - in: path
 *         name: agencyId
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the agency
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
 *         description: User enrolled successfully
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
 * /agency/unenroll/{agencyId}:
 *   put:
 *     summary: Unenroll a user from an agency
 *     parameters:
 *       - in: path
 *         name: agencyId
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the agency
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
 *         description: User unenrolled successfully
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


router.post("/login", async (req,res)=>{
  try {
    const {name, password}= req.body;
    if (!name || !password) {
      return res
        .status(400)
        .json({ error: "Please provide username and password" });
    }

    const agency = await Agency.findOne({name});

    if (!agency || agency.password !== password) {
      return res.status(401).json({ error: "Invalid name or password" });
    }
    const token = jwt.sign({ agencyId: agency._id }, process.env.JWT_SECRET_KEY, {
      expiresIn: "24h",
    });
    res.cookie("agencyId", agency._id, {
      httpOnly: true,
      maxAge: 5000000,
    });
    res.status(200).json({ message: "successful login", token });
  } catch (error) {
    
  }
});


router.post("/signup", async (req,res,next)=>{
  log(req.body);
  try {
    console.log(req.body);
    const { name, password } = req.body;

    const newAgency = new Agency({
      name,
      password,
    });
    await newAgency.save();

    res.status(201).json({ message: "Agency created successfully" });
  } catch (error) {
    next(error)
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
})

router.get("/getAllAgency", async (req, res) => {
  try {
    const data = await Agency.find();
    return res.status(200).json({ data });
  } catch (error) {
    console.log("error in get agency ", error);
    return res.status(500).json({ message: "Internel Server error" });
  }
});

router.post("/enroll/:agencyId", async (req, res) => {
  const agencyId = req.params.agencyId;
  console.log(agencyId);
  try {
    await Agency.findByIdAndUpdate(
      agencyId,
      {
        $push: { enrolledUsers: req.body.userId },
      },
      {
        new: true,
      }
    );
    res.status(200).json({ message: "enrolled successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});
router.put("/unenroll/:agencyId", async (req, res) => {
  const agencyId = req.params.agencyId;
  try {
    await Agency.findByIdAndUpdate(
      agencyId,
      {
        $pull: { enrolledUsers: req.body.userId },
      },
      {
        new: true,
      }
    );
    res.status(200).json({ message: "unenrolled successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});
module.exports = router;
