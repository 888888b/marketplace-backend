import User from "@/models/user";

type UserProps = {
    name: string 
    email: string
    verified: boolean
    password?: string
    picture?: string
    phone?: string
};

export const createUser = async ( user: UserProps ): Promise<void> => {
    try {
        await User.create({ 
            name: user.name, 
            email: user.email,
            password: user.password, 
            picture: user.picture, 
            phone: user.phone,
            verified: user.verified 
        });
    } catch ( error: any ) {
        throw error;
    };
};
