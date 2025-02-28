

import express from "express";
import { signupUser, loginUser } from "../controller/user-controller.js";

const router = express.Router();

router.post("/user/signup", signupUser);
router.post("/user/login", loginUser);

export default router;
