import { post } from '../../fetch';
import api from './apiHub';
console.log('apiHub', api);
const Request = {
	/**
	 * 客户号查询ETC停车车辆列表
	 * @param {String 20}} userNo  客户号
	 */
	queryListCarContract(userNo) {
		return post(api.baseURL + '/api/cardLabel/queryListCarContract', {
			userNo,
		});
	},
};
export default Request;
