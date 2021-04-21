<template>
  <div class="result_page">
    <TopHeader title="ETC停车">
      <template #right>
        <van-icon name="setting-o" size="22" />
      </template>
    </TopHeader>
    <div class="content">
      <div class="tipsIcon">
        <van-icon name="checked" size="30vw" />
      </div>
      <div class="tipsContent">
        <p>操作成功！</p>
        <p>(其他提示)</p>
      </div>
    </div>
    <div class="footer">
      <van-button
        class="back_button"
        type="primary"
        color="#07c160"
        text="查看签约状态"
        block
        @click="backButtonHandler"
      ></van-button>
    </div>
  </div>
</template>
<script>
import { Icon, Button } from "vant";
import TopHeader from "../../components/topHeader";
export default {
  name: "card",
  components: {
    TopHeader,
    [Icon.name]: Icon,
    [Button.name]: Button,
  },
  data() {
    return {};
  },
  methods: {
    backButtonHandler() {
      this.$router.go(-1);
    },
  },
};
</script>
<style lang="stylus" scoped>
.result_page
  width 100vw
  height 100vh
  display flex
  flex-direction column
  align-items flex-start
  justify-content center
  background #fff
.content
  width 100%
  flex 1 1 0%
.tipsIcon
  margin 0 atuo
  padding 10vh 0
  text-align center
.tipsContent
  width 90%
  margin 0 auto
  text-align center
.footer
  width 100%
  padding-bottom 24px
.back_button
  width 90%
  margin 0 auto
</style>