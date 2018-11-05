import Vue from 'vue';
import Router from 'vue-router';
import store from '../store';

Vue.use(Router);

const router = new Router({
	routes: [
		{
			path: '/',
			name: 'images',
			component: require('../views/images').default
		},
		{
			path: '/login',
			name: 'login',
			component: require('../views/login').default
		},
		{
			path: '*',
			redirect: '/'
		}
	]
});

router.beforeEach((to, from, next) => {
	const privatePage = [];
	const authRequired = privatePage.includes(to.path);
	const loggedIn = store.state.jwt;
	if (authRequired && !loggedIn) {
		return next('/login');
	}

	next();
});

export default router;
