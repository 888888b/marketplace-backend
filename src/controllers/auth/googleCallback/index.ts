import { findUserInDb } from "@/services/user/findUser";
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

    const frontendUrl = process.env.FRONTEND_URL || 'https://localhost:3000';
    const frontendGoogleCallback = process.env.FRONTEND_GOOGLE_CALLBACK || '/api/auth/google';

    if ( !req.user ) {
        return res.redirect(
            `${frontendUrl}${frontendGoogleCallback}?status=authentication_failed`
        );
    };

    const {
        sub, // id google do usuario 
        name,
        email,
        picture,
        email_verified
    } = req.user._json;

    try {
        // verifica se ja existe o email no banco de dados
        const user = await findUserInDb({ googleId: sub, email });
        let userIdInDb: null | string = null;

        if ( !user ) {
            const newUser = await createUser({ 
                name, 
                email, 
                picture,
                googleId: sub,
                verified: email_verified
            });

            userIdInDb = newUser.dataValues.id;
        } else {
            // caso exista uma conta de usuario com o email ou id, é criado o campo 'googleId' 
            // que vincula a conta google a conta ja existente no banco de dados 
            await setGoogleId( sub, email );
        };

        // Criar JWT para o usuário autenticado
        const token = generateJwtToken( userIdInDb || user?.dataValues.id );

        res.cookie('token', token, {
            httpOnly: true,
            secure: true,
            sameSite: 'none',
            maxAge: 24 * 60 * 60 * 1000,
        });

        // redireciona para o front e envia o token para de acesso
        return res.redirect(
            `${frontendUrl}${frontendGoogleCallback}?status=successful`
        );

    } catch ( error ) {
        console.error( error );
        // redireciona para o front e sinaliza que houve erro
        return res.redirect(
            `${frontendUrl}${frontendGoogleCallback}?status=internal_error`
        );
    };
};