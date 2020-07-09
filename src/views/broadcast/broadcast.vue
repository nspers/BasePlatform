<template>
  <div class="lightpole subMain">
    <div class="poupSection">
      <overview ref="overview" /> 
      <broadcontrol ref="broadcontrol" />
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
        <div class="line" :class="showIndex == 2 ? 'iscolor' : ''">音乐播放</div>
      </div>
      <div class="r-btn-item">
        <div @click="showQu" class="item_w">
          <div :class="showIndex == 3 ? 'r-btn-control1' : 'r-btn-control'"></div>
        </div>
        <div class="line" :class="showIndex == 3 ? 'iscolor' : ''">广播喊话</div>
      </div>
      <!--        <div class="r-btn-item">-->
      <!--            <div @click="showSd" class="item_w">-->
      <!--                <div :class="showIndex == 4 ? 'r-btn-control1' : 'r-btn-control'"></div>-->
      <!--            </div>-->
      <!--            <div class="line" :class="showIndex == 4 ? 'iscolor' : ''">点选设备</div>-->
      <!--        </div>-->
    </div>
  </div>
</template>

<script>
import Vue from "vue";
import overview from "../../components/overview_fs";
import broadcontrol from "../broadcast/broadcontrol";
export default {
  name: "broadcast",
  components: {
    broadcontrol,
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
      // this.$api.get("/material/findMaterialByType").then(res => {
      //   if (res.code == 1) {
      //     this.musicData = res.result;
      //   }
      //   console.log(res);
      // });
    });
  },
  methods: {
    showSc(id) {
      if (this.flag) {
        this.$store.state.loctionName = "sd";
        // this.$refs.zmOV.className = "r-btn-light";
        // this.$refs.ddQu.className = "r-btn-set";
        // this.$refs.zmOVF.className = "line";
        // this.$refs.ddQuF.className = "line";
        
        let cid = this.$store.getters.getLoctionId;
        
        this.$refs.broadcontrol.leave('music');
        this.$refs.broadcontrol.leave('broad');
        this.$refs.overview.leave();

        // this.showIndex = 0
        this.flag = false;
        Vue.prototype.workCover.revertBillboardsStatus();
        if (id != cid) {
          this.$refs.broadcontrol ? this.$refs.broadcontrol.leave('music') : null;
          setTimeout(() => {
            this.$refs.broadcontrol.entry('singleDev');
            this.$store.state.checkedArray = {};
            this.$refs.broadcontrol.wuyong++;
            this.flag = true;
          }, 800);
        } else {
          setTimeout(() => {
            this.$refs.broadcontrol.entry('singleDev');
            this.$store.state.checkedArray = {};
            this.$refs.broadcontrol.wuyong++;
            this.flag = true;
          }, 700);
        }
      }
    },
    //设备概览
    pushShowOV() {
      this.$store.dispatch("setLoctionName", "ov");
      this.showIndex = 1
      this.showOv();
    },
    showOv() {
      // if (this.flag) {
      //   this.$store.state.checkedArray = {};
      //   this.$store.state.isClick = true;
      //   setTimeout(() => {
      //     this.$store.state.isClick = false;
      //   }, 1000);
      //   this.$store.state.loctionName !== "sd" && this.$resetMapHeight();
      //   this.flag = false;
      //   this.showIndex = 1;
      //   this.$refs.broadcontrol.leave("music");
      //   this.$refs.broadcontrol.leave("broad");
      //   this.$refs.broadcontrol.leave("singleDev");
      //   setTimeout(() => {
      //     this.$store.dispatch("setLoctionName", "ov");
      //     this.$refs.overview.entry();
      //     this.$refs.broadcontrol.wuyong++;
      //     this.flag = true;
      //   }, 600);
      // }

      this.$store.state.checkedArray = {};
      this.$refs.broadcontrol.wuyong++;
      this.$store.state.loctionName = "ov";
      if (this.flag) {
        this.$store.state.selectId = null;
        this.showIndex1 = 1;
        this.workCover ? Vue.prototype.$resetMapHeight() : null;
        this.$refs.broadcontrol.leave("music");
        this.$refs.broadcontrol.leave("broad");
        this.$refs.broadcontrol.leave("singleDev");
        // this.$refs.singleControl ? this.$refs.singleControl.leave() : null;
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
    //音乐播放
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
        this.$refs.broadcontrol.leave("broad");
        this.$refs.broadcontrol.leave("singleDev");
        setTimeout(() => {
          this.$store.dispatch("setLoctionName", "mp");
          this.$refs.broadcontrol.entry("music");
          this.$refs.broadcontrol.wuyong++;
          this.flag = true;
        }, 600);
      }
    },
    //广播喊话
    showQu() {
      if (this.flag) {
        this.$store.state.checkedArray = {};
        this.$store.state.isClick = true;
        setTimeout(() => {
          this.$store.state.isClick = false;
        }, 1000);
        this.$resetMapHeight();
        this.flag = false;
        this.showIndex = 3;
        this.$refs.overview.leave();
        this.$refs.broadcontrol.leave("music");
        this.$refs.broadcontrol.leave("singleDev");
        setTimeout(() => {
          this.$store.dispatch("setLoctionName", "bc");
          this.$refs.broadcontrol.entry("broad");
          this.$refs.broadcontrol.wuyong++;
          this.flag = true;
        }, 600);
      }
    },
    //点选设备
    showSd() {
      if (this.flag) {
        this.flag = false;
        this.showIndex = 4;
        this.$refs.overview.leave();
        this.$refs.broadcontrol.leave("music");
        this.$refs.broadcontrol.leave("broad");
        this.$refs.broadcontrol.leave("singleDev");
        setTimeout(() => {
          this.$store.dispatch("setLoctionName", "sd");
          this.$refs.broadcontrol.entry("singleDev");
          this.flag = true;
        }, 700);
      }
    },
    rBtnIn() {
      this.$refs.rBtnBox.className = "r-btn-box trans-right-in";
    },
    rBtnOut() {
      this.$refs.rBtnBox.className = "r-btn-box trans-right-out";
    },
    getControlAPI(data) {
      this.$api.post("/websocket/command", data).then(function(res) {
        console.log(res);
      });
    }
  },
  beforeRouteLeave(to, from, next) {
    this.$refs.overview ? this.$refs.overview.leave() : null;
    this.$refs.broadcontrol ? this.$refs.broadcontrol.leave("music") : null;
    this.$refs.broadcontrol ? this.$refs.broadcontrol.leave("broad") : null;
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
    top: 0;
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

.r-btn-control {
  position: relative;
  background: url(~@/assets/img/mc_c.png) center/contain no-repeat;
}

.r-btn-control1 {
  margin: 0 auto;
  width: 0.91rem;
  height: 0.91rem;
  position: relative;
  cursor: pointer;
  background: url(~@/assets/img/mc_.png) center/contain no-repeat;
}

.r-btn-set {
  position: relative;
  background: url(~@/assets/img/mu_c.png) center/contain no-repeat;
}

.r-btn-set1 {
  margin: 0 auto;
  width: 0.91rem;
  height: 0.91rem;
  position: relative;
  cursor: pointer;
  background: url(~@/assets/img/mu_.png) center/contain no-repeat;
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

