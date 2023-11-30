const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');
const {config} = require("dotenv");
config();
app.use(cors());
app.use(express.json());

const PORT = 5000;

const connect = () => {
    try {
      mongoose.connect(process.env.MONGODB_URL);
      console.log("Connected to MongoDb");
    } catch (err) {
      console.log(err);
    }
  };

app.use("/", (req,res)=>{
    console.log(req.body);
    res.status(200).json({message: "Backend is working"})
})

app.listen(PORT, ()=>{
    connect();
    console.log("Server is running on port: ", PORT);
})