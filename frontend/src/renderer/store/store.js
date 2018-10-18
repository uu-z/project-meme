import _ from "lodash";
import {imageServices} from "../services"

const state = {
  apiRoot: "http://localhost:1337",
  images: []
};

const mutations = {
  SET_STATE(state, payload) {
    for (let [k, v] of Object.entries(payload)) {
      state[k] = v;
    }
  }
};

const actions = {
  async INIT_APP({ dispatch, commit }) {},
  async GET_IMAGES({dispatch, commit}){
    const result = await imageServices.getFiles()
    commit("SET_STATE", {images: result})
  }
};

export default {
  state,
  mutations,
  actions
};
