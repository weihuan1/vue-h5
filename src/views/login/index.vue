<template lang='pug'>
  .login
    van-nav-bar(
      style="background-color: transparent;"
      title="登录"
      left-arrow
      :border="false"
      @click-left="$router.back()"
    )
    van-tabs(color="#1989fa")
      van-tab(title="密码登录")
        van-cell-group(style="margin-top: 60px;")
          van-field(
            v-model="username"
            clearable
            placeholder="用户名/绑定手机号/绑定邮箱"
            left-icon="manager"
            dd-verify="req|phone|email"
          )
          van-field(
            v-model="password"
            clearable
            placeholder="请输入登录密码"
            left-icon="lock"
            :type="showPassword ? 'text' : 'password'"
            :right-icon="showPassword ? 'closed-eye' : 'eye-o'"
            @click-right-icon="showPassword = !showPassword"
          )
        .login_btn
          van-button(type="primary" block :hairline="false" :disabled="username.length < 3 || password.length < 6" @click="loginHandle(1)") 登录
        .tips_wrap
          span
          span 忘记密码
      van-tab(title="手机登录")
        van-cell-group(style="margin-top: 60px;")
          van-field(
            v-model="phone"
            clearable
            type="number"
            placeholder="请输入您的手机号码"
            left-icon="phone"
            min="0"
            pattern="[0-9]*"
          )
          van-field(
            v-model="identCode"
            clearable
            placeholder="请输入手机验证码"
            left-icon="lock"
            type="number"
          )
            van-button(slot="button" size="small" type="primary" :disabled="phone.length !== 11 || sendNumber < 61" @click="sendHandle") {{ sendText }}
        .login_btn
          van-button(type="primary" block :hairline="false" :disabled="phone.length !== 11 || identCode.length !== 6" @click="loginHandle(2)") 登录
        .tips_wrap
          span 未注册手机，将自动为您创建一个**账户
    .insert_wrap
      van-divider 使用合作账号登录
      .icon_main
        span.iconfont.iconQQ
        span.iconfont.iconwechat
</template>

<script>
export default {
  name: 'login',
  data () {
    return {
      username: '',
      password: '',
      phone: '',
      identCode: '',
      showPassword: false,
      hasSend: false,
      sendNumber: 61,
      loading: false,
      timer: undefined
    }
  },
  computed: {
    sendText () {
      if (this.sendNumber < 61) {
        return '验证码已发送  ' + this.sendNumber
      } else {
        return this.hasSend ? '重新发送' : '发送验证码'
      }
    }
  },
  created () {},
  methods: {
    loginHandle (type) {
      console.log(type)
      const params = {}
      if (type === 1) {
        params.username = this.username
        params.password = this.password
      } else {
        params.phone = this.phone
        params.identCode = this.identCode
      }
      this.loading = true
      this.$store.dispatch('Login', params).then(() => {
        this.loading = false
        this.$router.push({ path: this.redirect || '/' })
      }).catch(() => {
        this.loading = false
      })
    },
    sendHandle () {
      console.log('发送验证码!')
      this.countdown()
      this.hasSend = true
    },
    countdown () {
      this.timer && clearInterval(this.timer)
      this.sendNumber = 60
      this.timer = setInterval(() => {
        if (this.sendNumber === 1) {
          this.sendNumber = 61
          clearInterval(this.timer)
          return false
        }
        this.sendNumber -= 1
      }, 1000)
    }
  }
}
</script>

<style scoped lang="scss">
.login{
  width: 100%;
  height: 100%;
  overflow: hidden;
  background: url('../../assets/images/login_bg.jpg') no-repeat top center;
  background-size: 100%;
  background-color: #fff;
  /deep/ .van-tabs__nav{
    background-color: transparent;
    .van-ellipsis{
      font-size: 16px;
    }
  }
  /deep/ .van-tabs__wrap{
    &:after {
      display: none;
    }
  }
  /deep/ .van-cell-group{
    &:after {
      border-top: none;
      margin-left: 20px;
    }
  }
  /deep/ .van-field__left-icon .van-icon{
    font-size: 19px;
    color: #666;
  }
  .login_btn{
    padding: 0 18px;
    margin-top: 10px;
  }
  .tips_wrap{
    margin-top: 12px;
    padding: 0 20px;
    display: flex;
    justify-content: space-between;
    font-size: 13px;
    color: #666;
  }
  .insert_wrap{
    width: 50vw;
    margin: 100px auto 0;
    .icon_main{
      display: flex;
      justify-content: space-around;
      margin-top: 40px;
      padding: 0 20px;
      .iconfont{
        font-size: 26px;
        border-radius: 50%;
        width: 40px;
        height: 40px;
        text-align: center;
        line-height: 40px;
        color: #fff;
        &.iconQQ{
          background-color: #1989fa;
        }
        &.iconwechat{
          background-color: #07c160;
        }
      }
    }
  }
}
</style>
