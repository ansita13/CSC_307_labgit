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
    const users = await userService.getAllUsers();
    res.status(200).json(users); // Always return 200 with the list (even if empty)
  } catch (error) {
    console.error("Error retrieving users:", error);
    res.status(500).json({ error: "Failed to retrieve users." });
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

app.delete("/users/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deletedUser = await userService.deleteUserById(id);
    if (!deletedUser) {
      return res.status(404).json({ error: "User not found." });
    }
    res.status(200).json({ message: "User deleted." });
  } catch (error) {
    console.error("Error deleting user:", error);
    res.status(500).json({ error: `Failed to delete user: ${error.message}` });
  }
});
