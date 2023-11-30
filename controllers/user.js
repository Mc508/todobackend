import { User } from "../models/user.js";
import bcrypt from "bcrypt";
import { sendcookie } from "../utils/feature.js";
import ErrorHandler from "../middlewares/error.js";

export const register = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;
    const user = await User.findOne({ email });
    if (user)
      return next(
        new ErrorHandler("you are already registered please login", 404)
      );

    const hashedpassword = await bcrypt.hash(password, 10);
    await User.create({ name, email, password: hashedpassword });
    sendcookie(
      User,
      res,
      "Congratulations you are registerd successfully",
      201
    );
  } catch (error) {
    next(error);
  }
};

export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email }).select("+password");

    if (!user) {
      return next(new ErrorHandler("You are not registered", 404));
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return next(new ErrorHandler("Incorrect password", 404));
    }

    sendcookie(user, res, `Welcome back, ${user.name}`, 200);
  } catch (error) {
    next(error);
  }
};

export const logout = async (req, res, next) => {
  try {
    res
      .status(200)
      .cookie("token", "", {
        expires: new Date(Date.now()),
        sameSite: process.env.NODE_ENV === "Development" ? "lax" : "none",
        secure: process.env.NODE_ENV === "Development" ? false : true
      })
      .json({ success: true, message: "logout" });
  } catch (error) {
    next(error);
  }
};

export const getMyprofile = async (req, res) => {
  try {
    res.status(200).json({ success: true, user: req.user });
  } catch (error) {
    next(error);
  }
};
