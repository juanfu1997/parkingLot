<template>
  <div class="contract-page">
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
      <LicensePlateSignItem
        :data="licensePlateData"
        :isEdit="false"
        :style="{ marginTop: '8px' }"
      >
      </LicensePlateSignItem>
    </div>
    <div class="footer">
      <van-button block type="primary" @click="SignWitETC"
        >签约ETC停车</van-button
      >
      <van-button block hairline :style="{ marginTop: '10px' }"
        >解除签约</van-button
      >
    </div>
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
  </div>
</template>
<script>
// import NoticeBar from '../../components/NoticeBar';
import { NoticeBar, NavBar, Icon, Button, Dialog } from "vant";
import LicensePlateSignItem from "../../components/LicensePlateSignItem";
import topHeader from "../../components/topHeader";
export default {
  name: "carParkContractPre",
  components: {
    LicensePlateSignItem,
    TopHeader: topHeader,
    [NoticeBar.name]: NoticeBar,
    [NavBar.name]: NavBar,
    [Icon.name]: Icon,
    [Button.name]: Button,
    [Dialog.name]: Dialog,
  },
  data() {
    return {
      showValiDialog: false,
      licensePlateData: [
        {
          number: "粤A12345",
          phone: "18620162705",
          status: 1,
          statusValue: "已签约",
        },
        {
          number: "粤A12346",
          phone: "18620162705",
          status: 0,
          statusValue: "未签约",
        },
        {
          number: "粤A12347",
          phone: "18620162705",
          status: 1,
          statusValue: "已签约",
        },
      ],
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
    SignWitETC() {
      let phone = this.$options.filters["filterPhoneNumbe"]("13820163455");
      Dialog.confirm({
        title: "标题",
        message: `更改签约状态需通过身份验证，是否向手机号${phone}发送验证码`,
      })
        .then(() => {
          this.showValiDialog = true;
        })
        .catch(() => {});
    },
    InputValiCodeHandler() {
      console.log('@click="InputValiCodeHandler"', this.$refs.input);
      this.$refs.input.focus();
    },
    retryGetValiCode() {
      if (!this.valiTimeNum) {
        // 重新请求验证码
      }
    },
  },
};
</script>
<style lang="stylus" type="text/stylus" scoped>
.contract-page
  width 100%
  min-height 100vh
  display flex
  flex-direction column
  justify-content center
  align-items flex-start
.content
  width 100%
  flex 1 1 0%
.footer
  width 94%
  margin 10px auto
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
