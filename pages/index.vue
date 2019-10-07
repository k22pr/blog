<template>
  <section flex fjc>
    <article flex>
      <div class="container w12">
        <div class="title">Recent Post</div>
        <a-row class="w12" :gutter="24">
          <post-card
            v-for="(post, index) in getPostList || 8"
            :key="index"
            :post="post"
            :loading="!getPostList"
          ></post-card>
        </a-row>
      </div>
      <div class="container w12">
        <div class="title">Recent Vue.js Category</div>
        <a-row class="w12" :gutter="24">
          <post-card
            v-for="(post, index) in getPostList || 8"
            :key="index"
            :post="post"
            :loading="!getPostList"
          ></post-card>
        </a-row>
      </div>
    </article>
  </section>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator';
import gql from 'graphql-tag';

import { IImage, IPost } from '~/types/post';
import { IGetPost } from '~/types/graphQL';
import Instance from '~/utils/apolloQuery';

import PostCard from '~/components/PostCard.vue';

@Component({
  layout: 'main',
  components: {
    PostCard,
  },
})
export default class extends Vue {
  public postList: IPost[] = [];
  public get getPostList() {
    return this.postList.length == 0 ? null : this.postList;
  }
  public async created() {
    const query: IGetPost = {
      query: gql`
        query Posts {
          posts(start: 0, limit: 0, sort: "id") {
            id
            title
            content
            logo {
              url
            }
            banner {
              url
            }
          }
        }
      `,
    };
    const data = await Instance.Query(query);
    console.log(data);

    this.postList = data.posts;

    // this.postData = await this.getPost(query);
    // this.setPost = this.postData;
    // console.log(this.postData);
  }
}
</script>

<style lang="scss" scopped src="./index.scss" />
