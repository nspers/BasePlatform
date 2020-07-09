<template>
  <div class="lightpole subMain">
    <div class="poupSection">
      <lcd ref="lcd"/>
    </div>
    <div class="r-btn-box" style="width:1rem">
      <div class="r-btn-item">
        <div @click="showOv" class="item_w">
          <div ref="zmOV" class="r-btn-light1"></div>
        </div>
        <span ref="zmOVF" class="line iscolor">设备概览</span>
      </div>
      <div class="r-btn-item" >
        <div @click="showhuiCt" class="item_w">
          <div ref="hlCt" class="r-btn-set"></div>
        </div>
        <div ref="hlCtF" class="line">设备控制</div>
      </div>
 
    </div>
  </div>
</template>
<script>
import Vue from "vue";
import lcd from "../lcd/lcd";
export default {
  name: "App",
  components: {
    lcd,    
  },
  data() {
    return {
      flag: true
    };
  },
  created() {},
  mounted() {
    this.$nextTick(function() {
      var self = this;
      setTimeout(() => {
        self.$refs.lcd.entry("Electro");
      }, 100);
    });
  },
  methods: {
      //带选设备
      showSc(id) {
    //   if (this.flag) {
    //   this.$refs.zmOV.className = "r-btn-light";
    //   this.$refs.ddQu.className = "r-btn-set";
    //   this.$refs.zmOVF.className = "line";
    //   this.$refs.ddQuF.className = "line";
    //     let cid = this.$store.getters.getLoctionId;
    //     this.$refs.control.leave("led");
    //     this.$refs.overview.leave();
    //     this.flag = false;
    //     Vue.prototype.workCover.revertBillboardsStatus();
    //     if (id != cid) {
    //       this.$refs.singleControl ? this.$refs.singleControl.leave() : null;
    //       setTimeout(() => {
    //         this.$refs.singleControl.entry();
    //         this.flag = true;
    //       }, 800);
    //     } else {
    //       setTimeout(() => {
    //         this.$refs.singleControl.entry();
    //         this.flag = true;
    //       }, 700);
    //     }
    //   }
    },
      //设备概览 
    showOv() {
      this.$refs.zmOV.className = "r-btn-light1";
      this.$refs.hlCt.className = "r-btn-set";
      this.$refs.zmOVF.className = "line iscolor";
      this.$refs.hlCtF.className = "line";
        // this.workCover ? Vue.prototype.$resetMapHeight() : null;
        // this.workCover
        //   ? Vue.prototype.$creatMapPoint(
        //       Vue.prototype.$that,
        //       "lightpole",
        //       "Light"
        //     )
        //   : null;
         this.$refs.lcd.leave("control");
        this.flag = false;
        setTimeout(() => {
          // this.$store.dispatch("setSingleIsShow", false);
          this.$refs.lcd.entry("Electro");
      
          this.flag = true;
        }, 600);
      },
      //音乐播放
     showhuiCt() {
      this.$refs.zmOV.className = "r-btn-light";
      this.$refs.hlCt.className = "r-btn-set1";
      this.$refs.zmOVF.className = "line";
      this.$refs.hlCtF.className = "line iscolor";
        // this.workCover ? Vue.prototype.$resetMapHeight() : null;
        // this.workCover
        //   ? Vue.prototype.$creatMapPoint(
        //       Vue.prototype.$that,
        //       "lightpole",
        //       "Light"
        //     )
        //   : null;
         this.$refs.lcd.leave("Electro");
        // this.$refs.singleControl ? this.$refs.singleControl.leave() : null;
        this.flag = false;
        setTimeout(() => {
          this.$refs.lcd.entry("control");
        //   this.workCover
        //     ? Vue.prototype.workCover.revertBillboardsStatus()
        //     : null;
          // this.$store.dispatch("setSingleIsShow", false);
          this.flag = true;
        }, 600);
      
    },
    //广播喊话
    showQu() {
      this.$refs.zmOV.className = "r-btn-light";
      this.$refs.ddQu.className = "r-btn-control1";
      this.$refs.hlCt.className = "r-btn-set";

      this.$refs.zmOVF.className = "line";
      this.$refs.ddQuF.className = "line iscolor";
      this.$refs.hlCtF.className = "line";
    //   if (this.flag) {
        // this.showIndex1 = 2;
        // this.workCover ? Vue.prototype.$resetMapHeight() : null;
        // this.workCover
        //   ? Vue.prototype.$creatMapPoint(
        //       Vue.prototype.$that,
        //       "lightpole",
        //       "Light"
        //     )
        //   : null;
        this.$refs.broadcast.leave("Electro");
        this.$refs.broadcast.leave("music");
        this.flag = false;
        setTimeout(() => {
          this.$refs.broadcast.entry("broad");
          // this.$store.dispatch("setSingleIsShow", false);
        //   this.workCover
        //     ? Vue.prototype.workCover.revertBillboardsStatus()
        //     : null;
        //   this.showIndex = 3;
        //   this.flag = true;
        }, 600);
      
    },
 
  },
  beforeRouteLeave(to, from, next) {
    setTimeout(() => {
      next();
    }, 800);
  }
};
</script>

<style lang="scss" scoped>
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

