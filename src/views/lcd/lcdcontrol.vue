<template>
  <div class="control">
    <!-- 设备控制 -->
    <div class="wrapbox" ref="controllcd">
      <div class="LED-Control content-left trans-up trans-up-delay-3">
        <div class="box-title">
          <span class="icons color-huang">&#xe63b;</span>
          <span>设备控制</span>
        </div>
        <div class="control-content">
          <div class="control-content_item">
            <span class="item-type">控制</span>
            <div class="item-btn">
              <el-button
                type="success"
                size="mini"
                class="open"
                @click="handleLCDControl('open')"
              >开启</el-button>
              <el-button
                type="warning"
                size="mini"
                class="down"
                @click="handleLCDControl('down')"
              >关闭</el-button>
              <el-button
                type="primary"
                size="mini"
                class="rest"
                @click="handleLCDControl('rest')"
              >重启</el-button>
            </div>
          </div>
          <div class="control-content_item">
            <span class="item-type">音量</span>
            <div class="item-slider">
              <el-slider
                v-model="LCD.volume"
                :max="15"
                :disabled="LCD.isSlide"
                @change="handleLCDSlider('volume')"
              ></el-slider>
            </div>
          </div>
        </div>
        <div class="equipmentCooseBox">
          <span class="titleText">选择分组</span>
          <div class="selectBox">
            <input class="showInput" type="text" v-model="LCDSelectValue" />
            <el-select
              v-model="LCD.value"
              placeholder="请选择"
              size="mini"
              :popper-append-to-body="false"
              @change="handleLCDSelect"
              @visible-change="visibleChange($event,LCD.value)"
            >
              <el-option key="-1" label="全部" :value="-1"></el-option>
              <el-option
                v-for="(item,index) in LCD.selectData"
                :key="item.groupid"
                :label="item.groupname"
                :value="index"
              ></el-option>
            </el-select>
            <div class="select">
              <span :class="{'downs':LCD.selecting,'up':!LCD.selecting}"></span>
            </div>
          </div>
        </div>
        <div class="LED-from">
          <ul class="frombox">
            <div
              style="width:100%;height:100%"
              v-if="!LCDFormData || LCD.loading"
              v-loading="!LCDFormData || LCD.loading"
              element-loading-text="拼命加载中"
              element-loading-spinner="el-icon-loading"
              element-loading-background="rgba(0, 0, 0, 0.4)"
            ></div>
            <div v-if="LCDFormData && !LCD.loading" style="height:100%">
              <li class="fromItem-title">
                <div class="checkedBox">
                  <div class="checked">
                    <checked :target="'all'" :key="wuyong" @clickChecked="handleLCDInput" />
                  </div>
                </div>
                <div class="lineH60 fl w40">设备编号</div>
                <span class="lineH60 fl w20">开关</span>
                <span class="lineH60 fl w20">状态</span>
              </li>
              <div class="fromItemBox sbar">
                <li class="fromItem" v-for="(item,index) in LCDFormData" :key="index">
                  <div class="checkedBox">
                    <div class="checked">
                      <checked :target="item.id" :key="wuyong" @clickChecked="handleLCDInput" />
                    </div>
                  </div>
                  <div class="lineH60 fl w40" @click="sdClick(item.lamppostid)">
                    <i class="icons color-huang">&#xe618;</i>
                    <span>{{item.lamppostname}}</span>
                  </div>
                  <div class="lineH60 fl w20" @click="sdClick(item.lamppostid)">
                    <span class="state" style="text-align: center;">
                      <img
                        style="width:0.2rem;height:0.2rem;vertical-align: middle;"
                        src="../../assets/img/icon/dui_green.png"
                        v-if="item.onoff == 1"
                      />
                      <img
                        style="width:0.2rem;height:0.2rem;vertical-align: middle;"
                        src="../../assets/img/icon/cuo_gray.png"
                        v-if="item.onoff == 0"
                      />
                    </span>
                  </div>
                  <div class="lineH60 fl w20" @click="sdClick(item.lamppostid)">
                    <span class="state" style="text-align: center;">
                      <img
                        style="width:0.2rem;height:0.2rem;vertical-align: middle;"
                        src="../../assets/img/icon/wifi_green.png"
                        v-if="item.status == 1"
                      />
                      <img
                        style="width:0.2rem;height:0.2rem;vertical-align: middle;"
                        src="../../assets/img/icon/error_yellow.png"
                        v-if="item.status == 0"
                      />
                    </span>
                  </div>
                </li>
              </div>
            </div>
          </ul>
        </div>
      </div>
    </div>

    <!-- 点选设备 -->
    <div class="wrapbox" ref="checklcd">
      <div class="LCD-check content-left trans-up trans-up-delay-3">
        <div class="people">
          <div class="inputtext">
            <!-- <input type="text" placeholder="请输入设备编号" value /> -->
            <Search type="lcd" />
          </div>
        </div>

        <div class="status">
          <div class="box-title">
            <i class="icons color-huang">&#xe6a5;</i>
            <i style="font-size: 0.18rem;">基本信息</i>
          </div>
          <div class="numbers">
            <p>
              <span>灯杆编号 :</span>
              <span class="letter">{{singleLCD.selectData.lamppostname}}</span>
            </p>
            <p>
              <span>灯头编号 :</span>
              <span class="letter">{{singleLCD.selectData.devicecode}}</span>
            </p>
            <p>
              <span>状态 :</span>
              <span class="letter" style="margin-left: .3rem;">
                <img
                  style="width:0.2rem;height:0.2rem;vertical-align:middle;"
                  src="../../assets/img/icon/wifi_green.png"
                  v-if="singleLCD.selectData.status == 1"
                />
                <img
                  style="width:0.2rem;height:0.2rem;vertical-align:middle;"
                  src="../../assets/img/icon/error_yellow.png"
                  v-if="singleLCD.selectData.status == 0"
                />
              </span>
            </p>
            <p>
              <span>开关 :</span>
              <span class="letter" style="margin-left: .3rem;">
                <img
                  style="width:0.2rem;height:0.2rem;vertical-align:middle;"
                  src="../../assets/img/icon/dui_green.png"
                  v-if="singleLCD.selectData.onoff == 1"
                />
                <img
                  style="width:0.2rem;height:0.2rem;vertical-align:middle;"
                  src="../../assets/img/icon/cuo_gray.png"
                  v-if="singleLCD.selectData.onoff == 0"
                />
              </span>
            </p>
          </div>
        </div>
        <div class="control trans-up trans-up-delay-5">
          <div class="box-title">
            <i class="icons color-huang">&#xe778;</i>
            <span>设备控制</span>
          </div>
          <div class="auto_m">
            <div class="control-content_item">
              <span class="item-type">控制</span>
              <div class="item-btn">
                <el-button
                  type="success"
                  size="mini"
                  class="open"
                  @click="handleSingleLCDControl('open')"
                >开启</el-button>
                <el-button
                  type="warning"
                  size="mini"
                  class="down"
                  @click="handleSingleLCDControl('down')"
                >关闭</el-button>
                <el-button
                  type="primary"
                  size="mini"
                  class="rest"
                  @click="handleSingleLCDControl('rest')"
                >重启</el-button>
              </div>
            </div>
            <div class="control-content_item">
              <span class="item-type">音量</span>
              <div class="item-slider">
                <el-slider
                  v-model="singleLCD.selectData.volume"
                  :max="15"
                  @change="handleSingleLCDSlider('volume')"
                ></el-slider>
              </div>
            </div>
            <div class="lint_h">实施画面</div>
            <div class="styimg">
              <div class="iframe_box">
                <iframe
                  frameborder="0"
                  scrolling="no"
                  :src="'http://118.190.55.119:8080/led_zhaoming.html?id=' + singleLCD.selectData.id"
                ></iframe>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Search from "../../components/search";
