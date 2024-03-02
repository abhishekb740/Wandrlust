const { Router } = require("express");
const router = Router();
// const agency = require("../Models/agency");
// const User = require("../Models/user");
const admin = require("../Models/admin");
const jwt = require("jsonwebtoken");
const { log } = require("console");
const cookieParser = require("cookie-parser");
const agency = require("../Models/agency");
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


router.post("/login", async (req,res)=>{
  try {
    const {name, password}= req.body;
    if (!name || !password) {
      return res
        .status(400)
        .json({ error: "Please provide username and password" });
    }

    const Agency = await agency.findOne({name});

    if (!Agency || Agency.password !== password) {
      return res.status(401).json({ error: "Invalid name or password" });
    }
    const token = jwt.sign({ agencyId: Agency._id }, process.env.JWT_SECRET_KEY, {
      expiresIn: "24h",
    });
    res.cookie("agencyId", Agency._id, {
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

    const newAgency = new agency({
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
