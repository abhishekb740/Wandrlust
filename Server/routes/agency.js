const { Router } = require("express");
const router = Router();
const Agency = require("../Models/agency")
const User  = require("../Models/user")
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

router.get('/getAllAgency',async(req,res)=>{
    try{
        const data = await Agency.find();
        return res.status(400).json({data})
    }catch(error){
        console.log("error in get agency ",error)
        return res.status(500).json({message : "Internel Server error"})
    }
})

router.post("/enroll/:agencyId", async (req, res) => {
    // console.lor("test");
    const agencyId = req.params.agencyId;
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
  router.post("/agenciesUpload", async (req, res) => {
    try {
      const { name, destination, description } = req.body;
      console.log(name +" " +destination)
  
      const newAgency = new Agency({
        name,
        destination,
        description,
      });
  
      const savedAgency = await newAgency.save();
  
      res.status(201).json(savedAgency);
    } catch (error) {
      console.error("Error adding agency:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  });
module.exports = router;