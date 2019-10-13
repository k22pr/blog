import { VuexModule, Module, Mutation, Action } from 'vuex-module-decorators';
import Vue from 'vue';

import Instance from '~/utils/apolloQuery';

import { IGetPost } from '~/types/graphQL';

@Module({
  namespaced: true,
})
export default class Post extends VuexModule {
  public post: any = {};
  public bannerImage: string = '';

  get Post() {
    return this.post;
  }

  get getBanner() {
    return this.bannerImage;
  }

  @Mutation
  async setPost(post: any) {
    this.post = post;
    this.bannerImage = post.banner.url;
  }

  @Action
  async getPost(postModel: IGetPost) {
    const data = await Instance.Query(postModel);
    this.context.commit('setPost', data.post);
    return data.post;
  }
}
