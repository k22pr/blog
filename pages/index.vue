<template>
  <section>
    <h1 class="header">Nuxt TypeScript Starter</h1>
    <div class="cards"></div>
  </section>
</template>

<script lang="ts">
  import { Component, Vue } from "nuxt-property-decorator";
  import { State } from "vuex-class";
  import { Person } from "~/types";
  import Card from "~/components/Card.vue";

  @Component({
    components: {
      Card
    },
    layout: "main"
  })
  export default class extends Vue {
    @State people!: Person;
  }
</script>