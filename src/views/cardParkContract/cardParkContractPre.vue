<template>
	<div class="contract-page">
		<TopHeader>
			<template #right>
				<van-icon name="setting-o" size="22" />
			</template>
		</TopHeader>
		<van-notice-bar
			wrapable
			:scrollable="false"
			text="已签约车辆可在停车场通过ETC支付停车费用（需停车场支持ETC扣费）"
		/>
		<div class="content">
			<LicensePlateSignItem
				:data="licensePlateData"
				:isEdit="false"
				:style="{ marginTop: '8px' }"
			>
			</LicensePlateSignItem>
		</div>
	</div>
</template>
<script>
// import NoticeBar from '../../components/NoticeBar';
import { NoticeBar, NavBar, Icon } from 'vant';
import LicensePlateSignItem from '../../components/LicensePlateSignItem';
import topHeader from '../../components/topHeader';
export default {
	name: 'cardParkContractPre',
	components: {
		LicensePlateSignItem,
		TopHeader: topHeader,
		[NoticeBar.name]: NoticeBar,
		[NavBar.name]: NavBar,
		[Icon.name]: Icon,
	},
	data() {
		return {
			licensePlateData: [
				{
					number: '粤A12345',
					phone: '18620162705',
					status: 1,
					statusValue: '已签约',
				},
				{
					number: '粤A12346',
					phone: '18620162705',
					status: 0,
					statusValue: '未签约',
				},
				{
					number: '粤A12347',
					phone: '18620162705',
					status: 1,
					statusValue: '已签约',
				},
			],
		};
	},
};
</script>
<style lang="stylus" type="text/stylus" scoped>
.contract-page {
  width: 100%;
  min-height: 100vh;
}
</style>
