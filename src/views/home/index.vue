<!-- home -->
<template lang="pug">
  .home
    p 首页
    van-button(type="primary") 主要按钮
</template>

<script>
// import { api } from '@/config'
import {
  Button
} from 'vant'
export default {
  components: {
    'van-button': Button
  },

  data () {
    return {}
  },

  computed: {},

  mounted () {
    console.log(process.env)
  },

  methods: {}
}

</script>
<style lang='scss' scoped>
p {
  width: 375px;
}
</style>
