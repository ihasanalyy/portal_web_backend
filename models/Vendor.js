import mongoose from "mongoose";

const vendorSchema = new mongoose.Schema({
  shopName: { type: String, required: true, trim: true },
  email: { type: String, required: true, unique: true }, // Vendor Login
  password: { type: String, required: true, minlength: 8 },
  address: { type: String, required: true },
  phoneNumber: { 
    type: String, 
    required: true,
    match: [/^\+\d{1,3}\d{7,14}$/, "Invalid phone number format"] // Ensure valid format
},
  shopImg: { type: String, default: "default.jpg" },
  pinLocation: {
    type: { type: String, enum: ["Point"], default: "Point" },
    coordinates: { type: [Number], required: true }, // [longitude, latitude]
  },
  postalCode: {type: Number},
  country:{type: String},
  city:{type: String},
  shopCategory: [{ type: String, required: true, trim: true }],
  products: [{ type: String, trim: true }],
  responseHistory: [
    {
      userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
      action: String,
      timestamp: { type: Date, default: Date.now }
    }
  ]
});
vendorSchema.index({ pinLocation: "2dsphere" });
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