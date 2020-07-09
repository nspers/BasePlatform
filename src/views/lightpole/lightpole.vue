<template>
  <div class="lightpole subMain">
    <div class="poupSection">
      <Overview ref="overview" :class="{active:showIndex==1}" />
      <Control ref="control" :class="{active:showIndex==3}" />
      <Gateway ref="gateway" :class="{active:showIndex==2}" />
      <singleControl ref="singleControl" v-if="$store.state.singleIsShow" :target="showIndex" />
    </div>
    <div class="r-btn-box" style="width:1rem">
      <div class="r-btn-item" :class="{active:showIndex1==1}">
        <div @click="showOv" class="item_w">
          <div ref="zmOV" class="r-btn-light1"></div>
        </div>
        <span ref="zmOVF" class="line iscolor">照明概览</span>
      </div>
      <div class="r-btn-item" :class="{active:showIndex1==3}">
        <div @click="showhuiCt" class="item_w">
          <div ref="hlCt" class="r-btn-set"></div>
        </div>
        <div ref="hlCtF" class="line">回路控制</div>
      </div>
      <div class="r-btn-item" :class="{active:showIndex1==2}">
        <div @click="showQu" class="item_w">
          <div ref="ddQu" class="r-btn-control"></div>
        </div>
        <div ref="ddQuF" class="line">单灯控制</div>
      </div>
      <div class="r-btn-item" :class="{active:showIndex1==4}">
        <div @click="showjiCt" class="item_w">
          <div ref="jzCt" class="r-btn-num"></div>
        </div>
        <div ref="jzCtF" class="line">集中控制器</div>
      </div>
    </div>
  </div>
