<template>
  <div class="lightpole subMain">
    <div class="poupSection">
      <overview ref="overview" />
      <lcdcontrol ref="lcdcontrol" />
    </div>

    <div ref="rBtnBox" class="r-btn-box trans-right-org">
      <div class="r-btn-item">
        <div @click="pushShowOV" class="item_w">
          <div :class="showIndex == 1 ? 'r-btn-light1': 'r-btn-light'"></div>
        </div>
        <div class="line" :class="showIndex == 1 ? 'iscolor' : ''">设备概览</div>
      </div>
      <div class="r-btn-item">
        <div @click="showhuiCt" class="item_w">
          <div :class="showIndex == 2 ? 'r-btn-set1' : 'r-btn-set'"></div>
        </div>
        <div class="line" :class="showIndex == 2 ? 'iscolor' : ''">设备控制</div>
      </div>
      <!-- <div class="r-btn-item">
        <div @click="checklcd" class="item_w">
          <div :class="showIndex == 3 ? 'r-btn-control1' : 'r-btn-control'"></div>
        </div>
        <div class="line" :class="showIndex == 3 ? 'iscolor' : ''">点选控制</div>
      </div>-->
    </div>
  </div>
</template>
<script>
import Vue from "vue";
import overview from "../../components/overview_fs";
import lcdcontrol from "../lcd/lcdcontrol";
export default {
  name: "lcd",
  components: {
    lcdcontrol,
    overview
  },
  data() {
    return {
      flag: true,
      showIndex: 1
    };
  },
  created() {},
  mounted() {
    this.$nextTick(function() {
      var self = this;
      setTimeout(() => {
        self.$refs.overview.entry();
        this.rBtnIn();
      }, 100);
    });
  },
  methods: {
    pushShowOV() {
      this.$store.dispatch("setLoctionName", "ov");
      this.showOv();
    },
    //lcd设备概览
    showOv() {
      if (this.flag) {
        this.$store.state.checkedArray = {};
        this.$store.state.isClick = true;
        setTimeout(() => {
          this.$store.state.isClick = false;
        }, 1000);
        this.$store.state.loctionName !== "sd" && this.$resetMapHeight();
        this.flag = false;
        this.showIndex = 1;
        this.$refs.lcdcontrol.leave("controllcd");
        this.$refs.lcdcontrol.leave("checklcd");
        setTimeout(() => {
          this.$store.dispatch("setLoctionName", "ov");
          this.$refs.overview.entry();
          this.$refs.lcdcontrol.wuyong++;
          this.flag = true;
        }, 600);
      }
    },
    //lcd控制
    showhuiCt() {
      if (this.flag) {
        this.$store.state.checkedArray = {};
        this.$store.state.isClick = true;
        setTimeout(() => {
          this.$store.state.isClick = false;
        }, 1000);
        this.$resetMapHeight();
        this.flag = false;

        this.showIndex = 2;
        this.$refs.overview.leave();
        this.$refs.lcdcontrol.leave("checklcd");
        setTimeout(() => {
          this.$store.dispatch("setLoctionName", "mp");
          this.$refs.lcdcontrol.entry("controllcd");
          this.$refs.lcdcontrol.wuyong++;
          this.flag = true;
        }, 600);
      }
    },
    //点选设备
    checklcd() {
      if (this.flag) {
        this.flag = false;
        this.showIndex = 3;
        this.$refs.overview.leave();
        this.$refs.lcdcontrol.leave("controllcd");
        setTimeout(() => {
          this.$store.dispatch("setLoctionName", "sd");
          this.$refs.lcdcontrol.entry("checklcd");
          this.flag = true;
        }, 700);
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
    this.$refs.overview ? this.$refs.overview.leave() : null;
    this.$refs.lcdcontrol ? this.$refs.lcdcontrol.leave("checklcd") : null;
    this.$refs.lcdcontrol ? this.$refs.lcdcontrol.leave("controllcd") : null;
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

