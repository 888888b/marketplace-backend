import { getStoreData } from '../get';

export const deleteStore = async ( userId: string ) => {
    const store = await getStoreData( userId );
  
    // verifica se existe uma loja com o id passado
    if ( !store ) {
      throw new Error('Store not found');
    }
  
    // deleta a loja
    await store.destroy(); 
  };
  