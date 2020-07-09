<template>
  <div class="videoControl">
    <!-- 语音广播 -->
    <div class="wrapbox" ref="Radio">
      <div class="Radio-Control content-left trans-up trans-up-delay-3">
        <div class="box-title">
          <i class="icons color-huang">&#xe778;</i>
          <span>语音广播</span>
        </div>
        <div class="Electro-content">
          <div class="equipmentCooseBox">
            <span class="titleText">选择回路</span>
            <div class="selectBox">
              <!-- <input class="showInput" type="text" /> -->
              <el-select
                v-model="Electro.value"
                placeholder="请选择"
                size="mini"
                :popper-append-to-body="false"
                @visible-change="visibleChange($event,Electro.value)"
              >
                <el-option key="-1" label="全部" :value="-1"></el-option>
                <el-option
                  v-for="(item,index) in Electro.selectData"
                  :key="item.value"
                  :label="item.loopname"
                  :value="index"
                ></el-option>
              </el-select>
              <div class="select">
                <span :class="{'down':Electro.selecting,'up':!Electro.selecting}"></span>
              </div>
            </div>
          </div>
          <div id="choosebox" class="loopChooseBox">
            <span>控制方式</span>
            <div class="electroBtn" style="width:2.45rem">
              <el-button type="success" size="mini" class="open" @click="fnBroadcasting('open')">开启</el-button>
              <el-button type="warning" size="mini" class="down" @click="fnBroadcasting('down')">关闭</el-button>
            </div>
          </div>
          <div class="loopChooseBox">
            <p style="float:left">设备状态</p>
            <div style="float:right">
              <span class="onoff" style="display: inline-block;margin-right:0.5rem">
                开关
                <img
                  style="width:0.2rem;height:0.2rem;vertical-align: middle;"
                  src="../../assets/img/icon/dui_green.png"
                  v-if="loctionData.onoff == 1"
                />
                <img
                  style="width:0.2rem;height:0.2rem;vertical-align: middle;"
                  src="../../assets/img/icon/cuo_gray.png"
                  v-if="loctionData.onoff == 0"
                />
              </span>
              <span class="state" style="display:inline-block;">
                状态
                <img
                  style="width:0.2rem;height:0.2rem;vertical-align: middle;"
                  src="../../assets/img/icon/wifi_green.png"
                  v-if="loctionData.state == 1"
                />
                <img
                  style="width:0.2rem;height:0.2rem;vertical-align: middle;"
                  src="../../assets/img/icon/error_yellow.png"
                  v-if="loctionData.state == 0"
                />
              </span>
            </div>
          </div>
        </div>
        <div class="Electro-Form">
          <ul class="frombox addtitle">
            <div
              style="width:100%;height:100%"
              v-if="!isElectroShow || Electro.loading"
              v-loading="!isElectroShow || Electro.loading"
              element-loading-text="拼命加载中"
              element-loading-spinner="el-icon-loading"
              element-loading-background="rgba(0, 0, 0, 0.4)"
            ></div>
            <li class="fromItem-title clearfix" v-if="isElectroShow && !Electro.loading">
              <div class="lamppostname" style="width:40%">灯杆编号</div>
              <div class="lamppostname" style="width:16%">灯头</div>
              <div class="lamppostname" style="width:12%">开关</div>
              <div class="lamppostname" style="width:12%">状态</div>
              <div class="equipmentBox" style="width:20%">亮度值</div>
            </li>
            <div class="fromItemBox sbar" v-if="isElectroShow && !Electro.loading">
              <li
                class="fromItem"
                v-for="(item,index) in ElectroFormData"
                :class="{'bgEven':(index+1)%2 == 0}"
                :key="item.index"
                @click="dsClick(item.lamppostid,'lightpole','Electro')"
              >
                <div class="lamppostname" style="font-size: .12rem;">
                  <i class="icons color-huang">&#xe613;</i>
                  {{item.lamppostname}}
                </div>
                <div class="equipmentBox">
                  <div class="equipmentStatus" v-for="(ele,index) in item.lights" :key="index">
                    <!-- <span class="openLigthing" :title="ele.name">
                      <span class="icons" :class="{'color-lv':ele.state == 1}">&#xe7eb;</span>
                      {{ele.name}}
                    </span>-->
                    <span class="num" style="width:24%;">
                      <i>{{ele.id}}</i>
                    </span>
                    <span class="onoff" style="width:24%;">
                      <img src="../../assets/img/icon/dui_green.png" v-if="ele.onoff == 1" />
                      <img src="../../assets/img/icon/cuo_gray.png" v-if="ele.onoff == 0" />
                    </span>
                    <span class="state" style="width:24%;">
                      <img src="../../assets/img/icon/wifi_green.png" v-if="ele.state == 1" />
                      <img src="../../assets/img/icon/error_yellow.png" v-if="ele.state == 0" />
                    </span>
                    <span class="val" style="width:28%;">{{ele.lightValue}}</span>
                  </div>
                </div>
              </li>
            </div>
          </ul>
        </div>
      </div>
    </div>
    <!-- 监视呼叫 -->
    <div class="wrapbox" ref="Monitor">
      <div class="Monitor-Control content-left trans-up trans-up-delay-3">
        <div class="box-title">
          <span class="icons color-huang">&#xe657;</span>
          <span>监视呼叫</span>
        </div>
        <div class="equipmentBox">
          <span class="equipmentName">主机001</span>
          <div class="equipmentBtn clearfix" v-if="status==0">
            <span class="num icons color-dgreen">&#xe657;</span>
            <span>在线</span>
            <!-- <el-button type="success" size="mini" class="open" @click="stateControl('open')">在线</el-button> -->
            <!-- <el-button type="success" size="mini" class="down" @click="stateControl('down')">空闲</el-button> -->
          </div>
          <div class="equipmentBtns clearfix" v-if="status==1">
            <span class="num icons dcheng">&#xe657;</span>
            <span>在线</span>
            <!-- <el-button type="success" size="mini" class="open" @click="stateControl('open')">在线</el-button> -->
            <!-- <el-button type="success" size="mini" class="down" @click="stateControl('down')">空闲</el-button> -->
          </div>
        </div>
        <div class="equipmentForm">
          <ul class="equipmentItemBox clearfix">
            <li class="equipmentItem" v-for="(item,index) in stateData.data" :key="index">
              <div :class="{'bg':item.staus==1,'bgs':!item.staus}" @click="goCallPolice">
                <span class="num icons color-huang">&#xe657;</span>
                <i class="name">{{index+1}}</i>
                <!-- <span class="name">{{item.name}}</span> -->
              </div>
            </li>
          </ul>
        </div>
        <div class="equipmentBox">
          <span class="equipmentName">主机001</span>
          <!-- <div class="equipmentBtn clearfix">
          <el-button type="success" size="mini" class="open" @click="stateControl('open')">在线</el-button>
          <el-button type="success" size="mini" class="down" @click="stateControl('down')">空闲</el-button>
          </div>-->
          <div class="equipmentBtn clearfix" v-if="sta==0">
            <span class="num icons color-dgreen">&#xe657;</span>
            <span>在线</span>
            <!-- <el-button type="success" size="mini" class="open" @click="stateControl('open')">在线</el-button> -->
            <!-- <el-button type="success" size="mini" class="down" @click="stateControl('down')">空闲</el-button> -->
          </div>
          <div class="equipmentBtns clearfix" v-if="sta==1">
            <span class="num icons dcheng">&#xe657;</span>
            <span>在线</span>
            <!-- <el-button type="success" size="mini" class="open" @click="stateControl('open')">在线</el-button> -->
            <!-- <el-button type="success" size="mini" class="down" @click="stateControl('down')">空闲</el-button> -->
          </div>
        </div>
        <div class="equipmentForm">
          <ul class="equipmentItemBox clearfix">
            <li class="equipmentItem" v-for="(item,index) in stateData.datas" :key="index">
              <div :class="{'bg':item.staus==1,'bg_r':item.staus==2}">
                <span v-if="item.staus==1" class="num icons color-huang">&#xe657;</span>
                <span v-if="item.staus==2" class="num icons color-huang">&#xe63b;</span>
                <i class="name">{{index+1}}</i>
                <!-- <span class="name">{{item.name}}</span> -->
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <!-- 报警记录 -->
    <div class="wrapbox" ref="log">
      <div class="log-Control content-left trans-up trans-up-delay-3">
        <div class="box-title">
          <i class="icons color-huang">&#xe778;</i>
          <span>报警记录</span>
        </div>
        <div class="logFrom sbar">
          <div class="title">
            <div class="selectBox">
              <el-select
                v-model="Electro.value"
                placeholder="请选择"
                size="mini"
                :popper-append-to-body="false"
                @visible-change="visibleChange($event,Electro.value)"
              >
                <el-option value="1">全部</el-option>
                <el-option value="2">全部</el-option>
                <el-option value="3">全部</el-option>
              </el-select>
              <div class="select">
                <span :class="{'down':Electro.selecting,'up':!Electro.selecting}"></span>
              </div>
            </div>
            <div class="timeBox">
              <el-date-picker v-model="time" type="date" placeholder="选择日期"></el-date-picker>
            </div>
          </div>
          <div class="fromBox">
            <ul class="from">
              <li class="fromItem">
                <div class="fromItem-info">
                  <div class="infoContent">
                    <span>Y52号紧急报警</span>
                    <span>2019-12-23 19:32:09</span>
                  </div>
                  <div class="btnContent">
                    <span class="police">
                      <i class="icons color-hong">&#xe677;</i>报警
                    </span>
                    <button class="watch" @click="isVideo=!isVideo">查看视频</button>
                  </div>
                </div>
                <div class="fromItem-video" v-if="isVideo">
                  <video src="https://www.w3school.com.cn/i/movie.mp4" controls></video>
                </div>
              </li>
              <li class="fromItem">
                <div class="fromItem-info">
                  <div class="infoContent">
                    <span>Y52号紧急报警</span>
                    <span>2019-12-23 19:32:09</span>
                  </div>
                  <div class="btnContent">
                    <span class="police">
                      <i class="icons color-hong">&#xe677;</i>报警
                    </span>
                    <button class="watch">查看视频</button>
                  </div>
                </div>
                <div class="fromItem-video">
                  <video src="https://www.w3school.com.cn/i/movie.mp4" controls></video>
                </div>
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
  name: "videoControl",
  props: {
    target: Number
  },
  data() {
    return {
      Electro: {
        value: -1,
        loading: false,
        selecting: true, // 下拉框的显示和隐藏
        allChecked: false,
        selectData: [
          { loopname: "sdgfbdf" },
          { loopname: "sdgfbdf" },
          { loopname: "sff" },
          { loopname: "sdfv" },
          { loopname: "df" }
        ]
      },
      loctionData: {
        onoff: 1,
        state: 1
      },
      ElectroFormData: [
        { lamppostname: "sdgfbvs", lights: [{ onoff: 1, state: 1 }] }
      ],
      time: "",
      isVideo: false,
      isElectroShow: true,

      status: 0,
      sta: 1,
      stateData: {
        data: [
          { name: "在线", staus: 1 },
          { name: "在线", staus: 1 },
          { name: "在线", staus: 0 },
          { name: "在线", staus: 1 },
          { name: "在线", staus: 1 },
          { name: "在线", staus: 1 },
          { name: "在线", staus: 1 },
          { name: "在线", staus: 1 },
          { name: "在线", staus: 1 },
          { name: "在线", staus: 1 },
          { name: "在线", staus: 1 },
          { name: "在线", staus: 1 },
          { name: "在线", staus: 0 },
          { name: "在线", staus: 1 },
          { name: "在线", staus: 1 },
          { name: "在线", staus: 1 }
        ],
        datas: [
          { name: "在线", staus: 1 },
          { name: "在线", staus: 1 },
          { name: "在线", staus: 2 },
          { name: "在线", staus: 1 },
          { name: "在线", staus: 1 },
          { name: "在线", staus: 1 },
          { name: "在线", staus: 1 },
          { name: "在线", staus: 1 },
          { name: "在线", staus: 1 },
          { name: "在线", staus: 1 },
          { name: "在线", staus: 1 },
          { name: "在线", staus: 1 },
          { name: "在线", staus: 2 },
          { name: "在线", staus: 1 },
          { name: "在线", staus: 1 },
          { name: "在线", staus: 1 }
        ]
      }
    };
  },
  computed: {
    ElectroSelectValue: function() {
      if (this.Electro.value == -1) {
        return "全部";
      } else {
        return 2;
      }
    }
  },
  methods: {
    entry(controlModule) {
      this.$refs[controlModule].className = "";
      this.$refs[controlModule].className = "wrapbox is-visible";
    },
    leave(controlModule) {
      this.$refs[controlModule].className = "wrapbox";
    },

    goCallPolice() {
      this.leave("Monitor");
      setTimeout(() => {
        this.$parent.$refs.Police.entry();
      }, 600);
    },

    fnBroadcasting(flag) {
      if (flag == "open") {
        this.$store.state.bcSwitch = true;
      } else if (flag == "down") {
        this.$store.state.bcSwitch = false;
      }
    },
    // 回路控制
    handleElectroControl(flag) {
      let params, Data;
      let loopId = [];
      if (this.Electro.value == -1) {
        let array = this.$store.getters.websocketData[220001].msg.loops;
        array.forEach(item => {
          loopId.push(item.loopid);
        });
      } else {
        Data = this.$store.getters.websocketData[220001].msg.loops[
          this.Electro.value
        ];
        loopId.push(Data.loopid);
      }
      if (flag == "open") {
        params = {
          msgid: "550e8400-e29b-41d4-a716-446655440000",
          modulecode: 102001,
          msgtype: 0,
          msgcode: 220006,
          timestamp: this.$getCurrentDate(),
          msg: {
            cmdtype: 1,
            loops: loopId
          }
        };
      } else if (flag == "down") {
        params = {
          msgid: "550e8400-e29b-41d4-a716-446655440000",
          modulecode: 102001,
          msgtype: 0,
          msgcode: 220006,
          timestamp: this.$getCurrentDate(),
          msg: {
            cmdtype: 0,
            loops: loopId
          }
        };
      } else if (flag == "read") {
        params = {
          msgid: "550e8400-e29b-41d4-a716-446655440000",
          modulecode: 102001,
          msgtype: 0,
          msgcode: 220006,
          timestamp: this.$getCurrentDate(),
          msg: {
            cmdtype: 2,
            loops: loopId
          }
        };
      }
      this.getControlAPI(params);
    },
    visibleChange($event, vlaueSelect) {
      this.Electro.selecting = !this.Electro.selecting;
    },

    // 发送请求
    getControlAPI(data) {
      this.$api.post("/websocket/command", data).then(function(res) {
        console.log(res);
      });
    }
  }
};
</script>

