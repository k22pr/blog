<template>
  <div class="page default">
    <default-header />
    <nuxt />
    <default-footer />
  </div>
</template>

<script lang="ts">
  import { Component, Prop, Vue } from "vue-property-decorator";

  import DefaultHeader from "~/components/shared/Header.vue";
  import DefaultFooter from "~/components/shared/Footer.vue";

  @Component({
    components: {
      DefaultHeader,
      DefaultFooter
    }
  })
  export default class ComponentName extends Vue {}
</script>