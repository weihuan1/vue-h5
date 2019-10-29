<template lang='pug'>
  .search
    p 搜索
</template>

<script>
import { mapMutations } from 'vuex'
export default {
  name: 'search',
  data () {
    return {}
  },
  created () {
    this.TOGGLE_TABBAR('search')
  },
  methods: {
    ...mapMutations(['TOGGLE_TABBAR'])
  }
}
</script>

<style scoped lang="scss">
.search{
  padding: 0
}
</style>
