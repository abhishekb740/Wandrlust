const { Router } = require("express");
const router = Router();
const Agency = require("../Models/agency")

// async function insertAgencyData() {
//     try {
//         const agencyData = {
//             name: "Srinagar Adventure",
//               destination: "Srinagar, Kashmir",
//               enrolledUsers: [],
//               description: "Experience the breathtaking beauty of Srinagar and its serene landscapes.",
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
module.exports = router;