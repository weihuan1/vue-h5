<template lang='pug'>
  .info
    van-nav-bar(
      title="个人资料"
      left-arrow
      :border="false"
      @click-left="$router.back()"
    )
    .header
      van-image(
        round
        width="70px"
        height="70px"
        :src="userinfo.avatar || avatar"
        @click="$router.push('/userInfo')"
      )
      van-uploader.uploader(:after-read="afterRead")
    van-cell-group
      van-cell(title="用户名" :value="userinfo.username || '暂无'")
      van-cell(title="昵称" :value="userinfo.nickname || '未设置'" is-link to="/revise/nickname")
      van-cell(title="联系电话" :value="userinfo.phone || '未设置'" is-link to="/revise/phone")
    van-button(type="default" size="large" block @click="loginOut" style="margin-top:20px;color:#ff976a") 退出登录
</template>

<script>
import avatar from '@/assets/images/avatar.png'
import { mapGetters, mapActions } from 'vuex'
export default {
  name: 'info',
  data () {
    return {
      avatar
    }
  },
  computed: {
    ...mapGetters(['userinfo'])
  },
  created () {},
  methods: {
    ...mapActions(['LogOut']),
    afterRead (file) {
      console.log(file)
    },
    async loginOut () {
      await this.$dialog.confirm({
        title: '提示',
        message: '确认登出?'
      })
      await this.LogOut()
      this.$router.replace('/mine')
    }
  }
}
</script>

<style scoped lang="scss">
.info{
  .header{
    text-align: center;
    background-color: #fff;
    padding: 20px 0;
    position: relative;
    .uploader{
      position: absolute;
      display: inline-block;
      width: 70px;
      height: 70px;
      border-radius: 100%;
      overflow: hidden;
      background-color: transparent;
      left: 50%;
      transform: translateX(-50%);
      opacity: 0;
    }
  }
}
</style>
