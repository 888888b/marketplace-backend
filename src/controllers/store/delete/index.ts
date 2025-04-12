import { Request, Response } from "express";

import { deleteStore } from "@/services/store/delete";
import { getStoreData } from "@/services/store/get";

export const deleteStoreController = async ( req: Request, res: Response ) => {

    const userId = req.user.sub as string;

    // verifica se o token existe
    if ( !req.user ) {
        res.status( 401 ).json({ message: "Invalid or non-existent token" });
        return;
    };

    try {
        const store = await getStoreData( userId );

        // verifica se a loja existe antes de tentar apaga-la
        if ( !store ) {
            res.status( 400 ).json({ message: 'Store not found or non-existent' });
            return;
        };

        // tenta deletar a loja caso existir
        await deleteStore( userId );
        res.status( 200 ).json({ message: 'Store deleted successfully' });

    } catch ( error: any ) {
        console.error( error );
        res.status( 500 ).json({ message: 'Internal error' });
    };
};
