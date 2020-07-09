<template>
  <div ref="overview">
    <div class="content-left trans-up trans-up-delay-3"></div>
    <div class="overview">
      <div class="wrapbox">
        <!-- 设备信息 -->
        <div class="o_box trans-up trans-up-delay-5">
          <div class="box-title">
            <span class="icons color-huang">&#xe675;</span>
            <span>设备信息</span>
          </div>
          <p>设备名称： {{wsData.name}}</p>
          <p>设备型号： {{wsData.type}}</p>
          <!--                    <p>设备编码： {{wsData.devicecode}}</p>-->
          <p>
            <span style="vertical-align: middle">状态：</span>
            <i class="s_ico" :class="wsData.state?'s_online':'s_offline'"></i>
          </p>
        </div>
        <!-- 设备状态 -->
        <!--                <div class="o_box trans-up trans-up-delay-7">-->
        <!--&lt;!&ndash;                    <div class="box-title">&ndash;&gt;-->
        <!--                        <span class="icons color-huang">&#xe62a;</span>-->
        <!--                        <span>设备状态</span>-->
        <!--                    </div>-->
        <!--                    <p v-if="!wsData.state">离线时间： {{wsData.gettime}}</p>-->
        <!--                </div>-->
        <!-- 运行状态 -->
        <div class="o_box trans-up trans-up-delay-7">
          <div class="box-title">
            <span class="icons color-huang">&#xe778;</span>
            <span>运行数据</span>
          </div>
          <!--设备离线-->
          <!--                    <div class="temp_nodata" v-if="!wsData.state">设备离线，暂无数据。</div>-->
          <!--设备305-->
          <div v-if="wsData.type===305">
            <p>获取时间： {{wsData.gettime}}</p>
            <div class="temp_box clearfix">
              <div class="temp_bar_box">
                <div class="temp_bar">
                  <div class="temp_cir"></div>
                  <div class="temp_rod" ref="temp_rod"></div>
                </div>
              </div>
              <div class="air_pm25">
                <p style="text-align: center;">
                  <span v-if="!wsData.pmtwopointfive">0</span>
                  <num v-else :value="wsData.pmtwopointfive"></num>μg/m³
                </p>
                <!--<span class="icons">&#xe631;</span>-->
                <p>
                  <Pm25 style="width: .5rem;height: .4rem;"></Pm25>
                  <span style="line-height: .4rem;">PM2.5</span>
                </p>
              </div>
              <div class="air_quality">
                <!--                            <span class="icons color-lv">&#xe6f7;</span>-->
                <Good style="height: .42rem;"></Good>
                <span>{{wsData.airquality}}</span>
              </div>
              <div class="temp_num">
                <!-- <span>{{wsData.ringtemperature}}°C</span> -->
               <span>
                  <span v-if="!wsData.ringtemperature">0</span>
                  <num v-else :value="wsData.ringtemperature"></num>°C
                </span>
              </div>
            </div>
            <div class="air_para clearfix">
              <div class="color-lv">
                <!--                            <span class="icons">&#xe601;</span>-->
                <Water style="width: .5rem;"></Water>
                <!-- <span>相对湿度 {{wsData.ringwetting}}%</span> -->
                  <span >
                  湿度
                  <span v-if="!wsData.ringwetting">0</span>
                  <num v-else :value="wsData.ringwetting"></num>%
                </span>
              </div>
              <div class="color-cheng">
                <!--                            <span class="icons">&#xe625;</span>-->
                <Qiya style="width: .5rem;"></Qiya>
                <!-- <span>气压 {{wsData.pressure}}Pa</span> -->
                <span >
                  气压
                  <span v-if="!wsData.pressure">0</span>
                  <num v-else :value="wsData.pressure"></num>Pa
                </span>
              </div>
              <div class="color-lan-389">
                <!--                            <span class="icons">&#xe61b;</span>-->
                <Fenxiang style="width: .5rem;"></Fenxiang>
                <!-- <span>风向 {{wsData.winddirection}}°</span> -->
                   <span>
                  风向
                  {{wsData.winddirection}}风
                </span>
              </div>
              <div class="color-hong">
                <!--                            <span class="icons">&#xe742;</span>-->
                <Sound style="width: .5rem;"></Sound>
                <!-- <span>噪声 {{wsData.noise}}db</span> -->
                  <span >
                  噪声
                  <span v-if="!wsData.noise">0</span>
                  <num v-else :value="wsData.noise"></num>db
                </span>
              </div>
              <div class="color-huang">
                <!--                            <span class="icons">&#xe604;</span>-->
                <Wind style="width: .5rem;"></Wind>
                <!-- <span>风速 {{wsData.windspeed}}m/s</span> -->
                  <span >
                  风力
                  <num :value="wsData.windspeed"></num>级
                </span>
              </div>
              <div class="color-lan-62d">
                <!--                            <span class="icons">&#xe631;</span>-->
                <Pm10 style="width: .5rem;"></Pm10>
                <!-- <span>PM10 {{wsData.pmten}}μg/m³</span> -->
                <span >
                  PM10
                  <span v-if="!wsData.pmten">0</span>
                  <num v-else :value="wsData.pmten"></num>μg/m³
                </span>
              </div>
            </div>
          </div>
          <!--设备202-->
          <div v-if="wsData.type===202">
            <p>获取时间： {{wsData.gettime}}</p>
            <div class="temp_box clearfix">
              <div class="air_quality202">
                <Good style="width: .6rem;"></Good>
                <span>{{wsData.airquality}}</span>
              </div>
            </div>
            <div class="air_para clearfix">
              <!-- <div class="ap_item color-lan-389">
                <Fenxiang style="width: .5rem;"></Fenxiang>
                 <span >
                  风向
                  <span v-if="!wsData.winddirection">0</span>
                  <num v-else :value="wsData.winddirection"></num>°
                </span>
              </div> -->
              <div class="ap_item temp_num">
                <!-- <span>{{wsData.ringtemperature}}°C</span> -->
                <Ther style="width: .5rem;" />
               <span>
                   温度
                  <span v-if="!wsData.ringtemperature">0</span>
                  <num v-else :value="wsData.ringtemperature"></num>°C
                </span>
              </div>
              <div class="ap_item color-lan">
                <Pm25 style="width: .5rem;"></Pm25>
                 <span >
                  PM2.5
                  <span v-if="!wsData.pmtwopointfive">0</span>
                  <num v-else :value="wsData.pmtwopointfive"></num>μg/m³
                </span>
              </div>
              <!-- <div class="ap_item color-huang">
                <Wind style="width: .5rem;"></Wind>
                <span >
                  风速
                  <span v-if="!wsData.windspeed">0</span>
                  <num v-else :value="wsData.windspeed"></num>m/s
                </span>
              </div> -->
              <div class="ap_item color-lv">
                <!--                            <span class="icons">&#xe601;</span>-->
                <Water style="width: .5rem;"></Water>
                <!-- <span>相对湿度 {{wsData.ringwetting}}%</span> -->
                  <span >
                  湿度
                  <span v-if="!wsData.ringwetting">0</span>
                  <num v-else :value="wsData.ringwetting"></num>%
                </span>
              </div>
              <div class="ap_item color-lan-62d">
                <Pm10 style="width: .5rem;"></Pm10>
                <span >
                  PM10
                  <span v-if="!wsData.pmten">0</span>
                  <num v-else :value="wsData.pmten"></num>μg/m³
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- 搜索设备 -->
    <Search type="environment" class="trans-up trans-up-delay-3" />
  </div>
