
<template>
  <div class="analysis" ref="analysis">
    <div class="monitor-bar">
      <div class="sbarBox-main">
        <div class="sbarBox">
          <span class="active"></span>
          <span class="sbar" @click="jump('analysis')">环境分析</span>
          <span class="sbar now">告警分析</span>
          <span class="sbar" @click="jump('lightingAnalysis')">照明统计</span>
        </div>
      </div>
    </div>
    <div class="row trans-left trans-left-delay-3">
      <div class="col1">
        <div class="header sbsszxl">
          <h3>设备在线率</h3>
        </div>
        <div class="pies charts">
          <div class="pie1">
            <div ref="hjjcPieChart"></div>
            <label>环境监测</label>
          </div>
          <div class="pie2">
            <div ref="LEDPieChart"></div>
            <label>LED屏</label>
          </div>
        </div>
      </div>
      <div class="col2">
        <div class="header sblxsjtj">
          <h3>设备离线事件统计</h3>
        </div>
        <div class="options">
          <div class="buttons">
            <div
              v-for="(item,index) in monthOpt"
              :key="index"
              v-on:click="sblxsjtjToggleChart(index)"
              v-bind:class="{selected:index===sblxsjtjMonthOptIndex}"
            >{{item.text}}</div>
          </div>

          <div class="y-form">
            <el-date-picker
              type="month"
              :clearable="false"
              value-format="yyyy-MM"
              size="mini"
              placeholder="请选择"
              v-model="sblxsjtjStartTime"
              :picker-options="pickerOptions"
            ></el-date-picker>
          </div>
        </div>
        <div class="charts" ref="sblxsjtjChart"></div>
      </div>
    </div>
    <div class="header gjsjtj trans-left trans-left-delay-5">
      <h3>告警统计</h3>
    </div>
    <div class="row trans-left trans-left-delay-5">
      <div class="col1" ref="gjsjtjPieChart"></div>
      <div class="col2">
        <div class="options" style="transform: translateY(-0.8rem);">
          <div class="buttons">
            <div
              v-for="(item,index) in monthOpt"
              :key="index"
              v-on:click="gjsjtjToggleChart(index)"
              v-bind:class="{selected:index===gjsjtjMonthOptIndex}"
            >{{item.text}}</div>
          </div>

          <div class="y-form">
            <el-date-picker
              type="month"
              :clearable="false"
              value-format="yyyy-MM"
              size="mini"
              placeholder="请选择"
              v-model="gjsjtjStartTime"
              :picker-options="pickerOptions"
            ></el-date-picker>
          </div>
        </div>
        <div class="charts" ref="gjsjtjChart" style="height: 100%;"></div>
      </div>
    </div>
  </div>
