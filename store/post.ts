import { VuexModule, Module, Mutation, Action } from 'vuex-module-decorators';
import { PostState } from '~/types/state';
import { MutationTree, ActionTree } from 'vuex';

import Instance from '~/utils/apolloQuery';

import { IGetPost } from '~/types/graphQL';

@Module({
  namespaced: true,
})
export default class Post extends VuexModule {
  public post: any;

  get Post() {
    return this.post;
  }

  @Mutation
  async setPost(post: any) {
    this.post = post;
    // console.log('set the post data.');
    // console.log(this.post);
  }

  @Action
  async getPost(postModel: IGetPost) {
    const data = await Instance.Query(postModel);
    this.context.commit('setPost', data.post);
    return data.post;
  }
}
