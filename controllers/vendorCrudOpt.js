import Vendor from "../models/Vendor.js";

// deleteVendor function to delete a vendor shop
export const deleteVendor = async (req, res) => {
    try {
        const deletedVendor = await Vendor.findByIdAndDelete(req.user.id);
        if (!deletedVendor) return res.status(404).json({ message: "Vendor not found" });
        res.json({ message: "Vendor shop deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Error deleting vendor shop" });
    }
}

// updateVendor function to update a vendor shop
export const updateVendor = async (req, res) => {
    try {
        const updatedVendor = await Vendor.findByIdAndUpdate(req.user.id, req.body, { new: true });
        if (!updatedVendor) return res.status(404).json({ message: "Vendor not found" });
        res.json(updatedVendor);
    } catch (error) {
        res.status(500).json({ message: "Error updating vendor shop" });
    }
}

export const getHistoryVendor = async (req, res) => {
    try {
        const vendor = await Vendor.findById(req.user.id, "responseHistory");
        if (!vendor) return res.status(404).json({ message: "Vendor not found" });
        res.json({ responseHistory: vendor.responseHistory });
    } catch (error) {
        res.status(500).json({ message: "Error retrieving vendor response history" });
    }
}