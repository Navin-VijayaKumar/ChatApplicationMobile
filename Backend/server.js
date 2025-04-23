const port = 4000;
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const multer = require("multer");
const path = require("path");
const cors = require("cors");
const bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken");

const SECRET_KEY = "43x343vvxxzaedd3445679gh";

app.use(express.json());
app.use(cors());

mongoose.connect("mongodb+srv://navinv:9788@cluster0.j9hvzcb.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0",

);

// User Schemas
const userSchema = new mongoose.Schema({
    username: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    cart: { type: Array, default: [] },
});

const User = mongoose.model("User", userSchema);

// Signup Route
app.post("/signup", async (req, res) => {
    const { username, email, password } = req.body;

    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) return res.status(400).json({ message: "User already exists" });

        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new User({ username, email, password: hashedPassword });
        await user.save();

        res.json({ success: true, message: "User registered successfully" , status:'success'});
    } catch (error) {
        res.status(500).json({ message: "Signup error", error });
    }
});

// Login Route
app.post("/login", async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user) return res.status(400).json({ message: "User not found" });

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) return res.status(400).json({ message: "Invalid credentials" });

        const token = jwt.sign({ userId: user._id }, SECRET_KEY, { expiresIn: "1h" });
        res.json({ token, userId: user._id, username: user.username,status:'success' });
    } catch (error) {
        res.status(500).json({ message: "Login error", error });
    }
});

// Root Route
app.get("/", (req, res) => {
    res.send("Express app is running");
    console.log("Express app is running");
});


// Start Server
app.listen(port, (e) => {
    if (!e) {
        console.log("Server is running on port:" + port);
    } else {
        console.log("Error on MongoDB connection: " + e);
    }
});