<template>
  <div class="contract-page">
    <NoticeBar msg="测试"></NoticeBar>
    <div class="content">
      <div class="licenseUl">
        <div class="licenseLi">
          <div class="licenseNum"></div>
          <div class="tool">
            <span></span>
            <img src="../../assets/images/arrow_right.png" alt="" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import NoticeBar from "../../components/NoticeBar";
export default {
  name: "cardParkContractPre",
  components: { NoticeBar },
  data() {
    return {};
  },
};
</script>
<style lang="stylus" type="text/stylus" scoped>
.contract-page
  width 100%
  min-height 100vh
.tool img
  width 12px
  height 12px
</style>