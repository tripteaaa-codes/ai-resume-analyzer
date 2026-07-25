const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();


const authRoutes = require("./routes/authRoutes");


const app = express();


// Middleware
app.use(cors());
app.use(express.json());


// Database Connection
mongoose.connect(process.env.MONGO_URI)
.then(() => {
    console.log("MongoDB Connected");
})
.catch((error) => {
    console.log(error);
});


// Routes
app.use("/api/auth", authRoutes);


app.get("/", (req, res) => {
    res.send("AI Resume Analyzer API Running");
});


// Port
const PORT = process.env.PORT || 5000;


// Start Server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});