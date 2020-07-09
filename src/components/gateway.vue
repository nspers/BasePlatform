<template>
  <!-- 单灯控制 -->
  <div class="geteway">
    <div class="wrapbox" ref="geteway" v-if="$route.path == '/lightpole'">
      <div class="Gateway-Control content-left trans-up trans-up-delay-3">
        <div class="box-title">
          <span class="icons color-huang">&#xe63b;</span>
          <span>单灯控制</span>
        </div>
        <div class="control-content">
          <div class="equipmentCooseBox">
            <span class="titleText">选择分组</span>
            <div class="selectBox">
              <input class="showInput" type="text" v-model="selectValue" />
              <el-select
                v-model="Gateway.value"
                placeholder="请选择"
                size="mini"
                :popper-append-to-body="false"
                @change="handleSelect()"
                @visible-change="visibleChange($event,Gateway.value)"
              >
                <el-option key="-1" label="全部" :value="-1"></el-option>
                <el-option
                  v-for="(item,index) in Gateway.selectData"
                  :key="index"
                  :label="item.groupname"
                  :value="index"
                ></el-option>
              </el-select>
              <div class="select">
                <span :class="{'down':!Gateway.selecting,'up':Gateway.selecting}"></span>
              </div>
            </div>
          </div>
          <div class="control-content_item">
            <span class="item-type">开关</span>
            <div class="item-control">
              <!-- <el-button
                type="warning"
                size="mini"
                class="down"
                style="margin-left:0.2rem"
                @click="handleGatewayControl('down')"
              >关灯</el-button>
              <el-button
                type="success"
                size="mini"
                class="open"
                @click="handleGatewayControl('open')"
              >开灯</el-button>-->
              <el-button
                type="success"
                size="mini"
                class="open fontz"
                style="background-color:rgb(84, 175, 16);width:0.8rem;padding: 0.08rem 0.07rem;"
                @click="handleGatewayControl('open')"
              >开灯</el-button>
              <el-button
                type="success"
                size="mini"
                style="background-color:#CE9351;width:0.8rem;padding: 0.08rem 0.07rem; margin-right: 0.04rem;"
                class="down fontz"
                @click="handleGatewayControl('down')"
              >关灯</el-button>
            </div>
          </div>
          <!-- <div class="control-content_item">
            <span class="item-type">获取网管状态</span>
            <div class="item-control">
              <el-button
                type="success"
                size="mini"
                class="gain"
                @click="handleGatewayControl('open')"
              >获取</el-button>
            </div>
          </div>-->
          <div id="getlight" class="control-content_item">
            <span class="item-type">亮度</span>
            <span style="float:right;margin-left: 0.12rem;width: 0.2rem;">{{ Gateway.light}}</span>

            <div class="item-slider" style="width:2rem">
              <el-slider
                v-model="Gateway.light"
                :disabled="Gateway.isGatewaySlider"
                @change="handleGetewaySlide"
              ></el-slider>
            </div>
          </div>
        </div>
        <div class="Gateway-from">
          <ul class="frombox addtitle getWayAddTitle">
            <div
              style="width:100%;height:100%"
              v-if="!isShow || Gateway.loading"
              v-loading="!isShow || Gateway.loading"
              element-loading-text="拼命加载中"
              element-loading-spinner="el-icon-loading"
              element-loading-background="rgba(0, 0, 0, 0.4)"
            ></div>
            <div v-if="isShow && !Gateway.loading">
              <li class="fromItem-title">
                <div class="lamppostnum">灯杆编号</div>
                <div class="equipmentBox">
                  <checked :target="'all'" @clickChecked="handleChecked" />
                  <!-- <div class="checkedBox" @click="handleAllChecked">
                    <span class="check" v-if="!Gateway.allChecked"></span>
                    <span class="icons color-lan-62d" v-if="Gateway.allChecked">&#xe7b3;</span>
                  </div>-->
                  <div class="lamppostname">灯头</div>
                  <div class="lamppostname">开关</div>
                  <div class="lamppostname">状态</div>
                  <div class="lamppostname">亮度</div>
                </div>
              </li>
              <div class="fromItemBox sbar">
                <li
                  class="fromItem"
                  v-for="(item,index) in GatewayFormData"
                  :class="{'bgEven':(index+1)%2 == 0}"
                  :key="item.index"
                >
                  <div
                    class="lamppostname"
                    style="font-size: .12rem;"
                    @click="dsClick(item.lamppostid)"
                  >
                    <i class="lampostImg">
                      <img src="../../static/data/image/light_g_s.png" />
                      <!-- <img v-if="ele.onoff == 1" src="../../static/data/image/light_g_s.png" />
                      <img v-if="ele.onoff == 0" src="../../static/data/image/light_o_s.png" /> -->
                  </i>
                    {{item.lamppostname}}
                  </div>
                  <!-- <div class="checkedBox" @click="handleChecked(item.lamppostid,index)">
                    <span class="check" v-if="!checkedArray[index].checked"></span>
                    <span
                      class="icons color-lan-62d"
                      style="margin-left: 0.2rem;"
                      v-if="checkedArray[index].checked"
                    >&#xe7b3;</span>
                  </div>-->
                  <div class="equipmentBox">
                    <div class="equipmentStatus" v-for="(ele,i) in item.linghts" :key="i">
                      <checked :target="ele.id" @clickChecked="handleChecked" :key="wuyong" />
                      <!-- <div class="checkedItemBox" @click="handleChecked(ele.id,index)">
                        <span class="check" v-if="!checkedArray[index][i].checked"></span>
                        <span
                          class="icons color-lan-62d"
                          style="margin-left: -0.1rem;"
                          v-if="checkedArray[index][i].checked"
                        >&#xe7b3;</span>
                      </div>-->
                      <span class="num" @click="dsClick(item.lamppostid)">
                        <i>{{ele.name}}</i>
                      </span>
                      <span class="onoff" @click="dsClick(item.lamppostid)">
                        &nbsp;
                        <img src="../assets/img/icon/dui_green.png" v-if="ele.onoff == 1" />
                        <img src="../assets/img/icon/cuo_gray.png" v-if="ele.onoff == 0" />
                      </span>
                      <span class="state" @click="dsClick(item.lamppostid)">
                        <img src="../assets/img/icon/wifi_green.png" v-if="ele.state == 1" />
                        <img src="../assets/img/icon/error_yellow.png" v-if="ele.state == 0" />
                      </span>
                      <span class="val">{{ele.lightValue}}</span>
                    </div>
                  </div>
                </li>
              </div>
            </div>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import checked from "./checked";