</template>
<script>
import echarts from "echarts";
import "echarts/lib/echarts";
export default {
  name: "App",
  data() {
    const COLORS = {
      环境监测: "rgba(0, 255, 234, 1)",
      LED屏: "rgba(104, 223, 67, 1)",
      照明: "rgba(255, 180, 0, 1)"
    };
    var self = this;
    var emptyItem = {
      value: 1,
      label: {
        show: false
      },
      itemStyle: {
        color: "rgba(0,0,0,0)"
      },
      tooltip: {
        show: false
      }
    };

    var basePieOpt = {
      color: ["#00000050"],
      title: {
        text: "%",
        left: "center",
        top: "center",
        textStyle: {
          color: "#fff",
          fontSize: "22",
          fontWeight: "normal"
        }
      },
      series: [
        {
          name: "设备在线率",
          type: "pie",
          center: ["50%", "50%"],
          radius: ["26%", "41%"],
          hoverAnimation: false,
          label: {
            show: false
          },
          data: [
            {
              value: 0,
              name: "其他"
            },
            {
              value: 0,
              name: "在线",
              itemStyle: {
                color: self.$options.methods.createLinearColor_pie(
                  COLORS["环境监测"]
                )
              }
            }
          ]
        }
      ]
    };
    var option_pie_hjjc = basePieOpt;

    option_pie_hjjc.series[0].name = "环境监测";

    var option_pie_led = JSON.parse(JSON.stringify(basePieOpt));

    option_pie_led.series[0].name = "LED屏";
    option_pie_led.series[0].data[1].itemStyle.color = self.$options.methods.createLinearColor_pie(
      COLORS["LED屏"]
    );

    var baseLineOpt = {
      color: Object.values(COLORS),
      grid: {
        top: 40,
        left: 10,
        right: 40,
        bottom: 0,
        containLabel: true
      },
      tooltip: {
        trigger: "axis",
        axisPointer: {
          type: "shadow"
        }
      },
      textStyle: {
        color: "#fff"
      },
      xAxis: {
        name: "日",
        type: "category",
        data: [...new Array(24)].map((item, index) => index),
        axisLine: {
          show: false
        },
        axisTick: { show: false }
      },
      yAxis: {
        name: "",
        type: "value",
        axisLine: {
          show: false
        },
        axisTick: {
          show: false
        },
        splitLine: {
          lineStyle: {
            color: "rgba(255,255,255,0.2)"
          }
        }
      },
      series: [
        {
          name: "环境监测",
          type: "line",
          symbol: "none",
          data: []
        },
        {
          name: "LED屏",
          type: "line",
          symbol: "none",
          data: []
        }
      ]
    };

    var option_line_sblxsjtj = baseLineOpt;
    var option_line_gjsjtj = JSON.parse(JSON.stringify(baseLineOpt));
    option_line_gjsjtj.series.push({
      name: "照明",
      type: "line",
      symbol: "none",
      data: []
    });

    return {
      path:
        window.location.hostname === "localhost"
          ? "http://192.168.15.3:9201/environmentmonitor"
          : "/environmentmonitor",
      pickerOptions: {
        disabledDate(date) {
          return date.getTime() >= new Date().getTime();
        }
      },
      sblxsjtjMonthOptIndex: 0,
      sblxsjtjStartTime: "",
      gjsjtjMonthOptIndex: 0,
      gjsjtjStartTime: "",
      monthOpt: [
        {
          text: "本月"
        },
        {
          text: "上月"
        }
      ],
      option_pie_hjjc,
      option_pie_led,
      option_line_sblxsjtj,
      option_line_gjsjtj,
      option_pie: {
        tooltip: {},
        textStyle: {
          color: "#fff"
        },
        legend: {
          left: 0,
          bottom: 0,
          textStyle: {
            color: "#fff"
          }
        },
        series: [
          {
            name: "",
            type: "pie",
            center: ["55%", "55%"],
            radius: ["30%", "80%"],
            startAngle: 45,
            label: {
              rich: {
                "0": {
                  lineHeight: 18,
                  align: "center",
                  color: COLORS["环境监测"]
                },
                "1": {
                  lineHeight: 18,
                  align: "center",
                  color: COLORS["LED屏"]
                },
                "2": {
                  lineHeight: 18,
                  align: "center",
                  color: COLORS["照明"]
                }
              },
              formatter(params) {
                var percent = 0;

                if (params.data.total != 0) {
                  percent =
                    Math.round((params.value * 1000) / params.data.total) / 10;
                }

                return `${params.name} : ${percent}%\n{${params.dataIndex /
                  2}|(${params.value})}`;
              }
            },
            data: [
              {
                name: "环境监测",
                value: 0,
                total: 0,
                itemStyle: {
                  color: self.$options.methods.createLinearColor_pie(
                    COLORS["环境监测"]
                  )
                }
              },
              emptyItem,
              {
                name: "LED屏",
                value: 0,
                total: 0,
                itemStyle: {
                  color: self.$options.methods.createLinearColor_pie(
                    COLORS["LED屏"]
                  )
                }
              },
              emptyItem,
              {
                name: "照明",
                value: 0,
                total: 0,
                itemStyle: {
                  color: self.$options.methods.createLinearColor_pie(
                    COLORS["照明"]
                  )
                }
              },
              emptyItem
            ]
          }
        ]
      }
    };
  },
  watch: {
    sblxsjtjStartTime(newVal, oldVal) {
      var self = this;

      this.$api
        .get(self.path + "/getOffLineCount", {
          date: newVal
        })
        .then(res => {
          if (res.code) {
            console.warn("服务器返回数据异常", res);
            return;
          }
          var sblxsjtjChart = this.$echarts.getInstanceByDom(
            self.$refs.sblxsjtjChart
          );
          var day = new Date().getDate();
          var keys = [];
          var frtData = [];
          var ledData = [];

          // 是本月则去掉接口数据中未来日期的数据
          if (newVal === self.formatDate(new Date()).substring(0, 7)) {
            keys = Object.keys(res).filter(k => k.slice(-2) <= day);
          } else {
            keys = Object.keys(res);
          }

          keys.forEach(k => {
            frtData.push(res[k].frt || 0);
            ledData.push(res[k].led || 0);
          });

          self.option_line_sblxsjtj.xAxis.data = Object.keys(res);
          self.option_line_sblxsjtj.series[0].data = frtData;
          self.option_line_sblxsjtj.series[1].data = ledData;

          sblxsjtjChart.setOption(self.option_line_sblxsjtj);
        });

      this.$api
        .get(self.path + "/getYllOnLineFrtLed", {
          date: newVal
        })
        .then(res => {
          if (res.code) {
            console.warn("服务器返回数据异常", res);
            return;
          }
          var hjjcPieChart = this.$echarts.getInstanceByDom(
            self.$refs.hjjcPieChart
          );
          var hjjcPercent = 0;

          if (res.frt.countsum != 0) {
            hjjcPercent =
              Math.round((res.frt.countonline / res.frt.countsum) * 1000) / 10;
          }
          self.option_pie_hjjc.title.text = hjjcPercent + "%";
          self.option_pie_hjjc.series[0].data[0].value =
            res.frt.countsum - res.frt.countonline; // 离线环测
          self.option_pie_hjjc.series[0].data[1].value = res.frt.countonline; // 在线环测

          hjjcPieChart.setOption(self.option_pie_hjjc);

          var LEDPieChart = this.$echarts.getInstanceByDom(
            self.$refs.LEDPieChart
          );
          var LEDPercent = 0;

          if (res.led.countsum != 0) {
            LEDPercent =
              Math.round((res.led.countonline / res.led.countsum) * 1000) / 10;
          }
          self.option_pie_led.title.text = LEDPercent + "%";
          self.option_pie_led.series[0].data[0].value =
            res.led.countsum - res.led.countonline; // 离线LED
          self.option_pie_led.series[0].data[1].value = res.led.countonline; // 在线LED

          LEDPieChart.setOption(self.option_pie_led);
        });
    },
    gjsjtjStartTime(newVal, oldVal) {
      var self = this;

      // 饼图
      this.$api
        .get(self.path + "/getYllReportData", {
          date: newVal
        })
        .then(res => {
          if (res.code) {
            console.warn("服务器返回数据异常", res);
            return;
          }
          var gjsjtjPieChart = this.$echarts.getInstanceByDom(
            self.$refs.gjsjtjPieChart
          );
          var total =
            res.frt.countreport + res.led.countreport + res.light.countreport;

          self.option_pie.series[0].data[0].value = res.frt.countreport;
          self.option_pie.series[0].data[2].value = res.led.countreport;
          self.option_pie.series[0].data[4].value = res.light.countreport;

          self.option_pie.series[0].data[0].total = total;
          self.option_pie.series[0].data[2].total = total;
          self.option_pie.series[0].data[4].total = total;

          self.option_pie.series[0].data[1].value =
            res.frt.countreport > 0 ? total / 150 : 0;
          self.option_pie.series[0].data[3].value =
            res.frt.countreport > 0 ? total / 150 : 0;
          self.option_pie.series[0].data[5].value =
            res.frt.countreport > 0 ? total / 150 : 0;

          gjsjtjPieChart.setOption(self.option_pie);
        });
      // 线图
      this.$api
        .get(self.path + "/getYllReportwCount", {
          date: newVal
        })
        .then(res => {
          if (res.code) {
            console.warn("服务器返回数据异常", res);
            return;
          }
          var gjsjtjChart = this.$echarts.getInstanceByDom(
            self.$refs.gjsjtjChart
          );
          var day = new Date().getDate();
          var keys = [];
          var frtData = [];
          var ledData = [];
          var lightData = [];

          // 是本月则去掉接口数据中未来日期的数据
          if (newVal === self.formatDate(new Date()).substring(0, 7)) {
            keys = Object.keys(res).filter(k => k.slice(-2) <= day);
          } else {
            keys = Object.keys(res);
          }

          keys.forEach(k => {
            frtData.push(res[k].frt || 0);
            ledData.push(res[k].led || 0);
            lightData.push(res[k].light || 0);
          });

          self.option_line_gjsjtj.xAxis.data = Object.keys(res);
          self.option_line_gjsjtj.series[0].data = frtData;
          self.option_line_gjsjtj.series[1].data = ledData;
          self.option_line_gjsjtj.series[2].data = lightData;

          gjsjtjChart.setOption(self.option_line_gjsjtj);
        });
    }
  },
  mounted() {
    this.$nextTick(function() {
      this.$refs.analysis.className = "";
      this.$refs.analysis.className = "analysis is-visible";
    });
    this.initCharts();

    this.sblxsjtjStartTime = this.formatDate(new Date()).substring(0, 7);
    this.gjsjtjStartTime = this.formatDate(new Date()).substring(0, 7);
  },
  methods: {
    jump(src) {
      this.$router.push({ name: src });
    },
    formatDate(date) {
      let d = date;
      let year = d.getFullYear();
      let month = ("0" + (d.getMonth() + 1)).slice(-2);
      let day = ("0" + d.getDate()).slice(-2);
      return `${year}-${month}-${day}`;
    },
    createLinearColor_pie(colorStart, colorStop) {
      return {
        type: "linear",
        x: 1,
        y: 0,
        x2: 0,
        y2: 1,
        colorStops: [
          {
            offset: 0,
            color: colorStart
          },
          {
            offset: 0.5,
            color:
              colorStop ||
              colorStart.substring(0, colorStart.lastIndexOf(",")) + ", 0.7)"
          },
          {
            offset: 1,
            color:
              colorStop ||
              colorStart.substring(0, colorStart.lastIndexOf(",")) + ", 0)"
          }
        ]
      };
    },
    handleLEDSelect() {},
    sblxsjtjToggleChart(index) {
      var self = this;
      var date = new Date();

      self.sblxsjtjMonthOptIndex = index;
      date = new Date(date.getFullYear(), date.getMonth() - index);
      this.sblxsjtjStartTime = this.formatDate(date).substring(0, 7);
    },
    gjsjtjToggleChart(index) {
      var self = this;
      var date = new Date();

      self.gjsjtjMonthOptIndex = index;
      date = new Date(date.getFullYear(), date.getMonth() - index);
      this.gjsjtjStartTime = this.formatDate(date).substring(0, 7);
    },
    initCharts() {
      var self = this;

      var hjjcPieChart = this.$echarts.init(self.$refs.hjjcPieChart);

      hjjcPieChart.setOption(self.option_pie_hjjc);
      window.addEventListener("resize", function() {
        setTimeout(function() {
          hjjcPieChart.resize();
          hjjcPieChart.getDom().firstElementChild.style.margin = "0 auto";
        }, 10);
      });

      var LEDPieChart = this.$echarts.init(self.$refs.LEDPieChart);

      LEDPieChart.setOption(self.option_pie_led);
      window.addEventListener("resize", function() {
        setTimeout(function() {
          LEDPieChart.resize();
          LEDPieChart.getDom().firstElementChild.style.margin = "0 auto";
        }, 10);
      });

      var sblxsjtjChart = this.$echarts.init(self.$refs.sblxsjtjChart);

      sblxsjtjChart.setOption(self.option_line_sblxsjtj);
      window.addEventListener("resize", function() {
        setTimeout(function() {
          sblxsjtjChart.resize();
        }, 10);
      });

      var gjsjtjPieChart = this.$echarts.init(self.$refs.gjsjtjPieChart);

      gjsjtjPieChart.setOption(self.option_pie);
      window.addEventListener("resize", function() {
        setTimeout(function() {
          gjsjtjPieChart.resize();
        }, 10);
      });

      var gjsjtjChart = this.$echarts.init(self.$refs.gjsjtjChart);

      gjsjtjChart.setOption(self.option_line_gjsjtj);
      window.addEventListener("resize", function() {
        setTimeout(function() {
          gjsjtjChart.resize();
        }, 10);
      });
    }
  },
  beforeRouteLeave(to, from, next) {
    this.$refs.analysis.className = "analysis";
    setTimeout(() => {
      next();
    }, 700);
  }
};
</script>
<style lang="scss" scoped>
* {
  box-sizing: border-box;
}
@mixin flex($direction: row, $justify: space-between, $alingn: center) {
  display: flex;
  align-items: $alingn;
  justify-content: $justify;
  flex-direction: $direction;
}
@mixin bgs($img) {
  background-image: url($img);
  background-size: 100% 100%;
  background-repeat: no-repeat;
}
.monitor-bar {
  margin: 0 0.5rem;
  height: 0.8rem;
  @include flex(row, center, center);
  border-bottom: 1px solid #00fff9;
  .sbarBox-main {
    margin: 0 auto;
    width: 3.78rem;
    height: 0.48rem;
    @include bgs("../assets/img/alarm/headerMenu_bg.png");
    .sbarBox {
      line-height: 0.48rem;
      font-size: 0.16rem;
      position: relative;
      .sbar {
        display: inline-block;
        color: #00fff9;
        width: 32.6%;
        cursor: pointer;
        text-align: center;
        position: relative;
      }
      .active {
        position: absolute;
        transition: all 0.2s ease;
        width: 32.6%;
        height: 0.44rem;
        top: 0.02rem;
        left: 32.6%;
        @include bgs("../assets/img/alarm/headerMenuSelected.png");
      }
      .right {
        transform: translateX(85%);
      }
      .now {
        color: #fff;
      }
    }
  }
}
.analysis {
  color: #fff;
  position: absolute;
  top: 1.2rem;
  left: 0.1rem;
  right: 0.1rem;
  bottom: 0.1rem;
  overflow: hidden;
  z-index: 1;
  background: url(../assets/img/analysis/bg.png) no-repeat;
  background-size: 100% 100%;
  .row {
    position: relative;
    margin: 1% 1% 2% 1%;
    width: 98%;
    height: calc(49% - 1.18rem);
    display: flex;
    .charts {
      height: calc(100% - 0.5rem);
    }
    .col {
      flex: 1;
      height: 100%;
    }
    .col1 {
      height: 100%;
      flex: 4;
      .pies {
        display: flex;
        > div {
          position: relative;
          flex: 1;
          display: flex;
          align-items: center;
          justify-content: center;
          > div {
            position: absolute;
            width: 100%;
            height: 100%;
            z-index: 1;
          }
          > label {
            padding-top: 2.5rem;
          }
        }
        > div::before,
        > div::after {
          content: "";
          position: absolute;
          left: 0;
          top: 0;
          width: 100%;
          height: 100%;
          background-repeat: no-repeat;
          background-position: center center;
        }
        > .pie1::before {
          background-image: url(../assets/img/analysis/round_1.png);
          background-size: 2rem 2rem;
          animation: rotateAdd 6s linear infinite;
        }
        > .pie1::after {
          background-image: url(../assets/img/analysis/round_2.png);
          background-size: 1.34rem 1.34rem;
          animation: rotateReduce 6s linear infinite;
        }
        > .pie2::before {
          background-image: url(../assets/img/analysis/round_11.png);
          background-size: 2rem 2rem;
          animation: rotateAdd 6s linear infinite;
        }
        > .pie2::after {
          background-image: url(../assets/img/analysis/round_22.png);
          background-size: 1.34rem 1.34rem;
          animation: rotateReduce 6s linear infinite;
        }
      }
    }
    .col2 {
      height: 100%;
      flex: 6;
    }
    .y-form {
      display: inline-block;
      margin: 0 0.1rem;
      .el-date-editor {
        width: 1.6rem !important;
      }
      .y-form-heng {
        margin: 0 0.05rem 0.04rem 0.05rem;
      }
    }
    .options {
      position: absolute;
      right: 0;
      top: 0;
      z-index: 1;
      .buttons {
        display: inline-block;
        div {
          cursor: pointer;
          display: inline-flex;
          justify-content: center;
          align-items: center;
          width: 1.13rem;
          height: 0.5rem;
        }
        .selected {
          color: #00ffea;
          background: url("../assets/img/analysis/btn.png") no-repeat;
          background-size: 1.13rem 0.5rem;
        }
      }
    }
  }
  @keyframes rotateAdd {
    100% {
      transform: rotate(360deg);
    }
  }
  @keyframes rotateReduce {
    100% {
      transform: rotate(-360deg);
    }
  }
  .header {
    width: 100%;
    font-size: 0.2rem;
    height: 0.68rem;
    padding: 0 0.31rem 0 0.78rem;
    background-size: 0.68rem 0.68rem;
    background-repeat: no-repeat;
    h3 {
      padding: 0.22rem 0 0.05rem 0.02rem;
      border-bottom: 1px solid rgba(0, 242, 219, 0.2);
    }
  }
  .sbsszxl {
    background-image: url(../assets/img/analysis/icon_shishi.png);
  }
  .sblxsjtj {
    background-image: url(../assets/img/analysis/icon_lixian.png);
  }
  .gjsjtj {
    margin-left: 1%;
    padding-right: 0.66rem;
    background-image: url(../assets/img/analysis/icon_gaojing.png);
  }
}
</style>
