import { CategoryState } from "~/types/state";
import { MutationTree, ActionTree } from "vuex";

export const state = (): CategoryState => ({
   categorys: [],
});

export const mutations: MutationTree<CategoryState> = {};

export const actions: ActionTree<CategoryState, CategoryState> = {};