import * as mapWork from "../map3d/work";
export default {
  data() {
    return {
      Gateway: {
        light: 0,
        value: -1,
        loading: false,
        isGatewaySlider: true,
        selecting: false,
        selectData: []
      },
      wuyong: 0
    };
  },
  components: {
    checked
  },
  computed: {
    isShow: function() {
      return this.$store.getters.websocketData[220002] ? true : false;
    },

    selectValue: function() {
      if (this.Gateway.value == -1) {
        return "全部";
      } else {
        return this.Gateway.selectData.length
          ? this.Gateway.selectData[this.Gateway.value].groupname
          : null;
      }
    },
    GatewayFormData: function() {
      if (this.$store.getters.websocketData[220002]) {
        this.Gateway.selectData = this.$store.getters.websocketData[220002].msg.groups;
        let newArray;
        if (this.Gateway.value == -1) {
          let array = this.$store.getters.websocketData[220002].msg.groups;
          newArray = this.filterAllData(array, "lampposts");
        } else {
          newArray = this.$store.getters.websocketData[220002].msg.groups[
            this.Gateway.value
          ].lampposts;
        }
        return newArray;
      }
    }
  },
  mounted() {
    this.$nextTick(function() {
      this.$store.state.checkedArray = {};
      this.wuyong++;
    });
  },
  methods: {
    entry() {
      this.$refs.geteway.className = "";
      this.$refs.geteway.className = "wrapbox is-visible";
    },
    leave() {
      this.$refs.geteway.className = "wrapbox";
    },

    dsClick(lId) {
      this.$sdClick(lId, this.$route.name);
      // let sMapPoint = JSON.parse(sessionStorage.lightpole) || [];
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
      //       this.workCover.updateSelById(lId);
      //       $("." + lId)
      //         .stop()
      //         .animate({ marginTop: "-150px" });
      //       this.$store.dispatch("setSingleIsShow", true);
      //       this.$store.state.selectId = lId;
      //       this.$store.state.selectBoolean = "isSelect";
      //       this.$store.dispatch("setLoctionId", lId);
      //     }, 600);
      //     this.$parent.showSc(lId);
      //   }
      // }
    },

    handleSelect() {
      let array;
      if (this.Gateway.value == -1) {
        let allArray = this.$store.getters.websocketData[220002].msg.groups;
        array = this.filterAllData(allArray, "lampposts");
      } else {
        array = this.Gateway.selectData[this.Gateway.value].lampposts;
      }
      this.$store.state.checkedArray = {};
      array.forEach((item, index) => {
        item.linghts.forEach((ele, i) => {
          this.$store.state.checkedArray[ele.id] = false;
        });
      });
      this.Gateway.isGatewaySlider = true;
      this.Gateway.light = 0;
      this.Gateway.loading = true;
      setTimeout(() => {
        this.Gateway.loading = false;
      }, 500);
    },
    // 下拉框状态
    visibleChange($event, vlaueSelect) {
      this.Gateway.selecting = !this.Gateway.selecting;
    },
    handleGatewayControl(flag) {
      let params;
      let lightsId = [];
      for (const key in this.$store.state.checkedArray) {
        if (this.$store.state.checkedArray[key] && key != "all") {
          lightsId.push(Number(key));
        }
      }
      if (!lightsId.length) {
        this.$Message.closeAll();
        this.$Message({
          message: "请先选择灯",
          type: "warning"
        });
      } else {
        if (flag == "open") {
          params = {
            msgid: "550e8400-e29b-41d4-a716-446655440000",
            modulecode: 102001,
            msgtype: 0,
            msgcode: 220009,
            timestamp: this.$getCurrentDate(),
            msg: {
              cmdtype: 1,
              lightvalue: this.Gateway.light,
              lights: lightsId
            }
          };
        } else if (flag == "down") {
          params = {
            msgid: "550e8400-e29b-41d4-a716-446655440000",
            modulecode: 102001,
            msgtype: 0,
            msgcode: 220009,
            timestamp: this.$getCurrentDate(),
            msg: {
              cmdtype: 0,
              lightvalue: this.Gateway.light,
              lights: lightsId
            }
          };
        }
        this.getControlAPI(params);
      }
    },

    handleGetewaySlide() {
      let lightsId = [];
      for (const key in this.$store.state.checkedArray) {
        if (this.$store.state.checkedArray[key] && key != "all") {
          lightsId.push(Number(key));
        }
      }
      if (!lightsId.length) {
        this.$Message.closeAll();
        this.$Message({
          message: "请先选择灯",
          type: "warning"
        });
      } else {
        let params = {
          msgid: "550e8400-e29b-41d4-a716-446655440000",
          modulecode: 102001,
          msgtype: 0,
          msgcode: 220009,
          timestamp: this.$getCurrentDate(),
          msg: {
            cmdtype: 3,
            lightvalue: this.Gateway.light,
            lights: lightsId
          }
        };
        this.getControlAPI(params);
      }
    },
    handleChecked() {
      let flag = 0;
      for (const key in this.$store.state.checkedArray) {
        if (this.$store.state.checkedArray[key] && key != "all") {
          flag += 1;
        }
      }
      if (flag > 0) {
        this.Gateway.isGatewaySlider = false;
        if (flag == 1) {
          let keyId;
          for (const key in this.$store.state.checkedArray) {
            if (this.$store.state.checkedArray[key] && key != "all") {
              keyId = Number(key);
            }
          }
          this.GatewayFormData.forEach(item => {
            item.linghts.forEach(ele => {
              if (ele.id == keyId) {
                this.Gateway.light = ele.lightValue;
              }
            });
          });
        } else {
          this.Gateway.light = 0;
        }
      } else {
        this.Gateway.isGatewaySlider = true;
        this.Gateway.light = 0;
      }
    },

    // 发送请求
    getControlAPI(data) {
      this.$api.post("/websocket/command", data).then(function(res) {
        console.log(res);
      });
    },

    // 过滤出全部数据
    filterAllData(array, key) {
      let allArray = [];
      array.forEach(item => {
        allArray.push(...item[key]);
      });
      return allArray;
    }
  }
};
</script>

