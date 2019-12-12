<template>
  <a-col span="6" :xl="6" :md="8" :sm="12" :xs="24">
    <nuxt-link tag="div" :to="`/post/${post.id}`" class="box" :class="loading ? 'loading' : ''" :event="loading ? '' : 'click'">
      <div class="icon"></div>
      <div class="header">
        <img :src="this.post.banner.url" v-if="!loading" />
      </div>
      <!-- <overdrive :id="`post`" :easing="easing" :duration="350"> -->
      <div class="body">
        <div class="blur"></div>
        <div class="title w12 tsw">
          <!-- <overdrive :id="`title-${post.id}`" :duration="1000"> -->
            <a-skeleton v-if="loading" :title="false" :paragraph="{ rows: 1 }" active />
            <div v-else>{{ post.title }}</div>
          <!-- </overdrive> -->
        </div>
        <div class="content w12">
          <a-skeleton v-if="loading" :title="false" :paragraph="{ rows: 2 }" active />
          <div v-else>{{ stripContent() }}</div>
        </div>
      </div>
      <!-- </overdrive> -->
    </nuxt-link>
  </a-col>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { IImage, IPost } from "~/types/post";
import Config from "~/config";

// import * as easing from "eases/quart-in-out"; // Bring 'yr own easing functions!
var easing = require("eases/quart-in-out");

const removeMd = require("remove-markdown");
@Component
export default class PostCard extends Vue {
  @Prop({ default: true }) loading!: boolean;
  @Prop() post!: IPost;

  public easing = easing;

  // imageUrl() {
  //   return `${Config.imageUrl}${this.post.banner.url}`;
  // }

  public stripContent() {
    return removeMd(this.post.content);
  }
}
</script>

<style scoped lang="scss" src="./PostCard.scss"></style>
