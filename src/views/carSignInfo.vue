<template>
  <div class="sign_page">
    <TopHeader title="ETC停车">
      <template #right>
        <van-icon name="setting-o" size="22" />
      </template>
    </TopHeader>
    <van-notice-bar
      wrapable
      :scrollable="false"
      text="已签约车辆可在停车场通过ETC卡支付停车费用（需停车场支持ETC扣费）"
    />
    <div class="content">
      <van-cell-group>
        <van-cell title="车牌" :value="Vehicle.licensePlateNum" />
        <van-cell title="车牌颜色" :value="Vehicle.licensePlateColor" />
        <van-cell title="粤通卡卡号" :value="Vehicle.ytkcardNum" />
        <van-cell title="电子标签号" :value="Vehicle.electronicLabel" />
        <van-cell
          title="签约状态"
          :value="Vehicle.signStatus ? '已签约' : '未签约'"
          :value-class="['signStatus_' + Vehicle.signStatus]"
          @click="signStatusHandler"
        />
        <van-cell
          title="签约记录"
          value=""
          is-link
          @click="signingRecordHandler"
        />
        <!-- <van-cell title="消费记录" :value="Vehicle.consumingRecord" is-link /> 后续待添加 -->
      </van-cell-group>
    </div>
    <div class="footer">
      <van-button
        v-if="!Vehicle.signStatus"
        class="cancelSign"
        block
        color="#F0422C"
        text="解除签约"
        @click="changeSignStatus"
      ></van-button>
      <van-button
        v-else
        class="cancelSign"
        block
        color="#07c160"
        text="签约ETC停车"
        @click="changeSignStatus"
      ></van-button>
      <ValiCodeInputBox
        :isShow="showValiDialog"
        ref="child_valiInput"
      ></ValiCodeInputBox>
    </div>
  </div>
</template>
<script>
import { NoticeBar, Icon, Cell, CellGroup, Button, Dialog } from "vant";
import TopHeader from "../components/topHeader";
import ValiCodeInputBox from "../components/valiCodeInputBox";
export default {
  name: "carSignInfo",
  components: {
    [NoticeBar.name]: NoticeBar,
    [Icon.name]: Icon,
    [Cell.name]: Cell,
    [CellGroup.name]: CellGroup,
    [Button.name]: Button,
    TopHeader,
    ValiCodeInputBox,
  },
  data() {
    return {
      Vehicle: {
        id: 0,
        licensePlateNum: "粤OA0537",
        licensePlateColor: "蓝色",
        ytkcardNum: "123456789098765432123",
        electronicLabel: "123456789098765432123",
        signStatus: 0,
        signingRecord: [],
        consumingRecord: [],
      },
      showValiDialog: false, //验证码弹窗显示
    };
  },
  activated() {
    console.log("进入页面");
    // 刷新数据
  },
  methods: {
    changeSignStatus(event) {
      console.log("event", event);
      //签约状态变更
      let phone = this.$options.filters["filterPhoneNumbe"]("13820163455");
      Dialog.confirm({
        title: "签约验证",
        message: `更改签约状态需通过身份验证，是否向手机号${phone}发送验证码`,
        confirmButtonColor: "#0D9F4B",
        cancelButtonText: "退出",
      })
        .then(() => {
          this.$refs.child_valiInput.setDialogShow(true);
        })
        .catch(() => {});
    },
    signStatusHandler() {},
    _checkValiCode() {
      //校验验证码事件

      //请求变更签约状态

      //验证通过跳转签约结果页
      this.$router.push({
        name: "carSignResult",
        query: {},
      });
    },
    signingRecordHandler() {
      this.$router.push({
        name: "signInfoHistory",
        query: { id: this.Vehicle.id },
      });
    },
  },
};
</script>
<style lang="stylus" scoped>
.sign_page
  width 100vw
  height 100vh
  display flex
  flex-direction column
  justify-content center
  align-items flex-start
.content
  width 100%
  flex 1 1 0%
  padding 10px 0
.footer
  width 100%
  padding 16px 0
  padding-bottom 40px
  background #fff
.cancelSign
  width 90%
  margin 0 auto
.signStatus_0
  color #F5A623
  font-weight 500
.signStatus_1
  color #20B572
  font-weight 500
</style>