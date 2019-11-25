<template lang='pug'>
  .order
    van-list(
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
    )
      van-cell(
        v-for="item in list"
        :key="item"
        :title="item"
      )
</template>

<script>
import { mapMutations } from 'vuex'
export default {
  name: 'order',
  data () {
    return {
      list: [],
      loading: false,
      finished: false
    }
  },
  created () {
    this.TOGGLE_TABBAR('order')
  },
  methods: {
    ...mapMutations(['TOGGLE_TABBAR']),
    onLoad () {
      // 异步更新数据
      setTimeout(() => {
        for (let i = 0; i < 10; i++) {
          this.list.push(this.list.length + 1)
        }
        // 加载状态结束
        this.loading = false

        // 数据全部加载完成
        if (this.list.length >= 40) {
          this.finished = true
        }
      }, 500)
    }
  }
}
</script>

<style scoped lang="scss">
.order{
  padding: 0
}
</style>