<style lang="scss" scoped>
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

.Radio-Control {
  padding-top: 1.2rem;
  .Electro-content {
    margin-top: 0.1rem;
    padding: 0 0.3rem;
    .equipmentCooseBox {
      height: 0.45rem;
      line-height: 0.45rem;
      .titleText {
        font-size: 0.16rem;
      }
      .selectBox {
        position: relative;
        float: right;
        width: 2.45rem;
        font-size: 0.16rem;
        height: 0.47rem;
        line-height: 0.45rem;
        background: url(../../assets/img/control/selectBox.png) no-repeat
          center/cover;
        .showInput {
          position: absolute;
          top: 0rem;
          right: 0rem;
          padding-left: 20px;
          text-align: left;
          width: 2.45rem;
          height: 0.45rem;
          color: #fff;
        }
        .down {
          position: absolute;
          display: inline-block;
          right: 0.2rem;
          top: 0.16rem;
          width: 0.14rem;
          height: 0.13rem;
          background: url(../../assets/img/control/down.png) no-repeat
            center/cover;
        }
        .up {
          position: absolute;
          display: inline-block;
          right: 0.2rem;
          top: 0.16rem;
          width: 0.14rem;
          height: 0.13rem;
          transform: rotate(180deg);
          background: url(../../assets/img/control/down.png) no-repeat
            center/cover;
        }
      }
    }
    .loopChooseBox {
      margin-top: 0.2rem;
      height: 0.36rem;
      line-height: 0.36rem;
      clear: both;
      .electroBtn {
        height: 0.36rem;
        // width: 2.45rem;
        float: right;
        display: flex;
        justify-content: space-between;
        .open {
          background: #62d3fd;
        }
        .down {
          background: #69b3b1;
        }
      }
      .loopChoose {
        float: left;
        width: 0.1rem;
      }
      span {
        font-size: 0.16rem;
      }
      .electroBtn {
        margin-left: 0.1rem;
        float: right;
        .el-button {
          float: left;
        }
        line-height: 0.28rem;
      }
    }
  }
  .Electro-Form {
    padding: 0 0.3rem;
    margin-top: 0.1rem;
    .frombox {
      background: url(../../assets/img/control/fromBg.png) no-repeat
        center/cover;
      background-size: 4.23rem calc(100vh - 3.8rem);
      width: 4.23rem;
      height: calc(100vh - 3.8rem);
      overflow: hidden;
      margin: 0 auto;
      padding-top: 0.12rem;

      .fromItem-title {
        background-color: rgba(0, 0, 0, 0.2);
      }

      .fromItemBox {
        height: calc(100vh - 4.2rem);
        padding: 0 0.03rem;
        .bgEven {
          background: rgba(0, 0, 0, 0.2);
        }
        .fromItem {
          display: flex;
          justify-content: center;
          align-items: center;
          cursor: pointer;
          &:hover {
            background: rgba(86, 255, 254, 0.3);
          }
          .lamppostname {
            float: left;
            width: 40%;
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
            width: 60%;
            .equipmentStatus {
              overflow: hidden;
              text-overflow: ellipsis;
              white-space: nowrap;
              height: 0.6rem;
              line-height: 0.6rem;
              float: left;
              width: 50%;
              text-align: left;
            }
          }
        }
      }
    }
  }
}

