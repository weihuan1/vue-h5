<template lang='pug'>
  .mine
    .header
      .header_content
        van-image(
          round
          width="50px"
          height="50px"
          :src="avatar"
          @click.native="$router.push('/userInfo')"
        )
        .header_main
          .name {{ token ? userinfo.name : '欢迎回来' }}
          .content
            .grade(v-if="token") 会员等级
              span.num LV{{ userinfo.lavel || 1 }}
            .tips(v-else @click="$router.push(`/login?redirect=${$route.path}`)") 未登录
      .header_items
        .header_item
          span 0
          span 可用红包
        .header_item
          span 0
          span 我的收藏
        .header_item
          span 0
          span 我的积分
        .header_item
          span 0
          span 剩余砖石
    .banner
      van-cell-group.mar_t
        van-cell(title="URL 跳转" is-link)
        van-cell(title="单元格" value="内容" is-link)
      van-cell.mar_t(title="其他List" is-link)
      .card_wrap
        xt-card.mar_t(v-for="(item, index) in listData" @click="clickHandle" :key="index" :length="item.length" :data="item")
</template>

<script>
import avatar from '@/assets/images/avatar.png'
import { mapGetters } from 'vuex'
export default {
  name: 'mine',
  data () {
    return {
      avatar,
      listData: [
        {
          header: { icon: 'iconQQ', name: '卡片' },
          content: [
            { icon: 'iconQQ', name: '我要买' },
            { icon: 'iconQQ', name: '我要卖' },
            { icon: 'iconQQ', name: '我的求降价' },
            { icon: 'iconQQ', name: '我出售的商品' },
            { icon: 'iconQQ', name: '我要卖' },
            { icon: 'iconQQ', name: '我的求降价' },
            { icon: 'iconQQ', name: '我出售的商品' }
          ]
        },
        {
          header: { icon: 'iconQQ', name: '轮播图卡片' },
          content: [
            { icon: 'iconQQ', name: '我要买' },
            { icon: 'iconQQ', name: '我要卖' },
            { icon: 'iconQQ', name: '我的求降价' },
            { icon: 'iconQQ', name: '我出售的商品' },
            { icon: 'iconQQ', name: '我要卖' },
            { icon: 'iconQQ', name: '我的求降价' },
            { icon: 'iconQQ', name: '我出售的商品' },
            { icon: 'iconQQ', name: '我的求降价' },
            { icon: 'iconQQ', name: '我出售的商品' }
          ]
        },
        {
          header: { icon: 'iconQQ', name: '单行3条' },
          content: [
            { icon: 'iconQQ', name: '我要买' },
            { icon: 'iconQQ', name: '我要卖' },
            { icon: 'iconQQ', name: '我的求降价' },
            { icon: 'iconQQ', name: '我出售的商品' }
          ],
          length: 3
        },
        {
          content: [
            { icon: 'iconQQ', name: '无标题' },
            { icon: 'iconQQ', name: '无标题' },
            { icon: 'iconQQ', name: '无标题' },
            { icon: 'iconQQ', name: '无标题' }
          ]
        }
      ]
    }
  },
  computed: {
    ...mapGetters(['token', 'userinfo'])
  },
  created () {},
  methods: {
    clickHandle (row) {
      console.log(row)
    }
  }
}
</script>

<style scoped lang="scss">
.mine{
  .header{
    padding:  30px 20px 10px;
    color: #fff;
    overflow: hidden;
    background: url('../../assets/images/indexbg.jpg') no-repeat top center;
    background-size: 100%;
    .header_content{
      display: flex;
      align-content: center;
    }
    .header_main{
      display: flex;
      flex-direction: column;
      justify-content: center;
      margin-left: 15px;
      .name{
        font-size: 14px;
      }
      .content{
        margin-top: 6px;
        .tips {
          font-size: 15px;
        }
        .grade{
          font-size: 12px;
          display: inline-block;
          background-color: #fff;
          color: #666;
          height: 20px;
          text-align: center;
          line-height: 21px;
          border-radius: 14px;
          padding: 0 6px;
          transform: scale(.9);
          letter-spacing: 1px;
          .num{
            color: #f90;
          }
        }
      }
    }
    .header_items{
      display: flex;
      justify-content: space-between;
      align-items: center;
      font-size: 13px;
      margin-top: 10px;
      .header_item{
        display: flex;
        flex-direction: column;
        align-items: center;
        height: 36px;
        justify-content: space-between;
      }
    }
  }
  .card_wrap{
    padding: 0 10px;
  }
}
</style>
