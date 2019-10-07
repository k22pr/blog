<template>
  <a-col span="6">
    <div class="box" :class="loading ? 'loading' : ''">
      <div class="icon"></div>
      <div class="header"></div>
      <div class="body">
        <div class="title w12">
          <a-skeleton v-if="loading" :title="false" :paragraph="{ rows: 1 }" active />
          <div v-else>title</div>
        </div>
        <div class="content w12">
          <a-skeleton v-if="loading" :title="false" :paragraph="{ rows: 2 }" active />
          <div v-else>content...</div>
        </div>
      </div>
    </div>
  </a-col>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component
export default class PostCard extends Vue {
  @Prop() loading: boolean = true;
}
</script>

<style scoped lang="scss" src="./PostCard.scss"></style>
