const User = require("../models/user");
const Token = require("../models/token");
const jwt = require("jsonwebtoken");

const JWT_SECRET = process.env.JWT_SECRET || "My Secret Key";

exports.login = async (req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
        return res.status(400).send({ error: "Invalid email or password" });
    }

    const isMatch = await user.verifyPassword(password);
    if (!isMatch) {
        return res.status(400).send({ error: "Invalid email or password" });
    }

    const token = jwt.sign({ _id: user._id }, JWT_SECRET);
    const sessionToken = new Token({ userId: user._id, key: token });
    await sessionToken.save();

    res.send({ user, token });
};

exports.logout = async (req, res) => {
    try {
        await Token.deleteOne({ key: req.token });
        res.send({ message: "Logout successful" });
    } catch (error) {
        res.status(500).send({ error: "Logout failed" });
    }
};

exports.register = async (req, res) => {
    const { firstName, lastName, email, password, confirmPassword } = req.body;

    // Validate input
    if (!firstName || !lastName || !email || !password || !confirmPassword) {
        return res.status(400).json({ message: 'All fields are required' });
    }

    if (password !== confirmPassword) {
        return res.status(400).json({ message: 'Passwords do not match' });
    }

    try {
        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }

        // Create new user
        const newUser = new User({
            firstName,
            lastName,
            email,
            password,
        });

        await newUser.save();

        // Generate JWT token
        const token = jwt.sign(
            { id: newUser._id, email: newUser.email },
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        );

        res.status(201).json({
            message: 'User registered successfully',
            token,
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};