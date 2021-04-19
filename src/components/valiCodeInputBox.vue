<template>
  <van-dialog
    v-model="showValiDialog"
    title="输入验证码"
    :show-confirm-button="false"
    :close-on-click-overlay="true"
  >
    <div class="dialog_content">
      <div>短信验证码已发送至138****3455</div>
      <van-button
        type="primary"
        size="mini"
        block
        plain
        hairline
        @click="retryGetValiCode"
        :style="{ width: '80%', margin: '8px auto', marginTop: '8px' }"
        >{{
          valiTimeNum ? `${valiTimeNum}秒后可重新获取` : "重新获取"
        }}</van-button
      >
      <div class="vali_content" @click="InputValiCodeHandler">
        <input
          type="text"
          ref="input"
          v-model="valiCode"
          maxlength="6"
          :style="{
            width: '0px',
            height: '0px',
            border: 'none',
            padding: '0',
          }"
        />
        <div
          class="inputItem"
          v-for="(item, index) in valiCodeArr"
          :key="index"
        >
          {{ item }}
        </div>
      </div>
    </div>
  </van-dialog>
</template>
<script>
import { Button } from "vant";
export default {
  name: "valiCodeInputBox",
  components: {
    [Button.name]: Button,
  },
  data() {
    return {
      showValiDialog: true,
      valiCode: "",
      valiTimeNum: 60,
    };
  },
  computed: {
    valiCodeArr: function () {
      let arr = new Array(6);
      this.valiCode.split("").map((item, index) => {
        arr[index] = item;
      });
      console.log("arr", arr);
      return arr;
    },
  },
  watch: {
    valiCode: function (newValue) {
      if (newValue.length == 6) {
        //自动验证验证码
      }
    },
    showValiDialog: function (newValue) {
      if (newValue) {
        this.$nextTick(() => {
          this.$refs.input.focus();
        });
      } else {
        this.valiCode = "";
      }
    },
  },
  methods: {
    InputValiCodeHandler() {
      console.log('@click="InputValiCodeHandler"', this.$refs.input);
      this.$refs.input.focus();
    },
    retryGetValiCode() {
      if (!this.valiTimeNum) {
        // 重新请求验证码
        this.valiCode = ""; //清空验证码
      }
    },
  },
};
</script>
<style lang="stylus" scoped>
.dialog_content
  width 90%
  margin 0 auto
  padding 14px 0
  text-align center
.vali_content
  display flex
  justify-content space-around
  align-items center
.inputItem
  width 36px
  height 36px
  line-height 36px
  text-align center
  border 1px solid #333
</style>