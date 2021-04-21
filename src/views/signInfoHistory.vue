<template>
  <div class="signInfo_page">
    <TopHeader>
      <template #right>
        <van-icon name="setting-o" size="22" />
      </template>
    </TopHeader>
    <div class="content">
      <div class="vehicleInfo">
        <div class="vehicleLicensePlateNum">{{ vehicle.number }}</div>
        <div class="">
          <span>当前状态：</span>
          <span :class="[`vehicle_status_` + vehicle.status]">{{
            vehicle.status ? "已签约" : "未签约"
          }}</span>
        </div>
      </div>
      <div class="signList">
        <van-cell-group>
          <van-cell
            :title-style="{ color: '#656479' }"
            :value-class="['vehicle_status_' + item.status]"
            :title="item.time"
            :value="item.status ? '签约成功' : '取消签约'"
            v-for="item in signData"
            :key="item.time"
          ></van-cell>
        </van-cell-group>
      </div>
    </div>
  </div>
</template>
<script>
import { Cell, CellGroup, Icon } from "vant";
import TopHeader from "../components/topHeader";
export default {
  name: "signInfoHistory",
  components: {
    TopHeader,
    [Cell.name]: Cell,
    [CellGroup.name]: CellGroup,
    [Icon.name]: Icon,
  },
  data() {
    return {
      vehicle: {
        number: "测试车牌号",
        status: 1,
      },
      signData: [
        {
          time: "2015-03-03 12:12:12",
          status: 1,
        },
        {
          time: "2015-03-03 12:12:12",
          status: 0,
        },
        {
          time: "2015-03-03 12:12:12",
          status: 1,
        },
      ],
    };
  },
  methods: {},
};
</script>
<style lang="stylus" scoped>
.signInfo_page
  width 100vw
  height 100vh
  color #656479
.vehicleLicensePlateNum
  font-weight 550
.vehicleInfo
  width 90%
  margin 0 auto
  padding 24px 0
  display flex
  justify-content space-between
  align-items center
.vehicle_status_0
  color #F5A623
  font-weight 550
.vehicle_status_1
  color #20B572
  font-weight 550
</style>