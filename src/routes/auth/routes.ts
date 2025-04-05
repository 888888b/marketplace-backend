import express from "express";
import passport from "@/middlewares/passport";
import dotenv from "dotenv";

import { googleAuthCallback } from "@/controllers/auth/googleCallback";
import { registerController } from "@/controllers/auth/register";
import { loginController } from "@/controllers/auth/login";
import { logoutController } from "@/controllers/auth/logout";

dotenv.config();

const router = express.Router();

// Rota de login com Google
router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

// Callback do Google
router.get(
  "/google/callback",
  passport.authenticate("google", { session: false }),
  googleAuthCallback
);

router.post(
  "/register",
  registerController
);

router.post(
  "/login",
  loginController
);

router.get(
  "/logout",
  passport.authenticate("jwt", { session: false }),
  logoutController
);

export default router;
