import User from "../models/User.js";

// coins function to get user points
export const pointsUser = async (req, res) => {
    try {
        const user = await User.findById(req.user.id, "coins");
        if (!user) return res.status(404).json({ message: "User not found" });
        res.json({ coins: user.coins });
      } catch (error) {
        res.status(500).json({ message: "Error retrieving user points" });
      }
}

export const getUserSearchHistory = async (req, res) =>{
    // const {userId} = req.body
    // console.log(userId,"userID")
    try {
        const user = await User.findById(req.user.id, "searchHistory");
        if (!user) return res.status(404).json({ meesage: "History not found"})
        res.json({ searchHistory: user.searchHistory });
      } catch (error) {
        res.status(500).json({ message: "Error retrieving search history" });
      }
}