import express from 'express';
import bcrypt from 'bcryptjs';
import User from '../models/User.js';
import jwt from 'jsonwebtoken';
// import token from '../middleware/authMiddleware.js';

const router = express.Router();

// singup route
router.post('/signup', async (req, res) => {
    const { name, email, password, phoneNumber } = req.body;
    console.log(name, email, password, phoneNumber);
    if (!name || !email || !password || !phoneNumber) {
        return res.status(400).json({ message: "All fields are required" });
    }
    const hashPassword = await bcrypt.hash(password, 10);
    try {
        const user = await User.create({
            name,
            email,
            password: hashPassword,
            phoneNumber
        })
        await user.save();
        return res.status(201).json({ message: "User created successfully" });
    } catch (error) {
        res.status(400).json({ error: "User already exists" });
    }
})

// login route
router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    // check if user exists and password is correct
    if (!user || !(await bcrypt.compare(password, user.password))) {
        return res.status(401).json({ error: "Invalid credentials" });
    } else if (user && (await bcrypt.compare(password, user.password))) {
        // generate token for session
        const token = jwt.sign({ id: user._id }, process.env.SECRET_KEY, { expiresIn: "1h" });
        res.cookie("access_token", token, { httpOnly: true, secure: true, sameSite: "strict" });
        return res.status(200).json({ message: "Login successful" });
    }

})
export default router;