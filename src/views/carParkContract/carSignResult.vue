<template>
  <div class="result_page">
    <TopHeader title="ETC停车"> </TopHeader>
    <div class="content">
      <div class="tipsIcon">
        <!-- <van-icon name="checked" size="30vw" /> -->
        <img
          class="iconImg"
          :src="require('../../assets/images/' + iconImgSrc + '@2x.png')"
          :srcset="
            require('../../assets/images/' + iconImgSrc + '@3x.png') + ' 3x'
          "
          alt=""
        />
        <!-- <img
          class="iconImg"
          src="../../assets/images/kc_icon_fail@2x.png"
          srcset="../../assets/images/kc_icon_fail@3x.png 3x"
          alt=""
        /> -->
      </div>
      <div class="tipsContent">
        <div class="result_text">{{ result ? "操作成功" : "申请失败" }}</div>
        <div v-if="result" class="result_reason">{{ Reason }}</div>
      </div>
    </div>
    <div class="footer">
      <van-button
        class="back_button"
        type="primary"
        size="large"
        color="linear-gradient(to left, #5DB53D, #019B4D) "
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
    return {
      result: true,
      Reason:
        "【粤A123456】签约失败，失败原因为该车牌被列入黑名单之类的；【粤A12345】签约失败，失败原因为该车牌太长了？",
    };
  },
  computed: {
    iconImgSrc() {
      return this.result ? "kc_icon_success" : "kc_icon_success";
      // return "../../assets/images/kc_icon_success@2x.png";
    },
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
  align-items center
  justify-content flex-start
  color #5E5E71
  background #fff
  line-height 1rem
.content
  width 100%
  // flex 1 1 0%
.tipsIcon
  margin 0 atuo
  padding 5vh 0
  text-align center
.tipsContent
  width 90%
  margin 0 auto
  text-align center
.result_text
  padding-bottom 16px
  font-size 24px
  font-weight 550
.result_reason
  line-height 1.4rem
  text-align left
.iconImg
  width 30vw
  object-fit contain
.footer
  width 100%
  padding 24px 0
.back_button
  width 90%
  margin 0 auto
  border-radius 8px
</style>