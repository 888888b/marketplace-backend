// tools
import { Router } from "express";
import passport from "@/middlewares/passport";

// controllers
import { createProductController } from "@/controllers/product/create";
import { deleteProductController } from "@/controllers/product/delete";
import { getProductsController } from "@/controllers/product/get";

const router = Router();

// criar produto
router.post(
    "/",
    passport.authenticate('jwt', { session: false }),
    createProductController
);

// deletar produto
router.delete(
    "/:productId",
    passport.authenticate('jwt', { session: false }),
    deleteProductController
);

// obter dados do produto
router.get(
    "/:storeId",
    passport.authenticate('jwt', { session: false }),
    getProductsController
);

export default router;