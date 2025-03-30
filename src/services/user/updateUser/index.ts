import User from "@/models/user";

export const setGoogleId = async ( googleId: string, email: string ) => {
    try {
        await User.update({ googleId }, { where: { email }});
    } catch ( error ) {
        console.log( error );  
    };
};