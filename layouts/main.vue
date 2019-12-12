<template>
  <div>
    <default-side />
    <nuxt class="main-layout" />
    <main-footer />
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

import DefaultSide from "~/components/main/Side.vue";
import MainFooter from "~/components/shared/footer.vue";

@Component({
  components: {
    DefaultSide,
    MainFooter,
  },
})
export default class ComponentName extends Vue {}
</script>
