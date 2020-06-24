<template lang="pug">
  .home
    p 首页
    van-button(type="primary") 主要按钮
    xt-select(
      ref="select1"
      title="多选"
      :options="options"
      multiple
      collapse-tags
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
    .empty_tips 暂无数据!
</template>

<script>
export default {
  name: 'home',
  data () {
    return {
      time: '',
      selectValue: '',
      fileList: [],
      options: [
        { label: '选项一', value: '111' },
        { label: '选项二', value: '222' },
        { label: '选项三', value: '333' },
        { label: '选项四', value: '444' }
      ]
    }
  },
  methods: {
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
