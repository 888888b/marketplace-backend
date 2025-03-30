import jwt from "jsonwebtoken";

// Criar JWT para o usuário autenticado
export const generateJwtToken = ( userEmail: string ): string => {
    const token = jwt.sign(
        { sub: userEmail }, 
        process.env.JWT_SECRET as string,
        { expiresIn: "1d" }
    );

    return token;
};