import mongoose from "mongoose";

const vendorSchema = new mongoose.Schema({
    shopName: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true }, // Vendor Login
    password: { type: String, required: true, minlength: 8 },
    address: { type: String, required: true },
    phoneNumber: { type: String, required: true },
    shopImg: { type: String, default: "default.jpg" },
    pinLocation: { 
      lat: { type: Number, required: true }, 
      lng: { type: Number, required: true }
    },
    shopCategory: { type: String, required: true, enum: ["Car Mechanic", "Food Shop", "Mobile Shop", "Other"] }, 
    products: [{ type: String, trim: true }],
  }, { timestamps: true });
const vendor = mongoose.model('Vendor', vendorSchema);
export default vendor;

// The vendor model is created with the following fields:
// shopName: String
// password: String
// address: String
// shopImg: String
// pinLocation: { lat: Number, lng: Number }
// shopCategory: String
// The vendor model is exported as default.