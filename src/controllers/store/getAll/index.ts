import { Request, Response } from "express";
import { Store, Product, ProductImage } from '@/models/relations';

export const getAllStoresController = async ( req: Request, res: Response ) => {
    console.log(req.user);
    try {
        const allStores = await Store.findAll({
            attributes: ['id', 'name', 'logoUrl'],
            include: [
                {
                    model: Product,
                    limit: 4,
                    as: 'products',
                    attributes: ['id', 'name', 'price', 'description'],
                    include: [
                        {
                            model: ProductImage,
                            limit: 1,
                            as: 'images',
                            attributes: ['imageUrl']
                        }
                    ]
                }
            ],
            limit: 10,
        });

        // retorna os dados solicitados
        res.status( 200 ).json({ stores: allStores });

    } catch ( error ) {
        console.error(error);
        res.status( 500 ).json({ message: 'Internal error' });
    };
};