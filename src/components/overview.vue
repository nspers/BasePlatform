<template>
  <div ref="overview">
    <div class="content-left trans-up trans-up-delay-3"></div>
    <div class="overview">
      <div class="wrapbox">
        <!-- 智慧照明 照明概览 设备状态 -->
        <div class="o_box trans-up trans-up-delay-3" v-if="$route.name === 'lightpole'">
          <div class="box-title">
            <span class="icons color-huang">&#xe62a;</span>
            <span>设备状态</span>
          </div>
          <div class="group">
            <div class="shebei-top">
              <div class="flex-wrap">
                <div class="light-wrap">
                  <div class="light-bg"></div>
                  <div class="icons-wrap">
                    <span class="icons">&#xe60d;</span>
                  </div>
                  <el-progress
                    class="light-svg"
                    type="circle"
                    :percentage="deviceObj.light"
                    :width="svgW"
                    color="yellow"
                  ></el-progress>
                </div>
                <div class="light-detail">
                  <!-- <p>{{deviceObj.light}}%</p> -->
                  <p>
                    <num :value="deviceObj.light"></num>%
                  </p>

                  <p>亮灯率</p>
                </div>
              </div>
              <div class="flex-wrap">
                <div class="light-wrap fl">
                  <div class="light-bg"></div>
                  <div class="icons-wrap">
                    <span class="icons">&#xe60d;</span>
                  </div>
                  <el-progress
                    class="light-svg"
                    type="circle"
                    :percentage="deviceObj.line"
                    :width="svgW"
                    color="yellow"
                  ></el-progress>
                </div>
                <div class="light-detail fl">
                  <!-- <p>{{deviceObj.line}}%</p> -->
                  <p>
                    <num :value="deviceObj.line"></num>%
                  </p>

                  <p>在线率</p>
                </div>
              </div>
            </div>
            <div class="deng-wrap clearfix deng-font">
              <div class="deng-list">
                <!--                                <span class="icons">&#xe613;</span>-->
                <i class="light1"></i>
                <span>单灯数</span>
                <!-- <span>{{wsData.total}}</span> -->
                <num :value="wsData.total"></num>
              </div>
              <div class="deng-list color-lv">
                <!--                                <span class="icons">&#xe61d;</span>-->
                <i class="light2"></i>
                <span>亮灯数</span>
                <!-- <span>{{wsData.onnum}}</span> -->
                <num :value="wsData.onnum"></num>
              </div>
              <div class="deng-list color-huang">
                <!--                                <span class="icons">&#xe61d;</span>-->
                <i class="light3"></i>
                <span>熄灯数</span>
                <!-- <span>{{wsData.offnum}}</span> -->
                <num :value="wsData.offnum"></num>
              </div>
              <div class="deng-list color-hong">
                <!--                                <span class="icons">&#xe61d;</span>-->
                <i class="light4"></i>
                <span>离线数</span>
                <!-- <span>{{wsData.errornum}}</span> -->
                <num :value="wsData.errornum"></num>
              </div>
            </div>
          </div>
        </div>
        <!-- 环境市政 设备概览 设备状态 -->
        <div class="o_box trans-up trans-up-delay-3" v-if="$route.name === 'environment' && tagName === 'ov'">
          <div class="box-title">
            <span class="icons color-huang">&#xe62a;</span>
            <span>设备状态</span>
          </div>
          <div class="group">
            <div class="group1 clearfix">
              <div class="groupalgin">
                <span class="t_ico t_evm_w"></span>
                <span class="mleft">设备总数</span>
                <!-- <span class="dl_num">{{wsData.total}}</span> -->
                <span class="dl_num">
                  <num :value="wsData.total"></num>
                </span>
              </div>
            </div>
            <div class="group1 clearfix">
              <div class="groupalgin color-lv">
                <span class="t_ico t_evm_g"></span>
                <span class="mleft">在线数</span>
                <!-- <span class="dl_num" style="margin-left:0.2rem">{{wsData.online}}</span> -->
                <span class="dl_num" style="margin-left:0.2rem">
                  <num :value="wsData.online"></num>
                </span>
              </div>
              <div class="groupalgin iconleft color-huang">
                <span class="t_ico t_evm_o"></span>
                <span class="mleft">离线数</span>
                <!-- <span class="dl_num">{{wsData.offline}}</span> -->
                <span class="dl_num">
                  <num :value="wsData.offline"></num>
                </span>
              </div>
            </div>
          </div>
        </div>
        <!-- 环境市政 设备概览 天气监测 -->
        <div class="o_box trans-up trans-up-delay-5" v-if="$route.name === 'environment' && tagName === 'ov'">
          <div class="box-title">
            <span class="icons color-huang">&#xe778;</span>
            <span>环境监测</span>
          </div>
          <div>
            <div class="temp_box clearfix">
              <div class="temp_num">
                <Ther />
                <!-- <span>{{wsData.ringtemperature}}°C</span> -->
                <span>
                  <num :value="wsData.ringtemperature"></num>°C
                </span>
              </div>
              <div class="air_quality">
                <!--                            <span class="icons color-lv">&#xe6f7;</span>-->
                <Good></Good>
                <span>{{wsData.airquality}}</span>
              </div>
            </div>
            <div class="air_para clearfix">
              <div class="color-lv">
                <!--                            <span class="icons">&#xe601;</span>-->
                <Water style="width: .5rem;"></Water>
                <!-- <span>湿度 {{wsData.ringwetting}}%</span> -->
                <span>
                  湿度
                  <num :value="wsData.ringwetting"></num>%
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
              <div class="color-cheng">
                <!--                            <span class="icons">&#xe625;</span>-->
                <Qiya style="width: .5rem;"></Qiya>
                <!-- <span>气压 {{wsData.pressure}}Pa</span> -->
                <!-- <span>气压 {{wsData.pressure}}Pa</span> -->
                <span>
                  气压
                  <num :value="wsData.pressure"></num>Pa
                </span>
              </div>
              <div class="color-huang">
                <!--                            <span class="icons">&#xe604;</span>-->
                <Wind style="width: .5rem;"></Wind>
                <!-- <span>风速 {{wsData.windspeed}}m/s</span> -->
                <span>
                  风力
                  <num :value="wsData.windspeed"></num>级
                </span>
              </div>
              <div class="color-lan">
                <!--                            <span class="icons">&#xe631;</span>-->
                <Pm25 style="width: .5rem;"></Pm25>
                <!-- <span>PM2.5 {{wsData.pmtwopointfive}}μg/m³</span> -->

                <span>
                  PM2.5
                  <num :value="wsData.pmtwopointfive"></num>μg/m³
                </span>
              </div>
              <div class="color-hong">
                <!--                            <span class="icons">&#xe742;</span>-->
                <Sound style="width: .5rem;"></Sound>
                <!-- <span>噪声 {{wsData.noise}}db</span> -->
                <span>
                  噪声
                  <num :value="wsData.noise"></num>db
                </span>
              </div>
              <div class="color-lan-62d">
                <!--                            <span class="icons">&#xe631;</span>-->
                <Pm10 style="width: .5rem;"></Pm10>
                <!-- <span>PM10 {{wsData.pmten}}μg/m³</span> -->
                <span>
                  PM10
                  <num :value="wsData.pmten"></num>μg/m³
                </span>
              </div>
            </div>
          </div>
        </div>
        <!-- 环境市政 设备概览 设备状态列表 -->
        <div class="o_box obox_h100p trans-up trans-up-delay-3" v-if="$route.name === 'environment' && tagName === 'ds'">
          <div class="box-title">
            <span class="icons color-huang">&#xe62a;</span>
            <span>设备状态</span>
          </div>
          <div class="ds_box">
            <div class="ds_title">
              <span>设备名称</span>
              <span>设备型号</span>
              <span>状态</span>
            </div>
            <div class="ds_scroll sbar">
              <div class="ds_nodata" v-if="!wsData.devStateList.length">设备状态获取中...</div>
              <ul class="scroll_ul" ref="sUl" v-if="wsData.devStateList.length">
                <li
                  class="scroll_li"
                  v-for="(item,index) in wsData.devStateList"
                  :key="index"
                  @click="dsClick(item.lamppostid)"
                >
                  <span class="ds_txt">
                    <i></i>
                    <i>{{item.name}}</i>
                  </span>
                  <span class="ds_type">
                    <i>{{item.type}}</i>
                  </span>
                  <span class="ds_ico">
                    <i class="ico_online" v-if="item.state"></i>
                    <i class="ico_offline" v-else></i>
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <!-- 基础设施 LED屏 设备概览 设备状态 -->
        <div class="o_box trans-up trans-up-delay-3" v-if="$route.name === 'led'">
          <div class="box-title">
            <span class="icons color-huang">&#xe62a;</span>
            <span>设备状态</span>
          </div>
          <div class="group">
            <div class="group1 clearfix">
              <div class="groupalgin">
                <span class="t_ico t_led_w"></span>
                <span class="mleft">设备总数</span>
                <!-- <span class="dl_num">{{wsData.total}}</span> -->
                <span class="dl_num">
                  <num :value="wsData.total"></num>
                </span>
              </div>
            </div>
            <div class="group1 clearfix">
              <div class="groupalgin color-lv">
                <span class="t_ico t_led_g"></span>
                <span class="mleft">在线数</span>
                <!-- <span class="dl_num" style="margin-left:0.2rem">{{wsData.online}}</span> -->
                <span class="dl_num" style="margin-left:0.2rem">
                  <num :value="wsData.online"></num>
                </span>
              </div>
              <div class="groupalgin iconleft color-huang">
                <span class="t_ico t_led_o"></span>
                <span class="mleft">离线数</span>
                <!-- <span class="dl_num">{{wsData.offline}}</span> -->
                <span class="dl_num">
                  <num :value="wsData.offline"></num>
                </span>
              </div>
            </div>
          </div>
        </div>
        <!-- 基础设施 LED屏 设备概览 告警统计 折线图 -->
        <div class="o_box trans-up trans-up-delay-5" v-if="$route.name === 'led'">
          <div class="box-title">
            <span class="icons color-huang">&#xe657;</span>
            <span>告警统计</span>
          </div>
          <div class="la_nodata" v-if="!this.wsData.alarms.date.length">暂无告警信息</div>
          <div ref="myEchart" class="myEchart_box" v-if="this.wsData.alarms.date.length"></div>
        </div>
        <!-- 离线设备 -->
        <div class="o_box trans-up trans-up-delay-7" v-if="tagName !== 'ds'">
          <div class="box-title">
            <span class="icons color-huang">&#xe779;</span>
            <span>离线设备</span>
          </div>
          <div class="alog_box">
            <div class="ab_title">
              <span>设备名称</span>
              <span>离线时间</span>
              <span>状态</span>
            </div>
            <div
              class="alert_scroll sbar"
              :class="absHeight"
            >
              <div class="as_nodata" v-if="!wsData.offlines.length">暂无离线设备</div>
              <ul class="scroll_ul" ref="sUl" v-if="wsData.offlines.length">
                <li class="scroll_li" v-for="(item,index) in wsData.offlines" :key="index" @click="dsClick(item.lamppostid)">
                  <span>{{item.name}}</span>
                  <span>{{item.offlinetime}}</span>
                  <span>
                    <i class="a_type"></i>
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from "vue";
import Ther from "../icon/thermometer";

