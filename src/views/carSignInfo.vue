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
      text="已签约车辆可在停车场通过ETC支付停车费用（需停车场支持ETC扣费）"
    />
    <div class="content">
      <van-cell-group>
        <van-cell title="车牌" value="" />
        <van-cell title="车牌颜色" value="" />
        <van-cell title="粤通卡卡号" value="" />
        <van-cell title="电子标签号" value="" />
        <van-cell title="签约状态" value="" />
        <van-cell title="签约记录" value="" is-link />
        <van-cell title="消费记录" value="" is-link />
      </van-cell-group>
    </div>
    <div class="footer">
      <van-button
        class="cancelSign"
        block
        plain
        color="#07c160"
        text="解除签约"
        @click="toSignHistory"
      ></van-button>
      <van-button
        class="cancelSign"
        block
        color="#07c160"
        text="签约ETC停车"
        @click="toSignHistory"
      ></van-button>
      <ValiCodeInputBox></ValiCodeInputBox>
    </div>
  </div>
</template>
<script>
import { NoticeBar, Icon, Cell, CellGroup, Button } from "vant";
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
    return {};
  },
  methods: {
    toSignHistory(event) {
      console.log("event", event);
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
  padding 10px 0
  padding-bottom 40px
.cancelSign
  width 90%
  margin 0 auto
</style>