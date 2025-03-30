import { findEmailOnDb } from "@/services/user/findUser";
import { createUser } from "@/services/user/createUser";
import { setGoogleId } from "@/services/user/updateUser";
import { generateJwtToken } from "@/services/auth";

import { Request, Response } from "express";
import dotenv from 'dotenv';

export interface RequestProps extends Request {
    user?: any
};

dotenv.config();

export const googleAuthCallback = async (
    req: RequestProps, res: Response) => {
    const frontendUrl = process.env.FRONTEND_URL || 'http://localhost:3000';

    if (!req.user) {
        return res.redirect(`${frontendUrl}/login?status=authentication_failed`);
    };

    const {
        name,
        email,
        picture,
        email_verified
    } = req.user._json;

    try {
        // verifica se ja existe o email no banco de dados
        const query = await findEmailOnDb( email );
        if ( !query ) {
            await createUser({ 
                name, 
                email, 
                picture,
                googleId: req.user.id,
                verified: email_verified
            });
        };

        // caso exista uma conta de usuario com o email, é criado o campo 'googleId' que vincula a conta google a conta ja existente no banco de dados 
        await setGoogleId( req.user.id, email );

        // Criar JWT para o usuário autenticado
        const token = generateJwtToken( email );

        res.cookie('token', token, {
            httpOnly: true,
            secure: true,
            sameSite: 'none',
            maxAge: 24 * 60 * 60 * 1000,
        });

        // redireciona para o front e envia o token para de acesso
        return res.redirect(`${frontendUrl}/login?status=successful`);
    } catch ( error ) {
        console.error( error );
        // redireciona para o front e sinaliza que houve erro
        return res.redirect(`${frontendUrl}/login?status=internal_error`);
    };
};