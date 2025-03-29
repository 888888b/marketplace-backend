import sequelize from "@/config/sequelize";
import { QueryTypes } from "sequelize";

type QueryObjType = {
    email?: string
};

export const findEmailOnDb = async (email: string)
    : Promise<QueryObjType[]> => {
    const query: QueryObjType[] = await sequelize.query(
        'SELECT email FROM users WHERE email = :email',
        {
            type: QueryTypes.SELECT,
            raw: true,
            replacements: { email }
        });

    return query;
};
