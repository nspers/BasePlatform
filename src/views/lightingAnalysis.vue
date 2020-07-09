
<template>
  <div class="analysis" ref="analysis">
    <div class="monitor-bar">
      <div class="sbarBox-main">
        <div class="sbarBox">
          <span class="active"></span>
          <span class="sbar" @click="jump('analysis')">环境分析</span>
          <span class="sbar" @click="jump('warningAnalysis')">告警分析</span>
          <span class="sbar now">照明统计</span>
        </div>
      </div>
    </div>
    <div class="header gjsjtj trans-left trans-left-delay-3">
      <h3>在线率</h3>
    </div>
    <div class="row trans-left trans-left-delay-3">
      <div class="col1">
        <div class="pies charts">
          <div class="pie1">
            <div ref="hjjcPieChart"></div>
            <label>在线率</label>
          </div>
        </div>
      </div>
      <div class="col2">
        <div class="options y-form">
          <el-date-picker
            type="date"
            size="mini"
            :clearable="false"
            placeholder="请选择"
            v-model="sszxlTime"
            value-format="yyyy-MM-dd"
            :picker-options="pickerOptions"
          ></el-date-picker>
        </div>
        <div class="charts" ref="sblxsjtjChart"></div>
      </div>
    </div>
    <div class="header gjsjtj trans-left trans-left-delay-5">
      <h3>亮灯率</h3>
    </div>
    <div class="row trans-left trans-left-delay-5">
      <div class="col1">
        <div class="pies charts">
          <div class="pie2">
            <div ref="LEDPieChart"></div>
            <label>亮灯率</label>
          </div>
        </div>
      </div>
      <div class="col2">
        <div class="options y-form">
          <el-date-picker
            type="date"
            size="mini"
            :clearable="false"
            placeholder="请选择"
            v-model="ssldlTime"
            value-format="yyyy-MM-dd"
            :picker-options="pickerOptions"
          ></el-date-picker>
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
      照明: "rgba(0, 255, 234, 1)",
      LED屏: "rgba(104, 223, 67, 1)",
      照明: "rgba(255, 180, 0, 1)"
    };
    var self = this;

    var basePieOpt = {
      color: ["#00000050"],
      title: {
        text: "0%",
        left: "center",
        top: "center",
        textStyle: {
          color: "#fff",
          fontSize: "18",
          fontWeight: "normal"
        }
      },
      series: [
        {
          name: "在线率",
          type: "pie",
          center: ["50%", "50%"],
          radius: ["32%", "49%"],
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
                  COLORS["照明"]
                )
              }
            }
          ]
        }
      ]
    };
    var option_pie_hjjc = basePieOpt;

    var option_pie_led = JSON.parse(JSON.stringify(basePieOpt));

    option_pie_led.series[0].name = "亮灯率";
    option_pie_led.series[0].data[1].itemStyle.color = self.$options.methods.createLinearColor_pie(
      COLORS["LED屏"]
    );

    var baseLineOpt = {
      color: COLORS["照明"],
      grid: {
        top: 40,
        left: 40,
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
        name: "(h)",
        type: "category",
        data: [...new Array(24)].map((item, index) => index),
        axisLabel: {
          formatter: function(val) {
            return val.replace("时", "");
          }
        },
        nameTextStyle: {
          padding: [25, 0, 0, 0]
        },
        axisLine: {
          show: false
        },
        axisTick: { show: false }
      },
      yAxis: {
        name: "在线率",
        type: "value",
        axisLabel: {
          formatter: "{value}%"
        },
        nameTextStyle: {
          padding: [0, 0, 0, -40]
        },
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
          name: "在线率",
          type: "line",
          symbol: "circle",
          symbolSize: 8,
          data: []
        }
      ]
    };

    var option_line_sblxsjtj = baseLineOpt;
    var option_line_gjsjtj = JSON.parse(JSON.stringify(baseLineOpt));
    option_line_gjsjtj.xAxis.axisLabel.formatter =
      baseLineOpt.xAxis.axisLabel.formatter;
    option_line_gjsjtj.yAxis.name = "亮灯率";
    option_line_gjsjtj.series[0].name = "亮灯率";
    option_line_gjsjtj.color = COLORS["LED屏"];

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
      sszxlTime: "",
      ssldlTime: "",
      option_pie_hjjc,
      option_pie_led,
      option_line_sblxsjtj,
      option_line_gjsjtj
    };
  },
  watch: {
    sszxlTime(newVal, oldVal) {
      var self = this;

      if (!newVal) {
        return;
      }
      this.$api
        .get(self.path + "/getFrtOnlineCount", {
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
          var hours = new Date().getHours();
          var keys = [];
          var data = [];

          // 是本日则去掉接口数据中未来小时的数据
          if (newVal === self.formatDate(new Date()).substring(0, 10)) {
            keys = Object.keys(res.total).filter(k => k.slice(-2) <= hours);
          } else {
            keys = Object.keys(res.total);
          }

          keys.forEach(k => {
            var num = 0;

            if (res.count[k]) {
              num =
                Math.round(((res.total[k] || 0) * 1000) / res.count[k]) / 10;
            }

            data.push(num);
          });

          self.option_line_sblxsjtj.xAxis.data = Object.keys(res.total).map(
            k => k + "时"
          );
          self.option_line_sblxsjtj.series[0].data = data;

          sblxsjtjChart.setOption(self.option_line_sblxsjtj);
        });

      // 在线率
      this.$api
        .get(self.path + "/getYllCountOnline", {
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
          var percent = 0;

          if (res.total.countsum !== 0) {
            percent =
              Math.round((res.total.countonline / res.total.countsum) * 1000) /
              10;
          }

          self.option_pie_hjjc.title.text = percent + "%";
          self.option_pie_hjjc.series[0].data[0].value =
            res.total.countsum - res.total.countonline; // 离线环测
          self.option_pie_hjjc.series[0].data[1].value = res.total.countonline; // 在线环测

          hjjcPieChart.setOption(self.option_pie_hjjc);
        });
    },
    ssldlTime(newVal, oldVal) {
      var self = this;

      if (!newVal) {
        return;
      }
      this.$api
        .get(self.path + "/getLightOnlineCount", {
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
          var hours = new Date().getHours();
          var keys = [];
          var data = [];

          // 是本日则去掉接口数据中未来小时的数据
          if (newVal === self.formatDate(new Date()).substring(0, 10)) {
            keys = Object.keys(res.total).filter(k => k.slice(-2) <= hours);
          } else {
            keys = Object.keys(res.total);
          }

          keys.forEach(k => {
            var num = 0;

            if (res.count[k]) {
              num =
                Math.round(((res.total[k] || 0) * 100 * 10) / res.count[k]) /
                10;
            }

            data.push(num);
          });

          self.option_line_gjsjtj.xAxis.data = Object.keys(res.total).map(
            k => k + "时"
          );
          self.option_line_gjsjtj.series[0].data = data;

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

    var date = this.formatDate(new Date());
    this.sszxlTime = date;
    this.ssldlTime = date;
    // 亮灯率
    var self = this;
    this.$api
      .get(self.path + "/getYllCountOnLight", {
        date: date
      })
      .then(res => {
        if (res.code) {
          console.warn("服务器返回数据异常", res);
          return;
        }
        var LEDPieChart = this.$echarts.getInstanceByDom(
          self.$refs.LEDPieChart
        );
        var percent = 0;

        if (res.total.countsum !== 0) {
          percent =
            Math.round((res.total.countlight / res.total.countsum) * 1000) / 10;
        }

        self.option_pie_led.title.text = percent + "%";
        self.option_pie_led.series[0].data[0].value =
          res.total.countsum - res.total.countlight; // 离线LED
        self.option_pie_led.series[0].data[1].value = res.total.countlight; // 在线LED

        LEDPieChart.setOption(self.option_pie_led);
      });
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
        right: 0;
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
    margin: 1%;
    width: 98%;
    height: calc(49% - 1.6rem);
    display: flex;
    .charts {
      height: 100%;
    }
    .col {
      flex: 1;
      height: 100%;
    }
    .col1 {
      height: 100%;
      flex: 3;
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
            margin-bottom: -55%;
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
          background-image: url(../assets/img/analysis/round_11.png);
          background-size: 2.5rem 2.5rem;
          animation: rotateAdd 6s linear infinite;
        }
        > .pie1::after {
          background-image: url(../assets/img/analysis/round_22.png);
          background-size: 1.67rem 1.67rem;
          animation: rotateReduce 6s linear infinite;
        }
        > .pie2::before {
          background-image: url(../assets/img/analysis/round_111.png);
          background-size: 2.5rem 2.5rem;
          animation: rotateAdd 6s linear infinite;
        }
        > .pie2::after {
          background-image: url(../assets/img/analysis/round_222.png);
          background-size: 1.67rem 1.67rem;
          animation: rotateReduce 6s linear infinite;
        }
      }
    }
    .col2 {
      height: 100%;
      flex: 7;
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
      right: 0.22rem;
      top: -0.7rem;
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
    margin-top: 1%;
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
