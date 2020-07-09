
<template>
  <div class="analysis subMain" ref="analysis">
    <div class="monitor-bar">
      <div class="sbarBox-main">
        <div class="sbarBox">
          <span class="active"></span>
          <span class="sbar now">环境分析</span>
          <span class="sbar" @click="jump('warningAnalysis')">告警分析</span>
          <span class="sbar" @click="jump('lightingAnalysis')">照明统计</span>
        </div>
      </div>
    </div>
    <div class="back trans-left trans-left-delay-3">
      <section class="Middele">
        <div class="Middeleauto">
          <div class="publicflex">
            <div class="publicheader">
              <span>
                <img src="../assets/img/analysis/icon_weather.png" />
              </span>
              <p class="publictitle">整点天气实况</p>
              <p>
                过去24小时{{ tjMenu.find(d => d.value === tjMenuValue).title }}最高值:
                <label>{{ maxValue }}</label>
              </p>
              <div class="buttons">
                <div
                  v-for="item in tjMenu"
                  :key="item.value"
                  @click="toggleChart(item.value)"
                  :class="{selected:item.value==tjMenuValue}"
                  v-show="item.value!=='winddirection' || showFlfx"
                >{{item.title}}</div>
              </div>
              <div class="publicSelect y-form">
                <el-select
                  v-model="zdtqskSelectVal"
                  placeholder="请选择"
                  size="mini"
                  :popper-append-to-body="false"
                >
                  <el-option
                    v-for="item in selectData"
                    :key="item.value"
                    :label="item.text"
                    :value="item.value"
                  ></el-option>
                </el-select>
                <el-date-picker
                  type="date"
                  size="mini"
                  :clearable="false"
                  placeholder="请选择"
                  v-model="zdtqskTime"
                  value-format="yyyy-MM-dd"
                  :picker-options="pickerOptions"
                ></el-date-picker>
              </div>
            </div>
            <div class="echars">
              <div ref="echartone" style="width:100%;height:inherit;"></div>
            </div>
          </div>
          <div class="publicflex counts">
            <div class="publicheader">
              <span>
                <img src="../assets/img/analysis/icon_air.png" />
              </span>
              <p class="publictitle">空气质量月统计</p>
              <div class="publicSelect y-form">
                <el-select
                  v-model="kqzlytjSelectVal"
                  placeholder="请选择"
                  size="mini"
                  :popper-append-to-body="false"
                >
                  <el-option
                    v-for="item in selectData"
                    :key="item.value"
                    :label="item.text"
                    :value="item.value"
                  ></el-option>
                </el-select>
                <el-date-picker
                  type="month"
                  size="mini"
                  :clearable="false"
                  placeholder="请选择"
                  v-model="kqzlytjTime"
                  value-format="yyyy-MM"
                  :picker-options="pickerOptions"
                ></el-date-picker>
              </div>
            </div>
            <div class="echars">
              <div ref="echarttwo" style="width:100%;height:3.2rem"></div>
            </div>
          </div>
        </div>
      </section>
      <section class="Middele mdmargin">
        <div class="Middeleauto">
          <div class="publicflex">
            <div class="publicheader" style="width: 97%;">
              <span>
                <img src="../assets/img/analysis/icon_rain.png" />
              </span>
              <p class="publictitle">空气质量</p>
              <div class="publicSelect y-form">
                <el-select
                  v-model="jsytjSelectVal"
                  placeholder="请选择"
                  size="mini"
                  :popper-append-to-body="false"
                >
                  <el-option
                    v-for="item in selectData"
                    :key="item.value"
                    :label="item.text"
                    :value="item.value"
                  ></el-option>
                </el-select>
                <el-date-picker
                  type="date"
                  size="mini"
                  :clearable="false"
                  placeholder="请选择"
                  v-model="jsytjTime"
                  value-format="yyyy-MM-dd"
                  :picker-options="pickerOptions"
                ></el-date-picker>
              </div>
            </div>
            <div class="echars" style="width: 97%;">
              <div ref="echartthree" style="width:100%;height:inherit"></div>
            </div>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>
