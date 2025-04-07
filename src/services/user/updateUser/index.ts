import { User } from '@/models/relations';

export const setGoogleId = async ( googleId: string, email: string ) => {
    try {
        await User.update({ googleId }, { where: { email }});
    } catch ( error ) {
        console.log( error );  
    };
};