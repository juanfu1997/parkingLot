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
					'./views/cardParkContract/cardParkContractPre.vue',
				], resolve),
		},
		{
			path: '/cardParkContractEdit',
			name: 'cardParkContractEdit',
			meta: {
				title: 'ETC停车',
			},
			component: (resolve) =>
				require([
					'./views/cardParkContract/cardParkContractEdit.vue',
				], resolve),
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