<script>
import Vue from "vue";
import echarts from "echarts";
import "echarts/lib/echarts";

export default {
  name: "App",
  watch: {
    zdtqskSelectVal(obj) {
      var self = this;
      var dtype = self.selectData.find(d => d.value === self.zdtqskSelectVal)
        .type;

      if (dtype === 202 && self.tjMenuValue === "winddirection") {
        self.showFlfx = false;
        self.lastTjMenuValue = "ringtemperature";
        self.tjMenuValue = "ringtemperature";
      } else if (dtype === 305) {
        self.showFlfx = true;
      }
      this.query(1);
    },
    zdtqskTime(obj) {
      this.query(1);
    },
    tjMenuValue(obj) {
      this.query(1);
    },
    kqzlytjTime() {
      this.query(2);
    },
    kqzlytjSelectVal() {
      this.query(2);
    },
    jsytjSelectVal() {
      this.query(3);
    },
    jsytjTime() {
      this.query(3);
    }
  },
  data() {
    var self = this;
    var now = this.formatDate(new Date());
    var emptyItem = {
      value: 0.2,
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
      typeValue: "",
      maxValue: "",
      selectData: [],
      zdtqskTime: now,
      kqzlytjTime: now.substring(0, 7),
      jsytjTime: now.substring(0, 10),
      zdtqskSelectVal: "",
      kqzlytjSelectVal: "",
      jsytjSelectVal: "",
      showFlfx: false,
      tjMenuValue: "ringtemperature",
      lastTjMenuValue: "ringtemperature",
      tjMenu: [
        {
          value: "ringtemperature",
          title: "温度"
        },
        {
          value: "ringwetting",
          title: "相对湿度"
        },
        {
          value: "winddirection",
          title: "风力风向"
        }
      ],
      option_charttwo: {
        // tooltip: {},
        textStyle: {
          color: "#fff"
        },
        legend: {
          left: 0,
          bottom: 20,
          textStyle: {
            color: "#fff"
          }
        },
        series: [
          {
            name: "空气质量月统计",
            type: "pie",
            center: ["55%", "50%"],
            radius: ["30%", "75%"],
            startAngle: 0,
            label: {
              formatter(params) {
                var percent = 0;

                if (params.data.total !== 0) {
                  percent =
                    Math.round((params.value * 1000) / params.data.total) / 10;
                }

                return `${params.name} : ${percent}%`;
              }
            },
            data: [
              {
                name: "优",
                value: 0,
                total: 0,
                itemStyle: {
                  color: self.$options.methods.createLinearColor_pie(
                    "rgba(0,242,219,1)"
                  )
                }
              },
              emptyItem,
              {
                name: "良",
                value: 0,
                total: 0,
                itemStyle: {
                  color: self.$options.methods.createLinearColor_pie(
                    "rgba(104,223,67,1)"
                  )
                }
              },
              emptyItem,
              {
                name: "轻度",
                value: 0,
                total: 0,
                itemStyle: {
                  color: self.$options.methods.createLinearColor_pie(
                    "rgba(255,180,0,1)"
                  )
                }
              },
              emptyItem,
              {
                name: "中度",
                value: 0,
                total: 0,
                itemStyle: {
                  color: self.$options.methods.createLinearColor_pie(
                    "rgba(255,91,10,1)"
                  )
                }
              },
              emptyItem,
              {
                name: "重度",
                value: 0,
                total: 0,
                itemStyle: {
                  color: self.$options.methods.createLinearColor_pie(
                    "rgba(219,15,145,1)"
                  )
                }
              },
              emptyItem
            ]
          }
        ]
      },
      option_bar: {
        grid: {
          top: 30,
          left: 20,
          right: 20,
          bottom: 10,
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
        visualMap: [
          {
            show: false,
            type: "piecewise",
            right: 5,
            bottom: 5,
            inverse: true,
            align: "left",
            textStyle: {
              color: "#fff"
            },
            pieces: [
              {
                lte: 50,
                label: "优",
                color: self.$options.methods.createLinearColor_bar(
                  "rgba(0,242,219,1)"
                )
              },
              {
                gt: 50,
                lte: 100,
                label: "良",
                color: self.$options.methods.createLinearColor_bar(
                  "rgba(104,223,67,1)"
                )
              },
              {
                gt: 100,
                lte: 200,
                label: "轻度",
                color: self.$options.methods.createLinearColor_bar(
                  "rgba(255,180,0,1)"
                )
              },
              {
                gt: 200,
                lte: 300,
                label: "中度",
                color: self.$options.methods.createLinearColor_bar(
                  "rgba(255,91,10,1)"
                )
              },
              {
                gt: 300,
                lte: 400,
                label: "重度",
                color: self.$options.methods.createLinearColor_bar(
                  "rgba(219,15,145,1)"
                )
              },
              {
                gt: 400,
                label: "严重",
                color: self.$options.methods.createLinearColor_bar(
                  "rgba(104,23,196,1)"
                )
              }
            ]
          }
        ],
        xAxis: {
          name: "(h)",
          type: "category",
          data: [...new Array(24)].map((item, index) => index),
          axisLabel: {
            formatter: function(val) {
              return val.slice(-2);
            }
          },
          nameTextStyle: {
            padding: [25, 0, 0, -10]
          },
          axisLine: {
            show: false
          },
          axisTick: {
            show: false
          }
        },
        yAxis: {
          name: "μg/m3",
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
            name: "空气质量",
            type: "bar",
            barWidth: "50%",
            color: ["#3CBDCB"],
            itemStyle: {
              barBorderRadius: 10,
              color: "#0ff"
            },
            data: []
          }
        ]
      },
      option_line: {
        color: ["#0ff"],
        grid: {
          top: 30,
          left: 10,
          right: 20,
          bottom: 10,
          containLabel: true
        },
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "shadow"
          },
          formatter(p, t) {
            var arr = [];

            arr.push(p[0].axisValue);
            arr.push("<br/>");
            arr.push(p[0].marker);
            arr.push(p[0].seriesName);
            arr.push(" : ");

            if (self.tjMenuValue === "ringtemperature") {
              arr.push(Math.round(p[0].data.value * 10) / 10);
              arr.push("℃");
            } else if (self.tjMenuValue === "ringwetting") {
              arr.push(Math.round(p[0].data.value * 10) / 10);
              arr.push("%");
            } else if (self.tjMenuValue === "winddirection") {
              arr.push(self.$degree2Direction(p[0].data.raw.winddirection));
              arr.push("风 ");
              arr.push(self.$metres2Grade(p[0].data.value));
              arr.push("级");
            }

            return arr.join("");
          }
        },
        textStyle: {
          color: "#fff"
        },
        xAxis: {
          name: "(h)",
          type: "category",
          data: [...new Array(24)].map((item, index) => index),
          nameTextStyle: {
            padding: [25, 0, 0, -10]
          },
          axisLabel: {
            formatter: function(val) {
              return ~~val.slice(-3, -1);
            }
          },
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
        series: []
      },
      baseLineSeries: {
        name: "降水",
        type: "line",
        symbol: "circle",
        symbolSize: 10,
        data: [
          45,
          82,
          98,
          82,
          90,
          106,
          114,
          15,
          107,
          39,
          97,
          109,
          42,
          82,
          22,
          78,
          114,
          26,
          43,
          21,
          28,
          54,
          17,
          5
        ]
      }
    };
  },
  created: function() {
    this.getDevices();
  },
  mounted() {
    this.$nextTick(function() {
      this.$refs.analysis.className = "";
      this.$refs.analysis.className = "analysis subMain is-visible";
    });

    this.drawLine();
    this.timelinee();
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
    getDevices() {
      var self = this;

      this.$api.get(self.path + "/frtDevice/findAll").then(res => {
        if (res.code) {
          console.warn("服务器返回数据异常", res);
          return;
        }
        if (res.length > 0) {
          self.zdtqskSelectVal = res[0].id;
          self.kqzlytjSelectVal = res[1].id;
          self.jsytjSelectVal = res[0].id;
        }

        if (Object.prototype.toString.call(res).slice(8, -1) === "Array") {
          self.selectData = res.map(d => {
            return { value: d.id, text: d.name, type: d.type };
          });
        }
      });
    },
    query(type) {
      var self = this;
      var data = { id: type };

      if (type === 1) {
        Object.assign(data, {
          dateTime: self.zdtqskTime,
          deviceId: self.zdtqskSelectVal,
          options: self.tjMenuValue
        });
      } else if (type === 2) {
        Object.assign(data, {
          dateTime: self.kqzlytjTime,
          deviceId: self.kqzlytjSelectVal
        });
      } else if (type === 3) {
        Object.assign(data, {
          id: 1,
          dateTime: self.jsytjTime,
          deviceId: self.jsytjSelectVal,
          options: "pmtwopointfive"
        });
      }

      this.$api.get(self.path + "/get/", data).then(res => {
        if (res.code) {
          console.warn("服务器返回数据异常", res);
          return;
        }
        // 没有数据
        if (!res.TOP && !res.RIGHT && type !== 2) {
          console.warn(res);
          return;
        }
        if (type === 1) {
          self.toggleChart(self.tjMenuValue, res.TOP);
        } else if (type === 2) {
          var data = res;
          var total =
            data.you + data.liang + data.qingdu + data.zhongdu + data.zhonggdu;
          var emptyValue = total / 150;
          var chart = this.$echarts.getInstanceByDom(this.$refs["echarttwo"]);

          self.option_charttwo.series[0].data[0].value = data.you;
          self.option_charttwo.series[0].data[2].value = data.liang;
          self.option_charttwo.series[0].data[4].value = data.qingdu;
          self.option_charttwo.series[0].data[6].value = data.zhongdu;
          self.option_charttwo.series[0].data[8].value = data.zhonggdu;

          self.option_charttwo.series[0].data[0].total = total;
          self.option_charttwo.series[0].data[2].total = total;
          self.option_charttwo.series[0].data[4].total = total;
          self.option_charttwo.series[0].data[6].total = total;
          self.option_charttwo.series[0].data[8].total = total;

          self.option_charttwo.series[0].data[1].value =
            data.you > 0 ? emptyValue : 0;
          self.option_charttwo.series[0].data[3].value =
            data.liang > 0 ? emptyValue : 0;
          self.option_charttwo.series[0].data[5].value =
            data.qingdu > 0 ? emptyValue : 0;
          self.option_charttwo.series[0].data[7].value =
            data.zhongdu > 0 ? emptyValue : 0;
          self.option_charttwo.series[0].data[9].value =
            data.zhonggdu > 0 ? emptyValue : 0;

          chart.setOption(self.option_charttwo);
        } else if (type === 3) {
          var data = res.TOP;
          var chart = this.$echarts.getInstanceByDom(this.$refs["echartthree"]);

          self.option_bar.xAxis.data = Object.keys(data);
          self.option_bar.series[0].data = Object.values(data).map(d =>
            parseFloat(d)
          );

          chart.setOption(self.option_bar);
        }
      });
    },
    createLinearColor_bar(colorStart, colorStop) {
      return {
        type: "linear",
        x: 0,
        y: 0,
        x2: 0,
        y2: 1,
        colorStops: [
          {
            offset: 0,
            color: colorStart
          },
          {
            offset: 0.92,
            color:
              colorStop ||
              colorStart.substring(0, colorStart.lastIndexOf(",")) + ", 0)"
          }
        ]
      };
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
            offset: 1,
            color:
              colorStop ||
              colorStart.substring(0, colorStart.lastIndexOf(",")) + ", 0)"
          }
        ]
      };
    },
    toggleChart(val, data) {
      var self = this;
      var chart = this.$echarts.getInstanceByDom(this.$refs["echartone"]);

      if (data) {
        var maxValue = 0;
        var sdata = [];
        var xdata = Object.keys(data);

        // 风力风向
        if (self.tjMenuValue === "winddirection") {
          self.option_line.yAxis.name = "m/s";
          sdata = xdata.map(k => {
            return {
              name: k,
              value: data[k].windspeed,
              raw: data[k]
            };
          });
          maxValue =
            self.$metres2Grade(
              Math.round(
                Math.max(...Object.values(sdata.map(d => d.value))) * 10
              ) / 10
            ) + "级";
        } else {
          if (self.tjMenuValue === "ringtemperature") {
            self.option_line.yAxis.name = "℃";
          } else if (self.tjMenuValue === "ringwetting") {
            self.option_line.yAxis.name = "%";
          }

          sdata = xdata.map(k => {
            return {
              name: k,
              value: data[k]
            };
          });
          maxValue =
            Math.round(
              Math.max(...Object.values(sdata.map(d => d.value))) * 10
            ) /
              10 +
            self.option_line.yAxis.name;
        }
        var seriesName = self.tjMenu.find(d => d.value === self.tjMenuValue)
          .title;

        self.baseLineSeries.name = seriesName;
        self.baseLineSeries.data = sdata;
        self.option_line.series[0] = self.baseLineSeries;
        self.option_line.xAxis.data = Object.keys(data).map(k => k + "时");
        self.maxValue = maxValue;
      }

      chart.setOption(self.option_line, true);

      self.lastTjMenuValue = self.tjMenuValue;
      self.tjMenuValue = val;
    },
    drawLine() {
      var self = this;
      var echartone = this.$refs.echartone;

      var echartthree = this.$refs.echartthree;

      if (echartone) {
        var echartone = this.$echarts.init(echartone);
        var echartthree = this.$echarts.init(echartthree);

        echartone.setOption(
          self.option_line,
          window.addEventListener("resize", echartone.resize)
        );
        echartthree.setOption(
          self.option_bar,
          window.addEventListener("resize", echartthree.resize)
        );
      }
    },
    timelinee() {
      var self = this;

      var echarttwo = this.$refs.echarttwo;

      if (echarttwo) {
        var echarttwo = this.$echarts.init(echarttwo);
        echarttwo.setOption(
          self.option_charttwo,
          window.addEventListener("resize", echarttwo.resize)
        );
      }
    }
  },
  beforeRouteLeave(to, from, next) {
    this.$refs.analysis.className = "analysis subMain";
    setTimeout(() => {
      next();
    }, 700);
  }
};
</script>
<style lang="scss" scoped>
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
* {
  box-sizing: border-box;
}
.analysis {
  position: absolute;
  top: 1.2rem;
  left: 0.1rem;
  right: 0.1rem;
  bottom: 0.1rem;
  overflow: hidden;
  background: url(../assets/img/analysis/bg.png) no-repeat;
  background-size: 100% 100%;
  .back {
    width: 100%;
    height: 100%;
  }
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
        left: 0;
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

.Middele {
  display: flex;
  width: 100%;
  height: 48%;
  justify-content: space-between;

  .Middeleauto {
    display: flex;
    width: 100%;
    height: 100%;
    .publicflex {
      display: flex;
      flex-direction: column;
      flex: 8;
      .publicheader {
        position: relative;
        color: #fff;
        font-size: 0.18rem;
        width: 95%;
        margin: 0.1rem 0 0.1rem 0.2rem;
        padding-bottom: 0.1rem;
        img {
          position: absolute;
          height: 0.68rem;
        }
        p {
          margin: 0.2rem 0 0 0.8rem;
        }
        .publictitle {
          font-size: 0.2rem;
          font-weight: bold;
          border-bottom: 2px solid rgba(0, 242, 219, 0.2);
          padding: 0.06rem;
        }
        .buttons {
          position: absolute;
          right: 0;
          bottom: 0;
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
        .publicSelect {
          position: absolute;
          right: 0;
          top: 0.2rem;
        }
      }
      .echars {
        width: 95%;
        height: 2.6rem;
        margin-left: 0.2rem;
      }
    }
    .counts {
      flex: 5;
    }
  }
}
.mdmargin {
  margin-top: 0rem;
}
.y-form {
  height: auto;
  .el-date-editor {
    margin-left: 0.1rem;
  }
}
</style>