import checked from "../../components/checked";
export default {
  name: "App",
  data() {
    return {
      wuyong: 0,
      LCD: {
        value: -1,
        volume: 0,
        light: 0,
        isSlide: true,
        selecting: true, // 下拉框的显示和隐藏
        loading: false,
        selectData: []
      },
      singleLCD: {
        selectData: {}
      }
    };
  },
  components: {
    checked,
    Search
  },
  computed: {
    LCDSelectValue: function() {
      if (this.LCD.value == -1) {
        return "全部";
      } else {
        return this.LCD.selectData.length
          ? this.LCD.selectData[this.LCD.value].groupname
          : null;
      }
    },
    LCDFormData: function() {
      if (this.$store.getters.websocketData[230001]) {
        this.LCD.selectData = this.$store.getters.websocketData[230001].msg.groupsLcd;
        if (this.LCD.value == -1) {
          return this.filterAllData(this.LCD.selectData, "lcds");
        } else {
          return this.$store.getters.websocketData[230001].msg.groupsLcd[
            this.LCD.value
          ].lcds;
        }
      } else {
        return false;
      }
    }
  },
  created() {},
  mounted() {
    this.$nextTick(function() {
      this.$store.state.checkedArray = {};
      this.wuyong++;
    });
    // this.offheight();
  },
  methods: {
    entry(controlModule) {
      this.$refs[controlModule].className = "";
      this.$refs[controlModule].className = "wrapbox is-visible";
      if (controlModule == "checklcd") {
        if (this.$store.getters.websocketData[230001]) {
          let array = this.$store.getters.websocketData[230001].msg.groupsLcd;
          let allArray = this.filterAllData(array, "lcds");
          allArray.forEach(item => {
            if (item.lamppostid == this.$store.state.loctionId) {
              this.singleLCD.selectData = item;
            }
          });
        }
      }
    },
    leave(controlModule) {
      this.$refs[controlModule].className = "wrapbox";
      //   this.clearChecked();
    },
    sdOutIn() {
      this.leave("checklcd");
      setTimeout(() => {
        this.entry("checklcd");
      }, 800);
    },
    sdClick(id) {
      this.$sdClick(id, this.$route.name);
    },
    // LCD控制
    handleLCDInput() {
      let flag = 0;
      for (const key in this.$store.state.checkedArray) {
        if (this.$store.state.checkedArray[key] && key != "all") {
          flag += 1;
        }
      }
      if (flag > 0) {
        this.LCD.isSlide = false;
        if (flag == 1) {
          let keyId;
          for (const key in this.$store.state.checkedArray) {
            if (this.$store.state.checkedArray[key] && key != "all") {
              keyId = Number(key);
            }
          }
          this.LCDFormData.forEach(item => {
            if (item.id == keyId) {
              // this.LCD.light = item.light;
              this.LCD.volume = item.volume;
            }
          });
        } else {
          this.LCD.light = 0;
          this.LCD.volume = 0;
        }
      } else {
        this.LCD.isSlide = true;
        this.LCD.volume = 0;
        this.LCD.light = 0;
      }
    },
    handleLCDSelect() {
      let array;
      if (this.LCD.value == -1) {
        let allArray = this.$store.getters.websocketData[230001].msg.groupsLcd;
        array = this.filterAllData(allArray, "lcds");
      } else {
        array = this.LCD.selectData[this.LCD.value].lcds;
      }
      this.$store.state.checkedArray = {};
      this.$store.state.checkedArray["all"] = false;
      array.forEach((item, index) => {
        this.$store.state.checkedArray[item.id] = false;
      });
      this.LCD.isSlide = true;
      this.LCD.light = 0;
      this.LCD.volume = 0;
      this.LCD.loading = true;
      setTimeout(() => {
        this.LCD.loading = false;
      }, 500);
    },
    handleLCDControl(flag) {
      let params;
      let lcdId = [];
      for (const key in this.$store.state.checkedArray) {
        if (this.$store.state.checkedArray[key] && key != "all") {
          lcdId.push(Number(key));
        }
      }
      if (!lcdId.length) {
        this.$Message.closeAll();
        this.$Message({
          message: "请先选择站点",
          type: "warning"
        });
      } else if (flag == "open") {
        params = {
          msgid: "550e8400-e29b-41d4-a716-446655440000",
          modulecode: 103002,
          msgtype: 0,
          msgcode: 200001,
          timestamp: this.$getCurrentDate(),
          msg: {
            cmdtype: 1,
            light: this.LCD.light,
            volume: this.LCD.volume,
            lcds: lcdId
          }
        };
        this.getControlAPI(params);
      } else if (flag == "down") {
        params = {
          msgid: "550e8400-e29b-41d4-a716-446655440000",
          modulecode: 103002,
          msgtype: 0,
          msgcode: 200001,
          timestamp: this.$getCurrentDate(),
          msg: {
            cmdtype: 2,
            light: this.LCD.light,
            volume: this.LCD.volume,
            lcds: lcdId
          }
        };
        this.getControlAPI(params);
      } else if (flag == "rest") {
        params = {
          msgid: "550e8400-e29b-41d4-a716-446655440000",
          modulecode: 103002,
          msgtype: 0,
          msgcode: 200001,
          timestamp: this.$getCurrentDate(),
          msg: {
            cmdtype: 3,
            light: this.LCD.light,
            volume: this.LCD.volume,
            lcds: lcdId
          }
        };
        this.getControlAPI(params);
      }
    },
    handleLCDSlider(target) {
      let params;
      let lcdId = [];
      for (const key in this.$store.state.checkedArray) {
        if (this.$store.state.checkedArray[key] && key != "all") {
          lcdId.push(Number(key));
        }
      }
      if (target == "light") {
        params = params = {
          msgid: "550e8400-e29b-41d4-a716-446655440000",
          modulecode: 103002,
          msgtype: 0,
          msgcode: 200001,
          timestamp: this.$getCurrentDate(),
          msg: {
            cmdtype: 4,
            light: this.LCD.light,
            volume: this.LCD.volume,
            lcds: lcdId
          }
        };
      } else if (target == "volume") {
        params = params = {
          msgid: "550e8400-e29b-41d4-a716-446655440000",
          modulecode: 103002,
          msgtype: 0,
          msgcode: 200001,
          timestamp: this.$getCurrentDate(),
          msg: {
            cmdtype: 5,
            light: this.LCD.light,
            volume: this.LCD.volume,
            lcds: lcdId
          }
        };
      }
      this.getControlAPI(params);
    },

    // LCD单个站点
    handleSingleLCDControl(flag) {
      let params;
      if (!this.singleLCD.selectData.id) {
        this.$Message.closeAll();
        this.$Message({
          message: "暂无数据",
          type: "warning"
        });
      } else if (flag == "open") {
        params = {
          msgid: "550e8400-e29b-41d4-a716-446655440000",
          modulecode: 103002,
          msgtype: 0,
          msgcode: 200001,
          timestamp: this.$getCurrentDate(),
          msg: {
            cmdtype: 1,
            light: this.singleLCD.selectData.light,
            volume: this.singleLCD.selectData.volume,
            lcds: [this.singleLCD.selectData.id]
          }
        };
        this.getControlAPI(params);
      } else if (flag == "down") {
        params = {
          msgid: "550e8400-e29b-41d4-a716-446655440000",
          modulecode: 103002,
          msgtype: 0,
          msgcode: 200001,
          timestamp: this.$getCurrentDate(),
          msg: {
            cmdtype: 2,
            light: this.singleLCD.selectData.light,
            volume: this.singleLCD.selectData.volume,
            lcds: [this.singleLCD.selectData.id]
          }
        };
        this.getControlAPI(params);
      } else if (flag == "rest") {
        params = {
          msgid: "550e8400-e29b-41d4-a716-446655440000",
          modulecode: 103002,
          msgtype: 0,
          msgcode: 200001,
          timestamp: this.$getCurrentDate(),
          msg: {
            cmdtype: 3,
            light: this.singleLCD.selectData.light,
            volume: this.singleLCD.selectData.volume,
            lcds: [this.singleLCD.selectData.id]
          }
        };
        this.getControlAPI(params);
      }
    },
    handleSingleLCDSlider(target) {
      let params;
      if (!this.singleLCD.selectData.id) {
        this.$Message.closeAll();
        this.$Message({
          message: "暂无数据",
          type: "warning"
        });
      } else if (target == "volume") {
        params = params = {
          msgid: "550e8400-e29b-41d4-a716-446655440000",
          modulecode: 103002,
          msgtype: 0,
          msgcode: 200001,
          timestamp: this.$getCurrentDate(),
          msg: {
            cmdtype: 5,
            light: this.singleLCD.selectData.light,
            volume: this.singleLCD.selectData.volume,
            lcds: [this.singleLCD.selectData.id]
          }
        };
        this.getControlAPI(params);
      }
    },
    visibleChange() {
      this.LCD.selecting = !this.LCD.selecting;
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
        let childrenArray = [].slice.call(item[key]);
        childrenArray.forEach(ele => {
          allArray.push(ele);
        });
        // allArray.push(...childrenArray);
      });
      return allArray;
    }
  }
};
</script>


