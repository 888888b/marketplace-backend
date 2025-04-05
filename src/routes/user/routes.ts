import express  from "express";
import passport from '@/middlewares/passport';

import { getUserController } from "@/controllers/user/me";
import { deleteUserController } from "@/controllers/user/delete";
import { updateUserController } from "@/controllers/user/update";

const router = express.Router();

router.get(
    "/me",
    passport.authenticate( "jwt", { session: false }),
    getUserController
);

router.delete(
    "/me",
    passport.authenticate( "jwt", { session: false }),
    deleteUserController
);

router.patch(
    "/me",
    passport.authenticate( "jwt", { session: false }),
    updateUserController
);

export default router;