.Monitor-Control {
  padding-top: 1.2rem;
  .equipmentBox {
    margin: 0.2rem 0.3rem 0;
    .equipmentName {
      height: 0.36rem;
      line-height: 0.36rem;
    }
    .equipmentBtn {
      float: right;
      width: 0.88rem;
      height: 0.36rem;
      line-height: 0.36rem;
      border: 0.01rem solid rgba(0, 251, 154, 1);
      border-radius: 0.1rem;
      text-align: center;
      font-weight: 300;
      color: rgba(0, 251, 154, 1);
      span:nth-child(1) {
        vertical-align: middle;
        font-size: 0.18rem;
      }
    }
    .equipmentBtns {
      float: right;
      width: 0.88rem;
      height: 0.36rem;
      line-height: 0.36rem;
      border: 0.01rem solid rgba(251, 207, 0, 1);
      border-radius: 0.1rem;
      text-align: center;
      font-weight: 300;
      color: rgba(251, 207, 0, 1);
      span:nth-child(1) {
        vertical-align: middle;
        font-size: 0.18rem;
      }
    }
  }
  .equipmentForm {
    line-height: 0.6rem;
    text-align: center;
    margin-top: 0.2rem;
    padding: 0 0.3rem;
    .equipmentItemBox {
      .equipmentItem {
        height: 0.6rem;
        float: left;
        width: 0.97rem;
        margin-right: 0.1rem;
        margin-top: 0.1rem;
        .bg {
          background: rgba(13, 34, 41, 0.2);
          border-radius: 0.1rem;
        }
        .bgs {
          background: rgba(255, 255, 255, 1);
          border-radius: 0.1rem;
          color: rgba(0, 0, 0, 1);
        }
        .bg_r {
          background: rgba(210, 18, 18, 1);
          border-radius: 0.1rem;
        }
        .num {
          margin-right: 0.05rem;
          font-size: 0.16rem;
          vertical-align: baseline;
        }
        .name {
          font-size: 0.17rem;
          text-shadow: none;
        }
      }
      .equipmentItem:nth-child(4n) {
        margin-right: 0;
      }
    }
  }
}

