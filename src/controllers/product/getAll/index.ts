import { Request, Response } from 'express';
import { Product, ProductImage } from '@/models/relations';

export const getAllProductsController = async ( req: Request, res: Response ) => {
    const {
        page = 1,
        limit = 10,
    } = req.query;

    // Validar valores das queries
    const maxPage = Math.max(Number(page) || 1, 1);
    const maxLimit = Math.min(Math.max(Number(limit) || 10, 1), 100); // limita máximo a 100
    const offset = (maxPage - 1) * maxLimit;

    try {
        const products = await Product.findAll({
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

        res.status( 200 ).json({
            products,
            pagination: {
                page: maxPage,
                limit: maxLimit,
            },
        });
    } catch ( error ) {
        console.error( error );
        res.status( 500 ).json({ message: 'Internal error' });
    };
};