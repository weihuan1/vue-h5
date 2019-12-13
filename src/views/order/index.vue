<template lang='pug'>
  .order
    van-pull-refresh(
      v-model="refreshLoading"
      @refresh="onRefresh"
    )
      span(slot="loading")
      van-list(
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="getData"
      )
        van-cell(
          v-for="(item, index) in dataList"
          :key="index"
          is-link
          :title="item.name"
          :to="`/orderDetail/${item._id}`"
        )
</template>

<script>
export default {
  name: 'order',
  data () {
    return {
      cache: false,
      dataList: [],
      refreshLoading: false,
      loading: false,
      finished: false,
      page: 1,
      pageSize: 10
    }
  },
  beforeRouteLeave  (to, from, next) {
    if (to.name === 'orderDetail') {
      from.meta.useCache = true
    } else {
      from.meta.useCache = false
    }
    next()
  },
  activated () {
    // console.log(this.$route)
    let useCache = this.$route.meta.useCache
    if (!useCache) {
      console.log('刷新数据')
      this.onRefresh()
    }
  },
  methods: {
    onRefresh () {
      this.page = 1
      this.total = 0
      this.dataList = []
      this.finished = false
      this.getData()
    },
    async getData () {
      let params = {
        page: this.page,
        pageSize: this.pageSize
      }
      let res = await this.$api.getOrderList(params)
      this.dataList = this.dataList.concat(res.result.data)
      if (res.result.total <= this.dataList.length) {
        this.finished = true
      }
      this.loading = false
      this.refreshLoading && (this.refreshLoading = false)
      this.page += 1
    }
  }
}
</script>

<style scoped lang="scss">
.order{
  padding: 0
}
</style>
