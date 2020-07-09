<template>
  <div class="alarmView">
    <div class="content-left">
      <!-- 基础设施 LED屏 设备概览 设备状态 -->
      <div class="o_box">
        <div class="box-title">
          <span class="icons color-huang">&#xe62a;</span>
          <span>设备状态</span>
        </div>
        <div class="group">
          <div class="group1 clearfix">
            <div class="groupalgin color-huang">
              <span class="icons ledfontsize">&#xe618;</span>
              <span class="mleft">设备总数</span>
              <span class="dl_num">{{wsData.total}}</span>
            </div>
          </div>
          <div class="group1 clearfix">
            <div class="groupalgin color-lv">
              <span class="icons ledfontsize">&#xe618;</span>
              <span class="mleft">在线数</span>
              <span class="dl_num" style="margin-left:0.2rem">{{wsData.online}}</span>
            </div>
            <div class="groupalgin iconleft color-hong">
              <span class="icons ledfontsize">&#xe618;</span>
              <span class="mleft">离线数</span>
              <span class="dl_num">{{wsData.offline}}</span>
            </div>
          </div>
        </div>
      </div>
      <!-- 基础设施 LED屏 设备概览 告警统计 折线图 -->
      <div class="o_box">
        <div class="box-title">
          <span class="icons color-huang">&#xe657;</span>
          <span>当日报警趋势</span>
        </div>
        <div class="la_nodata" v-if="!this.wsData.lightalarms.date.length">暂无告警信息</div>
        <div ref="myEchart" class="myEchart_box" v-if="this.wsData.lightalarms.date.length"></div>
      </div>
      <!-- 离线设备 -->
      <div class="o_box">
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
          <div class="alert_scroll sbar">
            <div class="as_nodata" v-if="!wsData.offlines.length">暂无离线设备</div>
            <ul class="scroll_ul" ref="sUl" v-if="wsData.offlines.length">
              <li class="scroll_li" v-for="(item,index) in wsData.offlines" :key="index">
                <span>{{item.name}}</span>
                <span>{{item.offlinetime}}</span>
                <span>
                  <i class="a_type">离线</i>
                </span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      wsData: {
        total: 34,
        online: 34563,
        offline: 343,
        offlines: [{ name: "sdfvsdf", offlinetime: "sdfgsdfgsd" }],
        lightalarms: {
          date: ["0808", "0809", "0810", "0811", "0812"],
          times: [40320, 40320, 45454, 65624, 57675],
          times2: [4032, 4032, 4545, 6562, 5767],
          order: [1, 2, 3, 4, 5]
        }
      },
      chartData: []
    };
  },
  mounted() {
    this.$nextTick(() => {
      //启动Echarts
      this.initChart();
    });
  },
  methods: {
    // 折线图 start
    initChart() {
      var self = this;
      if (this.$refs.myEchart) {
        if (this.chartData.length > 0) {
          if (
            this.chartData.sort().toString() ==
            this.wsData.lightalarms.date.sort().toString()
          ) {
            return false;
          }
        } else {
          this.chartData = this.wsData.lightalarms.date;
        }
        this.chart = this.$echarts.init(this.$refs.myEchart, "dark");
        this.chart.setOption({
          backgroundColor: "", //背景颜色透
              legend: {
        data:['咨询呼叫','紧急报警'],
  x: 'right'
    },
          xAxis: {
            type: "category",
            boundaryGap: false,
            data: this.wsData.lightalarms.date,
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
            top: "15%",
            left: "0%",
            right: "4%",
            bottom: "0%",
            containLabel: true
          },
          series: [
            {
              name:'咨询呼叫',
              data: this.wsData.lightalarms.times,
              type: "line",
              smooth: true,
              symbol: "emptyCircle", //拐点设置为实心
              symbolSize: 5, //拐点大小
              animation: true,
              itemStyle: {
                normal: {
                  color: "#37B329",
                  borderColor: "#37B329"
                },
                emphasis: {
                  color: "#37B329"
                }
              },
              lineStyle: {
                width: 3,
                color: "#37B329"
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
                      { offset: 0, color: "#37B329" },
                      { offset: 0.5, color: "#37b32961" },
                      { offset: 1, color: "#37b32914" }
                    ],
                    globalCoord: false
                  }
                }
              }
            },
            {
              name:'紧急报警',
              data: this.wsData.lightalarms.times2,
              type: "line",
              smooth: true,
              symbol: "emptyCircle", //拐点设置为实心
              symbolSize: 5, //拐点大小
              animation: true,
              itemStyle: {
                normal: {
                  color: "#F9B87C",
                  borderColor: "#F9B87C"
                },
                emphasis: {
                  color: "#F9B87C"
                }
              },
              lineStyle: {
                width: 3,
                color: "#F9B87C"
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
                      { offset: 0, color: "#F9B87C" },
                      { offset: 0.5, color: "#f9b87c82" },
                      { offset: 1, color: "#f9b87c2e" }
                    ],
                    globalCoord: false
                  }
                }
              }
            },
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
  }
};
</script>

<style lang="scss" scoped>
.content-left {
  padding-top: 1.2rem;
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
    .alert_scroll {
      position: relative;
      width: 100%;
      height: 2rem;

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

        li span {
          overflow: hidden;
          display: inline-block;
          padding-top: 0.12rem;
          height: 0.4rem;
          font-size: 0.14rem;
          text-align: center;
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
          padding-top: 0.01rem;
          width: 0.5rem;
          height: 0.22rem;
          background-color: red;
          border-radius: 0.11rem;
          color: #fff;
          font-size: 0.14rem;
          line-height: 0.22rem;
        }
      }
    }

    .ds_box {
      margin: 0 auto;
      width: 4.19rem;
      height: 7.35rem;
      // background: url("../../src/assets/img/ds_box_bg.png") no-repeat 0 0 / contain;
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
        }
        li span.ds_txt {
          padding-left: 0.4rem;
          width: 44%;
          text-align: left;
          i {
            vertical-align: middle;
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
        }
      }
    }
  }
}
</style>