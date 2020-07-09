<template>
  <div class="idx_wrap">
    <div class="cover_box"></div>
    <div class="content_box">
      <div class="idx_header">
        <div>
          <i class="icons">&#xe6ad;</i>
          <span style="cursor: pointer" @click="btnEnter">点击进入>></span>
        </div>
        <div>
          <p>杨雁路物联网管控平台</p>
          <p>Iot Management Platform</p>
        </div>
        <div>
          <i class="icons">&#xe62c;</i>
          <span style="cursor: pointer" @click="btnExit">退出</span>
        </div>
      </div>
      <div class="main_box">
        <!--                上盒子-->
        <div class="up_box">
          <div class="l_box1 box_border">
            <div class="box_title">
              <i class="icons">&#xe623;</i>
              <span>空气监测</span>
            </div>
            <div class="air_box">
              <div class="a_box1">
                <div class="temp_box">
                  <i></i>
                  <span>38°C</span>
                  <span>温度</span>
                </div>
                <div class="aq_box">
                  <i>
                    <Good style="width: 100%;height: 100%;"></Good>
                  </i>
                  <span>优</span>
                  <span>空气</span>
                </div>
              </div>
              <div class="a_box2">
                <div class="a_item color-lv">
                  <p>6%RH</p>
                  <p>
                    <Water style="width: .5rem;"></Water>
                    <span>湿度</span>
                  </p>
                </div>
                <div class="a_item color-cheng">
                  <p>123Pa</p>
                  <p>
                    <Qiya style="width: .5rem;"></Qiya>
                    <span>气压</span>
                  </p>
                </div>
                <div class="a_item color-lan">
                  <p>49μg/m³</p>
                  <p>
                    <Pm25 style="width: .5rem;height: .4rem;"></Pm25>
                    <span>PM2.5</span>
                  </p>
                </div>
                <div class="a_item color-hong">
                  <p>6db</p>
                  <p>
                    <Sound style="width: .5rem;"></Sound>
                    <span>噪声</span>
                  </p>
                </div>
                <div class="a_item color-huang">
                  <p>35m/s</p>
                  <p>
                    <Wind style="width: .5rem;"></Wind>
                    <span>风速</span>
                  </p>
                </div>
                <div class="a_item color-lan-62d">
                  <p>35μg/m³</p>
                  <p>
                    <Pm10 style="width: .5rem;"></Pm10>
                    <span>PM10</span>
                  </p>
                </div>
                <div class="a_item color-lan-389">
                  <p>45°</p>
                  <p>
                    <Fenxiang style="width: .5rem;"></Fenxiang>
                    <span>风向</span>
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div class="c_box1 box_border"></div>
          <div class="r_box">
            <div class="r_box1 box_border">
              <div class="box_title">
                <i class="icons">&#xe62a;</i>
                <span>实时设备状态</span>
              </div>
              <ul class="ds_list">
                <li>
                  <span>设备名称</span>
                  <span>在线</span>
                  <span>离线</span>
                </li>
                <li>
                  <span>照明</span>
                  <span>38</span>
                  <span>62</span>
                </li>
                <li>
                  <span>LED屏</span>
                  <span>7</span>
                  <span>3</span>
                </li>
                <li>
                  <span>环境监测</span>
                  <span>5</span>
                  <span>5</span>
                </li>
              </ul>
            </div>
            <div class="r_box2 box_border">
              <div class="box_title">
                <i class="icons">&#xe7a7;</i>
                <span>本月告警占比分析</span>
              </div>
              <div class="charts" ref="bygjzbfxChart"></div>
            </div>
          </div>
        </div>
        <!--                下盒子-->
        <div class="down_box">
          <div class="l_box2 box_border">
            <div class="box_title">
              <i class="icons">&#xe7a7;</i>
              <span>空气质量月统计</span>
            </div>
            <div class="charts" ref="kqzlytjChart"></div>
          </div>
          <div class="c_box2">
            <div class="cb2_title">
              <i class="icons">&#xe778;</i>
              <span>设备运行状态统计</span>
            </div>
            <div class="cb2_tbox">
              <div>
                <span>智慧照明</span>
              </div>
              <div>
                <span>环境市政</span>
              </div>
              <div>
                <span>LED屏</span>
              </div>
            </div>
            <div class="cb2_cbox">
              <div class="cb2_item">
                <div class="c_green move1"></div>
                <span>100%</span>
                <p>在线率</p>
              </div>
              <div class="cb2_item">
                <div class="c_orange move1"></div>
                <span>100%</span>
                <p>亮灯率</p>
              </div>
              <div class="cb2_item">
                <div class="c_green move1"></div>
                <span>100%</span>
                <p>在线率</p>
              </div>
              <div class="cb2_item">
                <div class="c_green move1"></div>
                <span>100%</span>
                <p>在线率</p>
              </div>
            </div>
          </div>
          <div class="r_box3 box_border">
            <div class="box_title">
              <i class="icons">&#xe657;</i>
              <span>告警统计分析</span>
            </div>
            <div class="charts" ref="gjtjfxChart"></div>
          </div>
        </div>
        <!--                左侧盒子-->
        <!--                <div class="left_box">-->
        <!--                </div>-->
        <!--                中间盒子-->
        <!--                <div class="center_box">-->
        <!--                </div>-->
        <!--                右侧盒子-->
        <!--                <div class="right_box">-->
        <!--                </div>-->
      </div>
    </div>
  </div>
