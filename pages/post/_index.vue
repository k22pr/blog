<template>
  <section>
    <div class="header">
      <img v-if="postData" :src="`http://localhost:1337${postData.banner.url}`" ref="banner-image" :style="{ top: `${bannerTop}px` }" />
      <div class="blur"></div>
    </div>
    <article>
      <div class="w12 post-title">
        <div class="w12" v-if="postData"><i class="fal fa-brackets-curly"></i> {{ postData.title }}</div>
        <div class="w12" v-else><a-skeleton avatar active :paragraph="{ rows: 0 }" /></div>
        <!-- <a-skeleton avatar active :paragraph="{ rows: 0 }" :loading="!postData"> <i class="fal fa-brackets-curly"></i> {{ postData.title }} </a-skeleton> -->
        <!-- <a-skeleton avatar active :paragraph="{ rows: 0 }" :loading="!postData"> <i class="fal fa-brackets-curly"></i> {{ postData.title }} </a-skeleton> -->
      </div>
      <div class="w12 content">
        <div class="w12" v-if="postData">
          <vue-markdown :source="getContent"></vue-markdown>
        </div>
        <div class="w12" v-else><a-skeleton active :title="false" :paragraph="{ rows: 10 }" :loading="!postData" /></div>
      </div>
    </article>
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

// isClient

@Component({
  components: {
    VueMarkdown,
  },
})
export default class PostView extends Vue {
  @Action("post/getPost") getPost: any;
  @Mutation("global/setScroll") setScroll: any;
  @Getter("global/getScroll") getScroll: any;
  public index!: number;
  public postData: IPost | null = null;
  public loading: boolean = false;

  get bannerTop() {
    return this.getScroll / 1.5;
  }

  public created() {
    console.log(this.$route.params);
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
            banner {
              name
              url
            }
            logo {
              name
              url
            }
          }
        }
      `,
      variables: { id },
    };
    this.postData = await this.getPost(query);
    console.log(this.postData);
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

      return content;
    }
  }
}
</script>

<style scoped lang="scss" src="~/styles/page/post.scss" />
