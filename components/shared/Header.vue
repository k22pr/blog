<template>
  <header flex fic class="w12">
    <nuxt-link to="/" class="home">SubLOG</nuxt-link>
    <div class="background"></div>
  </header>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

@Component
export default class ComponentName extends Vue {}
</script>

<style scoped lang="scss" src="~/styles/component/shared/header.scss" />
