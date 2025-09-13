const express = require("express");
const app = express();

const userRoutes = require("./routes/User");
const profileRoutes = require("./routes/Profile");
const payementRoutes = require("./routes/Payements");
const courseRoutes = require("./routes/Course");
const contactUsRoute = require("./routes/Contact");

const database = require("./config/database");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const { cloudinaryConnect } = require("./config/cloudinary");
const fileUpload = require("express-fileupload");

const dotenv = require("dotenv");
require("dotenv").config();

const PORT = process.env.PORT || 4000;

// ✅ Database connection
database.connect();

// ✅ Middlewares
app.use(express.json());
app.use(cookieParser());

// ✅ CORS configuration for both localhost and Vercel
app.use(
  cors({
    origin: [process.env.FRONTEND_URL, "http://localhost:3000"].filter(Boolean),
    credentials: true,
  })
);

app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: "/tmp",
  })
);

// ✅ Cloudinary connection
cloudinaryConnect();

// ✅ Routes
app.use("/api/v1/auth", userRoutes);
app.use("/api/v1/profile", profileRoutes);
app.use("/api/v1/course", courseRoutes);
app.use("/api/v1/payment", payementRoutes);
app.use("/api/v1/reach", contactUsRoute);

// ✅ Health check route
app.get("/", (req, res) => {
  return res.json({
    success: true,
    message: "Your server is up and running 🚀",
  });
});

// ✅ Start server
app.listen(PORT, () => {
  console.log(`App is running at ${PORT}`);
});
