<template>
  <section flex>
    <div class="wave-container">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
        <path
          fill="#353e47"
          fill-opacity="1"
          d="M0,224L80,229.3C160,235,320,245,480,224C640,203,800,149,960,128C1120,107,1280,117,1360,122.7L1440,128L1440,0L1360,0C1280,0,1120,0,960,0C800,0,640,0,480,0C320,0,160,0,80,0L0,0Z"
        ></path>
      </svg>
    </div>
    <article flex>
      <div id="recent-container" class="container w12" data-aos="fade-up" data-aos-anchor="#recent-container">
        <div class="title" flex fic><i class="fal fa-sparkles"></i> <span>Recent Post</span></div>
        <a-row class="w12" :gutter="24">
          <post-card v-for="(post, index) in getPostList || 8" :key="index" :post="post" :loading="!getPostList"></post-card>
        </a-row>
      </div>
      <new-line />
      <div id="vue-container" class="container w12 hh" data-aos="fade-up" data-aos-anchor="#vue-container">
        <div class="title" flex fic><i class="fab fa-vuejs"></i> <span>Vue.js Category</span></div>
        <a-row class="w12" :gutter="24">
          <post-card v-for="(post, index) in getPostList || 8" :key="index" :post="post" :loading="!getPostList"></post-card>
        </a-row>
      </div>
      <new-line />
      <div id="etc-container" class="container w12" data-aos="fade-up" data-aos-anchor="#etc-container">
        <div class="title" flex fic><i class="fal fa-chart-network"></i> <span>Etc. Category</span></div>
        <a-row class="w12" :gutter="24">
          <post-card v-for="(post, index) in getPostList || 8" :key="index" :post="post" :loading="!getPostList"></post-card>
        </a-row>
      </div>
    </article>
  </section>
</template>

<script lang="ts">
import { Component, Vue } from "nuxt-property-decorator";
import gql from "graphql-tag";

import { IImage, IPost } from "~/types/post";
import { IGetPost } from "~/types/graphQL";
import Instance from "~/utils/apolloQuery";

import PostCard from "~/components/PostCard.vue";
import NewLine from "~/components/base/newLine.vue";

@Component({
  layout: "main",
  components: {
    PostCard,
    NewLine,
  },
})
export default class extends Vue {
  public postList: IPost[] = [];
  public get getPostList() {
    return !this.postList ? null : this.postList;
  }
  public async created() {
    const query: IGetPost = {
      query: gql`
        query Posts {
          posts(start: 0, limit: 12, sort: "id:desc") {
            id
            title
            content
            banner {
              url
            }
          }
        }
      `,
    };
    const data = await Instance.Query(query);

    this.postList = data.posts;

    // this.postData = await this.getPost(query);
    // this.setPost = this.postData;
    // console.log(this.postData);
  }
}
</script>

<style lang="scss" scopped src="./index.scss" />
