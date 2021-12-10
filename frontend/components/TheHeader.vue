<template>
    <div class="header stage">
        <div class="header__inner stage-wrapper">
            <div class="header__major">
                <NuxtLink :to="indexRoute">
                    <img
                        alt="FoodSoul"
                        width="196px"
                        height="36px"
                        :src="require('~/assets/images/logo.svg')"
                    />
                </NuxtLink>
            </div>
            <div class="header__minor">
                <NuxtLink :to="{ name: 'cart'}">
                    <CartAction :count="inCartCount" />
                </NuxtLink>
            </div>
        </div>
    </div>
</template>
<script lang="ts">

import { Component, Vue } from 'nuxt-property-decorator';
import {RouterLocation} from "~/models/Router";
import CartAction from "~/components/CartAction.vue";
import { cartStore } from "~/store";

interface TheHeaderData {
    indexRoute: RouterLocation;
}

@Component({
    components: {CartAction}
})
export default class TheHeader extends Vue implements TheHeaderData {
    get indexRoute(): TheHeaderData['indexRoute'] {
        return {
            name: 'index'
        }
    }

    get inCartCount(): number {
        return cartStore.itemsCount;
    }
}
</script>
