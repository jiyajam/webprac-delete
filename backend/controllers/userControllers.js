const User = require('../models/userModel')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')

// Generate JWT
const generateToken = (_id) => {
  return jwt.sign({ _id }, process.env.SECRET, {
    expiresIn: '3d',
  })
}
//  {
//     name: { type: String, required: true },
//     username: { type: String, required: true, unique: true },
//     password: { type: String, required: true },
//     gender: { type: String, required: true },
//     date_of_birth: { type: Date, required: true },
//     address: { type: String, required: true },
//     occupation: { type: String, required: true },
//   },
//   { timestamps: true, versionKey: false }

// @desc    Register new user
// @route   POST /api/users/signup
// @access  Public
const signupUser = async (req, res) => {
  const {
    name,
    username,
    password,
    gender,
    date_of_birth,
    address,
    occupation,
  } = req.body
  try {
    if (
      !name ||
      !username ||
      !password ||
      !gender ||
      !date_of_birth ||
      !address ||
      !occupation
    ) {
      res.status(400)
      throw new Error('Please add all fields')
    }
    // Check if user exists
    const userExists = await User.findOne({ username })

    if (userExists) {
      res.status(400)
      throw new Error('User already exists')
    }

    // Hash password
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)

    // Create user
    const user = await User.create({
      name,
      username,
      password: hashedPassword,
      gender,
      date_of_birth,
      address,
      occupation,
    })

    if (user) {
      // console.log(user._id);
      const token = generateToken(user._id)
      res.status(201).json({ username, token })
    } else {
      res.status(400)
      throw new Error('Invalid user data')
    }
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
}

// @desc    Authenticate a user
// @route   POST /api/users/login
// @access  Public
const loginUser = async (req, res) => {
  const { username, password } = req.body
  try {
    // Check for user username
    const user = await User.findOne({ username })

    if (user && (await bcrypt.compare(password, user.password))) {
      const token = generateToken(user._id)
      res.status(200).json({ username, token })
    } else {
      res.status(400)
      throw new Error('Invalid credentials')
    }
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
}

// @desc    Get user data
// @route   GET /api/users/me
// @access  Private
const getMe = async (req, res) => {
  try {
    res.status(200).json(req.user)
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
}

module.exports = {
  signupUser,
  loginUser,
  getMe,
}
