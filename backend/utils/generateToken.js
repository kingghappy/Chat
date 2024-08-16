import jwt from "jsonwebtoken";

const generateTokenAndSetCookie = (userId, res) => {
  const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: "15d",
  });

  res.cookie("jwt", token, {
    httpOnly: true,
    maxAge: 1000 * 60 * 60 * 24 * 15, // 15 days
    sameSite: "strict",
    secure: process.env.NODE_ENV !== "devlopment", // Set secure flag for production environment
  });
}; 

export default generateTokenAndSetCookie;
