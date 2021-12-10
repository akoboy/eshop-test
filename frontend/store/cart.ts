import { Module, VuexAction, VuexModule, VuexMutation } from 'nuxt-property-decorator';

interface CartState {
    inCartIds: number[];
}

@Module({
    name: 'cart',

    stateFactory: true,
    namespaced: true
})
export default class CartStore extends VuexModule {
    private inCartIds: CartState['inCartIds'] = [];

    @VuexMutation
    _addToCart(id: number): void {
        this.inCartIds.push(id);
    }

    @VuexMutation
    _removeFromCart(id: number): void {
        const foundIndex = this.inCartIds.indexOf(id);
        if (foundIndex !== -1) {
            this.inCartIds.splice(foundIndex, 1);
        }
    }

    @VuexMutation
    _setCart(ids: CartState['inCartIds']): void {
        this.inCartIds = ids;
    }

    @VuexMutation
    _clearCart(): void {
        this.inCartIds = [];
    }

    @VuexAction
    async addToCart(id: number): Promise<any> {
        this._addToCart(id);
    }

    @VuexAction
    async removeFromCart(id: number): Promise<any> {
        this._removeFromCart(id);
    }

    @VuexAction
    async setCart(ids: CartState['inCartIds']): Promise<any> {
        this._setCart(ids);
    }

    @VuexAction
    async clearCart(): Promise<any> {
        this._clearCart();
    }

    get itemsCount(): number {
        return this.inCartIds.length;
    }

    get items(): CartState['inCartIds'] {
        return this.inCartIds;
    }
}
