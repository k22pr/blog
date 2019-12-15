<template>
  <section>
    <div class="header" :class="{ 'on-top': getScroll == 0 }">
      <div class="image-box">
        <img :src="postData.banner.url" v-if="postData" ref="banner-image" :style="bannerStyle" />
      </div>
      <div class="blur"></div>
    </div>
    <!-- <overdrive :id="`post`"> -->
    <article :class="{ 'on-top': getScroll == 0 }">
      <div class="w12 post-title tsb">
        <div class="w12" v-if="postData">
          <!-- <overdrive :id="`title-${this.$route.params.index}`" :duration="1000"> -->
          <div class="w12"><i class="fal fa-brackets-curly"></i> {{ postData.title }}</div>
          <!-- </overdrive> -->
        </div>
        <div class="w12" v-else><a-skeleton avatar active :paragraph="{ rows: 0 }" /></div>
        <!-- <a-skeleton avatar active :paragraph="{ rows: 0 }" :loading="!postData"> <i class="fal fa-brackets-curly"></i> {{ postData.title }} </a-skeleton> -->
        <!-- <a-skeleton avatar active :paragraph="{ rows: 0 }" :loading="!postData"> <i class="fal fa-brackets-curly"></i> {{ postData.title }} </a-skeleton> -->
      </div>
      <div class="w12 sub-title">
        <!-- {{ post.category }} -->
      </div>
      <div class="w12 content" :class="loading ? 'loading' : ''">
        <div class="w12" v-if="postData">
          <vue-markdown :source="getContent" data-aos="fade-zoom-in" data-aos-easing="ease-out-cubic" data-aos-duration="600"></vue-markdown>
        </div>
        <div class="w12" v-else>
          <a-skeleton active :title="false" :paragraph="{ rows: 10 }" :loading="!postData" />
        </div>
      </div>
    </article>
    <!-- </overdrive> -->
  </section>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { State, Getter, Action, Mutation, namespace } from "vuex-class";
import gql from "graphql-tag";
// import VueMarkdown from "vue-markdown";
const VueMarkdown = require("vue-markdown").default;
import { IImage, IPost } from "~/types/post";
import { IGetPost } from "~/types/graphQL";
import Config from "~/config";

var easing = require("eases/quart-in-out");

// isClient

@Component({
  components: {
    VueMarkdown,
  },
})
export default class PostView extends Vue {
  @Action("post/getPost") getPost: any;
  @Mutation("global/setScroll") setScroll: any;
  @Mutation("global/setScrollValue") setScrollValue: any;
  @Getter("global/getScroll") getScroll: any;
  public index!: number;
  public postData: IPost | null = null;
  public loading: boolean = false;

  public easing = easing;

  get bannerStyle() {
    let bodySize = window.innerHeight;
    // console.log(bodySize);
    // console.log(window.document.documentElement.clientHeight);
    // console.log(window.document.documentElement.offsetHeight);
    return this.getScroll < bodySize ? { top: this.getScroll / 1.5 + "px" } : { top: this.getScroll + "px" };
  }

  public created() {
    this.setScrollValue(0);
    this.index = Number(this.$route.params.index);

    if (process.browser) {
      window.addEventListener("scroll", this.setScroll);
    }
  }
  private destroyed() {
    if (process.browser) {
      window.removeEventListener("scroll", this.setScroll);
    }
  }
  public async mounted() {
    const id: string = this.$route.params.index;
    const query: IGetPost = {
      query: gql`
        query Post($id: ID!) {
          post(id: $id) {
            id
            title
            content
            category {
              name
            }
            banner {
              name
              url
            }
          }
        }
      `,
      variables: { id },
    };
    this.postData = await this.getPost(query);
    // this.setPost = this.postData;
    // console.log(this.postData);
  }

  get getContent() {
    if (this.postData) {
      let content = this.postData.content;

      // let findCodeReg = /^```([a-z]+)\n([\s\S]*?)```$/gim;
      // // let findCode = findCodeReg.exec(this.postData.content);
      // let match: any = null;
      // while ((match = findCodeReg.exec(content)) != null) {
      //   console.log(match);
      //   var replace = new RegExp(match[0], "gmi");
      // content.replace(replace, Prism.highlight(match[0], Prism.languages[match[1]], Prism.languages[match[1]]));
      //   console.log(content);
      // }

      let findReg = /\!\[(.+)\]\((.+)\)/gim;
      let reg = new RegExp(findReg);
      content = content.replace(reg, `![$1](${Config.imageUrl}$2)`);

      return content;
    }
  }
}
</script>

<style scoped lang="scss" src="./_index.scss" />