.log-Control {
  padding-top: 1.2rem;
  .logFrom {
    margin: 0.2rem auto;
    width: 4.17rem;
    height: 8.5rem;
    background: rgba(3, 64, 117, 0.6);
    border: 1px solid rgba(48, 173, 219, 1);
    padding: 0 0.1rem;
    .title {
      margin-top: 0.1rem;
      height: 0.36rem;
      line-height: 0.36rem;
      .selectBox {
        float: left;
        position: relative;
        .down {
          position: absolute;
          display: inline-block;
          right: 0.2rem;
          top: 0.14rem;
          width: 0.14rem;
          height: 0.13rem;
          background: url(../../assets/img/control/down.png) no-repeat
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
          background: url(../../assets/img/control/down.png) no-repeat
            center/cover;
        }
      }
      .timeBox {
        position: relative;
        float: right;
        font-size: 0.16rem;
        .el-date-editor.el-input {
          width: 1.64rem;
        }
        .el-input__icon {
          line-height: 0.36rem;
        }
      }
    }
    .fromBox {
      margin-top: 0.1rem;
      .from {
        .fromItem {
          margin-bottom: 0.1rem;
          .fromItem-info {
            border-left: 0.03rem solid #ccc;
            height: 0.5rem;
            // line-height: 0.5rem;
            .infoContent {
              margin-left: 0.1rem;
              float: left;
              height: 100%;
              span {
                display: block;
                line-height: 0.25rem;
              }
            }
            .btnContent {
              float: right;
              display: flex;
              align-items: center;
              height: 100%;
              .police {
                outline: none;
                margin-right: 0.1rem;
                width: 0.6rem;
                height: 0.3rem;
                line-height: 0.3rem;
                text-align: center;
                font-size: 0.16rem;
              }
              .watch {
                outline: none;
                color: #fff;
                background-color: transparent;
                width: 0.9rem;
                height: 0.3rem;
                border: 0.01rem solid rgba(255, 255, 255, 1);
                box-shadow: inset 0 0 0.1rem 0 rgba(0, 255, 240, 1);
                border-radius: 0.03rem;
                cursor: pointer;
                &:hover {
                  box-shadow: inset 0 0 0.1rem 0.08rem rgba(0, 255, 240, 1);
                }
              }
            }
          }
          .fromItem-video {
            margin-top: 0.1rem;
            video {
              width: 100%;
            }
          }
        }
      }
    }
  }
}
</style>