// api请求环境

const envObj = {
	develop: {
		baseURL: '',
	},
	trial: {
		baseURL: 'http://58.254.141.8:8102',
	},
	release: {
		baseURL: 'http://58.254.141.8:8102',
	},
};
const api = envObj[process.env.VUE_APP_CURRENTMODE] || { baseURL: '' };
console.log('process.env.NODE_ENV', process.env);
export default api;
