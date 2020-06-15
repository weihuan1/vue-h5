<template lang='pug'>
  van-popup.data-picker(v-model="showPopup" position="bottom" get-container="body")
    van-datetime-picker(
      v-model="currentDate"
      v-bind="$attrs"
      :type="type"
      @confirm="confirmHandle"
      @cancel="cancelHandle"
    )
</template>

<script>
import dayjs from 'dayjs'
export default {
  name: 'data-picker',
  props: {
    type: {
      type: String,
      default: 'date'
    }
  },
  data () {
    return {
      showPopup: false,
      currentDate: '',
      options: {
        date: {
          format: ''
        }
      }
    }
  },
  methods: {
    show (value) {
      let current = value || new Date()
      if (this.type === 'time') {
        this.currentDate = value || dayjs().format('HH:mm')
      } else {
        this.currentDate = dayjs(current).toDate()
      }
      this.showPopup = true
    },
    confirmHandle (value) {
      let formatValue
      if (this.type === 'time') {
        formatValue = value
      } else if (this.type === 'date') {
        formatValue = dayjs(value).format('YYYY-MM-DD')
      } else if (this.type === 'datetime') {
        formatValue = dayjs(value).format('YYYY-MM-DD HH:mm:ss')
      } else if (this.type === 'year-month') {
        formatValue = dayjs(value).format('YYYY-MM')
      }
      this.$emit('confirm', formatValue)
      this.showPopup = false
    },
    cancelHandle () {
      this.showPopup = false
      this.$emit('cancel')
    }
  }
}
</script>

<style scoped lang="scss">
.data-picker{
  padding: 0
}
</style>
