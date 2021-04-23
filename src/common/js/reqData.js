export const reqData = {
	reqData: {},
	getReqData() {
		return this.reqData;
	},
	setReqData(name, value) {
		this.reqData[name] = value;
	},
};
