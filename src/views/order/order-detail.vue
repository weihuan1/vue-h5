<template lang='pug'>
  .order-detail
    van-nav-bar(
      title="订单详情"
      left-text="返回"
      left-arrow
      fixed
      @click-left="$router.back()"
    )
    p.item 订单名称：{{ row.name }}
    p.item 订单时间：{{ row.time }}
    van-button(type="primary" block @click="clickHandle") 返回并且刷新数据
    van-button(type="primary" style="margin-top:10px;" block to="/userInfo") 前往其他页面
</template>

<script>
export default {
  name: 'order-detail',
  data () {
    return {
      row: ''
    }
  },
  created () {
    this.getData()
  },
  methods: {
    async getData () {
      let id = this.$route.params.id
      let res = await this.$api.getOrderDetail(id)
      this.row = res.result
    },
    clickHandle () {
      let routeArr = this.$router.options.routes[0].children
      routeArr.map(list => {
        if (list.name === 'order') {
          list.meta.useCache = false
        }
      })
      this.$router.back()
    }
  }
}
</script>

<style scoped lang="scss">
.order-detail{
  padding-top: 46px;
  .item{
    padding: 10px 15px;
    font-size: 15px;
    color: #333;
  }
}
</style>
