<template>
  <header flex fic class="w12">
    <nuxt-link to="/" class="home">SubLOG </nuxt-link>
    <div class="background" v-if="bannerImage">
      <img :src="`http://localhost:1337${bannerImage}`" :style="{ top: `${bannerTop}px` }" />
      <div class="blur"></div>
    </div>
  </header>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { State, Getter, Action, Mutation, namespace } from 'vuex-class';

import * as Types from '~/types';

const PostStore = namespace('post');

@Component
export default class ComponentName extends Vue {
  @PostStore.Getter('Post') post!: Types.Post.IPost;
  @PostStore.State('post') testpost!: Types.Post.IPost;
  @Getter('global/getScroll') getScroll!: number;

  get bannerImage() {
    console.log(this.post);
    return (this.post && this.post.banner.url) || null;
  }

  get bannerTop() {
    return this.getScroll * 0.33 * -1 - 100;
  }
}
</script>

<style scoped lang="scss" src="./Header.scss" />
