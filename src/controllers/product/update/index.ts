import { Request, Response } from 'express';
import { Product, ProductImage, Store } from '@/models/relations';
import { isUUID } from 'validator';

export const updateProductController = async ( req: Request, res: Response ) => {

    const { productId } = req.params;
    const { 
        name, 
        description, 
        price, 
        images 
    } = req.body;
    const userId = req.user?.sub as string;

     // verifica se o parametro productId foi passado na query
    if ( !productId || !isUUID( productId, '4' )) {
        res.status( 400 ).json({ message: 'Invalid or non-existent product id' });
        return;
    };

    // verifica se o token existe
    if ( !req.user || !userId ) {
        res.status( 401 ).json({ message: "Invalid or non-existent token" });
        return;
    };

    if ( !name && !description && !price && !images ) {
        res.status( 400 ).json(
            { message: 'At least one field is required (name, description, price or images)' }
        );
        return;
    };

    try {
        // busca o produto e inclui e a loja para verificação de propriedade
        const product = await Product.findOne({
            where: { id: productId },
            include: {
                model: Store,
                as: 'store',
                attributes: ['id', 'userId'],
                where: { userId }
            }
        });

        // caso nao exista ou o produto pertencer a outra loja
        if ( !product ) {
            res.status( 404 ).json({ message: 'Product not found or access denied' });
        };

        const newProductData = {
            ...(name && { name }),
            ...(description && { description }),
            ...(price !== undefined && { price }),
        };
        // Atualiza os campos do produto, se fornecidos
        await Product.update( newProductData, { where: { id: productId }});

        // verifica se ao menos uma imagem foi enviada nao req
        if ( images && Array.isArray(images) && images.length ) {
            // Remove imagens antigas
            await ProductImage.destroy({ where: { productId } });

            // Adiciona novas imagens
            const newImages = images.map(( imageUrl: string ) => ({
                productId,
                imageUrl
            }));

            await ProductImage.bulkCreate( newImages );
        };      

        res.status( 200 ).json({ message: 'Product updated successfully' });

    } catch ( error ) {
        console.error( error );
        res.status( 500 ).json({ message: 'Internal error' });
    };
};
