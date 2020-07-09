<template>
  <div class="checkedBox" @click="clickChecked">
    <span class="check" v-if="!this.$store.state.checkedArray[this.target]"></span>
    <span class="check active" v-if="this.$store.state.checkedArray[this.target]"></span>
    <!-- <i class="icons color-lan-62d" v-if="this.$store.state.checkedArray[this.target]">&#xe7b3;</i> -->
  </div>
</template>

<script>
export default {
  props: ["target"],
  data() {
    return {};
  },
  // created() {
  //   // console.log(this.target);
  //   this.$store.state.checkedArray[this.target] = false;
  //   // this.$store.state.checkedArray["all"] = false;
  //   // console.log(this.$store.state.checkedArray);
  // },
  mounted() {
    this.$nextTick(() => {
      this.$store.state.checkedArray[this.target] = false;
    });
  },
  methods: {
    clickChecked() {
      if (this.target != "all") {
        this.$store.state.checkedArray[this.target] = !this.$store.state
          .checkedArray[this.target];
        if (!this.$store.state.checkedArray[this.target]) {
          this.$store.state.checkedArray["all"] = false;
        }
        let flag = true;
        for (const key in this.$store.state.checkedArray) {
          if (key != "all" && !this.$store.state.checkedArray[key]) {
            flag = false;
          }
        }
        if (flag) {
          this.$store.state.checkedArray["all"] = true;
        }
      } else {
        this.$store.state.checkedArray["all"] = !this.$store.state.checkedArray[
          "all"
        ];
        for (const key in this.$store.state.checkedArray) {
          this.$store.state.checkedArray[key] = this.$store.state.checkedArray[
            "all"
          ];
        }
      }
      this.$set(this.$store.state.checkedArray, 0, "blank");
      delete this.$store.state.checkedArray[0];
      this.$emit("clickChecked");
    }
  }
};
</script>

<style lang="scss" scoped>
.icons {
  font-size: 0.15rem !important;
}

.checkedBox {
  font-size: 0.16rem;
  height: 0.6rem;
  line-height: 0.6rem;
  float: left;
  text-align: center;
  width: 20%;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  .check {
    float: right;
    text-align: center;
    overflow: hidden;
    // margin-left: 0.2rem;
    height: 0.155rem;
    width: 0.15rem;
    border: 0.012rem solid #62d3fd;
  }
}
.checkedBox .check.active::after{
    content: '';
    width: 100%;height: 100%;display: block;background: url(../assets/img/right.png) no-repeat center center/99% 99%;
}
</style>