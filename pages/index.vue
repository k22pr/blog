<template>
   <section flex fjc fic></section>
</template>

<script lang="ts">
import { Component, Vue } from "nuxt-property-decorator";
import { State } from "vuex-class";
import { Person } from "~/types";
import Card from "~/components/Card.vue";

@Component({
   components: {
      Card,
   },
   layout: "main",
})
export default class extends Vue {
   @State people!: Person;

   private created() {}
}
</script>

<style lang="scss" scopped src="~/styles/page/main.scss" />
