<template>
    <Component :is="rootComponent" :to="route" class="tag">
        {{ title }}
    </Component>
</template>
<script lang="ts">

import {Component, Prop, Vue} from 'nuxt-property-decorator';

import '~/assets/scss/components/tag.scss';

@Component
export default class Tag extends Vue {
    @Prop({ type: String, required: true })
    title!: string;

    @Prop({type: [Object, String], required: false, default: null })
    route?: object|string;

    get rootComponent(): string {
        if (!this.route) { return 'div'; }

        return 'NuxtLink'
    }
}
</script>
