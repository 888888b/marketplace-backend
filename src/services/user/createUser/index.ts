import { User } from '@/models/relations';
import { Model } from "sequelize";

type UserProps = {
    name: string 
    email: string
    verified: boolean
    password?: string
    picture?: string
    phone?: string
    googleId?: string
};

export const createUser = async ( user: UserProps )
: Promise<Model<any, any>> => {

    try {
        const newUser = await User.create({ 
            name: user.name, 
            email: user.email,
            password: user.password, 
            picture: user.picture, 
            phone: user.phone,
            verified: user.verified,
            googleId: user.googleId 
        });

        return newUser;

    } catch ( error: any ) {
        throw error;
    };
};