import num from "./number";
import * as mapWork from "../map3d/work";
export default {
  name: "overview",
  data() {
    return {
      tagName: "ov",
      msgCode: 0,
      msgCode2: 0,
      abScrollH: 0,
      abHeight: 0,
      absHeight: '',
      eLoading: 1,
      scrollSwitch: 1,
      wsData: {
        currentmonth: "",
        lastmonth: "",
        thisyear: "",
        oncount: "",
        offcount: "",
        total: 0,
        online: 0,
        offline: 0,
        pmten: 0,
        pmtwopointfive: 0,
        airquality: "优",
        pressure: 0,
        rainfall: 0,
        ringtemperature: 0,
        ringwetting: 0,
        winddirection: 0,
        windspeed: 0,
        noise: 0,
        onnum: 0,
        offnum: 0,
        errornum: 0,
        alarms: {
          date: [],
          times: [],
          order: []
        },
        offlines: [], //离线设备
        devStateList: []
      },
      svgW: 100,
      deviceObj: {
        light: 0,
        line: 0
      },
      chart: null,
      chartData: []
    };
  },
  created() {
    this.svgW = (80 / 1920) * window.innerWidth;
    //判断当前页对应的 msgcode
    switch (this.$route.path) {
      case "/lightpole":
        this.msgCode = 220003;
        this.msgCode2 = 220004;
        this.absHeight = 'as_height3';
        break;
      case "/led":
        this.msgCode = 230013;
        this.msgCode2 = 230014;
        this.absHeight = 'as_height1';
        break;
      case "/environment":
        this.msgCode1 = 240001;
        this.msgCode = 240002;
        this.msgCode2 = 240003;
        this.absHeight = 'as_height2';
        break;
      default:
        break;
    }
  },
  components: {
    num,Ther
  },
  watch: {
    getWsData(nowval, oldval) {
      // console.log(nowval, oldval);
    }
  },
  computed: {
    //vuex
    getWsData() {
      this.tagName = this.$store.state.loctionName;
      if (this.$store.state.websocket.hasOwnProperty(this.msgCode)) {
        this.eLoading = 0;
        const wsMsg = this.$store.state.websocket[this.msgCode].msg;
        this.deviceObj.light = Math.round(wsMsg.lightrate*10)/10; //亮灯率
        this.deviceObj.line = Math.round(wsMsg.onlinerate*10)/10; //在线率
        this.wsData.total = wsMsg.total; //灯杆(其他)总数
        this.wsData.onnum = wsMsg.onnum; //亮灯数
        this.wsData.offnum = wsMsg.offnum; //熄灯数
        this.wsData.errornum = wsMsg.errornum; //故障数
        this.wsData.online = wsMsg.online;
        this.wsData.offline = wsMsg.offline;
        this.wsData.pmten = parseInt(wsMsg.pmten);
        this.wsData.pmtwopointfive = parseInt(wsMsg.pmtwopointfive);
        this.wsData.pressure = wsMsg.pressure;
        this.wsData.rainfall = wsMsg.rainfall;
        this.wsData.ringtemperature = wsMsg.ringtemperature;
        this.wsData.ringwetting = wsMsg.ringwetting;
        this.wsData.winddirection = Vue.prototype.$degree2Direction(wsMsg.winddirection);
        this.wsData.windspeed = Vue.prototype.$metres2Grade(wsMsg.windspeed);
        this.wsData.noise = wsMsg.noise;
        //告警统计折线图
        if (wsMsg.hasOwnProperty("ledalarms")) {
          this.wsData.alarms.date = [];
          this.wsData.alarms.times = [];
          this.wsData.alarms.order = [];
          for (let item of wsMsg.ledalarms) {
            this.wsData.alarms.date.push(item.date);
            this.wsData.alarms.times.push(item.times);
            this.wsData.alarms.order.push(item.order);
          }
          //启动Echarts
          this.initChart();
        }
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
      //离线设备
      if (this.$store.state.websocket.hasOwnProperty(this.msgCode2)) {
        this.eLoading = 0;
        const wsMsg = this.$store.state.websocket[this.msgCode2].msg;
        this.wsData.offlines = wsMsg.offlines;
      }
      //设备状态
      if (this.$store.state.websocket.hasOwnProperty(this.msgCode1)) {
        this.eLoading = 0;
        this.wsData.devStateList = [];
        const wsMsg = this.$store.state.websocket[this.msgCode1].msg.frt;
        for (let item of wsMsg) {
          if (item.type === 202) {
            this.wsData.devStateList.unshift(item);
          } else if (item.type === 305) {
            this.wsData.devStateList.push(item);
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
          light: this.deviceObj.light,
          line: this.deviceObj.line
        };
      }, 1000);
      //启动Echarts
      this.initChart();
    });
  },
  methods: {
    dsClick(lId) {
      this.$sdClick(lId,this.$route.name,'overview')
      // let sMapPoint = JSON.parse(sessionStorage.environment) || [];
      // for (let item of sMapPoint) {
      //   if (lId === item.lamppostid) {
      //     mapWork.locationByJWD({
      //       jd: item.longitude,
      //       wd: item.latitude,
      //       gd: 30,
      //       cameraHeight: 60,
      //       heading: 25,
      //       pitch: -45,
      //       duration: 1
      //     });
      //     this.leave();
      //     setTimeout(() => {
      //       Vue.prototype.workCover.updateSelById(lId);
      //       $("." + lId)
      //         .stop()
      //         .animate({ marginTop: "-150px" });
      //       this.$store.state.selectId = lId;
      //       this.$store.state.selectBoolean = "isSelect";
      //       this.$store.dispatch("setLoctionName", "sd");
      //       this.$store.dispatch("setLoctionId", lId);
      //     }, 600);
      //   }
      // }
    },
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
    ovOutIn() {
      this.leave();
      setTimeout(() => {
        this.entry();
      }, 800);
    },
    // 折线图 start
    initChart() {
      var self = this;
      if (this.$refs.myEchart) {
        if (this.chartData.length > 0) {
          if (
            this.chartData.sort().toString() ==
            this.wsData.alarms.date.sort().toString()
          ) {
            return false;
          }
        } else {
          this.chartData = this.wsData.alarms.date;
        }
        this.chart = this.$echarts.init(this.$refs.myEchart, "dark");
        this.chart.setOption({
          backgroundColor: "", //背景颜色透
          xAxis: {
            type: "category",
            boundaryGap: false,
            data: this.wsData.alarms.date,
            splitLine: {
              show: true,
              lineStyle: {
                color: ["#cccccc30"],
                width: 1,
                type: "solid"
              }
            },
            axisLine: {
              lineStyle: {
                color: "#cccccc30"
              }
            }
          },
          yAxis: {
            type: "value",
            splitLine: {
              show: true,
              lineStyle: {
                color: ["#cccccc30"],
                width: 1,
                type: "solid"
              }
            },
            axisLine: {
              lineStyle: {
                color: "#cccccc30"
              }
            }
          },
          grid: {
            top: "6%",
            left: "0%",
            right: "6%",
            bottom: "5%",
            containLabel: true
          },
          tooltip: {
            show: true,
            trigger: "axis",
            axisPointer: {
              type: "shadow",
              axis: "auto",
              snap: true
            }
          },
          series: [
            {
              data: this.wsData.alarms.times,
              type: "line",
              smooth: true,
              symbol: "emptyCircle", //拐点设置为实心
              symbolSize: 5, //拐点大小
              animation: true,
              itemStyle: {
                normal: {
                  color: "#00DED4",
                  borderColor: "#275ECD"
                },
                emphasis: {
                  color: "#00DED4"
                }
              },
              lineStyle: {
                width: 3,
                color: "#00DED4"
              },
              areaStyle: {
                normal: {
                  color: {
                    type: "linear",
                    x: 0,
                    y: 0,
                    x2: 0,
                    y2: 1,
                    colorStops: [
                      { offset: 0, color: "#00DED4" },
                      { offset: 0.5, color: "#00DED450" },
                      { offset: 1, color: "#000F2900" }
                    ],
                    globalCoord: false
                  }
                }
              }
            }
          ]
        });
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.dl_num {
  margin-left: 0.1rem;
}
.mleft {
  margin-left: 0.2rem;
  letter-spacing: 0.02rem;
}
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
    .obox_h100p {
      height: 100%;
    }
    .o_box {
      position: relative;
      margin-bottom: 0.2rem;
      width: 100%;
      border-radius: 0.05rem;
      .group {
        display: flex;
        flex-direction: column;
        width: 92%;
        margin-left: 5%;
        font-size: 0.16rem;
        .group1 {
          display: flex;
          flex: 1;
          margin-top: 0.2rem;
          .groupalgin {
            display: flex;
            align-items: center;
            .fontsize {
              font-size: 0.4rem !important;
            }
            .ledfontsize {
              font-size: 0.5rem !important;
            }
          }
          .iconleft {
            margin-left: 0.6rem;
          }
          .t_ico {
            width: 0.4rem;
            height: 0.3rem;
          }
          .t_evm_g {
            background: url("../assets/img/overview/t_evm_g.png") no-repeat
              center/contain;
          }
          .t_evm_o {
            background: url("../assets/img/overview/t_evm_o.png") no-repeat
              center/contain;
          }
          .t_evm_w {
            background: url("../assets/img/overview/t_evm_w.png") no-repeat
              center/contain;
          }
          .t_led_g {
            background: url("../assets/img/overview/t_led_g.png") no-repeat
              center/contain;
          }
          .t_led_o {
            background: url("../assets/img/overview/t_led_o.png") no-repeat
              center/contain;
          }
          .t_led_w {
            background: url("../assets/img/overview/t_led_w.png") no-repeat
              center/contain;
          }
        }
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
      .o_kwh {
        float: right;
        margin-right: 0.1rem;
      }
      .group3 {
        margin: 0 auto;
        width: 88%;
      }
      .g_item1,
      .g_item2 {
        margin-top: 0.16rem;
        float: left;
        text-align: center;
        .cir1,
        .cir2,
        .cir3 {
          display: inline-block;
          width: 0.6rem;
          height: 0.6rem;
          border-radius: 50%;
          font-size: 0.12rem;
          line-height: 0.55rem;
        }
        .cir1 {
          border: 0.04rem solid deepskyblue;
        }
        .cir2 {
          border: 0.04rem solid lawngreen;
        }
        .cir3 {
          border: 0.04rem solid lightseagreen;
        }
        .g_text {
          line-height: 0.4rem;
        }
      }
      .g_item1 {
        width: 50%;
      }
      .g_item2 {
        width: 33%;
      }
      .g_item3 {
        margin-top: 0.2rem;
        font-size: 0.12rem;
        span {
          vertical-align: middle;
          line-height: 0.6rem;
        }
      }
      .g_ul {
        li {
          float: left;
          padding-top: 0.1rem;
          width: 50%;
          font-size: 0.12rem;
          span {
            vertical-align: middle;
            line-height: 0.6rem;
          }
          .dl_num {
            margin-left: 0.16rem;
          }
        }
      }
      .g_tag1 {
        display: inline-block;
        margin: 0.1rem 0;
        padding-top: 0.07rem;
        width: 0.8rem;
        height: 0.26rem;
        background-color: lightseagreen;
        border-radius: 0.04rem;
        font-size: 0.12rem;
        line-height: 0.14rem;
        text-align: center;
      }
      .t_ul {
        li {
          float: left;
          margin: 0.1rem 0;
          width: 33%;
          p {
            line-height: 0.24rem;
            text-align: center;
            span {
              vertical-align: middle;
            }
          }
        }
      }
      .t_num {
        margin: 0 0.1rem 0 0.4rem;
        font-size: 0.36rem;
        line-height: 0.5rem;
        vertical-align: top;
      }
      .t_unit {
        margin-right: 0.4rem;
        font-size: 0.2rem;
        vertical-align: top;
        line-height: 0.4rem;
      }
      .t_text1 {
        margin-bottom: 0.08rem;
        font-size: 0.2rem;
        line-height: 0.5rem;
        vertical-align: middle;
      }
      .tmp_icon {
        display: inline-block;
        margin: 0 0.16rem;
        width: 0.5rem;
        height: 0.5rem;
        background-color: rgba(255, 255, 255, 0.3);
        border-radius: 0.05rem;
        vertical-align: middle;
        font-size: 0.12rem;
        text-align: center;
        line-height: 0.5rem;
      }
      .tmp_icon_s {
        display: inline-block;
        margin-right: 0.04rem;
        width: 0.24rem;
        height: 0.24rem;
        background-color: rgba(255, 255, 255, 0.3);
        border-radius: 0.03rem;
        vertical-align: middle;
        font-size: 0.12rem;
        text-align: center;
        line-height: 0.24rem;
      }
      .temp_box {
        text-align: center;
        width: 100%;
        padding:.2rem 0 0 0;
        .temp_num {
          margin: 0 .2rem;
          display: inline-block;
          vertical-align: middle;
          color: #00fef5;
          font-size: 0.5rem;
          span:nth-child(1) {
            font-size: 0.5rem;
          }
        }
        .air_quality {
          margin: 0 .5rem;
          display: inline-block;
          vertical-align: middle;
          font-size: 0.45rem;
        }
        div,span{
            vertical-align: middle;
        }
        .icon{
            display: inline-flex;
        }
      }
      .air_para {
        margin: 0.12rem auto 0;
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
        }
      }

      .myEchart_box {
        margin: 0.2rem auto;
        width: 90%;
        height: 2rem;
        background-color: transparent;
        border-radius: 0.05rem;
      }
      .la_nodata {
        margin: 0.2rem auto;
        width: 90%;
        height: 2rem;
        color: #ccc;
        font-size: 0.16rem;
        line-height: 2rem;
        text-align: center;
      }
      .alog_box {
        margin: 0 auto;
        width: 90%;
        font-size: 0;
      }
      .ab_title {
        margin-top: 0.16rem;
        width: 100%;
        height: 0.4rem;
        background: linear-gradient(
          to right,
          rgba(66, 85, 144, 0.8),
          rgba(66, 85, 144, 0.1)
        );
        span {
          display: inline-block;
          font-size: 0.16rem;
          line-height: 0.4rem;
          text-align: center;
          box-sizing: border-box;
        }
        span:nth-child(1) {
          padding-left: 0.2rem;
          width: 1.3rem;
          text-align: left;
        }
        span:nth-child(2) {
          width: 2rem;
        }
        span:nth-child(3) {
          width: 0.9rem;
        }
      }
      .as_height1 {
        height: calc(100vh - 7rem);
      }
      .as_height2 {
        height: calc(100vh - 7.7rem);
      }
      .as_height3 {
        height: calc(100vh - 5.2rem);
      }
      .alert_scroll {
        position: relative;
        width: 100%;
        min-height: 1.6rem;
        .as_nodata {
          width: 100%;
          height: 100%;
          font-size: 0.16rem;
          color: #ccc;
          line-height: 2rem;
          text-align: center;
        }
        .scroll_ul {
          position: absolute;
          .scroll_li{
            cursor: pointer;
          }
          .scroll_li:hover{
            background-color: rgba(255,255,255,.2);
          }
          li span {
            overflow: hidden;
            display: inline-block;
            padding-top: 0.12rem;
            height: 0.4rem;
            font-size: 0.14rem;
            text-align: center;
            box-sizing: border-box;
          }
          li span:nth-child(1) {
            padding-left: 0.3rem;
            width: 1.3rem;
            text-align: left;
          }
          li span:nth-child(2) {
            width: 2rem;
          }
          li span:nth-child(3) {
            width: 0.9rem;
          }
          li .a_type {
            display: inline-block;
            width: 0.2rem;
            height: 0.2rem;
            background: url("../assets/img/icon/error_yellow.png") no-repeat center/contain;
            vertical-align: middle;
          }
        }
      }
      .ds_box {
        margin: 0 auto;
        width: 4.19rem;
        height: 7.35rem;
        background: url("../../src/assets/img/ds_box_bg.png") no-repeat 0 0 /
          contain;
        font-size: 0;
      }
      .ds_title {
        margin-top: 0.16rem;
        padding-top: 0.24rem;
        width: 100%;
        height: 0.7rem;
        /*background: linear-gradient(to right,rgba(66, 85, 144, 0.8),rgba(66, 85, 144, 0.1));*/
        span {
          display: inline-block;
          font-size: 0.16rem;
          line-height: 0.4rem;
          text-align: center;
        }
        span:nth-child(1) {
          width: 44%;
        }
        span:nth-child(2) {
          width: 28%;
        }
        span:nth-child(3) {
          width: 28%;
        }
      }
      .ds_scroll {
        position: relative;
        margin-left: 1%;
        width: 98%;
        height: calc(100% - 0.76rem);
        .ds_nodata {
          width: 100%;
          height: 100%;
          font-size: 0.16rem;
          color: #ccc;
          line-height: 2rem;
          text-align: center;
        }
        .scroll_ul {
          position: absolute;
          width: 100%;
          height: 100%;
          li {
            overflow: hidden;
            height: 0.5rem;
            line-height: 0.5rem;
            cursor: pointer;
          }
          li:hover,
          li:nth-child(odd):hover {
            background-color: rgba(255, 255, 255, 0.2);
          }
          li:nth-child(odd) {
            background-color: rgba(0, 0, 0, 0.2);
          }
          li span {
            overflow: hidden;
            display: inline-block;
            font-size: 0.14rem;
            text-align: center;
            vertical-align: middle;
            box-sizing: border-box;
          }
          li span:nth-child(1) {
            padding-left: 0.3rem;
            width: 1.3rem;
            text-align: left;
          }
          li span.ds_txt {
            padding-left: 0.4rem;
            width: 44%;
            text-align: left;
            i {
              vertical-align: middle;
            }
            i:nth-child(1) {
              display: inline-block;
              width: 0.16rem;
              height: 0.26rem;
              background: url("../assets/img/overview/t_evm_w.png") no-repeat
                center/contain;
            }
            i:nth-child(2) {
              display: inline-block;
              margin-left: 0.08rem;
              padding: 0.01rem 0.08rem 0;
              height: 0.26rem;
              border-radius: 0.03rem;
              background-color: #405082;
              line-height: 0.26rem;
            }
          }
          li span.ds_type {
            width: 28%;
          }
          li span.ds_ico {
            width: 28%;
            i {
              display: inline-block;
              width: 0.26rem;
              height: 0.26rem;
              vertical-align: middle;
            }
            i.ico_online {
              background: url("../assets/img/icon/wifi_green.png") no-repeat
                center/contain;
            }
            i.ico_offline {
              background: url("../assets/img/icon/error_yellow.png") no-repeat
                center/contain;
            }
          }
        }
      }
    }
  }
}
.list-wrap {
  padding-left: 0.2rem;
}
.list-wrap {
  display: flex;
  align-items: center;
  font-size: 0.18rem;
  span {
    flex: 1;
  }
}
.list-wrap-text {
  position: relative;
  top: 0.05rem;
}
.mar-top {
  margin-top: 0.1rem;
}
.shebei-top {
  margin-left: -0.2rem;
  display: flex;
  align-items: center;
  justify-content: space-around;
  height: 1rem;
}
.flex-wrap {
  display: flex;
  align-items: center;
  justify-content: space-around;
  min-width: 1.8rem;
  .light-wrap {
    position: relative;
    width: 0.7rem;
    height: 0.7rem;
    .light-bg {
      width: 0.6rem;
      height: 0.6rem;
      background: url("~@/assets/img/light@2x.png") center/contain no-repeat;
      position: absolute;
      left: 0.05rem;
      top: 0.05rem;
    }
    .icons-wrap {
      width: 0.7rem;
      height: 0.7rem;
      transform: rotate(180deg);
      display: flex;
      align-items: center;
      justify-content: center;
      & > .icons {
        font-size: 0.35rem;
        color: yellow;
      }
    }
    .light-svg {
      display: block;
      position: absolute;
      top: -0.05rem;
      left: -0.05rem;
    }
  }
  .light-detail {
    width: 0.76rem;
    display: flex;
    flex-direction: column;
    p {
      height: 100%;
      text-align: center;
      &:nth-child(1) {
        font-size: 0.18rem;
        color: #00fff4;
      }
      &:nth-child(2) {
        width: 100%;
        height: 0.3rem;
        line-height: 0.3rem;
        color: #fff;
        font-size: 0.14rem;
        border-top: 1px solid #00fff4;
        background: linear-gradient(
          to bottom,
          rgba(10, 34, 142, 0.3),
          rgba(40, 80, 212, 0.7)
        );
      }
    }
  }
}
.deng-wrap {
  font-size: 0.16rem;
}
.deng-list {
  display: inline-block;
  float: left;
  margin: 0.2rem 5% 0;
  width: 40%;
  i {
    display: inline-block;
    margin-right: 0.1rem;
    width: 0.4rem;
    height: 0.3rem;
    vertical-align: middle;
  }
  .light1 {
    background: url("../assets/img/overview/light_w.png") no-repeat
      center/contain;
  }
  .light2 {
    background: url("../assets/img/overview/light_g.png") no-repeat
      center/contain;
  }
  .light3 {
    background: url("../assets/img/overview/light_o.png") no-repeat
      center/contain;
  }
  .light4 {
    background: url("../assets/img/overview/light_r.png") no-repeat
      center/contain;
  }
  span {
    vertical-align: middle;
  }
}
.deng-font .icons {
  font-size: 0.5rem;
}
.nenghao-list {
  width: 1.29rem;
  height: 100%;
  display: flex;
  align-items: center;
  .nenghao-icon {
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    width: 0.6rem;
    & > .icons {
      position: absolute;
      font-size: 0.2rem;
    }
    & > .nenghao-bg-nei {
      position: absolute;
      width: 0.6rem;
      height: 0.6rem;
      background: url("~@/assets/img/nenghao_bg_zhuan.png") center/contain
        no-repeat;
      animation: draw 5s linear infinite;
    }
    & > .nenghao-bg-wai {
      position: absolute;
      width: 0.54rem;
      height: 0.54rem;
      background: url("~@/assets/img/nenghao_bg.png") center/contain no-repeat;
      animation: draw 20s linear infinite;
    }
  }
  .light-detail {
    position: relative;
    top: -0.1rem;
    left: -0.03rem;
    z-index: -1;
  }
}
@keyframes draw {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}
@-webkit-keyframes draw {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}
</style>