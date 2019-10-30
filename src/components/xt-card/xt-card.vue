<template lang='pug'>
  .xt-card
    .header.van-hairline--bottom(v-if="data.header")
      span.iconfont(v-if="data.header && data.header.icon" :class="data.header.icon")
      span.name {{ data.header.name }}
    template(v-if="data.content.length <= length * 2")
      .content
        .card_item(v-for="(item, index) in data.content" :key="index" @click="clickHandle(item)" :style="{ width: 100 / length + '%' }")
          span.iconfont(:class="item.icon")
          span.name {{ item.name }}
    template(v-else)
        van-swipe(indicator-color="#fc7b53" style="width: 100%")
          van-swipe-item(v-for="(item, index) in swipeData" :key="index")
            .content(style="padding-bottom: 24px;")
              .card_item(v-for="(list, ind) in item" :key="ind" @click="clickHandle(list)" :style="{ width: 100 / length + '%' }")
                span.iconfont(:class="list.icon")
                span.name {{ list.name }}
</template>

<script>
import { sliceArray } from '@/utils'
export default {
  name: 'xt-card',
  props: {
    data: {
      type: Object,
      required: true
    },
    length: {
      type: Number,
      default: 4
    }
  },
  computed: {
    swipeData () {
      const max = this.length * 2
      if (this.data.content && this.data.content.length > max) {
        return sliceArray(this.length * 2, this.data.content)
      } else {
        return []
      }
    }
  },
  methods: {
    clickHandle (item) {
      this.$emit('click', item)
    }
  }
}
</script>

<style scoped lang="scss">
.xt-card{
  background-color: #fff;
  border-radius: 4px;
  overflow: hidden;
  .iconfont{
    color: #fc7b53;
  }
  .header{
    padding-left: 2px;
    .iconfont{
      font-size: 18px;
      margin-left: 8px;
    }
    height: 40px;
    line-height: 40px;
    .name{
      font-size: 16px;
      margin-left: 8px;
    }
  }
  .content{
    display: flex;
    flex-wrap: wrap;
    padding-bottom: 6px;
    .card_item{
      display: flex;
      height: 60px;
      flex-direction: column;
      justify-content: space-around;
      align-items: center;
      margin-top: 6px;
      .iconfont{
        font-size: 20px;
      }
      .name{
        font-size: 12px;
      }
    }
  }
  /deep/ .van-swipe__indicator{
    width: 8px;
    height: 8px;
  }
}
</style>
