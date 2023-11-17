const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');
const dotenv = require("dotenv");
dotenv.config();
app.use(cors());
app.use(express.json());

const PORT = 5000;

app.use("/", (req,res)=>{
    console.log(req.body);
    res.status(200).json({message: "Backend is working"})
})

app.listen(PORT, ()=>{
    console.log("Server is running on port: ", PORT);
})