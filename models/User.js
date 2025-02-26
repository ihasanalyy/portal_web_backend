import mongoose from "mongoose";

const userSchchema = new mongoose.Schema({
    name: String,
    email: { type: String, unique: true },
    password: String,
    phoneNumber: Number
})
const User = mongoose.model('User', userSchchema);
export default User;

// The user model is created with the following fields:
// name: String
// email: { type: String, unique: true }
// password: String
// phoneNumber: Number
// The user model is exported as default