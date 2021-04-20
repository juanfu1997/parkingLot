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
        title="已签约"
        type="isEdit_signed"
        :data="licensePlateData"
        :disabled="!isEdit_signed && isEdit_notSign"
        :isEdit="isEdit_signed"
        @editHandler="editHandler"
        :style="{ marginTop: '8px' }"
      >
      </LicensePlateSignItem>
      <LicensePlateSignItem
        title="未签约"
        type="isEdit_notSign"
        :data="licensePlateNotSignData"
        :disabled="!isEdit_notSign && isEdit_signed"
        :isEdit="isEdit_notSign"
        @editHandler="editHandler"
        :style="{ marginTop: '8px' }"
      >
      </LicensePlateSignItem>
    </div>
    <div class="footer" v-show="isEdit_signed || isEdit_notSign">
      <van-button class="FButton" color="" block hairline @click="cancelEdit"
        >取消</van-button
      >
      <van-button
        v-if="isEdit_signed"
        class="FButton"
        block
        type="primary"
        @click="SignWitETC"
        >签约ETC停车</van-button
      >
      <van-button v-else class="FButton" color="#F0422C" block hairline
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
          :style="{ width: '80%', margin: '16px auto', marginTop: '16px' }"
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
import {
  NoticeBar,
  NavBar,
  Icon,
  Button,
  Dialog,
  Cell,
  CellGroup,
  Checkbox,
} from "vant";
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
    [Cell.name]: Cell,
    [CellGroup.name]: CellGroup,
    [Checkbox.name]: Checkbox,
  },
  data() {
    return {
      showValiDialog: false,
      licensePlateData: [
        {
          id: 1,
          number: "粤A12345",
          phone: "18620162705",
          status: 1,
        },
        {
          id: 2,
          number: "粤A12346",
          phone: "18620162705",
          status: 0,
        },
        {
          id: 3,
          number: "粤A12347",
          phone: "18620162705",
          status: 1,
        },
      ],
      licensePlateNotSignData: [
        {
          id: 1,
          number: "粤A22345",
          phone: "18620162705",
          status: 0,
        },
        {
          id: 2,
          number: "粤A32346",
          phone: "18620162705",
          status: 0,
        },
        {
          id: 3,
          number: "粤A52347",
          phone: "18620162705",
          status: 0,
        },
      ],
      isEdit_signed: false,
      isEdit_notSign: false,
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
        title: "签约验证",
        message: `更改签约状态需通过身份验证，是否向手机号${phone}发送验证码`,
        confirmButtonColor: "#0D9F4B",
        cancelButtonText: "退出",
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
    editHandler({ type: name }) {
      this[name] = true; //设置对应的编辑类型为true
      console.log("t", name, this.isEdit_signed, this.isEdit_notSign);
    },
    cancelEdit() {
      this.isEdit_signed = false;
      this.isEdit_notSign = false;
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
@import '../../common/stylus/mixin.styl'
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
  width 100%
  display flex
  justify-content space-around
  align-items center
  padding 10px 0
  padding-bottom 40px
  background #fff
.FButton
  flex-basis 40%
.dialog_content
  width 90%
  margin 0 auto
  padding 24px 0
  text-align center
.vali_content
  display flex
  justify-content space-around
  align-items center
.inputItem
  width 40px
  height 40px
  color #3F3F3F
  font-size 22px
  font-weight 600
  font-family PingFangSC-Semibold, PingFang SC
  line-height 40px
  text-align center
  border 1px solid #ADADB3
.title_item
  display flex
  justify-content flex-start
  align-items center
.right_item
  height 32px
  display flex
  align-items center
.item_checked_activing
  display inline-block
  width 28px
  height 32px
  margin 0 6px
  bg-image('../../assets/images/cpark_icon_list_status0')
  background-size 100%
  background-repeat no-repeat
.item_icon_text
  font-size 16px
  line-height 1rem
</style>