</template>

<script>
import num from "../../components/number";
import Search from "../../components/search";
import Ther from "../../icon/thermometer";

export default {
  name: "singleDevice",
  components: {
    Search,
    num,
    Ther
  },
  data() {
    return {
      msgCode: 0,
      msgCode2: 0,
      abScrollH: 0,
      eLoading: 1,
      scrollSwitch: 1,
      wsData: {
        did: 0,
        id: 0,
        name: "",
        type: 0,
        state: 0,
        devicecode: 0,
        gettime: 0,
        lamppostid: 0,
        lamppostname: "",
        noise: 0,
        pmten: 0,
        pmtwopointfive: 0,
        airquality: "优",
        pressure: 0,
        rainfall: 0,
        ringtemperature: 0,
        ringwetting: 0,
        winddirection: '北',
        windspeed: 0
      },
      temp: 50,
      svgW: 100
    };
  },
  created() {
    this.svgW = (80 / 1920) * window.innerWidth;
  },
  watch: {
    getWsData(nowval, oldval) {}
  },
  computed: {
    //vuex
    getWsData() {
      if (this.$store.state.websocket.hasOwnProperty(240001)) {
        this.eLoading = 0;
        const wsMsg = this.$store.state.websocket[240001].msg.frt;
        for (let item of wsMsg) {
          if (item.lamppostid === this.$store.state.loctionId) {
            this.wsData.did = item.did;
            this.wsData.id = item.id;
            this.wsData.state = item.state;
            this.wsData.devicecode = item.devicecode;
            this.wsData.gettime = item.gettime;
            this.wsData.lamppostid = item.lamppostid;
            this.wsData.lamppostname = item.lamppostname;
            this.wsData.name = item.name;
            this.wsData.noise = item.noise;
            this.wsData.pmten = parseInt(item.pmten);
            this.wsData.pmtwopointfive = parseInt(item.pmtwopointfive);
            this.wsData.pressure = item.pressure;
            this.wsData.rainfall = item.rainfall;
            this.wsData.ringtemperature = item.ringtemperature;
            this.wsData.ringwetting = item.ringwetting;
            this.wsData.type = item.type;
            this.wsData.winddirection = this.$degree2Direction(item.winddirection);
            this.wsData.windspeed = this.$metres2Grade(item.windspeed);
            //空气质量换算
            if (wsMsg.pmtwopointfive <= 50) {
              this.wsData.airquality = "优";
            } else if (wsMsg.pmtwopointfive <= 100) {
              this.wsData.airquality = "良好";
            } else if (wsMsg.pmtwopointfive <= 200) {
              this.wsData.airquality = "轻度";
            } else if (wsMsg.pmtwopointfive <= 300) {
              this.wsData.airquality = "中度";
            } else if (wsMsg.pmtwopointfive > 300) {
              this.wsData.airquality = "重度";
            }
          }
        }
      }
    }
  },
  mounted() {
    this.$nextTick(function() {
      setTimeout(() => {
        this.entry();
      }, 100);
      setTimeout(() => {
        this.deviceObj = {
          light: 80,
          line: 100
        };
      }, 1000);
      //.55rem高度是0度，.74高度是50度。平均没度为.0038rem。
      if (this.$refs.temp_rod) {
        this.$refs.temp_rod.style.height =
          0.55 + 0.0038 * this.wsData.ringtemperature + "rem";
      }
      //启动Echarts
      this.initChart();
    });
  },
  methods: {
    entry() {
      if (this.$refs.overview) {
        this.$refs.overview.className = "is-visible";
      }
    },
    leave() {
      if (this.$refs.overview) {
        this.$refs.overview.className = "";
      }
    },
    sdOutIn() {
      this.leave();
      setTimeout(() => {
        this.entry();
      }, 800);
    },
    backToEnv() {
      this.$store.dispatch("setLoctionName", "ov");
      this.$resetMapHeight();
    },
    //格式化折线图中的日期
    dateSplit(date) {
      return date
        .split("-")
        .slice(1)
        .join("");
    },
    // 折线图 start
    initChart() {
      if (this.$refs.myEchart) {
        this.chart = this.$echarts.init(this.$refs.myEchart, "dark");
        this.chart.setOption({
          xAxis: {
            type: "category",
            data: this.wsData.lightalarms.date
          },
          yAxis: {
            type: "value"
          },
          grid: {
            top: "8%",
            left: "3%",
            right: "3%",
            bottom: "5%",
            containLabel: true
          },
          series: [
            {
              data: this.wsData.lightalarms.times,
              type: "line"
            }
          ],
          tooltip: {
            show: true,
            trigger: "axis",
            axisPointer: {
              type: "shadow",
              axis: "auto",
              snap: true
            }
          }
        });
      }
    }
  },
  beforeRouteLeave(to, from, next) {
    this.leave();
    setTimeout(() => {
      next();
    }, 800);
  }
};
</script>

