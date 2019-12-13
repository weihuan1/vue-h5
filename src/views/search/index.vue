<template lang='pug'>
  .search
    <van-search placeholder="请输入搜索关键词" v-model="value" />
</template>

<script>
export default {
  name: 'search',
  data () {
    return {
      value: ''
    }
  },
  created () {},
  methods: {}
}
</script>

<style scoped lang="scss">
.search{
  padding: 0
}
</style>
