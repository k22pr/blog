<template>
  <section>
    <div class="header">
      <img :src="postData.banner.url" v-if="postData" ref="banner-image" :style="{ top: `${bannerTop}px` }" />
      <div class="blur"></div>
      <!-- <div class="wave-container">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
          <path fill="#ffffff" fill-opacity="1" d="M0,96L30,128C60,160,120,224,180,229.3C240,235,300,181,360,170.7C420,160,480,192,540,176C600,160,660,96,720,64C780,32,840,32,900,58.7C960,85,1020,139,1080,165.3C1140,192,1200,192,1260,165.3C1320,139,1380,85,1410,58.7L1440,32L1440,320L1410,320C1380,320,1320,320,1260,320C1200,320,1140,320,1080,320C1020,320,960,320,900,320C840,320,780,320,720,320C660,320,600,320,540,320C480,320,420,320,360,320C300,320,240,320,180,320C120,320,60,320,30,320L0,320Z"></path>
        </svg>
      </div> -->
    </div>
    <!-- <overdrive :id="`post`"> -->
    <article>
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

  get bannerTop() {
    return this.getScroll / 1.5 - 100;
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
