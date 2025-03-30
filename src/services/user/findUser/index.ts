import sequelize from "@/config/sequelize";
import { Model } from "sequelize";
import User from "@/models/user";

export const findEmailOnDb = async ( email: string )
    : Promise<Model<any, any> | null> => {
        
    const query = await User.findOne(
        { where: { email } }
    );

    return query;
};
