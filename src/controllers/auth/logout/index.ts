import { Request, Response } from "express";

export const logoutController = ( req: Request, res: Response ) => {
    
    // verifica se o token existe
    if ( !req.user ) {
        res.status( 401 ).json({ message: "Invalid or non-existent token" });
        return;
    };

    // limpa o token de acesso imposibilitando requisições futuras por parte do usuario
    res.clearCookie('token');
    res.clearCookie('access_token');
    res.status( 200 ).json({ message: "user successfully logged out" });
};