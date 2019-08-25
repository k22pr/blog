<template>
   <div class="content-container">post {{ index }}</div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

@Component
export default class PostView extends Vue {
   public index!: number;
   private created() {
      console.log(this.$route.params);
      this.index = this.$route.params.index;
   }

   private async mounted() {
      console.log(this.$route.params);
      const id: string = this.$route.params.index;
      const data: any = this.$http.get(`/posts/${id}`);
      console.log(data);
   }
}
</script>

<style scoped lang="scss" src="~/styles/component/shared/footer.scss" />
