<template lang='pug'>
  .revise
    van-nav-bar(
      :title="title"
      left-arrow
      :border="false"
      @click-left="$router.back()"
    )
    .content(style="padding: 10px;")
      van-field(v-if="type === 'nickname'" v-model="nickname" placeholder="请输入用户昵称")
      van-field(v-else-if="type === 'phone'" v-model="phone" placeholder="请输入手机号码")
      van-button(type="primary" style="margin-top: 8px" size="normal" block @click="clickHandle") 提交
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'revise',
  data () {
    return {
      title: '重置',
      nickname: '',
      phone: ''
    }
  },
  computed: {
    ...mapGetters(['userinfo']),
    type () {
      return this.$route.params.type
    }
  },
  created () {
    let typeData = {
      nickname: '设置昵称',
      phone: '联系手机'
    }
    let params = this.$route.params
    if (params.type && typeData[params.type]) {
      this.title = typeData[params.type]
      this.value = this.userinfo[params.type]
    }
  },
  methods: {
    clickHandle () {
      // if ()
      this.$router.back()
    }
  }
}
</script>

<style scoped lang="scss">
.revise{
  padding: 0
}
</style>
