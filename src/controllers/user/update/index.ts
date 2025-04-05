import { Request, Response } from "express";

import User from "@/models/user";
import { generateJwtToken } from "@/services/auth";

export const updateUserController = async ( req: Request, res: Response ) => {

    // verifica se o token existe
    if ( !req.user ) {
        res.status( 401 ).json({ message: "Invalid or non-existent token" });
        return;
    };

    const email = req.user.sub as string
    const newUserData = req.body;

    try {
        // atualiza os dados do usuario no banco de dados 
        await User.update({ ...newUserData }, { where: { email }})

        // caso o email estaja entre os dados atualizados e preciso criar um novo token jwt
        if ( newUserData.email ) {
            const token = generateJwtToken( newUserData.email );
            res.cookie('token', token, {
                httpOnly: true,
                secure: true,
                sameSite: "none",
            });
        };

        res.status( 200 ).json({ message: "User updated successfully" });

    } catch ( error ) {
        console.error( error );
        res.status( 500 ).json({ message: "Internal error" });
    };
};