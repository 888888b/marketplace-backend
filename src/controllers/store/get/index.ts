import { Request, Response } from "express";
import { getStoreData } from "@/services/store/get";

export const getStoreController = async (req: Request, res: Response) => {

    const userId = req.user?.sub as string;

    // verifica se o token existe
    if ( !req.user ) {
        res.status( 401 ).json({ message: "Invalid or non-existent token" });
        return;
    };

    try {
        const store = await getStoreData( userId );

        // verifica se a loja existe
        if ( !store ) {
            res.status( 400 ).json({ message: 'Store not found or non-existent' });
            return;
        };

        // retorna os dados solicitados
        res.status( 200 ).json({ store: store.dataValues });

    } catch ( error: any ) {
        console.error( error );
        res.status( 500 ).json({ message: 'Internal error' });
    };
};