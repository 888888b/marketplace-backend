import { Request, Response } from 'express';

import { createStore } from '@/services/store/create';
import { getStoreData } from '@/services/store/get';
import { setUserRole } from '@/services/user/updateUser';

export const createStoreController = async ( req: Request, res: Response ) => {

    // verifica se o token existe
    if ( !req.user ) {
        res.status( 401 ).json({ message: "Invalid or non-existent token" });
        return;
    };

    const userId = req.user.sub as string;

    try {
        const store = await getStoreData( userId );

        // verifica se o usuario ja possui uma loja / so e permitido possuir 1
        if ( store ) {
            res.status( 409 ).json({ message: 'User already has a store' });
            return;
        };

        // cria uma nova loja e vincula ao usuario
        const newStore = await createStore({ ...req.body, userId });

        // altera o status do usuario para 'vendedor'
        await setUserRole( 'seller', userId );

        res.status( 201 ).json( newStore.dataValues );

    } catch ( error: any ) {
        console.error( 'Erro ao criar loja:', error );
        res.status( 500 ).json({ error: error.message || 'Internal error' });
    };
};