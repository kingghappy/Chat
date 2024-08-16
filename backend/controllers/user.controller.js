import User from "../models/user.model.js";

export const getUserSideBar = async (req, res) => {
  try {
    const loggedInUserId = req.user._id;

    const fillteredUsers = await User.find({
      _id: { $ne: loggedInUserId },
    }).select("-password");

    res.status(200).json(fillteredUsers);

  } catch (e) {
    console.error("error getting user", e.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
