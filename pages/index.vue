<template>
  <section flex fjc>
    <article flex>
      <a-row class="w12" :gutter="24">
        <post-card v-for="now in 20" :key="now"></post-card>
      </a-row>
    </article>
  </section>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator';

import PostCard from '~/components/PostCard.vue';

@Component({
  layout: 'main',
  components: {
    PostCard,
  },
})
export default class extends Vue {
  private created() {}
}
</script>

<style lang="scss" scopped src="./index.scss" />
