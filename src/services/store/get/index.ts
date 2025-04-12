import { Store } from '@/models/relations';

export const getStoreData = async ( userId: string ) => {
    const store = await Store.findOne({ where: { userId }})

    return store;
};