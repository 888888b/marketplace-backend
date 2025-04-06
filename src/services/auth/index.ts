import jwt from "jsonwebtoken";

// Criar JWT para o usuário autenticado
export const generateJwtToken = ( userId: string ): string => {
    const token = jwt.sign(
        { sub: userId }, 
        process.env.JWT_SECRET as string,
        { expiresIn: "1d" }
    );

    return token;
};