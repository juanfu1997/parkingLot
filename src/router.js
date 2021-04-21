import Vue from 'vue';
import Router from 'vue-router';
Vue.use(Router);

const router = new Router({
	routes: [
		{
			path: '/',
			meta: {
				title: 'ETC停车',
			},
			component: (resolve) =>
				require([
					'./views/carParkContract/carParkContractPre.vue',
				], resolve),
		},
		{
			path: '/carParkContractEdit',
			name: 'carParkContractEdit',
			meta: {
				title: 'ETC停车',
			},
			component: (resolve) =>
				require([
					'./views/carParkContract/carParkContractEdit.vue',
				], resolve),
		},
		{
			path: '/carSignInfo',
			name: 'carSignInfo',
			meta: {
				title: 'ETC停车',
				keepAlive: true,
			},
			component: (resolve) =>
				require(['./views/carSignInfo.vue'], resolve),
		},
		{
			path: '/carSignResult',
			name: 'carSignResult',
			meta: {
				title: 'ETC停车',
			},
			component: (resolve) =>
				require(['./views/carParkContract/carSignResult.vue'], resolve),
		},
		{
			path: '/signInfoHistory',
			name: 'signInfoHistory',
			meta: {
				title: '签约记录',
			},
			component: (resolve) =>
				require(['./views/signInfoHistory.vue'], resolve),
		},
	],
});
router.beforeEach((to, from, next) => {
	if (to.meta.title) {
		document.title = to.meta.title;
	}
	next();
});
export default router;
