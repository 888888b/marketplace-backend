import { User } from '@/models/relations';

type RoleValues = 'user' | 'seller' | 'admin';

// vincula uma conta ja existente a uma conta google via atributo 'googleId'
export const setGoogleId = async ( googleId: string, email: string ) => {
    await User.update({ googleId }, { where: { email }});
};

export const setUserRole = async ( newRole: RoleValues, id: string ) => {
    await User.update({ role: newRole }, { where: { id }});
};