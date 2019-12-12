<template>
  <header flex fic class="w12">
    <nuxt-link to="/" class="home">SubLOG </nuxt-link>
  </header>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { State, Getter, Action, Mutation, namespace } from "vuex-class";

import * as Types from "~/types";

const PostStore = namespace("post");

@Component
export default class ComponentName extends Vue {
  @PostStore.Getter("Post") post!: Types.Post.IPost;
  @PostStore.State("post") testpost!: Types.Post.IPost;
  @Getter("global/getScroll") getScroll!: number;
}
</script>

<style scoped lang="scss" src="./header.scss" />
