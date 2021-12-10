
import { Store } from 'vuex';
import { getModule } from 'nuxt-property-decorator';


type PublicModule<M> = Omit<M, 'modules' | 'state' | 'getters' | 'mutations' | 'namespaced' | 'actions' | 'context'>;

import CartStore from './cart';
export let cartStore: PublicModule<CartStore>;



export const initStore = (store: Store<any>): void => {
    // Для каждого стора, нужно написать получение модуля.
    cartStore = getModule(CartStore, store);
};
