import Vue from 'vue';
import { Dialog } from 'vant';
import App from './App.vue';
import router from './router';

Vue.use(Dialog);
Vue.config.productionTip = false;
Vue.filter('filterPhoneNumbe', (p) => {
	return p.slice(0, 3) + '****' + p.slice(7, 11);
});
new Vue({
	router,
	render: (h) => h(App),
}).$mount('#app');
