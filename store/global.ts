import { VuexModule, Module, Mutation, Action } from "vuex-module-decorators";

@Module({
  namespaced: true,
})
export default class Global extends VuexModule {
  public scroll: number = 0;

  get getScroll() {
    return this.scroll;
  }

  @Mutation
  setScroll(event: any) {
    this.scroll = window.scrollY;
  }
}
