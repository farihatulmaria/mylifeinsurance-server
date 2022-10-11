const express = require("express");
const app = express();
const cors = require("cors");
const colors = require('colors');
require("dotenv").config()
const port = process.env.PORT || 5000;

//middlewares
app.use(express.json());
app.use(cors());


app.get("/", (req, res) => {
  res.send("Route is working! YaY!");
});

const emailRoute = require("./Routes/email.routes");

app.use('/email', emailRoute);

app.listen(port, () => {
  console.log(`App is running on port ${port}`.green.bold);
});
