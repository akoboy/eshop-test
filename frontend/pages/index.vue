<template>
  <div class="stage px-10">
      <div class="stage-wrapper">
          <div class="product-grid">
              <div
                  v-for="product in productList"
                  :key="product.id"
                  class="product-grid__item"
              >
                  <ProductCard
                      :product="product"
                      @addToCart="onAddTOCart"
                      @removeFromCart="onRemoveFromCart"
                  />
              </div>
          </div>
      </div>
  </div>
</template>

<script lang="ts">

import {Component, Vue} from "nuxt-property-decorator";
import {ProductService} from "~/services/Product";
import {Product} from "~/models/Product";
import ProductCard from "~/components/ProductCard.vue";
import {cartStore} from "~/store";

interface IndexPageData {
    products: Product[]|null;
    isProductsPending: boolean;
}

@Component({
    components: {ProductCard},
    async asyncData({ error }): Promise<any> {
        const data: IndexPageData = {
            products: null,
            isProductsPending: false
        }
        data.isProductsPending = true;
        const [products, productsError] = await ProductService.getProducts();
        data.isProductsPending = false;

        if (productsError) {
            error({ statusCode: 404 });
        }

        data.products = products;

        return data;
    }
})
export default class IndexPage extends Vue implements IndexPageData {
    products: IndexPageData['products'] = null;
    isProductsPending: IndexPageData['isProductsPending'] = false;

    get productList(): Product[] {
        return (Array.isArray(this.products) ? this.products : []);
    }

    onAddTOCart(itemId: number): void {
        cartStore.addToCart(itemId);
    }

    onRemoveFromCart(itemId: number): void {
        cartStore.removeFromCart(itemId);
    }
}
</script>