<style lang="scss" scoped>
.overview {
  position: absolute;
  top: 1.2rem;
  left: 0;
  width: 4.8rem;
  z-index: 999;

  .wrapbox {
    width: 4.8rem;
    height: 100%;
    font-size: 0.12rem;
    color: #fff;

    .o_box {
      position: relative;
      margin-bottom: 0.2rem;
      width: 100%;
      border-radius: 0.05rem;
      span {
        // vertical-align: middle;
        letter-spacing: 0.04rem;
      }
      p {
        margin: 0.16rem 0 0 0.3rem;
        color: #fff; //62D3FD
        font-size: 0.16rem;
        line-height: 0.22rem;
        letter-spacing: 0.04rem;
      }
      .o_title {
        position: relative;
        margin: 0 auto;
        padding-left: 0.1rem;
        width: 4.38rem;
        height: 0.34rem;
        border-bottom: #fff solid 0.01rem;
        font-size: 0.18rem;
      }
      .s_ico {
        display: inline-block;
        width: 0.26rem;
        height: 0.26rem;
        vertical-align: middle;
      }
      .s_online {
        background: url("../../assets/img/icon/wifi_green.png") no-repeat
          center/contain;
      }
      .s_offline {
        background: url("../../assets/img/icon/error_yellow.png") no-repeat
          center/contain;
      }
      .temp_nodata {
        color: #ccc;
        padding-top: 1.5rem;
        text-align: center;
      }
      .temp_box {
        padding: 0.2rem 0 0 0.2rem;
        width: 100%;
        div {
          float: left;
        }
        .temp_bar_box {
          overflow: hidden;
          padding: 0.26rem 0 0 0.1rem;
          width: 1.5rem;
          height: 1.6rem;
          .temp_bar {
            position: relative;
            width: 1.48rem;
            height: 1.28rem;
            background: url("../../assets/img/temp_bar.png") no-repeat 0 0 /
              cover;
            .temp_cir {
              position: absolute;
              left: 0;
              right: 0;
              bottom: 0.16rem;
              margin: 0 auto;
              width: 0.26rem;
              height: 0.26rem;
              border-radius: 50%;
              background-color: yellow;
            }
            .temp_rod {
              position: absolute;
              left: 0;
              right: 0;
              bottom: 0.36rem;
              margin: 0 auto;
              width: 0.08rem;
              height: 0.6rem;
              border-radius: 0.05rem 0.05rem 0 0;
              background-color: yellow;
            }
          }
        }
        .air_pm25 {
          padding: 0.2rem 0 0 0.1rem;
          width: 1.6rem;
          height: 0.6rem;
          p {
            margin: 0;
            color: #00fff1;
          }
        }
        .air_quality {
          padding: 0.26rem 0 0 0.1rem;
          height: 0.6rem;
          font-size: 0.3rem;
          span {
            vertical-align: bottom;
          }
        }
        .air_quality202 {
          margin: 0.2rem 0 0.1rem 24%;
          height: 0.6rem;
          font-size: 0.5rem;
          span {
            vertical-align: bottom;
          }
        }
        .temp_num {
          padding: 0.22rem 0 0 0.16rem;
          color: #00fef5;
          font-size: 0.58rem;
        }
      }
      .air_para {
        margin: 0.16rem auto 0;
        width: 90%;
        font-size: 0.18rem;
        line-height: 0.45rem;
        div {
          width: 50%;
          float: left;
          span {
            // vertical-align: middle;
            letter-spacing: 0.01rem;
          }
          span:nth-child(1) {
            font-size: 0.16rem;
            vertical-align: baseline;
          }
        }
        div.ap_item {
          margin-top: 0.2rem;
        }
      }
      .myEchart_box {
        margin: 0.2rem auto;
        width: 90%;
        height: 2rem;
        background-color: transparent;
        border-radius: 0.05rem;
      }
    }
  }
}
</style>