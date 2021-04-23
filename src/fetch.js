import Vue from 'vue';
import axios from 'axios';

let vm = new Vue();

axios.defaults.baseURL = '/API2';
axios.defaults.timeout = 60000;
axios.defaults.withCredentials = true;
// http request 拦截器
axios.interceptors.request.use(
	(config) => {
		if (localStorage.token) {
			//请求头添加token
			config.headers['X-Aceess-token'] = `${localStorage.token}`;
		}
		return config;
	},
	(err) => {
		vm.$toast.clear();
		return Promise.reject(err);
	}
);
// http respone 拦截器
axios.interceptors.response.use(
	(response) => {
		vm.$toast.clear();
		return response;
	},
	(err) => {
		vm.$toast.clear();
		if (err.response) {
			vm.$toast(`返回code:${err.response.status};请求异常！`);
			switch (err.response.status) {
				case 401:
					break;
			}
		}
		return Promise.reject(err);
	}
);

export function get(url, params = {}) {
	return new Promise((resolve, reject) => {
		axios
			.get(url, {
				params,
			})
			.then((response) => {
				resolve(response.data);
			})
			.catch((err) => {
				reject(err);
			});
	});
}

export function post(url, data) {
	if (data.noLoading) {
		vm.$toast.loading({
			message: 'loading···',
			forbidClick: true,
		});
	}
	axios.defaults.headers.post['Content-Type'] =
		'application/x-www-form-urlencoded;charset=UTF-8';
	// data = JSON.stringify(data);

	return new Promise((resolve, reject) => {
		axios.post(url, data).then(
			(response) => {
				let { code, msg } = response.data;
				// 20000 请求成功
				// 20001 请求批处理部分成功
				if (code != '20000' && code !== '20001') {
					// localStorage.removeItem('token');
					// localStorage.removeItem('jsonObject');
					vm.$toast(msg);
					reject();
				} else {
					resolve(response.data);
				}
			},
			(err) => {
				console.log('err', err.message);
				if (err.message.indexOf('timeout') != -1) {
					vm.$toast('请求超时');
				}
				vm.$toast.clear();
				reject(err);
			}
		);
	});
}
