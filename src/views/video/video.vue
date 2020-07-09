<template>
    <div class="Video subMain">
        <div class="poupSection">
            <overview ref="overview" />
            <videoControl ref="videoControl" :musicData="musicData"></videoControl>
        </div>
        <div ref="rBtnBox" class="r-btn-box trans-right-in">
            {{showIndex}}
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
                <div class="line" :class="showIndex == 2 ? 'iscolor' : ''">实时监控</div>
            </div>
            <div class="r-btn-item">
                <div @click="showQu" class="item_w">
                <div :class="showIndex == 3 ? 'r-btn-control1' : 'r-btn-control'"></div>
                </div>
                <div class="line" :class="showIndex == 3 ? 'iscolor' : ''">录像回放</div>
            </div>
        </div>
    </div>
</template>
<script>
import Vue from "vue"
import overview from "../../components/overview_fs";
import videoControl from '../video/videoControl'
export default {
    name: "Video",
    components:{
        overview,videoControl
    },
    data() {
        return {
            flag: true,
            showIndex: 1,
            musicData: []
        }
    },
    created() {},
    mounted() {
        this.$nextTick(function() {});
    },
    methods: {
        pushShowOV(){
            this.$store.state.checkedArray = {};
            this.$refs.videoControl.wuyong++;
            this.$store.state.loctionName = "ov";
            if (this.flag) {
                this.$store.state.selectId = null;
                this.showIndex = 1;
                this.workCover ? Vue.prototype.$resetMapHeight() : null;
                this.$refs.videoControl.leave("rc");
                this.$refs.videoControl.leave("live");
                this.flag = false;
                setTimeout(() => {
                this.$refs.overview.entry();
                this.flag = true;
                this.workCover
                    ? Vue.prototype.workCover.revertBillboardsStatus()
                    : null;
                }, 800);
            }
        },
        showhuiCt(){
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
                this.$refs.videoControl.leave("rc");
                setTimeout(() => {
                    this.$store.dispatch("setLoctionName", "mp");
                    this.$refs.videoControl.entry("live");
                    this.$refs.videoControl.wuyong++;
                    this.flag = true;
                }, 600);
            }
        },
        showQu(){
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
                this.$refs.videoControl.leave("live");
                setTimeout(() => {
                    this.$store.dispatch("setLoctionName", "mp");
                    this.$refs.videoControl.entry("rc");
                    this.$refs.videoControl.wuyong++;
                    this.flag = true;
                }, 600);
            }
        }
    }
};
</script>
<style scoped>
/* .bg{background: url(~@/assets/img/111111111.png) center center no-repeat;width: 500px;height: 500px;position: absolute;left: 0;top: 0;} */
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
  background: url(~@/assets/img/rc_c.png) center/contain no-repeat;
}

.r-btn-control1 {
  margin: 0 auto;
  width: 0.91rem;
  height: 0.91rem;
  position: relative;
  cursor: pointer;
  background: url(~@/assets/img/rc_.png) center/contain no-repeat;
}

.r-btn-set {
  position: relative;
  background: url(~@/assets/img/vd_c.png) center/contain no-repeat;
}

.r-btn-set1 {
  margin: 0 auto;
  width: 0.91rem;
  height: 0.91rem;
  position: relative;
  cursor: pointer;
  background: url(~@/assets/img/vd_.png) center/contain no-repeat;
}
</style>