<template>
  <div class="page default">
    <default-header />
    <nuxt />
    <default-footer />
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

import DefaultHeader from "~/components/shared/header.vue";
import DefaultFooter from "~/components/shared/footer.vue";

@Component({
  components: {
    DefaultHeader,
    DefaultFooter,
  },
})
export default class ComponentName extends Vue {}
</script>