<style lang="scss" scoped>
.control.active {
  z-index: 999;
}

.styimg {
  padding: 0.1rem;
  margin: 0.1rem;
  height: 3rem;
}
.iconsSmall {
  font-family: "iconfont" !important;
  font-size: 0.11rem;
  font-style: normal;
  -webkit-font-smoothing: antialiased;
}

.el-button + .el-button {
  margin-left: 0rem;
}
.el-button--mini {
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
  text-shadow: 0rem -0.01rem 0rem rgba(0, 0, 0, 0.4);
  span {
    font-weight: 400;
    color: rgba(255, 255, 255, 1);
    text-shadow: 0rem -0.01rem 0rem rgba(0, 0, 0, 0.4);
    display: block;
  }
  &:hover {
    box-shadow: 0 0 0.1rem rgba(255, 255, 255, 1) inset;
  }
}
//设备概览
.Electro-Control {
  padding-top: 1.2rem;
  .people {
    width: 4.5rem;
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
  }
  .status {
    width: 4.5rem;
    // height: 30%;
    margin-top: 4%;
  }
  .control {
    width: 4.5rem;
    // height: 35%;
    margin-top: 4%;

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
      min-height: 2rem;
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
  }
}
//设备控制
.LED-Control {
  padding-top: 1.2rem;
  .control-content {
    padding: 0 0.3rem;
    margin-top: 0.2rem;
    font-size: 0.16rem;
    .control-content_item {
      line-height: 0.36rem;
      margin-top: 0.2rem;
      display: flex;
      justify-content: space-between;
      align-items: center;
      .item-type {
        display: inline-block;
        height: 0.36rem;
        line-height: 0.36rem;
      }
      .item-btn {
        height: 0.36rem;
        width: 2.45rem;
        float: right;
        display: flex;
        justify-content: space-between;
        .open {
          background: #18b7b0;
        }
        .down {
          background: #ff992a;
        }
        .rest {
          background: #73b97b;
        }
      }
      .item-slider {
        width: 2.37rem;
      }
    }
  }
  .equipmentCooseBox {
    padding: 0 0.3rem;
    margin-top: 0.2rem;
    height: 0.5rem;
    line-height: 0.5rem;
    .titleText {
      font-size: 0.16rem;
    }
    .selectBox {
      position: relative;
      float: right;
      width: 2.45rem;
      font-size: 0.16rem;
      height: 0.45rem;
      line-height: 0.45rem;
      background: url("~@/assets/img/control/selectBox.png") no-repeat
        center/cover;
      .showInput {
        position: absolute;
        top: 0rem;
        left: 0rem;
        padding-left: 0.3rem;
        box-sizing: border-box;
        text-align: left;
        width: 2.45rem;
        height: 0.45rem;
        color: #fff;
      }
      .downs {
        position: absolute;
        display: inline-block;
        right: 0.2rem;
        top: 0.16rem;
        width: 0.14rem;
        height: 0.13rem;
        background: url("~@/assets/img/control/down.png") no-repeat center/cover;
      }
      .up {
        position: absolute;
        display: inline-block;
        right: 0.2rem;
        top: 0.16rem;
        width: 0.14rem;
        height: 0.13rem;
        transform: rotate(180deg);
        background: url("~@/assets/img/control/down.png") no-repeat center/cover;
      }
    }
  }

  .LED-from {
    padding: 0 0.3rem;
    margin-top: 0.1rem;
    .frombox {
      background: url("~@/assets/img/control/fromBox.png") no-repeat
        center/cover;
      background-size: 4.23rem calc(100vh - 4rem);
      width: 4.23rem;
      height: calc(100vh - 4rem);
      margin: 0 auto;
      padding-top: 0.1rem;
      .fromItem-title {
        line-height: 0.6rem;
        height: 0.6rem;
        // border-left: 0.02rem solid #116788;
        background: linear-gradient(
            to right,
            rgba(0, 54, 87, 1),
            rgba(0, 54, 87, 0)
          )
          0.02rem;
        .checkedBox {
          width: 20%;
          float: left;
          cursor: pointer;
          height: 0.6rem;
          .checked {
            height: 0.6rem;
            line-height: 0.6rem;
            width: 100%;
            display: flex;
            justify-content: center;
            align-items: center;
            .check {
              display: inline-block;
              height: 0.22rem;
              width: 0.2rem;
              border: 0.012rem solid #62d3fd;
            }
          }
        }
      }
      .fromItemBox {
        height: calc(100% - 0.7rem);
        .fromItem {
          height: 0.6rem;
          line-height: 0.6rem;
          overflow: hidden;
          cursor: pointer;
          &:hover {
            background: rgba(86, 255, 254, 0.3);
          }
          .checkedBox {
            width: 20%;
            float: left;
            cursor: pointer;
            height: 0.6rem;
            .checked {
              height: 0.6rem;
              line-height: 0.6rem;
              width: 100%;
              display: flex;
              justify-content: center;
              align-items: center;
              .check {
                display: inline-block;
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
//点选设备
.LCD-check {
  padding-top: 1.2rem;
  .people {
    width: 4.5rem;
    height: 0.4rem;
    .inputtext {
      width: 4.21rem;
      height: 0.4rem;
      margin: 0 auto;
      border: 0.01rem solid rgba(255, 255, 255, 1);
      opacity: 0.8;
      border-radius: 0.04rem;
      input {
        color: #fff;
        width: 88%;
        outline: none;
        height: 0.4rem;
        font-size: 0.16rem;
        font-family: Source Han Sans CN;
        font-weight: 400;
        padding-left: 0.1rem;
        line-height: 0.4rem;
      }

      i {
        font-size: 0.24rem;
      }
    }
  }
  .status {
    width: 4.5rem;
    margin-top: 4%;

    .numbers {
      width: 86%;
      margin: 0 auto;
      p {
        margin-top: 0.1rem;
        width: 100%;
        height: 0.36rem;
        font-size: 0.16rem;
        font-family: Source Han Sans CN;
        font-weight: 400;
        color: rgba(255, 255, 255, 1);
        line-height: 0.36rem;
        text-shadow: 0rem 0.01rem 0.02rem rgba(0, 21, 20, 0.2);
        .letter {
          padding-left: 0.1rem;
          letter-spacing: 0.02rem;
        }
      }
    }
  }
  .control {
    width: 4.5rem;
    margin-top: 4%;

    .auto_m {
      width: 86%;
      margin: 0 auto;
      .control-content_item {
        line-height: 0.36rem;
        margin-top: 0.2rem;
        display: flex;
        justify-content: space-between;
        align-items: center;
        .item-type {
          display: inline-block;
          height: 0.36rem;
          line-height: 0.36rem;
        }
        .item-btn {
          height: 0.36rem;
          width: 2.45rem;
          float: right;
          display: flex;
          justify-content: space-between;
          .open {
            background: #18b7b0;
          }
          .down {
            background: #ff992a;
          }
          .rest {
            background: #73b97b;
          }
        }
        .item-slider {
          width: 2.37rem;
          float: right;
        }
      }
      .lint_h {
        line-height: 0.36rem;
        margin-bottom: 0.2rem;
        margin-top: 0.1rem;
      }
    }
  }
}

.fontsize {
  font-size: 0.16rem;
  font-family: PingFangSC-Regular;
  font-weight: 400;
  color: rgba(255, 255, 255, 1);
}
.fontz {
  font-size: 0.16rem;
}
::-webkit-input-placeholder {
  /* WebKit browsers */

  color: rgba(255, 255, 255, 1);
}
:-moz-placeholder {
  /* Mozilla Firefox 4 to 18 */
  color: rgba(255, 255, 255, 1);
}
::-moz-placeholder {
  /* Mozilla Firefox 19+ */
  color: rgba(255, 255, 255, 1);
}
:-ms-input-placeholder {
  /* Internet Explorer 10+ */
  color: rgba(255, 255, 255, 1);
}
</style>