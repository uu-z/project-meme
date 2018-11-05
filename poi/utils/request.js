import axios from 'axios';
import _ from 'lodash';
import store from '../store';
import { Message } from 'iview';

axios.interceptors.request.use((config) => {
	console.log(config);
	if (config.method !== 'get') {
		if(store.state.jwt) {
			config.headers.Authorization = `Bearer ${store.state.jwt}`;
		}
	}
	return config;
});

axios.interceptors.response.use(
	(res) => {
		return res.data;
	},
	(err) => {
		if (err.message) {
			Message.error(err.message);
		}
		if (err.statusCode) {
			if (err.statusCode == 401) {
				store.dispatch('RE_LOGIN');
			}
		}

		return Promise.reject(err);
	}
);

export default (data) =>
	axios({
		method: 'GET',
		baseURL: store.state.apiRoot,
		...data
	});
