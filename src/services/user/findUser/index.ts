import { Model, Op } from "sequelize";
import User from "@/models/user";

type UserProps = {
    id?: string
    googleId?: string
    email?: string
};

export const findUserInDb = async ( user: UserProps )
    : Promise<Model<any, any> | null> => {

    const queryParams = [];
    user.id && queryParams.push({ id: user.id });
    user.googleId && queryParams.push({ googleId: user.googleId });
    user.email && queryParams.push({ email: user.email });

    if ( !queryParams.length ) {
        return null;
    };

    const query = await User.findOne({
        where: {
            [Op.or]: [
                ...queryParams
            ]
        }
    });

    return query;
};
