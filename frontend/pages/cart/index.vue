<template>
    <div
        :class="{
            'stage px-10': true,
            'preloader': isProductsPending
        }"
    >
        <div class="stage-wrapper">
            <template v-if="isAnyProduct">
                <CartItem
                    v-for="item in cartProducts"
                    :key="item.id"
                    class="mb-2.5"
                    :item="item"
                    @removeItem="onRemoveItem"
                />
                <div class="cart-summary">
                    <div>
                        Итого: <strong>{{ totalPrice }} $</strong>
                    </div>
                    <div class="cart-summary__action">
                        <button @click="doOrder">Оформить заказ</button>
                    </div>
                </div>
                <Dialog v-if="success">
                    <div class="dialog-success">
                        <div>
                            <h4>Заказ #5442 успешно оформлен</h4>
                            <h6>Приходите еще</h6>
                            <button
                                @click="onCloseSuccess"
                            >
                                Спасибо
                            </button>
                        </div>
                    </div>
                </Dialog>
            </template>
            <template v-else-if="!isProductsPending">
                <h4>Корзина пуста</h4>
                <NuxtLink :to="{ name: 'index' }">
                    Перейти к каталогу
                </NuxtLink>
            </template>
        </div>
    </div>
</template>
<script lang="ts">

import { Component, Vue } from 'nuxt-property-decorator';
import {ProductService} from "~/services/Product";
import {Product} from "~/models/Product";
import {cartStore} from "~/store";
import CartItem from "~/components/CartItem.vue";
import '~/assets/scss/components/cart.scss';
import Dialog from "~/components/Dialog.vue";

interface CartPageData {
    products: Product[]|null;
    cartProducts: Product[];
    isProductsPending: boolean;
}

@Component({
    components: {Dialog, CartItem},
    fetch(this: CartPage): Promise<any> {
        return this.fetchProducts();
    }
})
export default class CartPage extends Vue implements CartPageData {
    isProductsPending: CartPageData['isProductsPending'] = false;
    products: CartPageData['products'] = null;

    success = false;

    get cartItemsIds(): number[] {
        return cartStore.items;
    }

    get cartProducts(): CartPageData['cartProducts'] {
        return (Array.isArray(this.products) ? this.products : []).filter(item => this.cartItemsIds.includes(item.id))
    }

    get isAnyProduct(): boolean {
        return !!this.cartProducts.length
    }

    get totalPrice(): number {
        return this.cartProducts.reduce((accumulator, value) => accumulator + value.price, 0);
    }

    async fetchProducts(): Promise<any> {
        this.isProductsPending = true;
        const [products] = await ProductService.getProducts();
        this.isProductsPending = false;
        if (products) {
            this.products = products;
        }
    }

    onRemoveItem(itemId: number): void {
        cartStore.removeFromCart(itemId);
    }

    openSuccessDialog(): void {
        this.success = true;
    }
    doOrder(): void {
        this.openSuccessDialog();
    }
    onCloseSuccess(): void {
        cartStore.clearCart();
        this.$router.push({ name: 'index' });
    }
}
</script>
