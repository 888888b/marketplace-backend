import { Router } from "express";
import { searchController } from "@/controllers/search";
import passport from '@/middlewares/passport';

const router = Router();

// rota para pesquisa (getProductsController, lojas, pessoas ...)
router.get(
    "/",
    passport.authenticate('jwt', { session: false }),
    searchController
);

export default router;