<template>
    <div class="product-card">
        <div class="product-card__wrapper">
            <div class="product-card__figure" :style="{ backgroundImage: 'url(' + product.image + ')' }"></div>
            <div class="product-card__tags">
                <Tag :title="product.category" />
            </div>
            <div class="product-card__title">
                {{ product.title }}
            </div>
            <div class="product-card__bottom">
                <div class="product-card__price">
                    {{ product.price }} $
                </div>
                <div class="product-card__action">
                    <button
                        v-if="isInCart"
                        @click="removeFromCart"
                    >
                        Удалить
                    </button>
                    <button
                        v-else
                        @click="addToCart"
                    >
                        Добавить
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>
<script lang="ts">

import {Component, Emit, Prop, Vue} from 'nuxt-property-decorator';
import '~/assets/scss/product.scss';
import {Product} from "~/models/Product";
import Tag from "~/components/Tag.vue";
import {cartStore} from "~/store";

@Component({
    components: {Tag}
})
export default class ProductCard extends Vue {
    @Prop({ type: Object, required: true})
    product!: Product;

    get isInCart(): boolean {
        return cartStore.items.includes(this.product.id)
    }

    @Emit('addToCart')
    addToCart(): number {
        return this.product.id;
    }
    @Emit('removeFromCart')
    removeFromCart(): number {
        return this.product.id;
    }
}
</script>
