import Vue from 'vue';
import _ from 'lodash';
import { imageServices, authServices } from '../services';
import store2 from 'store2';
import router from '../router';

const state = {
	apiRoot: process.env.NODE_ENV == 'prod' ? 'https://api.yuyuko.me' : 'http://localhost:1337',
	images: {
		_sort: 'createdAt:desc',
		_limit: 30,
		_query: {
			tags_contains: null
		},
		list: []
	},
	jwt: '',
	user: {}
};

const mutations = {
	ASSIGN_STATE(state, payload) {
		for (let [ k, v ] of Object.entries(payload)) {
			state[k] = v;
		}
	},
	SET_STATE(state, payload) {
		for (let [ k, v ] of Object.entries(payload)) {
			_.set(state, k, v);
		}
	},
	CUSTOM(state, fn) {
		fn(state);
	}
};

const actions = {
	async INIT_APP({ dispatch, commit }) {
		let jwt = store2.get('jwt');
		let user = store2.get('user');
		commit('ASSIGN_STATE', {
			jwt,
			user
		});
	},
	async RE_LOGIN({ dispatch, commit }) {
		await dispatch('LOG_OUT');
		router.push('login');
	},
	async LOG_OUT({ dispatch, commit }) {
		store2.remove('jwt');
		store2.remove('user');
		commit('ASSIGN_STATE', {
			jwt: '',
			user: {}
		});
	},
	async LOGIN({ dispatch, commit }, { data }) {
		const result = await authServices.Login({ data });
		store2.setAll(result);
		commit('ASSIGN_STATE', result);
		router.push('images');
	},
	async GET_IMAGES({ dispatch, commit, state }) {
		const _start = state.images.list.length;
		const { _limit, _sort, _query } = state.images;

		const params = {
			_sort,
			_start,
			_limit,
			..._query
		};

		const result = await imageServices.getFiles({
			params
		});
		commit('CUSTOM', (state) => {
			state.images.list = [ ...state.images.list, ...result ];
		});
	},
	async EDIT_IMAGE({ dispatch, commit, state }, { id, data }) {
		const result = await imageServices.edit({ id, data });
		commit('CUSTOM', (state) => {
			state.images.list.forEach((image, index) => {
				if (image._id == result._id) {
					Object.assign(image, result);
				}
			});
		});
	}
};

export default {
	state,
	mutations,
	actions
};
