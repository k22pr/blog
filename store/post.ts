import { PostState } from "~/types/state";
import { MutationTree, ActionTree } from "vuex";
import gql from "graphql-tag";

import Apollo from "~/utils/apollo";

import { IGetPost } from "~/types/graphQL";
import { stringify } from "querystring";

export const state = (): PostState => ({
   bannerUrl: "",
});

export const mutations: MutationTree<PostState> = {};

export const actions: ActionTree<PostState, PostState> = {
   async getPost({ commit }, postModel: IGetPost) {
      const data = await Apollo.query(postModel)
         .then((res) => res.data)
         .catch((err) => {
            console.log(err);
         });

      return data.post;
   },
};
