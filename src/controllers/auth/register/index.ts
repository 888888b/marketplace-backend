import { Request, Response } from "express";
import bcrypt from "bcryptjs";

import { createUser } from "@/services/user/createUser";
import { generateJwtToken } from "@/services/auth";
import { findUserInDb } from "@/services/user/findUser";

export const registerController = async ( req: Request, res: Response ) => {
  try {
    const { name, email, password } = req.body;

    // Validação dos campos obrigatórios
    if ( !name || !email || !password ) {
      res.status( 400 ).json({ message: "All fields are required." });
      return;
    };

    // Verificar se o e-mail já existe
    const user = await findUserInDb({ email });
    if ( user ) {
      res.status( 409 ).json({ message: "This email address is already in use." });
      return;
    };

    // Hash da senha
    const salt = await bcrypt.genSalt( 10 );
    const hashedPassword = await bcrypt.hash( password, salt );

    // Criar usuário no banco de dados
    const newUser = await createUser({
        name,
        email,
        password: hashedPassword,
        verified: true,
    });

    // Gerar um token JWT
    const token = generateJwtToken( newUser.dataValues.id );

    // definir cookie http only
    res.cookie('token', token, {
        httpOnly: true,
        secure: true,
        sameSite: "none",
        maxAge: 24 * 60 * 60 * 1000,
    });

    // Retornar sucesso com os dados do usuário
    res.status( 201 ).json({
      message: "user registered successfully!",
    });

  } catch ( error ) {
    console.error( error );
    res.status( 500 ).json({ message: "Internal error" });
  };
};
