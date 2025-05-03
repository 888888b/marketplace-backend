import { Request, Response } from 'express';
import { Product, Store } from '@/models/relations';
import { isUUID } from 'validator';

export const deleteProductController = async ( req: Request, res: Response ) => {
    
    const userId = req.user?.sub as string;
    const { productId } = req.params;
    
    // verifica se o token existe
    if ( !req.user || !userId ) {
        res.status( 401 ).json({ message: "Invalid or non-existent token" });
        return;
    };

    // verifica se o id do produto foi informado e se e valido
    if ( !productId || !isUUID( productId, '4' )) {
        res.status( 400 ).json({ message: "Invalid or non-existent id" });
        return;
    };

    try {
        // busca o produto com sua loja associada
        const product = await Product.findOne({
            where: { id: productId },
            include: {
                model: Store,
                as: 'store',
                where: { userId: userId }, // garante que a loja é do usuário
            },
        });

        if ( !product ) {
            res.status( 404 ).json({ message: 'Product not found or access denied' });
            return;
        };

        // deleta o produto
        await product.destroy();
        res.status( 200 ).json({ message: 'Product deleted successfully' });

    } catch ( error ) {
        console.error( error );
        res.status( 500 ).json({ message: 'Internal error' });
    };
};
