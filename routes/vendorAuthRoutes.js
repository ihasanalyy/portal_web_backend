import express from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import vendor from '../models/Vendor.js';

const router = express.Router();

// vendor singup route
router.post('/signup', async (req, res) => {
    const { email, password, phoneNumber, address, shopName, shopCategory, pinLocation, products } = req.body;
    console.log(req.body);
    if (!email || !password || !phoneNumber || !address || !shopName || !shopCategory || !pinLocation || !products) {
        return res.status(400).json({ message: "All fileds are required" });
    }
    try {
        const existingVendor = await vendor.findOne({ email });
        if (existingVendor) {
            return res.status(400).json({ message: "Vendor already exists" });
        } else {
            const hashPassword = await bcrypt.hash(password, 10);
            const newVendor = await vendor.create({
                email,
                password: hashPassword,
                phoneNumber,
                address,
                shopName,
                shopCategory,
                pinLocation,
                products
            })
            await newVendor.save();
            return res.status(201).json({ message: "Vendor created successfully" });
        }
    } catch (error) {
        res.status(400).json({ error: "Error creating vendor", details: error.message });
    }
})

// vendor login route
router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json({ message: "All fields are required" });
    } else {
        try {
            const existingVendor = await vendor.findOne({ email });
            if (!existingVendor || !(await bcrypt.compare(password, existingVendor.password))) {
                return res.status(401).json({ message: "Invalid credentials" });
            } else if (existingVendor && (await bcrypt.compare(password, existingVendor.password))) {
                const token = jwt.sign({ id: existingVendor._id }, process.env.SECRET_KEY, { expiresIn: "1h" });
                res.cookie("access_token", token, { httpOnly: true, secure: true, sameSite: "strict" });
                res.status(200).json({ message: "Login successful" });
            }
        } catch (error) {
            return res.status(400).json({ error: "Error logging in", error });
        }
    }
})

export default router;
// Description: This file contains the routes for vendor authentication.
// The file contains two routes: signup and login.
// The signup route is used to create a new vendor account in the database.
// The login route is used to authenticate the vendor and generate a token for session management.
// The routes handle the request and response using the express router.
// The routes use the vendor model to interact with the database.
// The routes are exported to be used in the main index.js file.