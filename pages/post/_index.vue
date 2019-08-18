<template>
  <div>post {{ index }}</div>
</template>

<script lang="ts">
  import { Component, Prop, Vue } from "vue-property-decorator";

  @Component
  export default class PostView extends Vue {
    public index!: number;
    private created() {
      console.log(this.$route.params);
      this.index = this.$route.params.index;
    }
  }
</script>

<style scoped>
</style>
