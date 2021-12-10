<template>
    <div class="body">
        <div class="body__wrapper">
            <div class="body__header">
                <TheHeader />
            </div>
            <div class="body__content">
                <Nuxt />
            </div>
            <div class="body__footer">
                <TheFooter />
            </div>
        </div>
    </div>
</template>
<script lang="ts">

import {Component, Vue, Watch} from 'nuxt-property-decorator';
import TheHeader from "~/components/TheHeader.vue";
import TheFooter from "~/components/TheFooter.vue";
import { cartStore } from "~/store";
import {COOKIE_CART_KEY} from "~/constants/cart";

@Component({
    components: {TheFooter, TheHeader},
    created(this: DefaultLayout): void {
        const ids = this.$cookies.get(COOKIE_CART_KEY);
        if (Array.isArray(ids)) {
            cartStore.setCart(ids);
        }
    }
})
export default class DefaultLayout extends Vue {
    get cartItems(): typeof cartStore.items {
        return cartStore.items;
    }

    @Watch('cartItems')
    onCartItemsChange(): void {
        this.$cookies.set(COOKIE_CART_KEY, this.cartItems)
    }
}
</script>
