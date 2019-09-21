<template>
  <section>
    <script rel="preload" src="/prism.js"></script>
    <script rel="preload" src="https://cdnjs.cloudflare.com/ajax/libs/prism/1.6.0/plugins/autoloader/prism-autoloader.min.js"></script>
    <div class="header">
      <img v-if="postData" :src="`http://localhost:1337${postData.banner.url}`" />
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
import gql from "graphql-tag";
// import VueMarkdown from "vue-markdown";
const VueMarkdown = require("vue-markdown").default;
import { IImage, IPost } from "~/types/post";
import { IGetPost } from "~/types/graphQL";

import VuePrism from "vue-prism";
// const VuePrism = require("vue-prism");
Vue.use(VuePrism);
require("~/static/prism.css");

// const Prism = require("prismjs");
// const Loader = require("prism-loader");
// console.log(Loader);
// import Prism from "~/static/prism.js";
// const Prism = require("~/static/prism.js");
// console.log(Prism);
// Prism.plugins.autoloader["languages_path"] = Loader;
// Prism.plugins.autoloader.languages_path = "https://cdnjs.cloudflare.com/ajax/libs/prism/1.6.0/components/";
// Prism.hooks.add("before-highlight", function(env: any) {
//   env.element.className += " line-numbers";
// });
// const loadLanguages = require("prismjs/components");
// loadLanguages(["javascript"]);

@Component({
  components: {
    VueMarkdown,
  },
})
export default class PostView extends Vue {
  public index!: number;
  public postData: IPost | null = null;
  public loading: boolean = false;
  private created() {
    console.log(this.$route.params);
    this.index = Number(this.$route.params.index);
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
      //   content.replace(replace, Prism.highlight(match[0], Prism.languages[match[1]], Prism.languages[match[1]]));
      //   console.log(content);
      // }

      return content;
    }
    //get code highlight
  }

  private async mounted() {
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
    this.postData = await this.$store.dispatch("post/getPost", query);
    console.log(this.postData);

    // this.postData = await this.$http
    //    .get(`/posts/${id}`)
    //    .catch((err: any) => {
    //       console.log(err);
    //    })
    //    .then((data: IPost) => data.data);
    // console.log(this.postData);
  }
}
</script>

<style scoped lang="scss" src="~/styles/page/post.scss" />
