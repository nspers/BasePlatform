<template>
  <div class="index">
    <div class="nav" ref="nav">
      <div class="trans-top-index trans-top-index-delay-7">
        <div class="time">
          <p>
            <span>{{tiemrObj.date}}</span>
            <span>{{tiemrObj.day}}</span>
            <span>{{tiemrObj.tiems}}</span>
            <span>{{tiemrObj.str}}</span>
          </p>
        </div>
        <div class="navMiddle">
          <!-- <span>怀柔公交站管理服务平台</span> -->
        </div>
        <div class="navBtn">
          <span @click="singout()">
            <img class="imgg" src="../../assets/img/index/ico_close.png" /> 退出
          </span>
        </div>
      </div>
    </div>
    <div class="indexMain clearfix" ref="indexMain">
      <div class="left contentMain trans-left-index trans-left-index-delay-7">
        <div class="contentSub">
          <div class="topTitle">空气质量指数</div>
          <div class="calcH">
            <div class="dataAir">
              <div class="dataAirMain clearfix">
                <div class="svg">
                  <Ther />
                </div>
                <b>{{dataAir.ringtemperature}}°C</b>
                <span>温度</span>
              </div>
              <div class="dataAirMain clearfix">
                <div class="svg">
                  <Rain />
                </div>
                <b>{{dataAir.ringwetting}}%</b>
                <span>湿度</span>
              </div>
              <div class="dataAirMain clearfix">
                <div class="svg">
                  <Good />
                </div>
                <b>{{airquality}}</b>
                <span>空气</span>
              </div>
            </div>
            <ul class="dataAirUl clearfix">
              <li>
                风速
                <span>{{dataAir.windspeed}}级</span>
              </li>
              <li>
                气压
                <span>{{dataAir.pressure}}pa</span>
              </li>
              <li>
                噪声
                <span>{{dataAir.noise}}db</span>
              </li>
              <li>
                风向
                <span>{{dataAir.winddirection}}风</span>
              </li>
              <li>
                PM2.5
                <span>{{dataAir.pmtwopointfive}}ug/m³</span>
              </li>
              <li>
                PM10
                <span>{{dataAir.pmten}}ug/m³</span>
              </li>
            </ul>
          </div>
        </div>
        <div class="contentSub">
          <div class="bodyTitle">空气质量月统计</div>
          <div class="calcH" ref="kqzlytjChart"></div>
        </div>
      </div>
      <div class="middle">
        <div class="entry">
          <div class="entryMain"></div>
          <div class="entryMain entryMainTurn"></div>
          <div class="earth" @click="pushIndex"></div>
        </div>
        <div class="middleBottom trans-bottom-index trans-bottom-index-delay-7">
          <div class="topTitle">实时设备在线率</div>
          <div class="calcH" ref="sssbzxlChart"></div>
        </div>
      </div>
      <div class="right contentMain trans-right-index trans-right-index-delay-7">
        <div class="contentSub">
          <div class="topTitle">实时设备状态</div>

          <div style="display:none;">{{indexData}}</div>
          <div class="calcH">
            <div class="flex">
              <div class="hang">
                <div class="e_box">
                  <div class="e_icon e_icon1">
                    <div class="e_icon e_icon1_oc move1"></div>
                  </div>
                </div>
              </div>
              <div class="hang">
                <div class="fontsize_z pucolor">
                  <Num :value="wsData.lighttotal" />
                </div>
                <div class="fontsize_q">照明总数</div>
              </div>
              <div class="hang">
                <div class="fontsize_z pucolor_q">
                  <Num :value="wsData.lightonline" />
                </div>
                <div>在线</div>
              </div>
              <div class="hang">
                <div class="fontsize_z pucolor_w">
                  <Num :value="wsData.lightoffline" />
                </div>
                <div>离线</div>
              </div>
            </div>
            <div class="flex">
              <div class="hang">
                <div class="e_box">
                  <div class="e_icon e_icon2">
                    <div class="e_icon e_icon1_oc move1"></div>
                  </div>
                </div>
              </div>
              <div class="hang">
                <div class="fontsize_z pucolor">
                  <Num :value="wsData.ledtotal" />
                </div>
                <div class="fontsize_q">LED总数</div>
              </div>
              <div class="hang">
                <div class="fontsize_z pucolor_q">
                  <Num :value="wsData.ledonline" />
                </div>
                <div>在线</div>
              </div>
              <div class="hang">
                <div class="fontsize_z pucolor_w">
                  <Num :value="wsData.ledoffline" />
                </div>
                <div>离线</div>
              </div>
            </div>
            <div class="flex border_n">
              <div class="hang">
                <div class="e_box">
                  <div class="e_icon e_icon3">
                    <div class="e_icon e_icon1_oc move1"></div>
                  </div>
                </div>
              </div>
              <div class="hang">
                <div class="fontsize_z pucolor">
                  <Num :value="wsData.lcdtotal" />
                </div>
                <div class="fontsize_q">环测总数</div>
              </div>
              <div class="hang">
                <div class="fontsize_z pucolor_q">
                  <Num :value="wsData.lcdonline" />
                </div>
                <div>在线</div>
              </div>
              <div class="hang">
                <div class="fontsize_z pucolor_w">
                  <Num :value="wsData.lcdoffline" />
                </div>
                <div>离线</div>
              </div>
            </div>
          </div>
        </div>
        <div class="contentSub">
          <div class="bodyTitle">本月告警占比分析</div>
          <div class="calcH" ref="bygjzbfxChart"></div>
        </div>
        <div class="contentSub">
          <div class="bodyTitle">告警统计分析</div>
          <div class="calcH" ref="gjtjfxChart"></div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Num from "../../components/number";
