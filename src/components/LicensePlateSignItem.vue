<template>
	<div id="signItem">
		<div class="checkAll" v-if="isEdit">
			<span>
				<input type="checkbox" :id="signId" @click="checkAll($event)" />
				<label for="id">(已签约车辆)</label>
			</span>
		</div>
		<div class="toolView">
			<div
				class="tool_item"
				v-for="item in signData"
				v-bind:key="item.number"
			>
				<div class="item_l">
					<input
						class="checkItem"
						type="checkbox"
						v-if="isEdit"
						v-model="item.checked"
					/>
					<span>{{ item.number }}</span>
					<span class="phone">{{ item.phone }}</span>
				</div>
				<div class="item_r">
					<span :class="['status_' + item.status]">{{
						item.status ? '已签约' : '未签约'
					}}</span>
					<img
						class="signStatusImg"
						src="../assets/images/arrow_right.png"
						alt=""
						v-if="isEdit"
					/>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
export default {
	name: 'LicensePlateSignItem',
	props: {
		data: Array,
		isEdit: {
			type: Boolean,
			default: true,
		},
	},
	data() {
		return {
			signId: 'signId_' + Math.random(),
			checkedArr: false,
		};
	},
	computed: {
		signData() {
			let signData = this.data.map((item) => {
				item.checked = false;
				return item;
			});
			return signData;
		},
	},
	watch: {
		// signData: {
		// 	handler(newValue, oldValue) {
		// 		let AllCheck = this.checkedArr;
		// 		let oldAllCheck = AllCheck;
		// 		newValue.map((item) => {
		// 			AllCheck = item.checked == AllCheck;
		// 		});
		// 		if (oldAllCheck == AllCheck) {
		// 		}
		// 	},
		// 	deep: true,
		// },
	},
	methods: {
		checkAll(e) {
			let checkObj = document.querySelectorAll('.checkItem');
			for (var i = 0; i < checkObj.length; i++) {
				checkObj[i].checked = e.target.checked;
			}
			console.log('checkAll', this.checkedArr);
		},
	},
};
</script>
<style lang="stylus" scoped>
.checkAll
    width 90%
    margin 0 auto
    padding 6px 0
    text-align left
.toolView
  width 100%
  padding 0px 0px
  background: #fff

.tool_item
  width 90%
  margin 0 auto
  padding 6px 0px
  display flex
  justify-content space-between
  align-items center
  font-size: 12px
  border-bottom 1px solid #ccc
.tool_item:nth-last-child(1)
  border: none
.item_l
    flex 1 1 0
    display flex
    justify-content flex-start
    align-items center
.phone
    padding 0 8px
.item_r
    display flex
    align-items center
.status_0
  color: green
.status_1
  color: red
.signStatusImg
  width 12px
  height 12px
</style>