</template>
<script>
import Vue from "vue";
import Overview from "../../components/overview";
import Control from "../../components/control";
import Gateway from "../../components/gateway";
import singleControl from "../../views/singleControl/singleControl";
export default {
  name: "App",
  components: {
    Overview,
    Control,
    Gateway,
    singleControl
  },
  data() {
    return {
      showIndex: 3,
      showIndex1: 1,
      flag: true
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
        this.$refs.ddQu.className = "r-btn-control";
        this.$refs.hlCt.className = "r-btn-set";
        this.$refs.jzCt.className = "r-btn-num";
        this.$refs.zmOVF.className = "line";
        this.$refs.ddQuF.className = "line";
        this.$refs.hlCtF.className = "line";
        this.$refs.jzCtF.className = "line";
        let cid = this.$store.getters.getLoctionId;
        this.$refs.control.leave("Electro");
        this.$refs.control.leave("Concentrated");
        this.$refs.gateway.leave();
        this.$refs.overview.leave();
        this.flag = false;
        this.workCover
          ? Vue.prototype.workCover.revertBillboardsStatus()
          : null;
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
          }, 600);
        }
        // setTimeout(() => {
        //   this.$refs.singleControl.entry();
        //   this.flag = true;
        // }, 600);
      }
    },
    showOv() {
      this.$store.state.cacheSite = 'lightpole'
      this.$store.state.checkedArray = {};
      this.$refs.control.wuyong++;
      this.$store.state.loctionName = "ov";
      this.$store.state.isClick = true;
      setTimeout(() => {
        this.$store.state.isClick = false;
      }, 1000);
      this.$refs.zmOV.className = "r-btn-light1";
      this.$refs.ddQu.className = "r-btn-control";
      this.$refs.hlCt.className = "r-btn-set";
      this.$refs.jzCt.className = "r-btn-num";
      this.$refs.zmOVF.className = "line iscolor";
      this.$refs.ddQuF.className = "line";
      this.$refs.hlCtF.className = "line";
      this.$refs.jzCtF.className = "line";
      if (this.flag) {
        this.$store.dispatch("setNowTagName", "lightpole");
        this.workCover ? Vue.prototype.$resetMapHeight() : null;
        if(this.showIndex1 != 1){//右侧按钮互相切换,判断不是点击图标点后，拖动地图不触发重置点位
            this.showIndex1 = 1;
            this.workCover
            ? Vue.prototype.$creatMapPoint(
                Vue.prototype.$that,
                "lightpole",
                "Light"
                )
            : null;
        }
        
        this.$refs.control.leave("Electro");
        this.$refs.control.leave("Concentrated");
        this.$refs.gateway.leave();
        this.$refs.singleControl ? this.$refs.singleControl.leave() : null;
        this.flag = false;
        setTimeout(() => {
          // this.$store.dispatch("setSingleIsShow", false);
          this.$refs.overview.entry();
          this.workCover
            ? Vue.prototype.workCover.revertBillboardsStatus()
            : null;
          this.showIndex = 3;
          this.flag = true;
        }, 600);
      }
    },
    showQu() {
        this.$store.state.cacheSite = 'lightpole'
      this.$store.state.checkedArray = {};
      this.$refs.gateway.wuyong++;
      this.$store.state.loctionName = "qu";
      this.$store.state.isClick = true;
      setTimeout(() => {
        this.$store.state.isClick = false;
      }, 1000);
      this.$refs.zmOV.className = "r-btn-light";
      this.$refs.ddQu.className = "r-btn-control1";
      this.$refs.hlCt.className = "r-btn-set";
      this.$refs.jzCt.className = "r-btn-num";
      this.$refs.zmOVF.className = "line";
      this.$refs.ddQuF.className = "line iscolor";
      this.$refs.hlCtF.className = "line";
      this.$refs.jzCtF.className = "line";
      if (this.flag) {
        this.$store.dispatch("setNowTagName", "lightpole");
        this.workCover ? Vue.prototype.$resetMapHeight() : null;


          if(this.showIndex1 != 2){//右侧按钮互相切换,判断不是点击图标点后，拖动地图不触发重置点位
            this.showIndex1 = 2;
            this.workCover
            ? Vue.prototype.$creatMapPoint(
                Vue.prototype.$that,
                "lightpole",
                "Light"
                )
            : null;
        }
        this.$refs.overview.leave();
        this.$refs.control.leave("Electro");
        this.$refs.control.leave("Concentrated");
        this.$refs.singleControl ? this.$refs.singleControl.leave() : null;
        this.flag = false;
        setTimeout(() => {
          this.$refs.gateway.entry();
          // this.$store.dispatch("setSingleIsShow", false);
          this.workCover
            ? Vue.prototype.workCover.revertBillboardsStatus()
            : null;
          this.showIndex = 3;
          this.flag = true;
        }, 600);
      }
    },
    showhuiCt() {
        this.$store.state.cacheSite = 'lightpole'
      this.$store.state.checkedArray = {};
      this.$refs.control.wuyong++;
      this.$store.state.loctionName = "ct";
      this.$store.state.isClick = true;
      setTimeout(() => {
        this.$store.state.isClick = false;
      }, 1000);
      this.$refs.zmOV.className = "r-btn-light";
      this.$refs.ddQu.className = "r-btn-control";
      this.$refs.hlCt.className = "r-btn-set1";
      this.$refs.jzCt.className = "r-btn-num";
      this.$refs.zmOVF.className = "line";
      this.$refs.ddQuF.className = "line";
      this.$refs.hlCtF.className = "line iscolor";
      this.$refs.jzCtF.className = "line";
      if (this.flag) {
        this.$store.dispatch("setNowTagName", "lightpole");
        this.workCover ? Vue.prototype.$resetMapHeight() : null;


          if(this.showIndex1 != 3){//右侧按钮互相切换,判断不是点击图标点后，拖动地图不触发重置点位
            this.showIndex1 = 3;
            this.workCover
            ? Vue.prototype.$creatMapPoint(
                Vue.prototype.$that,
                "lightpole",
                "Light"
                )
            : null;
          }
        this.$refs.gateway.leave();
        this.$refs.overview.leave();
        this.$refs.control.leave("Concentrated");
        this.$refs.singleControl ? this.$refs.singleControl.leave() : null;
        this.flag = false;
        setTimeout(() => {
          this.$refs.control.entry("Electro");
          this.workCover
            ? Vue.prototype.workCover.revertBillboardsStatus()
            : null;
          // this.$store.dispatch("setSingleIsShow", false);
          this.showIndex = 3;
          this.flag = true;
        }, 600);
      }
    },
    showjiCt() {
        this.$store.state.cacheSite = 'jizhong'
      this.$store.state.checkedArray = {};
      this.$refs.control.wuyong++;
      this.$store.state.loctionName = "jiCt";
      this.$store.state.isClick = true;
      setTimeout(() => {
        this.$store.state.isClick = false;
      }, 1000);
      this.$refs.zmOV.className = "r-btn-light";
      this.$refs.ddQu.className = "r-btn-control";
      this.$refs.hlCt.className = "r-btn-set";
      this.$refs.jzCt.className = "r-btn-num1";
      this.$refs.zmOVF.className = "line";
      this.$refs.ddQuF.className = "line";
      this.$refs.hlCtF.className = "line ";
      this.$refs.jzCtF.className = "line iscolor";
      if (this.flag) {
        this.$store.dispatch("setNowTagName", "jizhong");
        this.workCover ? Vue.prototype.$resetMapHeight() : null;


          if(this.showIndex1 != 4){//右侧按钮互相切换,判断不是点击图标点后，拖动地图不触发重置点位
            this.showIndex1 = 4;
            this.workCover
            ? Vue.prototype.$creatMapPoint(
                Vue.prototype.$that,
                "lightpole",
                "Concentrated"
                )
            : null;
        }
        this.$refs.gateway.leave();
        this.$refs.overview.leave();
        this.$refs.control.leave("Electro");
        this.$refs.singleControl ? this.$refs.singleControl.leave() : null;
        this.flag = false;
        setTimeout(() => {
          this.workCover
            ? Vue.prototype.workCover.revertBillboardsStatus()
            : null;
          this.$refs.control.entry("Concentrated");
          // this.$store.dispatch("setSingleIsShow", false);
          this.showIndex = 4;
          this.flag = true;
          // console.log(this.$store.state.websocket[220005].msg.controllers);
            let controllers = this.$store.state.websocket[220005].msg.controllers;
            for (let i = 0; i < controllers.length; i++) {
                let State = '';
                if (controllers[i].state) {
                    State = 'on'
                } else {
                    State = 'offline'
                }                
                this.workCover ? Vue.prototype.workCover.changeBillBoardstatusAttr(controllers[i].controllerid, State, 'noSelect') : null;
            }
        }, 600);
      }
    }
  },
  beforeRouteLeave(to, from, next) {
    this.$refs.overview.leave();
    this.$refs.control.leave("Concentrated");
    this.$refs.control.leave("Electro");
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

