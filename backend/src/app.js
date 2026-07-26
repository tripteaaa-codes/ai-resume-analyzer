const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const OpenAI = require("openai");

const client = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
});

const authRoutes = require("./routes/authRoutes");
const resumeRoutes = require("./routes/resumeRoutes");

const app = express();

app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI)
.then(() => {
    console.log("MongoDB Connected");
})
.catch((error) => {
    console.log(error);
});

app.use("/auth", authRoutes);
app.use("/resume", resumeRoutes);

app.get("/", (req, res) => {
    res.send("AI Resume Analyzer API Running");
});


// Port
const PORT = process.env.PORT || 8888;


// Start Server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});