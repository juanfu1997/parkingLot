<template>
  <van-dialog
    v-model="showValiDialog"
    title="输入验证码"
    :show-confirm-button="false"
    :close-on-click-overlay="true"
    @close="closeHandler"
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
      <div class="vali_content">
        <!-- <input
          type="text"
          ref="input"
          :value="valiCode"
          @input="valiCodeInputHandler"
          maxlength="6"
          :style="{
            width: '0px',
            height: '0px',
            border: 'none',
            padding: '0',
          }"
        /> -->
        <van-number-keyboard
          theme="custom"
          v-model="valiCode"
          maxlength="6"
          close-button-text="完成"
          :show="showValiDialog"
          get-container="body"
          z-index="12008"
          @close="closeHandler"
          @hide="keyboardHideHandler"
        />
        <div
          class="inputItem"
          v-for="(item, index) in valiCodeArr"
          :key="index"
          :index="index"
          @click="setInputIndex"
        >
          {{ item }}
        </div>
      </div>
    </div>
  </van-dialog>
</template>
<script>
import { Button, NumberKeyboard } from "vant";
export default {
  name: "valiCodeInputBox",
  components: {
    [Button.name]: Button,
    [NumberKeyboard.name]: NumberKeyboard,
  },
  props: {
    isShow: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      showValiDialog: false,
      valiCode: "",
      valiTimeNum: 60,
    };
  },
  computed: {
    valiCodeArr: function () {
      let arr = new Array(6);
      String(this.valiCode)
        .split("")
        .map((item, index) => {
          arr[index] = item;
        });

      return arr;
    },
  },
  watch: {
    valiCode: function (newValue) {
      if (newValue.length == 6) {
        //自动验证验证码
        this.closeHandler();
        this.keyboardHideHandler(newValue);
      }
    },
    showValiDialog: function (newValue, oldValue) {
      console.log("false了", newValue, oldValue);
      if (newValue) {
        this.$nextTick(() => {
          //   this.$refs.input.focus();
        });
      } else {
        this.valiCode = "";
      }
    },
  },
  methods: {
    setInputIndex() {
      //   let index = e.target.attributes.index.value;
      //   index++;
      //   this.$refs.input.focus();
      //   this.$refs.input.selectionStart = index;
      //   this.$refs.input.selectionEnd = index;
    },
    retryGetValiCode() {
      if (!this.valiTimeNum) {
        // 重新请求验证码
        this.valiCode = ""; //清空验证码
      }
    },
    closeHandler() {
      this.showValiDialog = false;
    },
    setDialogShow(value) {
      //设置弹窗显示
      this.showValiDialog = value;
    },
    valiCodeInputHandler(e) {
      this.valiCode = e.target.value.replace(/[^\d]/g, "").trim();
      console.log(e.target.value, "|", this.valiCode);
    },
    keyboardHideHandler(value) {
      this.$emit("_checkValiCode", { value: value || this.valiCode });
    },
  },
  destroyed() {
    this.closeHandler();
    console.log("退出页面了");
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