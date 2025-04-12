import { Store } from '@/models/relations';

type StoreProps = {
    name: string;
    description?: string;
    logoUrl?: string;
    bannerUrl?: string;
    userId: string;
};

export const createStore = async ( data: StoreProps ) => {

    if ( !data.name || !data.userId ) {
        throw new Error('Store name is required');
    };

    const store = await Store.create({
        name: data.name,
        description: data.description,
        logoUrl: data.logoUrl,
        bannerUrl: data.bannerUrl,
        userId: data.userId,
    });

    return store;
};
