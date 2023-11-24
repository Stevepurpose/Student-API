const express = require("express");
const dotenv = require("dotenv");
dotenv.config({ path: "./.env" });
const app = express();
const studentRouter = require("./routes/studentRoutes");
const teacherRouter= require("./routes/teacherRoutes");
const connectDatabase=require('./db.js')

connectDatabase()

app.use(express.json())//here
app.use("/api/students", studentRouter);
app.use("/api/teacher", teacherRouter);

const port = process.env.PORT || 4500;

app.listen(port, () => {
  console.log("server running on port" + " " + port);
});
