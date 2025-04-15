// tools
import { Router } from "express";
import passport from "@/middlewares/passport";

// controllers
import { createProductController } from "@/controllers/product/create";
import { deleteProductController } from "@/controllers/product/delete";
import { getProductsController } from "@/controllers/product/get";
import { getAllProductsController } from "@/controllers/product/getAll";
import { updateProductController } from "@/controllers/product/update";

const router = Router();

// criar produto
router.post(
    "/",
    passport.authenticate('jwt', { session: false }),
    createProductController
);

// deletar um produto
router.delete(
    "/:productId",
    passport.authenticate('jwt', { session: false }),
    deleteProductController
);

// obter produtos de uma loja
router.get(
    "/:storeId",
    passport.authenticate('jwt', { session: false }),
    getProductsController
);

// obter produtos (produtos de todas as lojas)
router.get(
    "/",
    passport.authenticate('jwt', { session: false }),
    getAllProductsController
);

// atualizar o produto de uma loja
router.patch(
    "/:productId",
    passport.authenticate('jwt', { session: false }),
    updateProductController
);

export default router;