<template>
  <a-col span="6" :xl="6" :md="8" :sm="12" :xs="24">
    <nuxt-link
      tag="div"
      :to="`/post/${post.id}`"
      class="box"
      :class="loading ? 'loading' : ''"
      :event="loading ? '' : 'click'"
    >
      <div class="icon"></div>
      <div class="header">
        <img :src="imageUrl()" v-if="!loading" />
      </div>
      <div class="body">
        <div class="blur"></div>
        <div class="title w12">
          <a-skeleton v-if="loading" :title="false" :paragraph="{ rows: 1 }" active />
          <div v-else>{{ post.title }}</div>
        </div>
        <div class="content w12">
          <a-skeleton v-if="loading" :title="false" :paragraph="{ rows: 2 }" active />
          <div v-else>{{ post.content }}</div>
        </div>
      </div>
    </nuxt-link>
  </a-col>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { IImage, IPost } from '~/types/post';
import Config from '~/config';

@Component
export default class PostCard extends Vue {
  @Prop({ default: true }) loading!: boolean;
  @Prop() post!: IPost;

  imageUrl() {
    return `${Config.imageUrl}${this.post.banner.url}`;
  }
}
</script>

<style scoped lang="scss" src="./PostCard.scss"></style>
