import Vue from "vue"
import _ from "lodash";
import {imageServices} from "../services"

const state = {
  apiRoot: "http://localhost:1337",
  lists: {
    images:{
      _sort: "createdAt:desc",
      _limit: 30,
      list: []
    }
  } 
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
  async GET_IMAGES({dispatch, commit, state}){
    const _start = state.lists.images.list.length
    const {_limit, _sort} = state.lists.images

    const result = await imageServices.getFiles({
      params:{
        _sort,
        _start,
        _limit
      }
    })
    commit("CUSTOM", state =>{
      const images = state.lists.images
      images.list = [...images.list, ...result]
    })
  },
  async EDIT_IMAGE({dispatch, commit, state}, {id, data}){
    const result = await imageServices.edit({id, data})
    commit("CUSTOM", state => {
      // state.lists.images.list = state.lists.images.list.map(image => image._id == result._id ? result : image)
      state.lists.images.list.forEach((image, index) => {
        if(image._id == result._id){
          Object.assign(image, result)
        }
      })
    })
  }
};

export default {
  state,
  mutations,
  actions
};
