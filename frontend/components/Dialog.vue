<template>
    <div class="dialog-wrapper">
        <div class="dialog-overlay"></div>
        <slot></slot>
    </div>
</template>
<script lang="ts">

import { Component, Vue } from 'nuxt-property-decorator';
import '~/assets/scss/components/dialog.scss'

@Component
export default class Dialog extends Vue {}
</script>
