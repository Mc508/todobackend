import express from "express";
import {
  register,
  login,
  logout,
  getMyprofile
} from "../controllers/user.js";
import { isAuthenticated } from "../middlewares/auth.js";

const router = express.Router();

router.get("/me", isAuthenticated, getMyprofile);

router.post("/new", register);

router.post("/login", login);

router.get("/logout", logout);

export default router;
