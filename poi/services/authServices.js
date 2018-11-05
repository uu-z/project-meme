import { request } from '../utils';
import store from '../store';

export default {
	Login: ({ data }) => {
		return request({
			method: 'POST',
			url: 'auth/local',
			data
		});
	}
};
