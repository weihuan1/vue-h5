<template lang="pug">
  .home
    p 首页
    van-button(type="primary") 主要按钮
    van-cell(title="选择时间" is-link :value="time" @click="$refs.dataPicker.show(time)")
    data-picker(
      ref="dataPicker"
      type="year-month"
      cancel-button-text="清除"
      @cancel="time = ''"
      @confirm="confirmHandle"
    )
    .content
      .list 列表
      .list 列表
      .list 列表
      .list 列表
      .list 列表
      .list 列表
      .list 列表
      .list 列表
      .list 列表
      .list 列表
      .list 列表
      .list 列表
      .list 列表
      .list 列表
      .list 列表
      .list 列表
      .list 列表
      .list 列表
      .list 列表
      .list 列表
    .empty_tips 暂无数据!
</template>

<script>
import { mapMutations } from 'vuex'
export default {
  name: 'home',
  data () {
    return {
      time: ''
    }
  },
  computed: {},

  created () {
    this.TOGGLE_TABBAR('home')
  },

  mounted () {
    console.log(process.env)
    this.$toast('全局弹窗')
  },

  methods: {
    ...mapMutations(['TOGGLE_TABBAR']),
    confirmHandle (value) {
      this.time = value
    }
  }
}

</script>
<style lang='scss' scoped>
.home{
  .content{
    height: 300px;
    overflow-y: auto;
    @include scrollBar;
    .list{
      height: 120px;
      line-height: 120px;
    }
  }
}
</style>
