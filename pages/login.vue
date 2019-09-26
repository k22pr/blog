<template>
  <section flex fjc fic>
    <div class="login-page">
      <div flex fic class="w6">
        <button flex fjc class="black medium w12"><i class="fab fa-github"></i> login with github</button>
      </div>
    </div>
  </section>
</template>

<script lang="ts">
import { Component, Vue } from "nuxt-property-decorator";
import { State } from "vuex-class";

@Component({
  layout: "main",
})
export default class extends Vue {
  private created() {}
}
</script>

<style lang="scss" scopped src="~/styles/page/login.scss" />
