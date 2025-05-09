import { Request, Response } from "express";
import bcrypt from "bcryptjs";

import { generateJwtToken, generateAccessToken } from "@/services/auth";
import { User } from '@/models/relations';

export const loginController = async ( req: Request, res: Response ) => {
  try {
    const { email, password } = req.body;

    // Validação dos campos obrigatórios
    if ( !email || !password ) {
        res.status( 400 ).json({ message: "All fields are required." });
        return;
      };

    // Verifica se o usuário existe
    const user = await User.findOne({ where: { email } });
    if ( !user ) {
      res.status( 401 ).json({ message: "User not found in database" });
      return;
    };

    // caso o googleId exista e o password nao significa que a conta foi criada a partir de outro metodo. Exemplo (google ou facebook)
    if ( user.dataValues.googleId && !user.dataValues.password ) {
        res.status( 409 ).json({ 
            message: "Account created using another authentication method" 
        });
        return;
    };

    // Verifica a senha
    const isPasswordValid = await bcrypt.compare( password, user.dataValues.password );
    if ( !isPasswordValid ) {
        res.status( 401 ).json({ message: "Invalid password" });
        return;
    };

    // retorna os dados do usuario ao front end
    const { id, name, picture, phone, role } = user?.dataValues;

    // Gera o token JWT
    const token = generateJwtToken( id );
    const accessToken = generateAccessToken( id, role );

    // definir cookie http only
    res.cookie('token', token, {
        httpOnly: true,
        secure: true,
        sameSite: "none",
        maxAge: 24 * 60 * 60 * 1000,
        domain: '.communa.com.br',
        path: "/"
    });

    // access token
    res.cookie('access_token', accessToken, {
      httpOnly: false,
      secure: true,
      sameSite: 'none',
      maxAge: 24 * 60 * 60 * 1000,
      domain: '.communa.com.br',
      path: "/"
  });

    // retorna os dados do usuario
    res.status( 200 ).json({ 
      message: "User logged in successfully",
      user: { id, name, email, picture, phone }
    });

  } catch ( error ) {
    console.error( error );
    res.status( 500 ).json({ message: "Internal error" });
  };
};
