<template lang='pug'>
  .mine
    p 个人中心
</template>

<script>
import { mapMutations } from 'vuex'
export default {
  name: 'mine',
  data () {
    return {}
  },
  created () {
    this.TOGGLE_TABBAR('mine')
  },
  methods: {
    ...mapMutations(['TOGGLE_TABBAR'])
  }
}
</script>

<style scoped lang="scss">
.mine{
  padding: 0
}
</style>
