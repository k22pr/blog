<template>
   <section>
      <div class="header">
         <img v-if="postData.banner" :src="`http://localhost:1337${postData.banner.url}`" />
         <div class="blur"></div>
      </div>
      <article>
         <div class="w12 post-title"><i class="fal fa-brackets-curly"></i> {{ postData.title }}</div>
         <div class="w12 content">
            <vue-markdown :source="postData.content" v-highlight>{{ postData.content }}</vue-markdown>
            <div class="w12">{{ postData }}</div>
            {{ postData.content }}
         </div>
      </article>
   </section>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import gql from "graphql-tag";
import VueMarkdown from "vue-markdown";
import { component as VueCodeHighlight } from "vue-code-highlight";
import { IIamge, IPost } from "~/types/post";
import { IGetPost } from "~/types/graphQL";

@Component({
   components: {
      VueMarkdown,
      VueCodeHighlight,
   },
})
export default class PostView extends Vue {
   public index!: number;
   public postData: IPost = {};
   private created() {
      console.log(this.$route.params);
      this.index = this.$route.params.index;
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
