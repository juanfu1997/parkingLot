<template>
  <div :class="[disabled ? 'sign_disabled' : '']">
    <div class="checkAll">
      <span>{{ title }}</span>
      <span class="check_right_batch" v-show="!isBatch">
        <span>批量</span>
        <img
          class="batch"
          src="../assets/images/cpark_icon_list_p@2x.png"
          srcset="../assets/images/cpark_icon_list_p@3x.png 3x"
          @click="showBatchHandler"
        />
      </span>
      <van-checkbox
        v-show="isBatch"
        v-model="checkArr"
        shape="square"
        label-position="left"
        >全选</van-checkbox
      >
    </div>
    <div class="toolView">
      <van-cell-group>
        <van-cell
          v-for="(item, index) in LpData"
          :key="item.id"
          @click="cellClickHandler({ id: item.id, index })"
        >
          <template #title>
            <div class="title_item">
              <img
                class="signedIcon"
                src="../assets/images/cpark_icon_list_status1@2x.png"
                srcset="../assets/images/cpark_icon_list_status1@3x.png 3x"
              />
              <span class="item_icon_text">{{ item.plateNumber }}</span>
              <span>({{ item.phone | filterPhoneNumbe }})</span>
            </div>
          </template>
          <template #right-icon>
            <div class="right_item">
              <van-checkbox
                v-show="isBatch"
                :value="item.checked"
                @click="checkboxHandler(index)"
                shape="square"
                checked-color="#4FC590"
              ></van-checkbox>
              <van-icon
                v-show="!isBatch"
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
      edit: false,
      origin: JSON.parse(JSON.stringify(this.data)),
    };
  },
  computed: {
    isBatch: {
      get() {
        return this.edit;
      },
      set(value) {
        this.edit = value;
      },
    },
    LpData: {
      get() {
        let _data = [];
        let originData = JSON.parse(JSON.stringify(this.data));
        originData.map((item) => {
          _data.push({
            checked: false,
            ...item,
          });
        });
        console.log("LpData", _data);
        return _data;
      },
      set(value) {
        this.origin = value;
      },
    },
  },
  watch: {
    disabled(newValue) {
      if (newValue) {
        //禁止编辑
        this.isBatch = false;
      }
    },
    isEdit(newValue) {
      this.edit = newValue;
    },
    checkArr(newValue) {
      this.setCheckValue(newValue);
    },
  },
  methods: {
    setCheckValue(value) {
      this.origin = this.LpData.map((item) => {
        item.checked = value;
        return item;
      });
    },
    showBatchHandler() {
      if (this.disabled) return;
      this.isBatch = !this.isBatch;

      this.$emit("editHandler", { type: this.type });
    },
    checkboxHandler(index) {
      let _data = this.LpData;
      _data[index].checked = !_data[index].checked;
      this.LpData = _data;
    },
    cellClickHandler(data) {
      let { id } = data;
      if (this.isBatch) return;
      this.$router.push({
        name: "carSignInfo",
        query: { id },
      });
    },
    getIdsFromChecked() {
      // 返回已选的ids
      let ids = [];
      ids = this.LpData.map((item) => {
        if (item.checked) {
          return item.id;
        }
      });
      return ids.join();
    },
  },
};
</script>
<style lang="stylus" scoped>
.sign_disabled
  opacity 0.6
.checkAll
  width 90%
  height 24px
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
