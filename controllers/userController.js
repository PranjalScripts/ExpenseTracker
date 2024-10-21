const userModel = require("../models/userModel");
const jwt = require("jsonwebtoken"); // Import the JWT package

// Function to generate JWT Token
const generateToken = (user) => {
  return jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
    expiresIn: "5h",
  }); // Adjust the expiration time as needed
};

// Login Callback
const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find user by email (consider hashing the password before comparing)
    const user = await userModel.findOne({ email });

    if (!user || user.password !== password) {
      // Note: Use bcrypt to compare hashed password in real apps
      return res.status(404).send("User Not Found");
    }

    // Generate JWT token
    const token = generateToken(user);

    res.status(200).json({
      success: true,
      user,
      token, // Send the token back to the client
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error,
    });
  }
};

// Register Callback
const registerController = async (req, res) => {
  try {
    const newUser = new userModel(req.body);
    await newUser.save();

    // Generate JWT token after registration
    const token = generateToken(newUser);

    res.status(201).json({
      success: true,
      newUser,
      token, // Send the token back to the client
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error,
    });
  }
};

module.exports = { loginController, registerController };
