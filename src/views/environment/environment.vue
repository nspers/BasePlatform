<template>
  <div class="environment subMain">
    <Overview ref="overview" v-if="tagName  !== 'sd'" />
    <SingleDevice ref="singleDevice" v-if="tagName === 'sd'" />
    <div class="r-btn-box" style="width:1rem">
      <div class="r-btn-item" @click="backToEnv">
        <div class="item_w">
          <div ref="backToEnv" :class="tagName==='ov'?'r-btn-light1':'r-btn-light'"></div>
        </div>
        <div ref="backToEnvF" class="line" :class="{iscolor:tagName==='ov'}">环测概览</div>
      </div>
      <div class="r-btn-item" @click="showDevState">
        <div class="item_w">
          <div ref="showDevState" :class="tagName==='ds'?'r-btn-control1':'r-btn-control'"></div>
        </div>
        <div ref="showDevStateF" class="line" :class="{iscolor:tagName==='ds'}">环测状态</div>
      </div>
    </div>
  </div>
</template>
<script>
import Overview from "../../components/overview";
import SingleDevice from "./single_device";
import store from "../../store";

export default {
  name: "App",
  components: {
    Overview,
    SingleDevice
  },
  data() {
    return {
      isclick: true,
      isclick_o: true
    };
  },
  created() {},
  watch: {},
  computed: {
    tagName() {
      return store.getters.getLoctionName;
    }
  },
  mounted() {
    this.$nextTick(function() {});
  },
  methods: {
    backToEnv() {
      this.$refs.backToEnv.className = "r-btn-light1";
      this.$refs.showDevState.className = "r-btn-control";
      this.$refs.backToEnvF.className = "line iscolor";
      this.$refs.showDevStateF.className = "line";
      if (this.$store.state.loctionName === "ov") return false;
      if (this.$refs.singleDevice) {
        this.$refs.singleDevice.leave();
      } else if (this.$refs.overview) {
        this.$refs.overview.ovOutIn();
      }
      //图标初始化 重置地图高度
      if (this.workCover) {
        this.$resetMapHeight();
        this.workCover.revertBillboardsStatus();
      }
      this.$store.state.selectId = null;
      setTimeout(() => {
        this.$store.dispatch("setLoctionName", "ov");
      }, 600);
    },
    showDevState() {
      this.$store.state.loctionName = "ct";
      this.$refs.backToEnv.className = "r-btn-light";
      this.$refs.showDevState.className = "r-btn-control1";
      this.$refs.backToEnvF.className = "line";
      this.$refs.showDevStateF.className = "line iscolor";
      if (this.$store.state.loctionName === "ds") return false;
      if (this.$refs.singleDevice) {
        this.$refs.singleDevice.leave();
      } else if (this.$refs.overview) {
        this.$refs.overview.ovOutIn();
      }
      this.$store.state.selectId = null;
      //图标初始化 重置地图高度
      if (this.workCover) {
        this.$resetMapHeight();
        this.workCover.revertBillboardsStatus();
      }
      setTimeout(() => {
        this.$store.dispatch("setLoctionName", "ds");
      }, 800);
    },
    evmOutIn() {
      this.$refs.singleDevice.sdOutIn();
    }
  },
  beforeRouteLeave(to, from, next) {
    if (store.getters.getLoctionName !== "sd") {
      this.$refs.overview.leave();
    } else if (store.getters.getLoctionName === "sd") {
      this.$refs.singleDevice.leave();
    }
    setTimeout(() => {
      next();
    }, 800);
  }
};
</script>
<style scoped>
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
  background: url(~@/assets/img/sb_c.png) center/contain no-repeat;
}
.r-btn-control1 {
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