<template>
  <div class="navView">
    <van-nav-bar>
      <template #left>
        <van-icon name="arrow-left" size="22" @click="goBack" />
      </template>
      <template #title>
        <span class="navTitle">{{ title }}</span>
      </template>
      <template #right> <slot name="right"></slot> </template>
    </van-nav-bar>
  </div>
</template>
<script>
import { NavBar, Icon } from "vant";
export default {
  name: "topHeader",
  props: {
    // title: String,
  },
  data() {
    return {
      title: this.$route.meta.title,
    };
  },
  components: {
    [NavBar.name]: NavBar,
    [Icon.name]: Icon,
  },
  methods: {
    goBack() {
      if (this.$route.query.retry) {
        return;
      }
      this.$route.go(-1);
    },
  },
};
</script>
<style lang="stylus" scoped>
.navView
  width 100vw
.header
  width 100vw
  display flex
  justify-content space-between
  align-items center
  background red
.navTitle
  font-weight 600
  font-size 16px
  line-height 1rem
</style>
