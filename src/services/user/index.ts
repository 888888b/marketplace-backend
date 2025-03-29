import sequelize from "@/config/sequelize";
import { QueryTypes } from "sequelize";
import User from "@/models/user";

type QueryObjType = {
    email?: string
};

export const createUser = async (
    name: string, 
    email: string, 
    profilePhoto: string
    ): Promise<void> => {
    try {
        await User.create({ name, email, profilePhoto });
    } catch (error: any) {
        throw error;
    };
};

export const findEmailOnDb = async (email: string): Promise<QueryObjType[]> => {
    const query: QueryObjType[] = await sequelize.query(
        'SELECT email FROM users WHERE email = :email',
        {
            type: QueryTypes.SELECT,
            raw: true,
            replacements: { email }
        });

    return query;
};
