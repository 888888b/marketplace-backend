import { Request, Response } from 'express';
import { Product, ProductImage } from '@/models/relations';
import { isUUID } from 'validator';

export const getProductsController = async ( req: Request, res: Response ) => {
    
    // verificação de valores passados na requisição
    const storeId = req.params.storeId;
    const { page = 1, limit = 10 } = req.query;
    const maxPage = Math.max(Number(page) || 1, 1);
    const maxLimit = Math.min(Math.max(Number(limit) || 10, 1), 10);
    const offset = (maxPage - 1) * maxLimit;
    const userId = req.user.id as string;

    // verifica se o parametro storeId foi passado na query
    if ( !storeId || !isUUID( storeId )) {
        res.status( 400 ).json({ message: 'Invalid or non-existent store id' });
        return;
    };

    // verifica se o token existe
    if ( !req.user ) {
        res.status( 401 ).json({ message: "Invalid or non-existent token" });
        return;
    };

    try {
        // busca algums produtos da loja, via paginação
        const products = await Product.findAll({
            where: { storeId },
            offset,
            limit: maxLimit,
            include: [
                {
                    model: ProductImage,
                    as: 'images',
                    attributes: ['id', 'imageUrl']
                }
            ],
            attributes: ['id', 'name', 'description', 'price'],
        });

        // retorna os dados solicitados
        res.status( 200 ).json({
            products,
            pagination: {
                page: maxPage,
                limit: maxLimit,
                storeId,
            },
        });
    } catch ( error ) {
        console.error( error );
        res.status( 500 ).json({ message: 'Internal error' });
    };
};