</template>

<script>
import echarts from "echarts";
import "echarts/lib/echarts";
export default {
  name: "indexVer2",
  data() {
    var self = this;
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
      option_bygjzbfxtj: {
        tooltip: {},
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
                return "LED屏\r\n{a|25}";
              case "照明":
                return "照明\r\n{a|70}";
              case "环境监测":
                return "环境监测\r\n{a|70}";
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
              formatter: "{d}%"
            },
            data: [
              {
                value: 25,
                name: "LED屏",
                itemStyle: {
                  color: "rgba(250, 90, 11, 1)"
                }
              },
              {
                value: 70,
                name: "照明",
                itemStyle: {
                  color: "rgba(100, 217, 68, 1)"
                }
              },
              {
                value: 70,
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
                value: 25,
                name: "LED屏",
                itemStyle: {
                  opacity: 0.8,
                  color: "rgba(250, 90, 11, 1)"
                }
              },
              {
                value: 70,
                name: "照明",
                itemStyle: {
                  opacity: 0.8,
                  color: "rgba(100, 217, 68, 1)"
                }
              },
              {
                value: 70,
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
                value: 25,
                name: "LED屏",
                itemStyle: {
                  opacity: 0.6,
                  color: "rgba(250, 90, 11, 1)"
                }
              },
              {
                value: 70,
                name: "照明",
                itemStyle: {
                  opacity: 0.6,
                  color: "rgba(100, 217, 68, 1)"
                }
              },
              {
                value: 70,
                name: "环境监测",
                itemStyle: {
                  opacity: 0.6,
                  color: "rgba(4, 232, 222, 1)"
                }
              }
            ]
          }
        ]
      },
      option_kqzlytj: {
        tooltip: {},
        textStyle: {
          color: "#fff"
        },
        series: [
          {
            name: "",
            type: "pie",
            //hoverOffset: 15,
            radius: ["30%", "70%"],
            label: {
              formatter(params) {
                var percent = Math.round(
                  (params.value * 1000) /
                  params.data.total
                )/10;
                return `${params.name} : ${percent}%`;
              }
            },
            data: [
              {
                name: "优",
                value: 3,
                total: 24,
                itemStyle: {
                  color: self.$options.methods.createLinearColor_pie(
                    "rgba(0,242,219,1)"
                  )
                }
              },
              emptyItem,
              {
                name: "良",
                value: 5,
                total: 24,
                itemStyle: {
                  color: self.$options.methods.createLinearColor_pie(
                    "rgba(104,223,67,1)"
                  )
                }
              },
              emptyItem,
              {
                name: "轻度",
                value: 4,
                total: 24,
                itemStyle: {
                  color: self.$options.methods.createLinearColor_pie(
                    "rgba(255,180,0,1)"
                  )
                }
              },
              emptyItem,
              {
                name: "中度",
                value: 1,
                total: 24,
                itemStyle: {
                  color: self.$options.methods.createLinearColor_pie(
                    "rgba(255,91,10,1)"
                  )
                }
              },
              emptyItem,
              {
                name: "重度",
                value: 6,
                total: 24,
                itemStyle: {
                  color: self.$options.methods.createLinearColor_pie(
                    "rgba(219,15,145,1)"
                  )
                }
              },
              emptyItem,
              {
                name: "严重",
                value: 5,
                total: 24,
                itemStyle: {
                  color: self.$options.methods.createLinearColor_pie(
                    "rgba(104,23,196,1)"
                  )
                }
              },
              emptyItem
            ]
          }
        ]
      },
      option_gjtjfx: {
        color: [
          "rgba(1, 233, 212, 1)",
          "rgba(250, 90, 11, 1)",
          "rgba(100, 217, 68, 1)"
        ],
        textStyle: {
          color: "#fff"
        },
        grid: {
          top: 60,
          left: 10,
          right: 10,
          bottom: 20,
          containLabel: true
        },
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "shadow"
          }
        },
        legend: {
          top: 20,
          right: 10,
          itemWidth: 20,
          itemHeight: 10,
          textStyle: {
            color: "#fff"
          }
        },
        xAxis: {
          type: "category",
          data: [...new Array(7)].map((item, index) => index + 1 + "日"),
          axisLine: {
            show: false
          },
          axisTick: { show: false }
        },
        yAxis: {
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
            name: "照明",
            type: "bar",
            barWidth: 6,
            barGap: "60%",
            itemStyle: {
              barBorderRadius: 10,
              color: self.$options.methods.createLinearColor_bar(
                "rgba(1, 233, 212, 1)"
              )
            },
            data: [85, 82, 98, 82, 90, 76, 114]
          },
          {
            name: "LED",
            type: "bar",
            barWidth: 6,
            barGap: "60%",
            itemStyle: {
              barBorderRadius: 10,
              color: self.$options.methods.createLinearColor_bar(
                "rgba(250, 90, 11, 1)"
              )
            },
            data: [25, 82, 98, 82, 50, 106, 114]
          },
          {
            name: "环境监测",
            type: "bar",
            barWidth: 6,
            barGap: "60%",
            itemStyle: {
              barBorderRadius: 10,
              color: self.$options.methods.createLinearColor_bar(
                "rgba(100, 217, 68, 1)"
              )
            },
            data: [15, 82, 68, 82, 90, 106, 64]
          }
        ]
      }
    };
  },
  mounted() {
    var self = this;
    self.initCharts();
  },
  methods: {
    initCharts() {
      var self = this;

      var bygjzbfxChart = self.$echarts.init(self.$refs.bygjzbfxChart);

      bygjzbfxChart.setOption(self.option_bygjzbfxtj);
      window.addEventListener("resize", bygjzbfxChart.resize);

      var kqzlytjChart = self.$echarts.init(self.$refs.kqzlytjChart);

      kqzlytjChart.setOption(self.option_kqzlytj);
      window.addEventListener("resize", kqzlytjChart.resize);

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

      var gjtjfxChart = self.$echarts.init(self.$refs.gjtjfxChart);

      gjtjfxChart.setOption(self.option_gjtjfx);
      window.addEventListener("resize", gjtjfxChart.resize);
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
            offset: 0.7,
            color:
              colorStop ||
              colorStart.substring(0, colorStart.lastIndexOf(",")) + ", 0.8)"
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
            color:
              colorStop ||
              colorStart.substring(0, colorStart.lastIndexOf(",")) + ", 0)"
          }
        ]
      };
    },
    btnEnter() {
      this.$router.push({ name: "lightpole" });
      window.location.href = '/lightpole'
    },
    btnExit() {
      var self = this
        this.$api.post2('/user/logout').then(function(res){
            sessionStorage.login = false
            location.reload()
            console.log(res)
        })
    }
  }
};
</script>

