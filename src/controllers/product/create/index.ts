import { Request, Response } from 'express';

import { Product, ProductImage } from '@/models/relations';
import { getStoreData } from '@/services/store/get';

export const createProductController = async ( req: Request, res: Response ) => {
    
    const userId = req.user.sub as string;
    const { name, description, price, images } = req.body;

    // verifica se o token existe
    if ( !req.user ) {
        res.status( 401 ).json({ message: "Invalid or non-existent token" });
        return;
    };

    // verifica campos obrigatorios da requisição
    if ( !name || !description || !price ) {
        res.status( 400 ).json(
            { message: 'Product name, price, image and description are required' }
        );
        return;
    };

    if ( !images || !Array.isArray(images) || images.length === 0 ) {
        res.status( 400 ).json({ message: 'At least one image URL is required' });
        return;
    };

    if ( images.length > 3 ) {
        res.status( 400 ).json({ message: 'Limit of 3 images per product exceeded' });
        return;
    };

    try {
        // verifica se a loja existe e pertence ao usuário
        const store = await getStoreData( userId );

        if ( !store ) {
            res.status( 404 ).json({ message: 'Store not found or non-existent' });
            return;
        };

        // cria o produto
        const newProduct = await Product.create({
            name,
            description,
            price,
            storeId: store.dataValues.id
        });

        // adiciona uma ou mais imagem do produto
        await Promise.all(images.map( url => ProductImage.create({
            productId: newProduct.dataValues.id,
            imageUrl: url
        })));

        // busca todas as informações do produto (produto + imagens)
        const product = await Product.findOne({ 
            where: { id: newProduct.dataValues.id },
            attributes: ['name', 'description', 'price'],
            include: [
                {
                    model: ProductImage,
                    as: 'images',
                    attributes: ['id', 'imageUrl']
                }
            ]
        });

        // retorna os dados do novo produto (produto + imagens)
        res.status( 201 ).json({ product });

    } catch ( error ) {
        console.error( error );
        res.status( 500 ).json({ message: 'Internal error' });
    };
};
