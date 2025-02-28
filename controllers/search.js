import vendor from "../models/Vendor.js";
import User from "../models/User.js";

export const search = async (req, res) => {
    const { query } = req.body;
    const userId = req.user.id;
    console.log(query, "query");
    if (!query) return res.status(400).json({ message: "Search query is required" });

    try {
        const vendors = await vendor.find({ products: { $regex: query, $options: "i" } }, "shopName shopCategory shopImg");
        // Save search history
        await User.findByIdAndUpdate(userId, {
            $push: { searchHistory: { query } }
        });
        res.json(vendors);
    } catch (error) {
        res.status(500).json({ message: "Error searching vendors" });
    }
}

export const openShop = async (req, res) => {
    const userId = req.user.id;
    const { vendorId } = req.params;
    console.log(userId, vendorId)

    try {
        const userFound = await User.findById(userId);
        if (!userFound) return res.status(404).json({ message: "User not found" });

        if (userFound.coins < 1) {
            return res.status(400).json({ message: "Insufficient coins" });
        }

        userFound.coins -= 1;
        await userFound.save();

        const vendorHistory = await vendor.findByIdAndUpdate(vendorId, {
            $push: { responseHistory: { userId, action: "User viewed shop" } }
          }, { new: true });
          console.log(vendorHistory);

        const vendorFound = await vendor.findById(vendorId);
        if (!vendorFound) return res.status(404).json({ message: "Vendor not found" });
        res.json(vendorFound);
    } catch (error) {
        res.status(500).json({ message: "Error retrieving vendor details" });
    }
}