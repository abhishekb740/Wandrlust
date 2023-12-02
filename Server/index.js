const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');
const {config} = require("dotenv");
const UserRoute = require("./routes/user")
var bodyParser = require("body-parser");

config();
app.use(cors());
app.use(express.json({limit: '50mb'}));
app.use(express.urlencoded({limit: '50mb'}));
app.use(bodyParser.urlencoded({ extended: true }));

const PORT = 5000;

const connect = () => {
    try {
      mongoose.connect(process.env.MONGODB_URL);
      console.log("Connected to MongoDb");
    } catch (err) {
      console.log(err);
    }
  };

app.use("/", UserRoute)

app.use("/static/files", express.static("routes/uploads"))

app.listen(PORT, ()=>{
    connect();
    console.log("Server is running on port: ", PORT);
})

