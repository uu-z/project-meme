import Vue from "vue"
import _ from "lodash";
import {imageServices} from "../services"

const state = {
  apiRoot: "http://localhost:1337",
  images: []
};

const mutations = {
  ASSIGN_STATE(state, payload) {
    for (let [k, v] of Object.entries(payload)) {
      state[k] = v;
    }
  },
  SET_STATE(state, payload){
    for (let [k, v] of Object.entries(payload)) {
      _.set(state, k, v)
    }
  },
  CUSTOM(state, fn){
    fn(state)
  }
};

const actions = {
  async INIT_APP({ dispatch, commit }) {},
  async GET_IMAGES({dispatch, commit}){
    const result = await imageServices.getFiles()
    commit("ASSIGN_STATE", {images: result})
  },
  async EDIT_IMAGE({dispatch, commit, state}, {id, data}){
    const result = await imageServices.edit({id, data})
    commit("CUSTOM", state => {
      state.images = state.images.map(image => image._id == result._id ? result : image)
    })
  }
};

export default {
  state,
  mutations,
  actions
};
