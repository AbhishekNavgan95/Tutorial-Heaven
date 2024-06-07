const express = require("express");
const app = express();
require("dotenv").config();
const cors = require("cors");
const { connectToDB } = require("./config/database.js");
const { cloudinaryConnect } = require("../server/config/cloudinary.js");
const fileUpload = require("express-fileupload")
require("./config/cron.js")

// routes import
const userRoutes = require("./Routes/User.routes.js");
const postRoutes = require("./Routes/Post.routes.js");
const categoryRoutes = require("./Routes/Category.routes.js");
const commentRoutes = require("./Routes/Comment.routes.js");

// connections
connectToDB();
cloudinaryConnect();

app.use(express.json());
app.use(fileUpload({
  useTempFiles: true,
  tempFileDir: "/tmp/"
}))
app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
    maxAge: 14400,
  })
);

// routes
app.get("/", (req, res) => {
  res.send("server is running");
});
app.use("/api/v1/auth", userRoutes);
app.use("/api/v1/post", postRoutes);
app.use("/api/v1/category", categoryRoutes);
app.use("/api/v1/comment", commentRoutes);

// activating server
app.listen(process.env.PORT, (req, res) => {
  console.log("Server is running at port " + process.env.PORT);
});
