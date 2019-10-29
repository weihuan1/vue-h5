<template lang='pug'>
  .order
    p 订单
</template>

<script>
import { mapMutations } from 'vuex'
export default {
  name: 'order',
  data () {
    return {}
  },
  created () {
    this.TOGGLE_TABBAR('order')
  },
  methods: {
    ...mapMutations(['TOGGLE_TABBAR'])
  }
}
</script>

<style scoped lang="scss">
.order{
  padding: 0
}
</style>
