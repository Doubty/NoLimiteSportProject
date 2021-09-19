import * as api from "../service/api";
import Vuex from "vuex";
import Vue from "vue";

//load Vuex
Vue.use(Vuex);

//to handle state
const state = {
  wines: [],
};

//to handle state
const getters = {
  allWines: (state: { wines: any }) =>
    state.wines
      .slice(1, 30) // I'm only want 30 items to show
      .sort(async function (x: { wine: string }, y: { wine: string }) {
        // Here I'm already placing the order before returning the wine list
        const a = x.wine.toLocaleUpperCase(),
          b = y.wine.toLocaleUpperCase();
        console.log(a + " " + b);

        return a == b ? 0 : a > b ? 1 : -1;
        // Here I'm using  slice function to limit the number of wines listed
      }),
};

//to handle actions
const actions = {
  getWines({ commit }) {
    api.getWines().then((response) => {
      commit("SET_WINES", response.data);
    });
  },
};

//to handle mutations
const mutations = {
  SET_WINES(state: { wines: any }, wines: any) {
    state.wines = wines;
  },
};

//export store module
export default new Vuex.Store({
  state,
  getters,
  actions,
  mutations,
});
