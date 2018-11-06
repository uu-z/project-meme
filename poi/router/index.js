import Vue from 'vue';
import Router from 'vue-router';
import store from '../store';
import ga from 'vue-ga';


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

ga(router, 'UA-128746837-1');

export default router;
