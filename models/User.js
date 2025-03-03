import mongoose from "mongoose";

const userSchchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true, minlength: 6 },
  phoneNumber: { type: String, required: true, unique: true },
  coins: { type: Number, default: 50 }, // Users get 50 coins on registration
  registrationSource: { type: String, required: true, enum: ["whatsapp", "web"] },
  searchHistory: [
    {
      query: String,
      timestamp: { type: Date, default: Date.now }
    }
  ]
});
const User = mongoose.model('User', userSchchema);
export default User;

// The user model is created with the following fields:
// name: String
// email: { type: String, unique: true }
// password: String
// phoneNumber: Number
// The user model is exported as default