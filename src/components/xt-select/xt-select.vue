<template>
  <div class="xt-select">
    <van-cell :title="title" v-if="mode === 'cell'" v-bind="$attrs" :is-link="!readonly" @click="clickHandle">
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
    <van-button v-else class="select_button" :hairline="false" @click="clickHandle">{{ selectLabel }} <van-icon style="top:2px" name="arrow-down" /></van-button>
    <van-popup
      v-model="showPopup"
      get-container="body"
      position="bottom"
    >
      <div class="popup_main" :style="{paddingBottom: '50px' }">
        <div class="title van-hairline--bottom">{{ title }}</div>
        <div class="popup_content">
          <div class="empty_tips" v-if="options.length === 0">暂无数据!</div>
          <div class="popop_list"
            v-for="list in options"
            :key="list.value"
            :class="computedActive(list)"
            @click="ckeckHandle(list)"
          >{{ list.label }}</div>
        </div>
        <div class="filter_footer" :style="{ borderTop: multiple ? '' : '6px solid #e9e9eb' }">
          <div class="button cancle" :class="multiple ? 'van-hairline--top' : ''" @click="showPopup = false">取消</div>
          <div class="button confirm" v-if="multiple" @click="showPopup = false">确定</div>
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
    mode: {
      type: String,
      default: 'cell'
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
  text-align: center;
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
  .van-cell{
    text-align: left;
  }
  .select_button{
    border: none;
    background: transparent;
  }
}
.popup_main{
  height: 100%;
  position: relative;
  .title{
    padding: 15px;
    font-size: 18px;
    color: #333333;
    text-align: center;
  }
  .popup_content{
    display: flex;
    flex-wrap: wrap;
    min-height: 100px;
    max-height: 400px;
    padding: 5px 15px 20px 5px;
    overflow-y: auto;
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
      font-size: 15px;
      flex: 1;
      &.cancle{
        color: #444;
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
    font-size: 14px;
    border-radius: 4px;
    background-color: #F8F8F8;
    margin: 10px 0 0 10px;
    display: inline-block;
    height: 54PX;
    width: calc(33vw - 16px);
    display: flex;
    padding: 0 10px;
    align-items: center;
    justify-content: space-around;
    color: #727272;
    &.active{
      background-color: #50b56a;
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