<style lang="scss" scoped>
.lampostImg img{width:20px;height:30px;vertical-align: middle;display: inline-block;}

.geteway.active {
  z-index: 999;
}
// .el-select-dropdown {
//   background-color: rgba(1, 30, 38, 0.6);
// }
.el-button + .el-button {
  margin-left: 0;
}
.el-button--mini {
  // width: 70rem;
  // height: 36rem;
  padding: 0.1rem 0.2rem;
  font-size: 0.16rem;
  background: linear-gradient(
    0deg,
    rgba(0, 0, 0, 0.07),
    rgba(255, 255, 255, 0.07)
  );
  border: 0.01px solid;
  border-image: linear-gradient(
      0deg,
      rgba(28, 68, 116, 1),
      rgba(66, 109, 160, 0)
    )
    1 1;
  // box-shadow: 0rem 0.01rem 0.04rem 0rem rgba(0, 0, 0, 0.4),
  //   0rem 0.01rem 0rem 0rem rgba(255, 255, 255, 0.2);
  border-radius: 0.03rem;
  /*text-shadow: 0 0 0.03rem rgba(0, 0, 0, 0.4);*/
  span {
    font-weight: 400;
    color: rgba(255, 255, 255, 1);
    /*text-shadow: 0 0 0.03rem rgba(0, 0, 0, 0.4);*/
    display: block;
  }
  &:hover {
    box-shadow: 0 0 0.1rem rgba(255, 255, 255, 1) inset;
  }
}

