<template>
  <div class="lightpole subMain">
    <div class="poupSection">
      <overview ref="overview" />
      <videoControl ref="videoControl" />
      <callPolice ref="Police" />
    </div>
    <div ref="rBtnBox" class="r-btn-box trans-right-org">
      <div class="r-btn-item">
        <div @click="showOv" class="item_w">
          <div :class="showIndex == 1 ? 'r-btn-light1': 'r-btn-light'"></div>
        </div>
        <span class="line" :class="showIndex == 1 ? 'iscolor' : ''">设备概览</span>
      </div>
      <div class="r-btn-item">
        <div @click="showMonitor" class="item_w">
          <div :class="showIndex == 2 ? 'r-btn-set1' : 'r-btn-set'"></div>
        </div>
        <div class="line" :class="showIndex == 2 ? 'iscolor' : ''">监视呼叫</div>
      </div>
      <div class="r-btn-item">
        <div @click="showRadio" class="item_w">
          <div :class="showIndex == 3 ? 'r-btn-control1' : 'r-btn-control'"></div>
        </div>
        <div class="line" :class="showIndex == 3 ? 'iscolor' : ''">语音广播</div>
      </div>
      <div class="r-btn-item">
        <div @click="showLog" class="item_w">
          <div :class="showIndex == 4 ? 'r-btn-num1' : 'r-btn-num'"></div>
        </div>
        <div class="line" :class="showIndex == 4 ? 'iscolor' : ''">报警记录</div>
      </div>
    </div>
  </div>
</template>

<script>
import overview from "../../components/overview_fs";
import videoControl from "./videoControl";
import callPolice from "./callPolice";
export default {
  name: "visualIntercom",
  components: {
    overview,
    videoControl,
    callPolice
  },
  data() {
    return {
      showIndex: 1,
      flag: true
    };
  },
  created() {},
  mounted() {
    this.$nextTick(() => {
      setTimeout(() => {
        this.$refs.overview.entry();
        this.rBtnIn();
      }, 100);
    });
  },
  methods: {
    showSc(id) {
      // alert(id);
      if (id != this.$store.state.loctionId) {
        this.showIndex = 0;
        this.$refs.overview.leave();
        this.$refs.videoControl.leave("Radio");
        this.$refs.videoControl.leave("Monitor");
        this.$refs.videoControl.leave("log");
        this.$refs.Police.leave();
        setTimeout(() => {
          this.$refs.Police.entry();
        }, 800);
      }
    },
    showOv() {
      this.showIndex = 1;
      this.$store.dispatch("setLoctionName", "ov");
      if (this.flag) {
        this.flag = false;
        this.$resetMapHeight();
        this.$refs.videoControl.leave("Radio");
        this.$refs.videoControl.leave("Monitor");
        this.$refs.videoControl.leave("log");
        this.$refs.Police.leave();
        setTimeout(() => {
          this.$refs.overview.entry();
          this.flag = true;
        }, 600);
      }
    },
    showMonitor() {
      this.showIndex = 2;
      this.$store.dispatch("setLoctionName", "ov");
      if (this.flag) {
        this.flag = false;
        this.$resetMapHeight();
        this.$refs.overview.leave();
        this.$refs.videoControl.leave("Radio");
        this.$refs.videoControl.leave("log");
        this.$refs.Police.leave();
        setTimeout(() => {
          this.$refs.videoControl.entry("Monitor");
          this.flag = true;
        }, 600);
      }
    },
    showRadio() {
      this.showIndex = 3;
      this.$store.dispatch("setLoctionName", "ov");
      if (this.flag) {
        this.flag = false;
        this.$resetMapHeight();
        this.$refs.overview.leave();
        this.$refs.videoControl.leave("Monitor");
        this.$refs.videoControl.leave("log");
        this.$refs.Police.leave();
        setTimeout(() => {
          this.$refs.videoControl.entry("Radio");
          this.flag = true;
        }, 600);
      }
    },
    showLog() {
      this.showIndex = 4;
      this.$store.dispatch("setLoctionName", "ov");
      if (this.flag) {
        this.flag = false;
        this.$resetMapHeight();
        this.$refs.overview.leave();
        this.$refs.videoControl.leave("Radio");
        this.$refs.videoControl.leave("Monitor");
        this.$refs.Police.leave();
        setTimeout(() => {
          this.$refs.videoControl.entry("log");
          this.flag = true;
        }, 600);
      }
    },
    rBtnIn() {
      this.$refs.rBtnBox.className = "r-btn-box trans-right-in";
    },
    rBtnOut() {
      this.$refs.rBtnBox.className = "r-btn-box trans-right-out";
    }
  },
  beforeRouteLeave(to, from, next) {
    this.$refs.overview.leave();
    this.$refs.videoControl.leave("Radio");
    this.$refs.videoControl.leave("Monitor");
    this.$refs.videoControl.leave("log");
    this.$refs.Police.leave();
    this.rBtnOut();
    setTimeout(() => {
      next();
    }, 800);
  }
};
</script>

<style lang="scss" scoped>
.poupSection {
  .geteway,
  .control,
  .videoControl,
  .overview {
    position: absolute;
    top: 0rem;
    left: 0;
  }
}
.btnBox {
  position: absolute;
  top: 1.1rem;
  right: 0.2rem;
}
.r-btn-light {
  position: relative;
  background: url(~@/assets/img/zm_c.png) center/contain no-repeat;
}
.r-btn-light1 {
  margin: 0 auto;
  width: 0.91rem;
  height: 0.91rem;
  position: relative;
  cursor: pointer;
  background: url(~@/assets/img/zm_.png) center/contain no-repeat;
}
.r-btn-control {
  position: relative;
  background: url(~@/assets/img/dd_c.png) center/contain no-repeat;
}
.r-btn-control1 {
  margin: 0 auto;
  width: 0.91rem;
  height: 0.91rem;
  position: relative;
  cursor: pointer;
  background: url(~@/assets/img/dd_.png) center/contain no-repeat;
}
.r-btn-set {
  position: relative;
  background: url(~@/assets/img/hl_c.png) center/contain no-repeat;
}
.r-btn-set1 {
  margin: 0 auto;
  width: 0.91rem;
  height: 0.91rem;
  position: relative;
  cursor: pointer;
  background: url(~@/assets/img/hl_.png) center/contain no-repeat;
}
.r-btn-num {
  position: relative;
  background: url(~@/assets/img/jz_c.png) center/contain no-repeat;
}
.r-btn-num1 {
  margin: 0 auto;
  width: 0.91rem;
  height: 0.91rem;
  position: relative;
  cursor: pointer;
  background: url(~@/assets/img/jz_.png) center/contain no-repeat;
}
.iscolor {
  color: aqua;
}
.item_w {
  width: 1rem;
  height: 1rem;
}
.line {
  position: relative;
  top: -0.1rem;
}
</style>

