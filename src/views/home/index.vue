<template lang="pug">
  .home
    p 首页
    van-button(type="primary" @click="isSelectorShow = true") 使用mand-mobile组件
    xt-select(
      ref="select1"
      title="多选"
      :options="options"
      collapse-tags
      mode="cell"
      multiple
      v-model="selectValue"
    )
    van-cell(title="选择时间" is-link :value="time" @click="$refs.dataPicker.show(time)")
    data-picker(
      ref="dataPicker"
      type="year-month"
      cancel-button-text="清除"
      @cancel="time = ''"
      @confirm="confirmHandle"
    )
    van-uploader(
      v-model="fileList"
      preview-size="70px"
      multiple
    )
    md-selector(
      v-model="isSelectorShow"
      :data="selectoption"
      title="Check模式"
      min-height="320px"
      okText="确认"
      cancelText="取消"
      large-radius
      @confirm="onSelectorConfirm"
      is-check
    )
    .empty_tips 暂无数据!
</template>

<script>
import Selector from 'mand-mobile/lib/selector'

export default {
  name: 'home',
  components: {
    'md-selector': Selector
  },
  data () {
    return {
      isSelectorShow: false,
      time: '',
      selectValue: '',
      fileList: [],
      options: [
        { label: '全部', value: 'all' },
        { label: '选项一', value: '111' },
        { label: '选项二', value: '222' },
        { label: '选项三', value: '333' },
        { label: '选项四', value: '444' }
      ],
      selectoption: [
        {
          value: '1',
          text: '选项一'
        },
        {
          value: '2',
          text: '选项二'
        },
        {
          value: '3',
          text: '选项三',
          disabled: true
        },
        {
          value: '4',
          text: '选项四'
        }
      ]
    }
  },
  methods: {
    onSelectorConfirm (e) {
      console.log(e)
    },
    confirmHandle (value) {
      this.time = value
    },
    // 批量上传文件
    afterRead (file) {
      let fileArr
      if (Object.prototype.toString.call(file) === '[object Array]') {
        fileArr = file
      } else {
        fileArr = [file]
      }
      this.$toast.loading()
      let promiseAll = []
      fileArr.forEach(item => {
        let param = new FormData()
        param.append('file', item.file)
        promiseAll.push(this.$api.uploadPhoto(param).then(res => {
          for (let i in res.result) {
            item[i] = res.result[i]
          }
          this.$toast.clear()
        }).catch(() => {
          let index = this.fileList.indexOf(item)
          if (index > -1) {
            this.fileList.splice(index, 1)
          }
        }))
      })
      Promise.all(promiseAll).then(res => {
        this.$toast.clear()
        console.log(this.fileList)
      })
    }
  }
}

</script>
<style lang='scss' scoped>
.home{}
</style>
