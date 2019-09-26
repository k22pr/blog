<template>
  <section flex fjc fic></section>
</template>

<script lang="ts">
import { Component, Vue } from "nuxt-property-decorator";
import { State } from "vuex-class";

@Component({
  layout: "main",
})
export default class extends Vue {
  private created() {}
}
</script>

<style lang="scss" scopped src="~/styles/page/main.scss" />
