<template>
    <div class="cart-item">
        <div class="cart-item__inner">
            <div class="cart-item__major">
                <div class="cart-item__title">
                    {{ item.title }}
                </div>
            </div>
            <div class="cart-item__minor">
                <div class="cart-item__price">
                    {{ item.price }} $
                </div>
                <div class="cart-item__action">
                    <button @click="onRemove">Удалить</button>
                </div>
            </div>
        </div>
    </div>
</template>
<script lang="ts">

import {Component, Emit, Prop, Vue} from 'nuxt-property-decorator';
import {Product} from "~/models/Product";

interface CartItemData {
    item: Product;
}

@Component
export default class CartItem extends Vue implements CartItemData {
    @Prop({ type: Object, required: true })
    item!: CartItemData['item'];

    @Emit('removeItem')
    onRemove(): number {
        return this.item.id;
    }
}
</script>
