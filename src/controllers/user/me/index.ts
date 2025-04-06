import { Request, Response } from "express";
import User from "@/models/user";

export const getUserController = async ( req: Request, res: Response ) => {

    // verifica se o token existe
    if ( !req.user ) {
        res.status( 401 ).json({ message: "Invalid or non-existent token" });
        return;
    };

    const idFromToken = req.user.sub as string

    try {
        // busca o usuario no banco de dados
        const user = await User.findOne({ where: { id: idFromToken }});

        // caso o usuario nao exista retorna um erro 
        if ( !user ) {
            res.status( 401 ).json({ message: "User not found in database" });
            return;
        };

        // rotarna os dados ao front end
        const { id, name, email, picture, phone } = user?.dataValues;
        res.status( 200 ).json({ user: { id, name, email, picture, phone }});

    } catch ( error ) {
        console.error( error );
        res.status( 500 ).json({ message: "Internal error" });
    };
};