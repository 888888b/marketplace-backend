import { Request, Response } from "express";
import { User } from '@/models/relations';

export const deleteUserController = async ( req: Request, res: Response ) => {

    // verifica se o token existe
    if ( !req.user ) {
        res.status( 401 ).json({ message: "Invalid or non-existent token" });
        return;
    };

    const id = req.user.sub as string

    try {
        await User.destroy({ where: { id }});
        res.clearCookie('token');
        res.status( 200 ).json({ message: "User successfully deleted" });

    } catch ( error ) {
        console.error( error );
        res.status( 500 ).json({ message: "Internal error" });
    };
};