<template>
  <span class="number">{{startVal}}</span>
</template>
<script>
export default {
  name: 'App',
  props: ['value'],
  data() {
    return {
      timer: null,
      startVal: 0
    }
  },
  watch: {
    value(val) {
      this.init(val)
    }
  },
  async created() {
    this.init(this.value)
  },
  methods: {
    init(num) {
      let self = this
      let time = Math.abs(num - this.startVal) > 100 ? 10 : 20
      self.timer && clearInterval(self.timer)
      self.timer = setInterval(function() {
        if (num > self.startVal) {
          self.startVal = parseInt(self.startVal)
          self.startVal += parseInt(num / 100) ? parseInt(num / 100) : 1
          if (self.startVal >= num) {
            clearInterval(self.timer)
            self.startVal = num
            self.timer = null
            return false
          }
        } else {
          self.startVal = parseInt(self.startVal)
          self.startVal -= parseInt(num / 10) ? parseInt(num / 10) : 1
          if (self.startVal <= num) {
            clearInterval(self.timer)
            self.startVal = num
            self.timer = null
            return false
          }
        }
      }, time)
    }
  }
}
</script>
<style scoped>
.number {
  display: inline;
}
</style>