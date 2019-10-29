<template lang="pug">
  .home
    p 首页
    van-button(type="primary") 主要按钮
</template>

<script>
// import { api } from '@/config'
import { mapMutations } from 'vuex'
export default {
  name: 'home',
  data () {
    return {}
  },

  computed: {},

  created () {
    this.TOGGLE_TABBAR('home')
  },

  mounted () {
    console.log(process.env)
  },

  methods: {
    ...mapMutations(['TOGGLE_TABBAR'])
  }
}

</script>
<style lang='scss' scoped>
p {
  width: 375px;
}
</style>
