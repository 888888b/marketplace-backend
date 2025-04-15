import { Request, Response } from 'express';
import { Op } from 'sequelize';
import { Product, Store, ProductImage } from '@/models/relations';

export const searchController = async ( req: Request, res: Response ) => {

    const {
        query,
        minPrice,
        maxPrice,
        store,
        sortBy = 'price',
        order = 'desc',
        page = 1,
        limit = 10,
    } = req.query;

    const pageNum = Number(page);
    const limitNum = Number(limit);
    const offset = (pageNum - 1) * limitNum;

    // verificar valor minimo
    if (minPrice && isNaN(Number( minPrice ))) {
        res.status( 400 ).json({ message: 'Invalid minimum value' });
        return;
    };

    // verificar valor maximo
    if (maxPrice && isNaN(Number( maxPrice ))) {
        res.status( 400 ).json({ message: 'Invalid maximum value' });
        return;
    };

    if (!['asc', 'desc'].includes(String(order).toLowerCase())) {
        res.status(400).json({ message: 'only asc or desc sorting is allowed' });
        return;
    };

      // filtros dinâmicos
      const whereConfig: any = {};
      const whereStore: any = {};

      if ( query ) {
          whereConfig.name = { [Op.iLike]: `%${query}%` };
      };

      if ( minPrice ) {
          whereConfig.price = { ...(whereConfig.price || {}), [Op.gte]: Number(minPrice) };
      };

      if ( maxPrice ) {
          whereConfig.price = { ...(whereConfig.price || {}), [Op.lte]: Number(maxPrice) };
      };

      if ( store ) {
          whereStore.name = { [Op.iLike]: `%${store}%` };
      };
    
    try {
        const products = await Product.findAll({
            where: whereConfig,
            include: [
                {
                    model: Store,
                    as: 'store',
                    where: whereStore,
                    attributes: ['id', 'name'],
                },
                {
                    model: ProductImage,
                    as: 'images',
                    attributes: ['id', 'imageUrl'],
                }
            ],
            order: [[sortBy as string, order as string]],
            limit: limitNum,
            offset,
            attributes: ['id', 'name', 'description', 'price']
        });

        res.status( 200 ).json( products );
    } catch ( error ) {
        console.error( error );
        res.status( 500 ).json({ message: 'Internal error' });
    };
};