.Gateway-Control {
  padding-top: 1.2rem;
  .control-content {
    margin-top: 0.2rem;
    font-size: 0.16rem;
    padding: 0 0.3rem;
    .control-content_item {
      line-height: 0.36rem;
      margin-top: 0.2rem;
      .item-type {
        display: inline-block;
        height: 0.36rem;
        line-height: 0.36rem;
      }
      .item-control {
        display: flex;
        justify-content: space-between;
        height: 0.36rem;
        width: 1.75rem;
        float: right;
        .open {
          background: #62d3fd;
          float: right;
        }
        .down {
          background: #76bbb9;
          float: right;
        }
        .gain {
          background: #0776aa;
          float: right;
        }
      }
      .item-slider {
        height: 0.36rem;
        width: 2.45rem;
        float: right;
      }
    }
    .equipmentCooseBox {
      margin-top: 0.2rem;
      height: 0.45rem;
      line-height: 0.45rem;
      .showInput {
        position: absolute;
        top: 0.6rem;
        right: 0.58rem;
        padding-left: 20px;
        text-align: left;
        width: 2.2rem;
        color: #06ffeb;
        box-sizing: border-box;
      }
      .titleText {
        font-size: 0.16rem;
      }
      .selectBox {
        position: relative;
        float: right;
        width: 2.45rem;
        height: 0.4rem;
        font-size: 0.16rem;
        line-height: 0.4rem;
        background: url("../assets/img/control/selectBox.png") no-repeat
          center/cover;
        background-size: 100% 100%;
        .showInput {
          position: absolute;
          top: 0;
          right: 0;
          padding-left: 20px;
          text-align: left;
          width: 2.45rem;
          height: 0.4rem;
          font-size: 0.16rem;
          color: #fff;
        }
        .down {
          position: absolute;
          display: inline-block;
          right: 0.2rem;
          top: 0.16rem;
          width: 0.14rem;
          height: 0.13rem;
          background: url("../assets/img/control/down.png") no-repeat
            center/cover;
        }
        .up {
          position: absolute;
          display: inline-block;
          right: 0.2rem;
          top: 0.14rem;
          width: 0.14rem;
          height: 0.13rem;
          transform: rotate(180deg);
          background: url("../assets/img/control/down.png") no-repeat
            center/cover;
        }
      }
    }
  }

  .Gateway-from {
    margin-top: 0.2rem;
    padding: 0 0.3rem;
    .frombox {
      background: url("../assets/img/control/fromBg.png") no-repeat center/cover;
      background-size: 4.23rem calc(100vh - 4rem);
      width: 4.23rem;
      height: calc(100vh - 4rem);
      margin: 0 auto;
      padding-top: 0.12rem;
      overflow: hidden;
      .fromItem-title {
        padding: 0 0.11rem 0 0.03rem;
        display: flex;
        // justify-content: center;
        align-items: center;
        background: rgba(0, 0, 0, 0.2);
        .equipmentBox {
          width: 70% !important;
          .checkedBox {
            width: 15%;
            display: flex;
            justify-content: center;
            align-items: center;
            cursor: pointer;
            .check {
              float: left;
              text-align: center;
              overflow: hidden;
              margin-left: 0.2rem;
              height: 0.22rem;
              width: 0.2rem;
              border: 0.012rem solid #62d3fd;
            }
          }
        }

        .lamppostname {
          float: left;
          width: 35%;
          text-align: center;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          line-height: 0.6rem;
          font-size: 0.18rem;
          span {
            margin-left: 0.05rem;
          }
        }
        .equipmentBox {
          text-align: center;
          width: 50%;
          .equipmentStatus {
            height: 0.6rem;
            line-height: 0.6rem;
            float: left;
            width: 50%;
            text-align: left;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
          }
        }
      }
      .fromItemBox {
        height: calc(100vh - 4.8rem);
        padding: 0 0.03rem;
        .bgEven {
          background: rgba(0, 0, 0, 0.2);
        }
        .fromItem {
          display: flex;
          cursor: pointer;
          // justify-content: center;
          align-items: center;
          &:hover {
            background: rgba(86, 255, 254, 0.3);
          }
          .checkedBox {
            width: 10%;
            display: flex;
            justify-content: center;
            align-items: center;
            cursor: pointer;
            .check {
              float: left;
              text-align: center;
              overflow: hidden;
              // margin-left: 0.2rem;
              height: 0.22rem;
              width: 0.2rem;
              border: 0.012rem solid #62d3fd;
            }
          }
          .lamppostname {
            float: left;
            width: 35%;
            text-align: center;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            line-height: 0.6rem;
            font-size: 0.18rem;
            span {
              margin-left: 0.05rem;
            }
          }
          .equipmentBox {
            float: left;
            width: 50%;
            .equipmentStatus {
              height: 0.6rem;
              line-height: 0.6rem;
              float: left;
              width: 100%;
              text-align: left;
              overflow: hidden;
              text-overflow: ellipsis;
              white-space: nowrap;
              .checkedItemBox {
                font-size: 0.16rem;
                height: 0.6rem;
                line-height: 0.6rem;
                float: left;
                text-align: center;
                width: 20%;
                display: flex;
                justify-content: center;
                align-items: center;
                cursor: pointer;
                .check {
                  float: right;
                  text-align: center;
                  overflow: hidden;
                  margin-left: 0.2rem;
                  height: 0.22rem;
                  width: 0.2rem;
                  border: 0.012rem solid #62d3fd;
                }
              }
            }
          }
        }
      }
    }
  }
}
.fontz {
  font-size: 0.13rem;
}
</style>

