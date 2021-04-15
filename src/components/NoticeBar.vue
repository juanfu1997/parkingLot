<template>
  <div class="notice">
    {{ msg }}
  </div>
</template>
<script>
export default {
  name: "noticeBar",
  props: {
    msg: String,
  },
};
</script>
<style lang="stylus" type="text/stylus">
.notice
  width 100%
  padding 6px 6px
  font-size 12px
  background red
</style>