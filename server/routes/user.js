const router = require("express").Router();
const User = require("../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { authenticateToken } = require("../routes/userAuth");

// sign up
router.post("/sign-up", async (req, res) => {
  try {
    const { username, email, password, address } = req.body;

    // check username length
    if (username.length < 4) {
      return res
        .status(400)
        .json({ message: "username should be greater than 4" });
    }

    // check username already exist
    const existingUsername = await User.findOne({ username: username });
    console.log(existingUsername, "existingUsername");
    if (existingUsername) {
      console.log("user founds");

      return res.status(400).json({ message: "Username already Exists" });
    }

    // check if email already exist
    const existingEmail = await User.findOne({ email: email });
    if (existingEmail) {
      return res.status(400).json({ message: "UserEmail already Exists" });
    }

    // check password length < 6
    if (password.length <= 5) {
      return res
        .status(400)
        .json({ message: "Password Length should be greater than 5" });
    }

    // hash password
    const hashPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      username: username,
      email: email,
      password: hashPassword,
      address: address,
    });
    await newUser.save();
    return res.status(200).json({ message: "User created" });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
});

// sign in

router.post("/sign-in", async (req, res) => {
  try {
    const { username, password } = req.body;
    const existingUser = await User.findOne({ username: username });
    if (!existingUser) {
      res.status(400).json({ message: "InValid Creadentials." });
    }
    await bcrypt.compare(password, existingUser.password, (err, data) => {
      if (data) {
        // store this as jwt token
        const authClaims = [
          {
            name: existingUser.username,
          },
          {
            role: existingUser.role,
          },
        ];

        const token = jwt.sign({ authClaims }, "bookStore123", {
          expiresIn: "30d",
        });
        res.status(200).json({
          id: existingUser._id,
          role: existingUser.role,
          token: token,
        });
      } else {
        res.status(400).json({ message: "InValid Creadentials." });
      }
    });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
});

// get-user information

router.get("/get-user-information", authenticateToken, async (req, res) => {
  try {
    const { id } = req.headers;
    const data = await User.findById(id).select("-password");
    return res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
});

// update address
router.put("/update-address", authenticateToken, async (req, res) => {
  try {
    const { id } = req.headers;
    const { address } = req.body;

    await User.findByIdAndUpdate(id, { address: address });
    return res.status(201).json({ message: "address updated" });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
});
module.exports = router;
