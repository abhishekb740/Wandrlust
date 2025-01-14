const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const { config } = require("dotenv");
const UserRoute = require("./routes/user");
const morgan = require("morgan");
const fs = require("fs");
const path = require("path");
const bodyParser = require("body-parser");
const AdminRoute = require("./routes/admin");
const AgencyRoute = require("./routes/agency");
const swaggerUi = require('swagger-ui-express');
const specs = require('./swagger');

const PORT = process.env.PORT || 3000;


app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));

app.use("/images", express.static(path.join(__dirname, "images")));
app.use(
  "/profileImages",
  express.static(path.join(__dirname, "profileImages"))
);

config();
app.use(cors());
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));

const logsDir = path.join(__dirname, "logs");
if (!fs.existsSync(logsDir)) {
  fs.mkdirSync(logsDir);
}

const accessLogStream = fs.createWriteStream(
  path.join(__dirname, "logs", "access.log"),
  { flags: "a" }
);
app.use(
  morgan(":date[iso] :method :url :status :response-time ms", {
    stream: accessLogStream,
  })
);


const connect = () => {
  try {
    mongoose.connect(process.env.MONGODB_URL);
    console.log("Connected to MongoDB");
  } catch (err) {
    console.log(err);
  }
};

app.use("/", UserRoute);
app.use("/admin", AdminRoute);
app.use("/agency", AgencyRoute);

app.use("/static/files", express.static("routes/uploads"));

app.listen(PORT, () => {
  connect();
  console.log("Server is running on port: ", PORT);
});

module.exports = app;