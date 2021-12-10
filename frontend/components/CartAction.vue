<template>
    <div class="cart-action">
        <img
            alt="Кнопка корзины"
            :src="require('~/assets/images/cart.svg')"
            class="cart-action__icon"
        >
        <div v-if="countNormalized" class="cart-action__count">{{ countNormalized }}</div>
    </div>
</template>
<script lang="ts">

import {Component, Prop, Vue} from 'nuxt-property-decorator';

@Component
export default class CartAction extends Vue {
    @Prop({ type: Number, required: true})
    count!: number;

    get countNormalized(): string|number {
        if (this.count > 99) {
            return '99+'
        }

        return this.count;
    }
}
</script>
<style lang="scss">
.cart-action {
    position: relative;
    text-decoration: none;
    transition-duration: 200ms;

    &__icon {
        width: 30px;
        height: 30px;
    }

    &__count {
        position: absolute;
        bottom: -20%;
        left: -20%;
        text-decoration: none;
        font-size: 10px;
        background-color: var(---main-color);
        display: flex;
        align-items: center;
        justify-content: center;
        width: 20px;
        height: 20px;
        line-height: 1;
        color: #ffffff;
        font-weight: 600;
        border-radius: 50%;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
    }

    &:hover {
        opacity: 0.78;
    }
}
</style>
