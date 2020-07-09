<template>
  <div id="app" style="overflow-x:hidden">
    <router-view ref="rview" />
    <div class="main">
      <Header v-if="$route.meta.keepAlive"/>
      <div ref="cesiumContainer" id="cesiumContainer" class="cesium-container"></div>
    </div>
    
  </div>
</template>

<script>
import Vue from "vue";
import Header from "./components/header-xidan1";
import Bottom from "./components/bottom";
import broadcasting from "./components/broadcasting";
import * as mapWork from "./amap/main";
import { createMap } from "./amap/main";

export default {
  name: "App",
  data() {
    return {};
  },
  components: {
    Header,
    Bottom,
    broadcasting
  },
  computed: {
    bcSwitch() {
      return this.$store.state.bcSwitch;
    }
  },
  created() {
    Vue.prototype.$that = this;
    // let pole = [];
    // let led = [];
    // let lcd = [];
    // let jizhong = [];
    // let huance = [];
    // let guangbo = [];
    // let zhaoming = [];
    // this.$api.get("/lighpole/lighpole/list", {}).then(function(res) {
    //   // console.log(res)
    //   for (let i = 0; i < res.length; i++) {
    //     if (res[i].deviceType.indexOf("1") !== -1) {
    //       pole.push(res[i]);
    //     }
    //     if (res[i].deviceType.indexOf("2") !== -1) {
    //       led.push(res[i]);
    //     }
    //     if (res[i].deviceType.indexOf("3") !== -1) {
    //       lcd.push(res[i]);
    //     }
    //     // if (res[i].deviceType.indexOf("4") !== -1) {
    //     //   jizhong.push(res[i]);
    //     // }
    //     if (res[i].deviceType.indexOf("5") !== -1) {
    //       huance.push(res[i]);
    //     }
    //     if (res[i].deviceType.indexOf("6") !== -1) {
    //       guangbo.push(res[i]);
    //     }
    //     if (res[i].deviceType.indexOf("7") !== -1) {
    //       zhaoming.push(res[i]);
    //     }
    //   }
    //   window.sessionStorage.setItem("pole", JSON.stringify(pole));
    //   window.sessionStorage.setItem("led", JSON.stringify(led));
    //   window.sessionStorage.setItem("lcd", JSON.stringify(lcd));
    //   // window.sessionStorage.setItem("jizhong", JSON.stringify(jizhong));
    //   window.sessionStorage.setItem("environment", JSON.stringify(huance));
    //   window.sessionStorage.setItem("broadcast", JSON.stringify(guangbo));
    //   window.sessionStorage.setItem("lightpole", JSON.stringify(zhaoming));
    // });
    // this.$api.get("/lightIot/gatewayLocationInof").then(function(res) {
    //   jizhong = res;
    //   window.sessionStorage.setItem("jizhong", JSON.stringify(jizhong));
    // });
  },
  watch: {
    $route: function(newValue, oldValue) {
        var self = this;
        // if(newValue.meta.keepAlive && sessionStorage.lightpole && oldValue.name == 'index'){
        //     let t = setInterval(() => {
        //         if (self.$refs.cesiumContainer) {
        //             delete window.amap;
        //             self.loadMap();
        //             clearInterval(t);
        //         }
        //     });
        // }
        if(newValue.meta.keepAlive){
            self.$refs.cesiumContainer.className = 'cesium-container'
            if(!window.amap){
                self.loadMap()
            }
        }else{
            self.$refs.cesiumContainer.className = 'cesium-container hidden'
        }
    }
  },
  mounted() {
    let t = setInterval(() => {
      // if(sessionStorage.lightpole && this.$refs.cesiumContainer){
      if (this.$refs.cesiumContainer && this.$router.history.current.keepAlive) { 
          this.loadMap();
            // if(!sessionStorage.login || !this.$router.history.current.keepAlive){
            //     this.$refs.cesiumContainer.className = 'cesium-container hidden'
            // }
          clearInterval(t);
      }
    });
  },
  methods: {
    loadMap() {
      createMap("cesiumContainer", () => {
        //创建覆盖物
        Vue.prototype.$creatMapPoint(this, this.$route.name);
        //点击地图获取经纬度
        mapWork.getJWD();
        // 开始移动
        mapWork.bindDrawstartHandler(() => {
          // (this.direction !== 0) ? this.isfixed = false : this.isfixed = true;
          if (
            ["/led", "/lcd", "/electricity", "/illumine"].indexOf(
              this.$route.path
            ) > -1
          ) {
            // this.$refs.rView.closecompoent();
          } else if (this.$route.path === "/broadcast") {
            // this.$refs.rView.$refs.control.leave();
            // this.$refs.rView.$refs.overview.leave();
            // this.$refs.rView.cbBoxMoveOut()
          }
          //判断是否点击了覆盖物或底部导航 如果不是则重置覆盖物状态和各种id
          // console.log(this.$store.state.isClick ? "是点击" : "是鼠标拖动");
          if (!this.$store.state.isClick && Vue.prototype.workCover) {
            // Vue.prototype.workCover.revertBillboardsStatus();
            if (
              this.$route.path === "/broadcast" &&
              this.$store.state.loctionName === "sd"
            ) {
              // this.$router.push({ name: "site" });
              // console.log(this.$refs.rview.showIndex);
              switch (this.$refs.rview.showIndex) {
                case 1:
                  this.$refs.rview.pushShowOV();
                  break;
                case 2:
                  this.$refs.rview.showhuiCt();
                  break;
                case 3:
                  this.$refs.rview.showQu();
                  break;
                default:
                  break;
              }
            } else if (
              this.$route.path === "/lcd" &&
              this.$store.state.loctionName === "sd"
            ) {
              this.$refs.rview.showOv();
            } else if (
              this.$route.path === "/visualIntercom" &&
              this.$store.state.loctionName === "sd"
            ) {
              this.$refs.rview.showOv();
            } else if (
              this.$route.path === "/lightpole" &&
              this.$store.state.loctionName === "sd"
            ) {
              switch (this.$refs.rview.showIndex1) {
                case 1:
                  this.$refs.rview.showOv();
                  break;
                case 2:
                  this.$refs.rview.showQu();
                  break;
                case 3:
                  this.$refs.rview.showhuiCt();
                  break;
                case 4:
                  this.$refs.rview.showjiCt();
                  break;
                default:
                  break;
              }
            } else if (
              this.$route.path === "/environment" &&
              this.$store.state.loctionName === "sd"
            ) {
              this.$refs.rview.backToEnv();
            } else if (
              this.$route.path === "/led" &&
              this.$store.state.loctionName === "sd"
            ) {
              this.$refs.rview.showOv();
            }
            this.$store.state.selectId = 0;
            this.$store.state.last = 0;
            this.$store.state.now = 0;
            this.$store.state.loctionId = 0;
            this.$store.state.selectBoolean = "noSelect";
            // $('.map_site_name').stop().animate({'marginTop': '-100px'});
            // console.log(this.$route);
          }
        });
        mapWork.bindDrawendHandler(() => {
          this.direction = 0;
          this.isfixed = false;
          // console.log("地图结束移动");
          if (this.$store.state.now == 0) {
            if (
              ["/led", "/lcd", "/electricity", "/illumine"].indexOf(
                this.$route.path
              ) > -1
            ) {
              let isindex = this.$store.getters.getterisnum;
              // this.$refs.rView.show(isindex);
            }
            this.$store.state.last = 0;
          } else {
            if (this.$route.name !== "broadcast") {
              // this.$refs.rView.targetclick(this.$store.state.now);
            }
          }
          this.$store.state.now = 0;
        });
      });
      setTimeout(() => {}, 200);
    }
  }
};
</script>