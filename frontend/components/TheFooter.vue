<template>
    <section class="stage footer">
        <div class="stage-wrapper">
            © FoodSoul
        </div>
    </section>
</template>
<script lang="ts">

import { Component, Vue } from 'nuxt-property-decorator';

@Component
export default class TheFooter extends Vue {}
</script>

<style lang="scss" scoped>
    section {
        padding-top: 20px;
        padding-bottom: 30px;
    }
</style>
