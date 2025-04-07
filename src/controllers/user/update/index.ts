import { Request, Response } from "express";

import { User } from '@/models/relations';

export const updateUserController = async ( req: Request, res: Response ) => {

    // verifica se o token existe
    if ( !req.user ) {
        res.status( 401 ).json({ message: "Invalid or non-existent token" });
        return;
    };

    const id = req.user.sub as string
    const { 
        email,
        password, 
        ...newUserData 
    } = req.body;

    try {
        // atualiza os dados do usuario no banco de dados 
        await User.update({ ...newUserData }, { where: { id }})
        res.status( 200 ).json({ message: "User updated successfully" });

    } catch ( error ) {
        console.error( error );
        res.status( 500 ).json({ message: "Internal error" });
    };
};