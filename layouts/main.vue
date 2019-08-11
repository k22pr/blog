<template>
  <div>
    <default-side />
    <nuxt class="main-layout" />
  </div>
</template>

<script lang="ts">
  import { Component, Prop, Vue } from "vue-property-decorator";

  import DefaultSide from "~/components/main/Side.vue";

  @Component({
    components: {
      DefaultSide
    }
  })
  export default class ComponentName extends Vue {}
</script>

<style lang="scss">
  html {
    body {
      background: #e9ecef;
    }
  }
</style>
