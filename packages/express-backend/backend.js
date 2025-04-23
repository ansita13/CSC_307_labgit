// backend.js
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import userService from './user-services.js';  // Assuming this connects to your DB
import User from './user.js';

const app = express();
const port = 8000;

const mongoURI = "mongodb://127.0.0.1:27017/my_database"; // or Atlas URI

if (mongoose.connection.readyState === 0) {
  mongoose.connect(mongoURI)
    .then(() => console.log("✅ Connected to MongoDB"))
    .catch((err) => console.error("❌ MongoDB connection error:", err));
}

app.use(cors());
app.use(express.json());

app.get("/users", async (req, res) => {
  try {
    const users = await userService.getUsers();  // Get all users
    if (!users || users.length === 0) {
      return res.status(404).json({ error: "No users found." });
    }
    res.json(users);
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ error: `Failed to retrieve users: ${error.message}` });
  }
});

app.post("/users", async (req, res) => {
  try {
    const newUser = new User(req.body);  // Assuming you have a User model
    await newUser.save();  // Save the new user
    res.status(201).json(newUser);
  } catch (error) {
    console.error("Error adding user:", error);
    res.status(400).json({ error: `Failed to add user: ${error.message}` });
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
