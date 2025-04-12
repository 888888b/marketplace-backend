import { Router } from "express";
import passport from "@/middlewares/passport";

import { createStoreController } from "@/controllers/store/create";
import { deleteStoreController } from "@/controllers/store/delete";
import { getStoreController } from "@/controllers/store/get";
import { getAllStoresController } from "@/controllers/store/getAll";


const router = Router();

router.post(
    "/mine",
    passport.authenticate('jwt', { session: false }),
    createStoreController
);

router.delete(
    "/mine",
    passport.authenticate('jwt', { session: false }),
    deleteStoreController
);

router.get(
    "/mine",
    passport.authenticate('jwt', { session: false }),
    getStoreController
);

router.get(
    "/all",
    passport.authenticate('jwt', { session: false }),
    getAllStoresController
);

export default router;