import express from "express";
import passport from "@/middlewares/passport";
import dotenv from "dotenv";
import { googleAuthCallback } from "@/controllers/auth/googleCallback";

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

export default router;
