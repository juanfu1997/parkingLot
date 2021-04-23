import Vue from 'vue';
import { Dialog, Toast } from 'vant';
import App from './App.vue';
import router from './router';
import { get, post } from './fetch';
import Request from './common/js/request';

Vue.use(Dialog);
Vue.use(Toast);
//修改Toast(loading)的默认配置
Toast.setDefaultOptions('loading', { forbidClick: true, position: 'bottom' });
Toast.resetDefaultOptions('loading');

Vue.config.productionTip = false;
Vue.filter('filterPhoneNumbe', (p) => {
	if (!p) return '';
	return p.slice(0, 3) + '****' + p.slice(7, 11);
});

Vue.prototype.$dialog = Dialog;
Vue.prototype.$toast = Toast;
Vue.prototype.$get = get;
Vue.prototype.$post = post;
Vue.prototype.$$ = Request;

new Vue({
	router,
	render: (h) => h(App),
}).$mount('#app');
