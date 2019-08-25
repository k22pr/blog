import { RootState, Person } from "~/types";
import { MutationTree, ActionTree } from "vuex";
import localRandomData from "~/static/random-data.json";

export const state = (): RootState => ({
   people: [],
});

export const mutations: MutationTree<RootState> = {};

export const actions: ActionTree<RootState, RootState> = {};