import Ther from "../../icon/thermometer";
import Good from "../../icon/good";
import Rain from "../../icon/rain";
import echarts from "echarts";
import Vue from "vue";

export default {
  data() {
    var self = this;
    const COLORS = { LED屏: "#00FFFB", 环境监测: "#55FE7C", 照明: "#FF9500" };
    var emptyItem = {
      value: 0.1,
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
      wsData: {
        lighttotal: 0,
        lightonline: 0,
        lightoffline: 0,
        ledtotal: 0,
        ledonline: 0,
        ledoffline: 0,
        lcdtotal: 0,
        lcdonline: 0,
        lcdoffline: 0
      },
      airdata: {
        ringtemperature: 1,
        ringwetting: 2,
        pressure: 3,
        winddirection: "北",
        windspeed: "0",
        pmtwopointfive: 3,
        pmten: 3,
        noise: 10
      },
      airquality: "优",
      ledRate: 0,
      lcdRate: 0,
      lightsRate: 0,
      allData: [],
      eLoading: 0,
      tiemrObj: {
        day: "",
        tiems: "",
        str: ""
      },
      timer: null,
      sssbzxl_option: {
        textStyle: {
          color: "#fff"
        },
        // tooltip:{},
        series: [
          {
            name: "LED屏",
            type: "pie",
            center: ["20%", "40%"],
            radius: ["45%", "50%"],
            hoverAnimation: false,
            labelLine: {
              show: false
            },
            data: [
              {
                value: 0,
                label: {
                  align: "center",
                  position: "center",
                  formatter: function(param) {
                    return `{p|${Math.round(param.percent * 10) / 10}}%`;
                  },
                  rich: {
                    p: {
                      color: "#fff",
                      fontSize: 34
                    }
                  }
                },
                itemStyle: {
                  color: COLORS["LED屏"]
                }
              },
              {
                value: 0,
                name: "invisible",
                label: {
                  fontSize: 18,
                  padding: [220, 0, 0, 0],
                  position: "center",
                  formatter: "{a}"
                },
                itemStyle: {
                  color: "#ffffff20"
                }
              }
            ]
          },
          {
            name: "环境监测",
            type: "pie",
            center: ["50%", "40%"],
            radius: ["45%", "50%"],
            hoverAnimation: false,
            labelLine: {
              show: false
            },
            data: [
              {
                value: 0,
                label: {
                  align: "center",
                  position: "center",
                  formatter: function(param) {
                    return `{p|${Math.round(param.percent * 10) / 10}}%`;
                  },
                  rich: {
                    p: {
                      color: "#fff",
                      fontSize: 34
                    }
                  }
                },
                itemStyle: {
                  color: COLORS["环境监测"]
                }
              },
              {
                value: 0,
                name: "invisible",
                label: {
                  fontSize: 18,
                  padding: [220, 0, 0, 0],
                  position: "center",
                  formatter: "{a}"
                },
                itemStyle: {
                  color: "#ffffff20"
                }
              }
            ]
          },
          {
            name: "照明",
            type: "pie",
            center: ["80%", "40%"],
            radius: ["45%", "50%"],
            hoverAnimation: false,
            labelLine: {
              show: false
            },
            data: [
              {
                value: 0,
                label: {
                  align: "center",
                  position: "center",
                  formatter: function(param) {
                    return `{p|${Math.round(param.percent * 10) / 10}}%`;
                  },
                  rich: {
                    p: {
                      color: "#fff",
                      fontSize: 34
                    }
                  }
                },
                itemStyle: {
                  color: COLORS["照明"]
                }
              },
              {
                value: 0,
                name: "invisible",
                label: {
                  fontSize: 18,
                  padding: [220, 0, 0, 0],
                  position: "center",
                  formatter: "{a}"
                },
                itemStyle: {
                  color: "#ffffff20"
                }
              }
            ]
          }
        ]
      },
      kqzlytj_option: {
        tooltip: {},
        textStyle: {
          color: "#fff"
        },
        series: [
          {
            name: "空气质量",
            type: "pie",
            //hoverOffset: 15,
            startAngle: 40,
            radius: ["30%", "70%"],
            label: {
              fontSize: 16,
              formatter(params) {
                var percent = 0;
                if (params.data.total != 0) {
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
      gjtjfx_option: {
        color: Object.values(COLORS),
        grid: {
          top: 40,
          left: 30,
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
        legend: {
          right: 20,
          top: 0,
          itemWidth: 18,
          itemHeight: 12,
          textStyle: {
            color: "#fff",
            padding: [3, 0, 0, 0]
          },
          data: Object.keys(COLORS)
        },
        xAxis: {
          name: "",
          type: "category",
          nameTextStyle: {
            padding: [25, 0, 0, -25]
          },
          data: [...new Array(7)].map((item, index) => {
            var date = new Date();

            date.setDate(date.getDate() - (7 - index - 1));
            return date.getDate();
          }),
          axisLine: {
            show: false
          },
          axisTick: {
            show: false
          }
        },
        yAxis: {
          name: "",
          type: "value",
          nameGap: 20,
          nameTextStyle: {
            padding: [0, 0, 0, -30]
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
            name: "LED屏",
            type: "bar",
            barWidth: "16%",
            itemStyle: {
              color: self.$options.methods.createLinearColor_bar(
                COLORS["LED屏"]
              )
            },
            data: [...new Array(7)].map((item, index) => 0)
          },
          {
            name: "环境监测",
            type: "bar",
            barWidth: "16%",
            itemStyle: {
              color: self.$options.methods.createLinearColor_bar(
                COLORS["环境监测"]
              )
            },
            data: [...new Array(7)].map((item, index) => 0)
          },
          {
            name: "照明",
            type: "bar",
            barWidth: "16%",
            itemStyle: {
              color: self.$options.methods.createLinearColor_bar(COLORS["照明"])
            },
            data: [...new Array(7)].map((item, index) => 0)
          }
        ]
      },
      bygjzbfx_option: {
        tooltip: {},
        title: {
          text: "0\n{a|告警总数}",
          textAlign: "center",
          left: "59%",
          top: "middle",
          textStyle: {
            fontWeight: "normal",
            color: "#fff",
            fontSize: 26,
            rich: {
              a: {
                color: "#bbb",
                fontSize: 13
              }
            }
          }
        },
        legend: {
          orient: "vertical",
          left: 10,
          top: "center",
          itemWidth: 6,
          itemHeight: 35,
          itemGap: 10,
          textStyle: {
            color: "#bbb",
            fontSize: 12,
            lineHeight: 20,
            rich: {
              a: {
                padding: [0, 0, 0, 5],
                color: "#fff",
                fontSize: 18
              }
            }
          },
          formatter: name => {
            switch (name) {
              case "LED屏":
                return "LED屏\r\n{a|0}";
              case "照明":
                return "照明\r\n{a|0}";
              case "环境监测":
                return "环境监测\r\n{a|0}";
              default:
                break;
            }
          }
        },
        series: [
          {
            type: "pie",
            radius: ["65%", "75%"],
            center: ["60%", "50%"],
            hoverAnimation: false,
            z: 10,
            label: {
              fontSize: 18,
              fontWeight: "bold",
              formatter: "{d}%"
            },
            data: [
              {
                value: 0,
                name: "LED屏",
                itemStyle: {
                  color: "rgba(250, 90, 11, 1)"
                }
              },
              {
                value: 0,
                name: "照明",
                itemStyle: {
                  color: "rgba(100, 217, 68, 1)"
                }
              },
              {
                value: 0,
                name: "环境监测",
                itemStyle: {
                  color: "rgba(4, 232, 222, 1)"
                }
              }
            ]
          },
          {
            type: "pie",
            radius: ["54%", "64%"],
            center: ["60%", "50%"],
            hoverAnimation: false,
            label: {
              show: false
            },
            data: [
              {
                value: 0,
                name: "LED屏",
                itemStyle: {
                  opacity: 0.8,
                  color: "rgba(250, 90, 11, 1)"
                }
              },
              {
                value: 0,
                name: "照明",
                itemStyle: {
                  opacity: 0.8,
                  color: "rgba(100, 217, 68, 1)"
                }
              },
              {
                value: 0,
                name: "环境监测",
                itemStyle: {
                  opacity: 0.8,
                  color: "rgba(4, 232, 222, 1)"
                }
              }
            ]
          },
          {
            type: "pie",
            radius: ["43%", "53%"],
            center: ["60%", "50%"],
            hoverAnimation: false,
            label: {
              show: false
            },
            data: [
              {
                value: 0,
                name: "LED屏",
                itemStyle: {
                  opacity: 0.6,
                  color: "rgba(250, 90, 11, 1)"
                }
              },
              {
                value: 0,
                name: "照明",
                itemStyle: {
                  opacity: 0.6,
                  color: "rgba(100, 217, 68, 1)"
                }
              },
              {
                value: 0,
                name: "环境监测",
                itemStyle: {
                  opacity: 0.6,
                  color: "rgba(4, 232, 222, 1)"
                }
              }
            ]
          }
        ]
      }
    };
  },
  components: {
    Num,
    Ther,
    Good,
    Rain
  },
  computed: {
    indexData() {
      var self = this;
      if (this.$store.getters.websocketData[207001]) {
        const wsMsg = this.$store.state.websocket[207001].msg;
        for (let index = 0; index < wsMsg.length; index++) {
          switch (wsMsg[index].name) {
            case "照明":
              self.wsData.lighttotal = wsMsg[index].offsum + wsMsg[index].onsum;
              self.wsData.lightonline = wsMsg[index].onsum;
              self.wsData.lightoffline = wsMsg[index].offsum;

              self.sssbzxl_option.series[2].data[0].value =
                Math.round(
                  (self.wsData.lightonline / self.wsData.lighttotal) * 1000
                ) / 10;
              self.sssbzxl_option.series[2].data[1].value =
                Math.round(
                  (self.wsData.lightoffline / self.wsData.lighttotal) * 1000
                ) / 10;
              break;
            case "Led屏":
              self.wsData.ledtotal = wsMsg[index].offsum + wsMsg[index].onsum;
              self.wsData.ledonline = wsMsg[index].onsum;
              self.wsData.ledoffline = wsMsg[index].offsum;

              self.sssbzxl_option.series[0].data[0].value =
                Math.round(
                  (self.wsData.ledonline / self.wsData.ledtotal) * 1000
                ) / 10;
              self.sssbzxl_option.series[0].data[1].value =
                Math.round(
                  (self.wsData.ledoffline / self.wsData.ledtotal) * 1000
                ) / 10;
              break;
            case "环测":
              self.wsData.lcdtotal = wsMsg[index].offsum + wsMsg[index].onsum;
              self.wsData.lcdonline = wsMsg[index].onsum;
              self.wsData.lcdoffline = wsMsg[index].offsum;

              self.sssbzxl_option.series[1].data[0].value =
                Math.round(
                  (self.wsData.lcdonline / self.wsData.lcdtotal) * 1000
                ) / 10;
              self.sssbzxl_option.series[1].data[1].value =
                Math.round(
                  (self.wsData.lcdoffline / self.wsData.lcdtotal) * 1000
                ) / 10;
              break;
          }
        }
        // console.log(self.wsData);
        if (self.$refs.sssbzxlChart) {
          var sssbzxlChart = self.$echarts.getInstanceByDom(
            self.$refs.sssbzxlChart
          );

          sssbzxlChart.setOption(self.sssbzxl_option);
        }

        return this.wsData;
      } else {
        return this.wsData;
      }
    },
    dataAir() {
      if (this.$store.getters.websocketData[207002]) {
        let air = this.$store.getters.websocketData[207002].msg.pmtwopointfive;
        if (air <= 50) {
          this.airquality = "优";
        } else if (air > 50 && air <= 100) {
          this.airquality = "良";
        } else if (air > 100 && air <= 200) {
          this.airquality = "中";
        } else if (air > 200 && air <= 300) {
          this.airquality = "差";
        }
        this.$store.getters.websocketData[207002].msg.winddirection = Vue.prototype.$degree2Direction(
          this.$store.getters.websocketData[207002].msg.winddirection
        );
        this.$store.getters.websocketData[207002].msg.windspeed = Vue.prototype.$metres2Grade(
          this.$store.getters.websocketData[207002].msg.windspeed
        );

        return this.$store.getters.websocketData[207002].msg;
      } else {
        return this.airdata;
      }
    }
  },
  created() {
    //右栏时间表
    let terval = null;
    let dates = new Date();

    let Year = dates.getFullYear(); //获取年
    let Monthr = dates.getMonth() + 1; //获取月
    let tian = dates.getDate(); //获取天
    this.tiemrObj.date = Year + "-" + Monthr + "-" + this.muns(tian);

    let day = dates.getDay(); //获取周
    let arrs = ["日", "一", "二", "三", "四", "五", "六"];
    this.tiemrObj.day = "星期" + arrs[day];
    this.setTimers();
  },
  mounted() {
    this.$nextTick(function() {
      var self = this;
      this.timer = setInterval(this.setTimers, 1000);
      setTimeout(() => {
        this.$refs.nav.className = "";
        this.$refs.nav.className = "nav is-visible";
        this.$refs.indexMain.className = "";
        this.$refs.indexMain.className = "indexMain clearfix is-visible";
      }, 200);
    });
    this.initCharts();
  },
  methods: {
    pushIndex() {
      this.$router.push({ name: "lightpole" });
    },
    singout() {
      var self = this;
      this.$api.post2("/user/logout").then(function(res) {
        sessionStorage.login = false;
        self.$router.push({ name: "login" });
        console.log(res);
      });
    },
    muns(tiem) {
      return tiem < 10 ? "0" + tiem : tiem;
    },
    setTimers() {
      let oDate = new Date();
      let tiems = null;
      let str = "";
      let hours = oDate.getHours();
      let minute = oDate.getMinutes();
      let seconds = oDate.getSeconds();

      hours = hours < 10 ? "0" + hours : hours;
      minute = minute < 10 ? "0" + minute : minute;
      seconds = seconds < 10 ? "0" + seconds : seconds;
      tiems = hours + ":" + minute + ":" + seconds;
      // console.log("67tiems", tiems);
      if (hours > 12) {
        hours -= 12;
        str = "PM";
      } else {
        str = "AM";
      }

      this.tiemrObj.tiems = tiems;
      this.tiemrObj.str = str;
    },
    updateChart() {
      var self = this;

      this.$api.get(self.path + "/getAirQualityData").then(function(res) {
        if (res.code) {
          console.warn("服务器返回数据异常", res);
          return;
        }
        var kqzlytjChart = self.$echarts.getInstanceByDom(
          self.$refs.kqzlytjChart
        );
        var emptyValue = res.aircount / 100;

        self.kqzlytj_option.series[0].data[0].value = res.you;
        self.kqzlytj_option.series[0].data[2].value = res.liang;
        self.kqzlytj_option.series[0].data[4].value = res.qingdu;
        self.kqzlytj_option.series[0].data[6].value = res.zhongdu;
        self.kqzlytj_option.series[0].data[8].value = res.zhonggdu;

        self.kqzlytj_option.series[0].data[0].total = res.aircount;
        self.kqzlytj_option.series[0].data[2].total = res.aircount;
        self.kqzlytj_option.series[0].data[4].total = res.aircount;
        self.kqzlytj_option.series[0].data[6].total = res.aircount;
        self.kqzlytj_option.series[0].data[8].total = res.aircount;

        self.kqzlytj_option.series[0].data[1].value =
          res.you > 0 ? emptyValue : 0;
        self.kqzlytj_option.series[0].data[3].value =
          res.liang > 0 ? emptyValue : 0;
        self.kqzlytj_option.series[0].data[5].value =
          res.qingdu > 0 ? emptyValue : 0;
        self.kqzlytj_option.series[0].data[7].value =
          res.zhongdu > 0 ? emptyValue : 0;
        self.kqzlytj_option.series[0].data[9].value =
          res.zhonggdu > 0 ? emptyValue : 0;

        kqzlytjChart.setOption(self.kqzlytj_option);
      });

      this.$api.get(self.path + "/getCountReportByMonth").then(function(res) {
        if (res.code) {
          console.warn("服务器返回数据异常", res);
          return;
        }
        var bygjzbfxChart = self.$echarts.getInstanceByDom(
          self.$refs.bygjzbfxChart
        );
        var total =
          res.led.countreport + res.light.countreport + res.frt.countreport;

        self.bygjzbfx_option.title.text = `${total}\n{a|告警总数}`;
        self.bygjzbfx_option.legend.formatter = function(name) {
          switch (name) {
            case "LED屏":
              return `LED屏\r\n{a|${res.led.countreport}}`;
            case "照明":
              return `照明\r\n{a|${res.light.countreport}}`;
            case "环境监测":
              return `环境监测\r\n{a|${res.frt.countreport}}`;
            default:
              break;
          }
        };
        // LED屏
        self.bygjzbfx_option.series[0].data[0].value = res.led.countreport;
        self.bygjzbfx_option.series[0].data[1].value = res.light.countreport;
        self.bygjzbfx_option.series[0].data[2].value = res.frt.countreport;
        // 照明
        self.bygjzbfx_option.series[1].data[0].value = res.led.countreport;
        self.bygjzbfx_option.series[1].data[1].value = res.light.countreport;
        self.bygjzbfx_option.series[1].data[2].value = res.frt.countreport;
        // 环境监测
        self.bygjzbfx_option.series[2].data[0].value = res.led.countreport;
        self.bygjzbfx_option.series[2].data[1].value = res.light.countreport;
        self.bygjzbfx_option.series[2].data[2].value = res.frt.countreport;

        bygjzbfxChart.setOption(self.bygjzbfx_option);
      });

      this.$api.get(self.path + "/getReportDataSevenLate").then(function(res) {
        if (res.code) {
          console.warn("服务器返回数据异常", res);
          return;
        }
        var data = res.seven;
        //  告警统计分析
        var gjtjfxChart = self.$echarts.getInstanceByDom(
          self.$refs.gjtjfxChart
        );
        var data1 = [],
          data2 = [],
          data3 = [];

        Object.values(data).forEach(obj => {
          data1.push(obj.led);
          data2.push(obj.frt);
          data3.push(obj.light);
        });
        self.gjtjfx_option.xAxis.data = Object.keys(data).map(d => {
          var date = new Date();

          date.setDate(date.getDate() - (7 - d));
          return date.getDate();
        });
        // LED屏
        self.gjtjfx_option.series[0].data = data1;
        // 环境监测
        self.gjtjfx_option.series[1].data = data2;
        // 照明
        self.gjtjfx_option.series[2].data = data3;

        gjtjfxChart.setOption(self.gjtjfx_option);
      });
    },
    initCharts() {
      var self = this;
      var sssbzxlChart = this.$echarts.init(this.$refs.sssbzxlChart);

      sssbzxlChart.setOption(this.sssbzxl_option);
      window.addEventListener("resize", sssbzxlChart.resize);

      var kqzlytjChart = this.$echarts.init(this.$refs.kqzlytjChart);

      kqzlytjChart.setOption(this.kqzlytj_option);
      window.addEventListener("resize", kqzlytjChart.resize);

      var bygjzbfxChart = this.$echarts.init(this.$refs.bygjzbfxChart);

      bygjzbfxChart.setOption(this.bygjzbfx_option);
      window.addEventListener("resize", bygjzbfxChart.resize);

      var gjtjfxChart = this.$echarts.init(this.$refs.gjtjfxChart);

      gjtjfxChart.setOption(this.gjtjfx_option);
      window.addEventListener("resize", gjtjfxChart.resize);

      self.updateChart();

      // 空气质量月统计饼图自动高亮
      var kqzlytjIndex = 0;
      kqzlytjHighlight();
      function kqzlytjHighlight() {
        var total = kqzlytjChart.getOption().series[0].data.length;

        if (kqzlytjIndex > total - 2) {
          kqzlytjIndex = 0;
        }
        self.downplay({
          chart: kqzlytjChart,
          dataIndex: kqzlytjIndex - 2 < 0 ? total - 2 : kqzlytjIndex - 2
        });
        self.highlight({
          chart: kqzlytjChart,
          dataIndex: kqzlytjIndex
        });

        kqzlytjIndex += 2;

        setTimeout(function() {
          kqzlytjHighlight();
        }, 3000);
      }
    },
    downplay({ chart, seriesIndex, seriesName, dataIndex, name }) {
      chart.dispatchAction({
        type: "downplay",
        seriesIndex,
        seriesName,
        dataIndex,
        name
      });
    },
    highlight({ chart, seriesIndex, seriesName, dataIndex, name }) {
      chart.dispatchAction({
        type: "highlight",
        seriesIndex,
        seriesName,
        dataIndex,
        name
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
            offset: 1,
            color: colorStop || colorStart + "00"
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
    }
  },
  beforeRouteLeave(to, from, next) {
    this.$refs.nav.className = "nav";
    this.$refs.indexMain.className = "indexMain clearfix";
    setTimeout(() => {
      next();
    }, 1500);
  }
};
</script>
<style lang="scss" scope>
.imgg {
  position: relative;
  right: 2%;
  top: 4%;
}
.hang {
  display: flex;
  flex: 1;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  letter-spacing: 0.02rem;
}
.fontsize_z {
  font-size: 0.36rem;
}
.fontsize_q {
  font-size: 0.17rem;
}
.pucolor {
  color: rgba(31, 247, 242, 1);
}
.pucolor_q {
  color: rgba(137, 250, 139, 1);
}
.pucolor_w {
  color: rgba(255, 156, 0, 1);
}
.flex {
  width: 100%;
  height: 33.3%;
  display: flex;
  border-bottom: rgba(31, 247, 242, 0.3) solid 0.01rem;
  width: 92%;
  margin: 0 auto;
  font-size: 0.17rem;
  .e_icon {
    width: 0.6rem;
    height: 0.6rem;
  }
}
.e_icon0_oc {
  position: absolute;
  background: url("../../assets/img/citem0_oc.png") no-repeat center/contain;
}
.e_icon0 {
  position: absolute;
  background: url("../../assets/img/citem0.png") no-repeat center/contain;
}
.e_icon1_oc {
  background: url("../../assets/img/citem1_oc.png") no-repeat center/contain;
}
.e_icon1 {
  background: url("../../assets/img/site/icon_light.png") no-repeat
    center/contain;
}
.e_icon2 {
  background: url("../../assets/img/site/icon_led.png") no-repeat center/contain;
}
.e_icon3 {
  background: url("../../assets/img/site/icon_lcd.png") no-repeat center/contain;
}
.border_n {
  border: none !important;
}
</style>