<style lang="scss" scoped>
.idx_wrap {
  width: 100%;
  height: 100vh;
  background: url("../../assets/img/index/idx_wbg.png") no-repeat center/cover;
  color: #fff;

  p,
  span,
  i {
    text-shadow: none;
  }

  .cover_box {
    position: absolute;
    z-index: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 58, 90, 0.8);
  }

  .content_box {
    position: absolute;
    z-index: 1;
    top: 0;
    width: 100%;
    min-width: 15.5rem;
    height: 100%;
  }

  div {
    box-sizing: border-box;

    i,
    span {
      vertical-align: middle;
    }
  }

  .idx_header {
    overflow: hidden;
    display: flex;
    flex-wrap: nowrap;
    justify-content: space-between;
    width: 100%;
    height: 0.95rem;
    background: url("../../assets/img/index/idx_hbg.png") no-repeat center 0/100%
      100%;
    color: #0bfef6;
    text-align: center;

    div:nth-child(1),
    div:nth-child(3) {
      padding-top: 0.1rem;
      width: 2rem;
      height: 0.95rem;
      font-size: 0.18rem;
      line-height: 0.95rem;
    }

    div:nth-child(2) {
      /*width: calc(100vw - 4rem);*/
      height: 0.95rem;

      p:nth-child(1) {
        padding-top: 0.25rem;
        font-size: 0.3rem;
        line-height: 0.4rem;
        text-shadow: 0 0.04rem 0.02rem #000;
      }

      p:nth-child(2) {
        font-size: 0.12rem;
      }
    }
  }

  .main_box {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
    overflow: hidden;
    width: 100%;
    height: calc(100vh - 0.95rem);

    .box_border {
      border: 1px solid;
      border-image: -webkit-linear-gradient(transparent, #00fff6) 10 10;
      border-image: -moz-linear-gradient(transparent, #00fff6) 10 10;
      border-image: linear-gradient(transparent, #00fff6) 10 10;
      box-shadow: 0 0 0.05rem 0 rgba(0, 255, 246, 0.3);
    }

    .box_title {
      margin: -1px 0 0 -1px;
      padding-left: 0.1rem;
      width: 3.5rem;
      height: 0.38rem;
      background: url("../../assets/img/index/idx_title.png") no-repeat 0 0/100%
        100%;
      font-size: 0.17rem;
      line-height: 0.38rem;

      i {
        color: #efef16;
      }
    }
    .charts {
      width: 100%;
      height: calc(100% - 0.38rem);
    }

    .up_box {
      display: flex;
      flex-wrap: nowrap;
      justify-content: space-between;
      margin-top: 0.18rem;
      width: 100%;
      height: 55%;

      .l_box1,
      .r_box {
        width: 25%;
        min-width: 4rem;
      }
      .r_box {
        height: 100%;
      }

      .l_box1 {
        height: 100%;

        .air_box {
          height: calc(100% - 0.6rem);

          .a_box1 {
            overflow: hidden;
            margin-top: 0.3rem;
            height: 20%;

            .temp_box,
            .aq_box {
              width: 1.2rem;
              height: 0.7rem;

              i,
              span {
                float: left;
                display: block;
              }

              i {
                margin-right: 0.08rem;
                width: 0.56rem;
                height: 100%;
              }

              span {
                width: 0.5rem;
              }

              span:nth-child(2) {
                padding-top: 0.1rem;
                font-size: 0.3rem;
                line-height: 0.3rem;
              }

              span:nth-child(3) {
                font-size: 0.16rem;
              }
            }

            .temp_box {
              float: left;
              margin-left: 0.2rem;

              i {
                background: url("../../assets/img/index/temp_bar.png") no-repeat
                  center/contain;
              }
            }

            .aq_box {
              float: right;
              margin-right: 0.2rem;
            }
          }

          .a_box2 {
            display: flex;
            flex-wrap: wrap;
            align-content: space-around;
            height: 74%;
            text-align: center;

            .a_item {
              width: 32%;

              p:nth-child(1) {
                font-size: 0.26rem;
                line-height: 0.3rem;
                font-weight: 700;
              }

              p:nth-child(2) {
                font-size: 0.16rem;
                line-height: 0.3rem;
              }
            }
          }
        }
      }

      .c_box1 {
        margin: 0 0.18rem;
        width: 48%;
        min-width: 6.5rem;
        height: 100%;
        background: url("../../assets/img/index/idx_cmap.png") no-repeat
          center/cover;
      }
      .r_box {
        position: relative;
        height: 100%;
        .r_box1 {
          width: 100%;
          height: 45%;

          .ds_list {
            margin-top: 0.08rem;
            width: 100%;

            li {
              display: flex;
              flex-wrap: wrap;
              align-content: space-around;
              height: 0.38rem;
              font-size: 0.16rem;
              line-height: 0.38rem;
              text-align: center;

              span {
                width: 33%;
              }
            }

            li:nth-child(1) {
              background-color: rgba(0, 255, 255, 0.3);
              font-size: 0.17rem;
            }

            li:nth-child(2) {
              color: #04e8de;
            }

            li:nth-child(3) {
              color: #fa5a0b;
            }

            li:nth-child(4) {
              color: #64d944;
            }
          }
        }

        .r_box2 {
          position: absolute;
          bottom: 0;
          width: 100%;
          height: 50%;
        }
      }
    }

    .down_box {
      display: flex;
      flex-wrap: nowrap;
      justify-content: space-between;
      margin-top: 0.18rem;
      width: 100%;
      height: 40%;

      .l_box2,
      .r_box3 {
        width: 25%;
        min-width: 4rem;
      }

      .l_box2 {
        overflow: hidden;
        height: 100%;
      }

      .c_box2 {
        position: relative;
        margin: 0 0.18rem;
        width: 48%;
        min-width: 6.5rem;
        height: 100%;
        background: url("../../assets/img/index/idx_bbg.png") no-repeat
          center/100% 100%;

        .cb2_title {
          position: absolute;
          top: -0.07rem;
          left: 0.56rem;
          font-size: 0.17rem;

          i {
            color: #efef16;
          }
        }

        .cb2_tbox {
          display: flex;
          flex-wrap: wrap;
          align-content: space-around;
          margin: 0.5rem 0 0.3rem 0;
          width: 100%;
          height: 20%;

          div {
            display: inline-block;
            text-align: center;

            span {
              display: inline-block;
              width: 0.8rem;
              height: 0.3rem;
              font-size: 0.16rem;
              line-height: 0.3rem;
              text-align: center;
            }
          }

          div:nth-child(1) {
            width: 50%;

            span {
              background: linear-gradient(left, #033ddd, #008bde);
            }
          }

          div:nth-child(2) {
            width: 25%;

            span {
              background: linear-gradient(left, #037983, #26c68a);
            }
          }

          div:nth-child(3) {
            width: 25%;

            span {
              background: linear-gradient(left, #c15d22, #c99815);
            }
          }
        }

        .cb2_cbox {
          overflow: hidden;

          .cb2_item {
            float: left;
            position: relative;
            width: 25%;
            text-align: center;

            .c_green,
            .c_orange {
              display: inline-block;
              width: 1.27rem;
              height: 1.27rem;
            }

            .c_green {
              background: url("../../assets/img/index/quan_g.png") no-repeat
                center/contain;
            }

            .c_orange {
              background: url("../../assets/img/index/quan_o.png") no-repeat
                center/contain;
            }

            span {
              position: absolute;
              top: 35%;
              left: 0;
              right: 0;
              margin: auto;
              font-size: 0.14rem;
            }

            p {
              font-size: 0.16rem;
              color: #26c68a;
            }
          }

          .cb2_item:nth-child(2) {
            p {
              color: #c99815;
            }
          }
        }
      }

      .r_box3 {
        height: 100%;
      }
    }
  }
}
</style>