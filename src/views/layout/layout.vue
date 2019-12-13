<template lang='pug'>
  .app-wrapper
    .app-main
      transition(name="fade-transform" mode="out-in")
        router-view
    van-tabbar(:value="tabbar")
      van-tabbar-item(icon="home-o" name="home" to="home" replace) 首页
      van-tabbar-item(icon="search" name="search" to="search" replace) 搜索
      van-tabbar-item(icon="orders-o" name="order" to="order" replace) 订单
      van-tabbar-item(icon="contact" name="mine" to="mine" replace) 我的
</template>

<script>
export default {
  name: 'layout',
  data () {
    return {
      active: 'search'
    }
  },
  computed: {
    tabbar () {
      return this.$store.state.app.tabbar
    }
  },
  create () {},
  methods: {}
}
</script>

<style lang="scss">
.app-wrapper{
  padding-bottom: 60px
}
</style>
