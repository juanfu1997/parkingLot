<template>
  <div :class="[disabled ? 'sign_disabled' : '']">
    <div class="checkAll">
      <span>{{ title }}</span>
      <span class="check_right_batch" v-show="!isEdit">
        <span>批量</span>
        <img
          class="batch"
          src="../assets/images/cpark_icon_list_p@2x.png"
          srcset="../assets/images/cpark_icon_list_p@3x.png 3x"
          @click="batchHandler"
        />
      </span>
      <van-checkbox
        v-show="isEdit"
        v-model="checkArr"
        shape="square"
        label-position="left"
        >全选</van-checkbox
      >
    </div>
    <div class="toolView">
      <van-cell-group>
        <van-cell v-for="item in LpData" :key="item.id">
          <template #title>
            <div class="title_item">
              <img
                class="signedIcon"
                src="../assets/images/cpark_icon_list_status1@2x.png"
                srcset="../assets/images/cpark_icon_list_status1@3x.png 3x"
              />
              <span class="item_icon_text">{{ item.number }}</span>
            </div>
          </template>
          <template #right-icon>
            <div class="right_item">
              <van-checkbox
                v-show="isEdit"
                v-model="item.checked"
                shape="square"
                checked-color="#4FC590"
              ></van-checkbox>
              <van-icon
                v-show="!isEdit"
                name="arrow"
                size="18"
                color="#C5C5C7"
              />
            </div>
          </template>
        </van-cell>
      </van-cell-group>
    </div>
  </div>
</template>
<script>
import { Cell, CellGroup, Checkbox, Icon } from "vant";
export default {
  name: "LicensePlateSignItem",
  props: {
    data: Array,
    title: String,
    disabled: Boolean,
    type: String,
    isEdit: Boolean,
  },
  components: {
    [Cell.name]: Cell,
    [CellGroup.name]: CellGroup,
    [Checkbox.name]: Checkbox,
    [Icon.name]: Icon,
  },
  data() {
    return {
      checkArr: false,
      checkedArr: false,
    };
  },
  computed: {
    LpData() {
      // let _data = JSON.parse(JSON.stringify(this.data));
      let signData = this.data.map((item) => {
        // item.checked2 = false;
        return item;
      });
      console.log(signData);
      return signData;
    },
  },
  watch: {
    disabled(newValue) {
      if (newValue) {
        //禁止编辑
        this.isEdit = false;
      }
    },
    // isEdit() {},
  },
  methods: {
    checkAll(e) {
      let checkObj = document.querySelectorAll(".checkItem");
      for (var i = 0; i < checkObj.length; i++) {
        checkObj[i].checked = e.target.checked;
      }
      console.log("checkAll", this.checkedArr);
    },
    batchHandler(e) {
      if (this.disabled) return;
      this.isEdit = !this.isEdit;
      console.log("t2", e);
      this.$emit("editHandler", { type: this.type });
    },
  },
};
</script>
<style lang="stylus" scoped>
.sign_disabled
  opacity 0.6
.checkAll
  width 90%
  display flex
  justify-content space-between
  align-items center
  margin 0 auto
  padding 6px 0
  font-size 16px
  line-height 1rem
  text-align left
.check_right_batch
  display flex
  justify-content space-between
  align-items center
.batch
  width 24px
  object-fit contain
  transform translateY(-5%)
.toolView
  width 100%
  padding 0px 0px
  background #fff
.title_item
  height 32px
  display flex
  justify-content flex-start
  align-items center
.signedIcon
  width 24px
  padding 0 8px
  object-fit contain
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
