<template>
  <div class="led subMain">
    <div class="poupSection">
      <Overview ref="overview" :class="{active:showIndex==1}" />
      <Control ref="control" :class="{active:showIndex==3}" />
      <singleControl ref="singleControl" v-if="$store.state.singleIsShow" :target="showIndex" />
    </div>

    <div class="r-btn-box" style="width:1rem">
      <div class="r-btn-item" :class="{active:showIndex==1}">
        <div @click="showOv" class="item_w">
          <div ref="zmOV" class="r-btn-light1"></div>
        </div>
        <div ref="zmOVF" class="line iscolor">LED概览</div>
      </div>
      <div class="r-btn-item" :class="{active:showIndex==3}">
        <div @click="showCt('led')" class="item_w">
          <div ref="ddQu" class="r-btn-set"></div>
        </div>
        <div ref="ddQuF" class="line">设备控制</div>
      </div>
    </div>
  </div>
</template>
<script>
import Vue from "vue";
import Overview from "../../components/overview";
import Control from "../../components/control";
import singleControl from "../../views/singleControl/singleControl";

export default {
  name: "App",
  components: {
    Overview,
    Control,
    singleControl
  },
  data() {
    return {
      showIndex1: 1,
      showIndex: 5,
      flag: true,
      isclick: true,
      isclick_t: true
    };
  },
  created() {},
  mounted() {
    this.$nextTick(function() {
      var self = this;
      setTimeout(() => {
        self.$refs.overview.entry();
      }, 100);
    });
  },
  methods: {
    showSc(id) {
      if (this.flag) {
        this.$store.state.loctionName = "sd";
        this.$refs.zmOV.className = "r-btn-light";
        this.$refs.ddQu.className = "r-btn-set";
        this.$refs.zmOVF.className = "line";
        this.$refs.ddQuF.className = "line";
        let cid = this.$store.getters.getLoctionId;
        this.$refs.control.leave("led");
        this.$refs.overview.leave();
        this.flag = false;
        Vue.prototype.workCover.revertBillboardsStatus();
        if (id != cid) {
          this.$refs.singleControl ? this.$refs.singleControl.leave() : null;
          setTimeout(() => {
            this.$refs.singleControl.entry();
            this.$store.state.checkedArray = {};
            this.$refs.singleControl.wuyong++;
            this.flag = true;
          }, 800);
        } else {
          setTimeout(() => {
            this.$refs.singleControl.entry();
            this.$store.state.checkedArray = {};
            this.$refs.singleControl.wuyong++;
            this.flag = true;
          }, 700);
        }
      }
    },
    showOv() {
      this.$store.state.checkedArray = {};
      this.$refs.control.wuyong++;
      this.$store.state.loctionName = "ov";
      this.$refs.zmOV.className = "r-btn-light1";
      this.$refs.ddQu.className = "r-btn-set";
      this.$refs.zmOVF.className = "line iscolor";
      this.$refs.ddQuF.className = "line";
      if (this.flag) {
        this.$store.state.selectId = null;
        this.showIndex1 = 1;
        this.workCover ? Vue.prototype.$resetMapHeight() : null;
        this.$refs.control.leave("led");
        this.$refs.singleControl ? this.$refs.singleControl.leave() : null;
        this.flag = false;
        setTimeout(() => {
          this.$refs.overview.entry();
          this.flag = true;
          // this.$store.dispatch("setSingleIsShow", false);
          this.workCover
            ? Vue.prototype.workCover.revertBillboardsStatus()
            : null;
        }, 800);
      }
    },
    showCt(target) {
      this.$store.state.checkedArray = {};
      this.$refs.control.wuyong++;
      this.$store.state.loctionName = "ct";
      this.$refs.zmOV.className = "r-btn-light";
      this.$refs.ddQu.className = "r-btn-set1";
      this.$refs.zmOVF.className = "line";
      this.$refs.ddQuF.className = "line iscolor";
      if (this.flag) {
        this.$store.state.selectId = null;
        this.showIndex1 = 3;
        this.workCover ? Vue.prototype.$resetMapHeight() : null;
        this.$refs.overview.leave();
        this.$refs.singleControl ? this.$refs.singleControl.leave() : null;
        this.flag = false;
        setTimeout(() => {
          this.$refs.control.entry(target);
          this.flag = true;
          // this.$store.dispatch("setSingleIsShow", false);
          this.workCover
            ? Vue.prototype.workCover.revertBillboardsStatus()
            : null;
        }, 800);
      }
    }
  },
  beforeRouteLeave(to, from, next) {
    this.$refs.overview.leave();
    this.$refs.control.leave("led");
    setTimeout(() => {
      next();
    }, 800);
  }
};
</script>

<style lang="scss" scoped>
.poupSection {
  .control,
  .overview {
    position: absolute;
    top: 0rem;
    left: 0rem;
  }
}
.btnBox {
  position: absolute;
  top: 1.1rem;
  right: 0.2rem;
}
.r-btn-light {
  position: relative;
  background: url(~@/assets/img/hj_c.png) center/contain no-repeat;
}
.r-btn-light1 {
  margin: 0 auto;
  width: 0.91rem;
  height: 0.91rem;
  position: relative;
  cursor: pointer;
  background: url(~@/assets/img/hj_.png) center/contain no-repeat;
}
.r-btn-set {
  position: relative;
  background: url(~@/assets/img/sb_c.png) center/contain no-repeat;
}
.r-btn-set1 {
  margin: 0 auto;
  width: 0.91rem;
  height: 0.91rem;
  position: relative;
  cursor: pointer;
  background: url(~@/assets/img/sb_.png) center/contain no-repeat;
}
.item_w {
  width: 1rem;
  height: 1rem;
}
.iscolor {
  color: aqua;
}
.line {
  position: relative;
  top: -0.1rem;
}
</style>

