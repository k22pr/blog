<template>
   <div class="content-container">
      post {{ index }}
      {{ postData.content }}
   </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

import { IIamge, IPost } from "~/types/post.ts";

@Component
export default class PostView extends Vue {
   public index!: number;
   public postData!: IPost;
   private created() {
      console.log(this.$route.params);
      this.index = this.$route.params.index;
   }

   private async mounted() {
      console.log(this.$route.params);
      const id: string = this.$route.params.index;
      this.postData = await this.$http
         .get(`/posts/${id}`)
         .catch((err: any) => {
            console.log(err);
         })
         .then((data: IPost) => data.data);
      console.log(this.postData);
   }
}
</script>

<style scoped lang="scss" src="~/styles/component/shared/footer.scss" />
