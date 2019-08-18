<template>
  <section flex fjc fic>
    <div class="login-page">
      <button flex fjc class="black medium">
        <i class="fab fa-github b2 pr10"></i> login with github
      </button>
    </div>
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

<style lang="scss" scopped src="~/styles/component/main/index.scss" />