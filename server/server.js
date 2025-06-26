// server.js
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(express.json());
app.use(cors());

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log("MongoDB connected"))
.catch((err) => console.error(err));

// Import Models
const User = require("./models/user");
const Book = require("./models/Book");
const Reward = require("./models/Reward");

// Import Routes
const rewardRoutes = require('./routes/rewardRoutes');
const bookRoutes = require('./routes/bookRoutes');
const userRoutes = require('./routes/userRoutes');

app.use('/rewards', rewardRoutes);
app.use('/books', bookRoutes);
app.use('/users', userRoutes);

// Sample routes
app.get("/", (req, res) => res.send("API is running smoothly"));

app.listen(5000, () => console.log("Server running on http://localhost:5000"));
