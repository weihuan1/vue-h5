<template>
  <div class="xt-select">
    <van-cell :title="title" v-bind="$attrs" :is-link="!readonly" @click="clickHandle">
      <div class="value_wrap" v-if="multiple">
        <div class="value_list van-hairline--surround"
          v-for="(list, index) in selectLabel"
          :key="list.value"
          v-show="index === 0 || !collapseTags"
        >{{ list.label }}<van-icon name="clear" @click.stop="deleteHandle(list)" /></div>
        <div class="value_list van-hairline--surround" v-show="collapseTags && selectLabel.length > 1">{{ '+ ' + (selectLabel.length - 1) }}</div>
      </div>
      <div class="value_wrap" v-else>{{ selectLabel }}</div>
    </van-cell>
    <van-popup
      v-model="showPopup"
      custom-style="height: 40%"
      get-container="body"
      position="bottom"
      closeable
      round
    >
      <div class="popup_main" :style="{paddingBottom: showFooter ? '50px' : '0' }">
        <div class="title">{{ title }}</div>
        <div class="popup_content">
          <div class="empty_tips" v-if="options.length === 0">暂无数据!</div>
          <div class="popop_list"
            v-for="list in options"
            :key="list.value"
            :class="computedActive(list)"
            @click="ckeckHandle(list)"
          >{{ list.label }}</div>
        </div>
        <div class="filter_footer" v-show="showFooter">
          <div class="button cancle van-hairline--top" @click="showPopup = false">取消</div>
          <div class="button confirm" @click="showPopup = false">确定</div>
        </div>
      </div>
    </van-popup>
  </div>
</template>

<script>
export default {
  name: 'xt-select',
  props: {
    value: {
      type: [String, Array],
      required: true
    },
    title: {
      type: String,
      default: '请选择'
    },
    options: {
      type: Array,
      required: true
    },
    multiple: {
      type: Boolean,
      default: false
    },
    readonly: {
      type: Boolean,
      default: false
    },
    collapseTags: {
      type: Boolean,
      default: false
    },
    showFooter: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      showPopup: false
    }
  },
  computed: {
    selectLabel () {
      if (this.multiple) {
        let arr = this.options.filter(item => this.value.includes(item.value))
        return arr
      } else {
        if (this.value) {
          let row = this.options.find(item => item.value === this.value)
          return row.label
        } else {
          return ''
        }
      }
    }
  },
  methods: {
    deleteHandle (list) {
      let newValue = this.value.filter(item => item !== list.value)
      this.$emit('input', newValue)
    },
    ckeckHandle (list) {
      let newValue
      if (this.multiple) {
        if (this.value.includes(list.value)) {
          newValue = this.value.filter(item => item !== list.value)
        } else {
          newValue = [...this.value, list.value]
        }
      } else {
        newValue = this.value === list.value ? '' : list.value
        this.showPopup = false
      }
      this.$emit('input', newValue)
    },
    clickHandle () {
      if (!this.readonly) {
        this.showPopup = true
      }
    },
    computedActive (list) {
      if (this.multiple) {
        return this.value.includes(list.value) ? 'active' : ''
      } else {
        return this.value === list.value ? 'active' : ''
      }
    }
  }
}
</script>

<style scoped lang="scss">
.xt-select{
  .value_wrap{
    display: flex;
    flex-wrap: nowrap;
    justify-content: flex-end;
    text-align: right;
    .value_list{
      display: flex;
      align-items: center;
      padding: 0px 4px;
      background-color: #f4f4f5;
      border-radius: 4px;
      margin-left: 4px;
      white-space: nowrap;
      .van-icon{
        margin-left: 4px;
      }
    }
  }
}
.popup_main{
  height: 100%;
  position: relative;
  .title{
    padding: 15px;
    font-size: 18px;
    color: #333333;
  }
  .popup_content{
    display: flex;
    flex-wrap: wrap;
    min-height: 100px;
  }
  .filter_footer{
    display: flex;
    align-items: center;
    position: absolute;
    left: 0;
    bottom: 0;
    width: 100%;
    z-index: 2;
    .button {
      height: 50px;
      text-align: center;
      line-height: 50px;
      font-size: 17px;
      flex: 1;
      &.cancle{
        color: #2878FF;
        background-color: #fff;
      }
      &.confirm{
        color: #fff;
        background-color: #2878FF;
      }
    }
  }
  ::v-deep .van-field__input--textarea{
    color: #666;
  }
  ::v-deep .van-uploader__upload{
    background-color: #fff;
  }
  .popop_list{
    font-size: 11px;
    border-radius: 4px;
    background-color: #F8F8F8;
    margin: 10px 10px 0 10px;
    display: inline-block;
    height: 22px;
    display: flex;
    padding: 0 10px;
    align-items: center;
    justify-content: center;
    color: #727272;
    &.active{
      background-color: #006EE9;
      color: #fff;
    }
  }
  .reply_conten{
    margin: 10px;
    background-color: #F5F5F5;
    border-radius: 4px;
  }
  .tips{
    margin-left: 15px;
    font-size: 12px;
    color: #888888;
  }
}
</style>
