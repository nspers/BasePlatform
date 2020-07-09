<template>
  <div class="singleControl">
    <!-- 点选集控器 -->
    <div class ref="singleControl" v-if="$route.path == '/lightpole' && target == 4">
      <div class="checkControl content-left trans-up trans-up-delay-7">
        <div class="overview">
          <div class="wrapbox">
            <!-- 基本信息 -->
            <div class="o_box">
              <div class="box-title">
                <span class="icons color-huang">&#xe675;</span>
                <span>设备信息</span>
              </div>
              <p style="margin-top:0.2rem">
                设备名称：
                <span>{{ConcentratedData.controllername}}</span>
              </p>
              <p style="margin-top:0.2rem">
                设备编码：
                <span>{{ConcentratedData.controllernum}}</span>
              </p>
              <p style="margin-top:0.2rem">
                设备状态：
                <span
                  class="state"
                  style="display: inline-block;margin: 0 auto;"
                  v-if="ConcentratedData.state == 1"
                >
                  <img
                    style="width:0.2rem;height:0.2rem;vertical-align: middle;margin-top:-.05rem;"
                    src="../../assets/img/icon/wifi_green.png"
                    v-if="ConcentratedData.state == 1"
                  />&nbsp;
                </span>
                <span
                  class="state"
                  style="display: inline-block;margin: 0 auto;"
                  v-if="ConcentratedData.state == 0"
                >
                  <img
                    style="width:0.2rem;height:0.2rem;vertical-align: middle;margin-top:-.05rem;"
                    src="../../assets/img/icon/error_yellow.png"
                    v-if="ConcentratedData.state == 0"
                  />&nbsp;
                </span>
              </p>
            </div>

            <!-- 设备状态 -->
            <div class="o_box">
              <div class="box-title">
                <span class="icons color-huang">&#xe62a;</span>
                <span>回路控制</span>
              </div>
              <div class="Electro2-Control">
                <div class="Electro-content">
                  <div class="loopChooseBox marr">
                    <span class="fontsize">开关</span>
                    <div class="electroBtn" style="width:2.7rem">
                      <el-button
                        type="success"
                        size="mini"
                        class="open fontz widths"
                        style="background-color:rgb(84, 175, 16);font-size:0.13rem"
                        @click="ConcentratedControl('open2')"
                      >开灯</el-button>
                      <el-button
                        type="success"
                        size="mini"
                        style="background-color:#CE9351;font-size:0.13rem"
                        class="open fontz widths"
                        @click="ConcentratedControl('down2')"
                      >关灯</el-button>
                      <el-button
                        type="success"
                        style="font-size:0.13rem;"
                        size="mini"
                        class="rest fontz widths"
                        @click="ConcentratedControl('rest')"
                      >重启</el-button>
                    </div>
                  </div>
                  <div class="control-content_item marr">
                    <span class="item-type fontz">调光</span>
                    <span
                      style="float:right;margin-left: 0.12rem;width: 0.2rem;"
                    >{{ checkConcentrated.light}}</span>
                    <div class="item-slider" style="width:2.35rem">
                      <el-slider v-model="checkConcentrated.light" @change="ConcentratedSlider"></el-slider>
                    </div>
                  </div>
                  <div class="loopChooseBox marr">
                    <span class="fontsize">控制方式</span>
                    <div class="electroBtn" style="width:2.7rem">
                      <el-button
                        type="success"
                        size="mini"
                        class="open fontz widths"
                        style="font-size:0.13rem"
                        @click="ConcentratedControl('open')"
                      >闭合回路</el-button>
                      <el-button
                        type="warning"
                        size="mini"
                        style="font-size:0.13rem"
                        class="down fontz widths"
                        @click="ConcentratedControl('down')"
                      >断开回路</el-button>
                      <el-button
                        type="primary"
                        size="mini"
                        style="font-size:0.13rem"
                        class="read fontz widths"
                        @click="ConcentratedControl('read')"
                      >读取回路</el-button>
                    </div>
                  </div>
                </div>
                <div
                  class="fontsize LightingText"
                  style="margin-left:0.3rem;margin-top:0.3rem;font-size: 0.16rem;"
                >回路设备</div>
                <div class="Lighting marr">
                  <div class="Lighting-from">
                    <ul class="frombox" v-if="isShow">
                      <li class="fromItem-title">
                        <checked :target="'all'" @clickChecked="ConcentratedInput" :key="wuyong" />
                        <!-- <div class="checkedBox" @click="ConcentratedAllInput">
                          <span class="check" v-if="!checkConcentrated.allChecked"></span>
                          <span
                            class="iconsSmall color-lan-62d"
                            style="margin-left:0.2rem"
                            v-if="checkConcentrated.allChecked"
                          >&#xe7b3;</span>
                        </div>-->
                        <div class="locationName">回路名称</div>
                        <span class="locationName" style="width:50%">开关</span>
                        <!-- <span class="locationName">状态</span> -->
                      </li>
                      <div class="fromItemBox sbar">
                        <li
                          class="fromItem"
                          v-for="(item,index) in ConcentratedData.loopsList"
                          :key="index"
                        >
                          <checked
                            :target="item.id"
                            @clickChecked="ConcentratedInput"
                            :key="wuyong"
                          />
                          <!-- <div class="checkedBox" @click="ConcentratedInput(item.id)">
                            <span
                              class="check"
                              v-if="!checkConcentrated.checkedArray[index].checked"
                            ></span>
                            <span
                              class="iconsSmall color-lan-62d"
                              style="margin-left:0.2rem"
                              v-if="checkConcentrated.checkedArray[index].checked"
                            >&#xe7b3;</span>
                          </div>-->
                          <div class="locationName">{{item.name}}</div>
                          <!-- <span class="status">
                            <span
                              class="icons"
                              :class="item.state == 0 ? 'color-hong' : 'color-lv'"
                            >&#xe6bc;</span>
                          </span>-->

                          <!-- <span class="state" style="float: left;width: 15%;text-align: center;">
                            <img
                              style="width:0.2rem;height:0.2rem;vertical-align:middle;"
                              src="../../assets/img/icon/wifi_green.png"
                              v-if="item.state == 1"
                            />
                            <img
                              style="width:0.2rem;height:0.2rem;vertical-align:middle;"
                              src="../../assets/img/icon/error_yellow.png"
                              v-if="item.state == 0"
                            />
                          </span>-->

                          <span class="state" style="float: left;width: 50%;text-align:center;">
                            <img
                              style="width:0.2rem;height:0.2rem;vertical-align:middle;"
                              src="../../assets/img/icon/dui_green.png"
                              v-if="item.onoff == 1"
                            />
                            <img
                              style="width:0.2rem;height:0.2rem;vertical-align:middle;"
                              src="../../assets/img/icon/cuo_gray.png"
                              v-if="item.onoff == 0"
                            />
                          </span>
                          <!--
                          <span class="status">
                            <span
                              class="icons"
                              :class="item.onoff == 1 ? 'color-lv' : ''"
                              v-if="item.onoff == 1"
                            >&#xe6b3;</span>
                            <span
                              class="icons"
                              :class="item.onoff == 0 ? 'color-hong' : ''"
                              v-if="item.onoff == 0"
                            >&#xe603;</span>
                          </span>-->
                        </li>
                      </div>
                    </ul>
                    <div v-if="!isShow" style="text-align: center;line-height: 2.36rem;">暂无数据</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- 搜索设备 -->
      <Search
        type="jizhong"
        class="trans-up trans-up-delay-3"
        v-if="$route.path == '/lightpole' && target == 4"
      />
    </div>
    <!-- 点选灯杆 -->
    <div ref="singleControl" class v-if="$route.path == '/lightpole' && target == 3">
      <div class="checkLight content-left trans-up trans-up-delay-7">
        <div class="overview">
          <div class="wrapbox">
            <!-- 基本信息 -->
            <div class="o_box">
              <div class="box-title">
                <span class="icons color-huang">&#xe675;</span>
                <span>设备信息</span>
              </div>
              <p class="marr">
                灯杆名称：
                <span>{{ LightFormData.lamppostname }}</span>
              </p>
              <!-- <p>
                <span>单灯信息：</span>
                <span>1号灯</span>
                <span>1233456</span>
              </p>
              <p>
                <span class="o_display">单灯信息：</span>
                <span>2号灯</span>
                <span>123456</span>
              </p> -->
            </div>
            <!-- 设备状态 -->
            <div class="o_box">
              <div class="box-title">
                <span class="icons color-huang">&#xe62a;</span>
                <span>设备控制</span>
              </div>
              <div class="Electro2-Control">
                <div class="Electro-content">
                  <div class="loopChooseBox marr">
                    <span class="fontsize">开关</span>
                    <div class="electroBtn" style="float:right">
                      <el-button
                        type="success"
                        size="mini"
                        class="open"
                        style="background-color:rgb(84, 175, 16);width:0.8rem;    height: 0.36rem;padding: 0.08rem 0.07rem;font-size:0.13rem"
                        @click="handleLightControl('open')"
                      >开灯</el-button>
                      <el-button
                        type="success"
                        size="mini"
                        style="background-color:#CE9351;width:0.8rem;    height: 0.36rem;padding: 0.08rem 0.07rem;font-size:0.13rem"
                        class="rest"
                        @click="handleLightControl('down')"
                      >关灯</el-button>
                    </div>
                  </div>
                  <div class="control-content_item marr">
                    <span class="item-type fontsize">调光</span>
                    <span
                      style="margin-left: 0.12rem;width: 0.2rem;float:right"
                    >{{ checkLight.light}}</span>
                    <div class="item-slider" style="width:2.15rem;float:right">
                      <el-slider
                        v-model="checkLight.light"
                        :disabled="checkLight.isSlider"
                        @change="handleLightSilder"
                      ></el-slider>
                    </div>
                  </div>
                </div>
                <div class="Lighting marr">
                  <div class="Lighting-from">
                    <ul class="frombox">
                      <li class="fromItem-title" v-if="isLightShow">
                        <checked :target="'all'" @clickChecked="checkLightInput" :key="wuyong" />
                        <!-- <div class="checkedBox" @click="checkcheckAll">
                          <span class="check" v-if="!checkLight.allChecked"></span>
                          <span
                            class="iconsSmall color-lan-62d"
                            style="margin-left:0.2rem"
                            v-if="checkLight.allChecked"
                          >&#xe7b3;</span>
                        </div>-->
                        <div class="locationName">名称</div>
                        <span class="locationName">开关</span>
                        <span class="locationName">状态</span>
                      </li>
                      <div class="fromItemBox sbar" v-if="isLightShow">
                        <li
                          class="fromItem"
                          v-for="(item,index) in LightFormData.linghts"
                          :key="index"
                        >
                          <checked :target="item.id" @clickChecked="checkLightInput" :key="wuyong" />
                          <!-- <div class="checkedBox" @click="oddcheck(index,item.id)">
                            <span class="check" v-if="!checkedArray[index].checked"></span>
                            <span
                              class="iconsSmall color-lan-62d"
                              style="margin-left:0.2rem"
                              v-if="checkedArray[index].checked"
                            >&#xe7b3;</span>
                          </div>-->
                          <!-- {{LightFormData.linghts}} -->
                          <div class="locationName">{{item.name}}</div>

                          <span class="state" style="float: left;width: 25%;text-align: center;">
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

                          <span class="state" style="float: left;width: 25%;text-align: center;">
                            <img
                              style="width:0.2rem;height:0.2rem;vertical-align: middle;"
                              src="../../assets/img/icon/wifi_green.png"
                              v-if="item.state == 1"
                            />
                            <img
                              style="width:0.2rem;height:0.2rem;vertical-align: middle;"
                              src="../../assets/img/icon/error_yellow.png"
                              v-if="item.state == 0"
                            />
                          </span>

                          <!-- <span class="status">
                            <span
                              class="icons"
                              :class="item.onoff == 0 ? 'color-hong' : 'color-lv'"
                            >&#xe6bc;</span>
                          </span>
                          <span class="status">
                            <span class="icons" v-if="item.state == 0">&#xe603;</span>
                            <span class="icons" v-if="item.state == 2">&#xe6b3;</span>
                          </span>-->
                        </li>
                      </div>
                      <div v-if="!isLightShow" style="text-align: center;line-height: 2.36rem;">暂无数据</div>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- 搜索设备 -->
      <Search
        type="lightpole"
        class="trans-up trans-up-delay-3"
        v-if="$route.path == '/lightpole' && target == 3"
      />
    </div>
    <!-- 点选LED -->
    <div ref="singleControl" class v-if="$route.path == '/led' && target == 5">
      <div class="checkLed content-left trans-up trans-up-delay-7">
        <div class="basicInfoBox">
          <div class="box-title">
            <i class="icons color-huang">&#xe778;</i>
            <span>设备信息</span>
          </div>
          <div class="basicBox">
            <div class="name">
              设备名称：
              <span>{{LEDData.lamppostname}}</span>
            </div>
            <!-- <div class="code">
              灯杆编号：
              <span>{{LEDData.devicecode}}</span>
            </div>-->
            <div style="line-height: 0.36rem;margin:0.2rem 0;">
              <p style="line-heihgt:0.36rem;">
                <span style="vertical-align: middle;">开关 ：</span>
                <span class="state" style="display: inline-block;margin:0 1rem 0 .2rem;">
                  <img
                    style="width:0.2rem;height:0.2rem;vertical-align: middle;"
                    src="../../assets/img/icon/dui_green.png"
                    v-if="LEDData.onoff == 1"
                  />
                  <img
                    style="width:0.2rem;height:0.2rem;vertical-align: middle;"
                    src="../../assets/img/icon/cuo_gray.png"
                    v-if="LEDData.onoff == 0"
                  />
                </span>

                <span style="vertical-align: middle;">状态 ：</span>
                <span class="state" style="display: inline-block;margin:0 1rem 0 .2rem;">
                  <img
                    style="width:0.2rem;height:0.2rem;vertical-align: middle;"
                    src="../../assets/img/icon/wifi_green.png"
                    v-if="LEDData.online == 1"
                  />
                  <img
                    style="width:0.2rem;height:0.2rem;vertical-align: middle;"
                    src="../../assets/img/icon/error_yellow.png"
                    v-if="LEDData.online == 0"
                  />
                </span>
              </p>
            </div>
          </div>
        </div>
        <div class="controlBox">
          <div class="box-title">
            <i class="icons color-huang">&#xe778;</i>
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
                  style="background-color:rgb(84, 175, 16);width:0.8rem;padding: 0.08rem 0.07rem;font-size:0.13rem"
                  @click="handleSingleLedControl('open')"
                >开启</el-button>

                <el-button
                  type="success"
                  size="mini"
                  style="background-color:#CE9351;width:0.8rem;padding: 0.08rem 0.07rem;font-size:0.13rem"
                  class="down"
                  @click="handleSingleLedControl('down')"
                >关闭</el-button>

                <el-button
                  type="primary"
                  size="mini"
                  class="rest"
                  style="width:0.8rem;padding: 0.08rem 0.07rem;font-size:0.13rem;background: #31a4a3"
                  @click="handleSingleLedControl('rest')"
                >重启</el-button>
              </div>
            </div>
            <div class="control-content_item">
              <span class="item-type">自动调光</span>
              <div style="text-align:right;float:right;">
                <el-switch
                  v-model="checkLed.autolight"
                  active-color="#72EED2"
                  @change="handleSingleLedSlider('autolight')"
                ></el-switch>
              </div>
            </div>
            <div class="control-content_item">
              <span class="item-type">亮度</span>
              <span style="float:right;margin-left: 0.12rem;width: 0.2rem;">{{ LEDData.light}}</span>
              <div class="item-slider" style="width:2.15rem">
                <el-slider
                  :max="255"
                  v-model="LEDData.light"
                  @change="handleSingleLedSlider('light')"
                  :disabled="checkLed.autolight"
                ></el-slider>
              </div>
            </div>
            <div class="control-content_item">
              <span class="item-type">音量</span>
              <span style="float:right;margin-left: 0.12rem;width: 0.2rem;">{{ LEDData.volume}}</span>

              <div class="item-slider" style="width:2.15rem">
                <el-slider
                  :max="15"
                  v-model="LEDData.volume"
                  @change="handleSingleLedSlider('volume')"
                ></el-slider>
              </div>
            </div>
          </div>
          <div class="imgbox" v-if="LEDData.online == 1 && LEDData.onoff == 1">
            <span class="item-type" style="font-size:.16rem;">实时画面</span>
            <div class="img">
              <iframe
                frameborder="0"
                :src="'http://223.71.14.41:9804/led_zhaoming.html?id=' + this.LEDData.id + '&width=136&height=340'"
              ></iframe>
              <!-- <iframe
                frameborder="0"
                src='http://223.71.14.41:8963/led_zhaoming.html?id=9'
              ></iframe> -->
            </div>
          </div>
        </div>
      </div>
      <!-- 搜索设备 -->
      <Search
        type="led"
        class="trans-up trans-up-delay-3"
        v-if="$route.path == '/led' && target == 5"
      />
    </div>
  </div>
</template>

<script>
import Search from "../../components/search";
import checked from "../../components/checked";
export default {
  name: "singleControl",
  props: ["target"],
  components: {
    Search,
    checked
  },
  data() {
    return {
      checkConcentrated: {
        allChecked: false,
        Concentrated: 70,
        Datalist: [],
        oldData: [],
        light: 0,
        isSlider: true,
        allChecked: false,
        checkedArray: []
      },
      checkLight: {
        allChecked: false,
        light: 0,
        isSlider: true,
        lamppostname: "",
        Datalist: [],
        oldDatalist: [],
        oldArray: [],
        checkedArray: []
      },
      checkLed: {
        volume: 0,
        isSlide: true,
        light: 0,
        oldData: [],
        autolight: false
      },
      timer: "",
      checkedArray: [],
      wuyong: 0
    };
  },
  mounted() {
    this.$nextTick(function() {
      this.$store.state.checkedArray = {};
      this.wuyong++;
    });
  },
  computed: {
    code: function() {
      return this.modulecode[this.$route.name];
    },
    loctionId: function() {
      return this.$store.getters.getLoctionId;
    },

    //点选灯杆
    LightFormData: function() {
      if (this.$store.getters.websocketData[220002]) {
        let wsData = this.$store.getters.websocketData[220002].msg.groups;
        let allArray = this.filterAllData(wsData, "lampposts");
        let array = allArray.filter(item => item.lamppostid == this.loctionId);
        this.checkLight.Datalist = array.length
          ? array[0]
          : { lamppostname: "" };
        return array.length ? array[0] : { lamppostname: "" };
      } else {
        return { lamppostname: "" };
      }
    },
    isLightShow: function() {
      return this.$store.getters.websocketData[220002] ? true : false;
    },

    isShow: function() {
      return this.$store.getters.websocketData[220005] ? true : false;
    },
    ConcentratedData: function() {
      if (this.$store.getters.websocketData[220005]) {
        let allArray = this.$store.getters.websocketData[220005].msg
          .controllers;
        let array = allArray.filter(
          item => item.controllerid == this.loctionId
        );
        if (array.length) {
          return array[0];
        } else {
          return {
            controllername: "",
            controllernum: "",
            state: 1,
            lightvalue: 0
          };
        }
      } else {
        return {
          controllername: "",
          controllernum: "",
          state: 1,
          lightvalue: 0
        };
      }
    },
    LEDData: function() {
      if (this.$store.getters.websocketData[230011]) {
        let array = this.$store.getters.websocketData[230011].msg.groups;
        let allArray = this.filterAllData(array, "leds");
        let Data = allArray.filter(item => item.lamppostid == this.loctionId);
        if (Data[0]) {
          this.checkLed.autolight = Data[0].autolight == 1 ? true : false;
          return Data[0];
        } else {
          return {
            lamppostname: "",
            devicecode: "",
            online: 0,
            onoff: 0,
            light: 0,
            volume: 0,
            lamppostid: 1
          };
        }
      } else {
        return {
          lamppostname: "",
          devicecode: "",
          online: 0,
          onoff: 0,
          light: 0,
          volume: 0,
          lamppostid: 1
        };
      }
    }
  },
  created() {
    let isClear = false;
    if (isClear) {
      clearTimeout(this.timer);
    } else {
      this.timer = setTimeout(() => {
        if (this.$store.getters.websocketData[220005]) {
          let allArray = this.$store.getters.websocketData[220005].msg
            .controllers;
          let array = allArray.filter(
            item => item.controllerid == this.loctionId
          );
          if (array.length) {
            this.checkConcentrated.light = array[0].lightvalue;
            isClear = true;
          } else {
            this.checkConcentrated.light = 0;
            isClear = true;
          }
        }
      }, 500);
    }
  },
  methods: {
    entry() {
      this.$refs.singleControl.className = "is-visible";
    },
    leave() {
      this.$refs.singleControl.className = "";
    },

    // LED下控
    handleSingleLedControl(flag) {
      let params;
      // let InputData = this.checkedArray.filter(ele => ele.checked);
      // let ledId = InputData.map(ele => ele.id);
      if (flag == "open") {
        params = {
          msgid: "550e8400-e29b-41d4-a716-446655440000",
          modulecode: 103002,
          msgtype: 0,
          msgcode: 200001,
          timestamp: this.$getCurrentDate(),
          msg: {
            cmdtype: 1,
            light: this.LEDData.light,
            volume: this.LEDData.volume,
            leds: [this.LEDData.id]
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
            light: this.LEDData.light,
            volume: this.LEDData.volume,
            leds: [this.LEDData.id]
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
            light: this.LEDData.light,
            volume: this.LEDData.volume,
            leds: [this.LEDData.id]
          }
        };
        this.getControlAPI(params);
      }
    },

    handleSingleLedSlider(target) {
      let params;
      if (target == "light") {
        params = params = {
          msgid: "550e8400-e29b-41d4-a716-446655440000",
          modulecode: 103002,
          msgtype: 0,
          msgcode: 200001,
          timestamp: this.$getCurrentDate(),
          msg: {
            cmdtype: 4,
            light: this.LEDData.light,
            volume: this.LEDData.volume,
            autolight: this.checkLed.autolight ? 1 : 0,
            leds: [this.LEDData.id]
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
            light: this.LEDData.light,
            volume: this.LEDData.volume,
            autolight: this.checkLed.autolight ? 1 : 0,
            leds: [this.LEDData.id]
          }
        };
      } else if (target == "autolight") {
        params = params = {
          msgid: "550e8400-e29b-41d4-a716-446655440000",
          modulecode: 103002,
          msgtype: 0,
          msgcode: 200001,
          timestamp: this.$getCurrentDate(),
          msg: {
            cmdtype: 6,
            light: this.LEDData.light,
            volume: this.LEDData.volume,
            autolight: this.checkLed.autolight ? 1 : 0,
            leds: [this.LEDData.id]
          }
        };
      }
      this.getControlAPI(params);
    },

    // 集控器
    ConcentratedInput() {
      let flag = 0;
      for (const key in this.$store.state.checkedArray) {
        if (this.$store.state.checkedArray[key] && key != "all") {
          flag += 1;
        }
      }
      if (flag > 0) {
        this.checkConcentrated.isSlider = false;
      } else {
        this.checkConcentrated.isSlider = true;
        this.checkConcentrated.light = 0;
      }
    },
    ConcentratedControl(flag) {
      let params;
      let loopsId = [];
      for (const key in this.$store.state.checkedArray) {
        if (this.$store.state.checkedArray[key] && key != "all") {
          loopsId.push(Number(key));
        }
      }
      if (this.ConcentratedData.controllerid) {
        if (flag == "rest") {
          params = {
            msgid: "550e8400-e29b-41d4-a716-446655440000",
            modulecode: 102001,
            msgtype: 0,
            msgcode: 220008,
            timestamp: this.$getCurrentDate(),
            msg: {
              cmdtype: 4,
              lightvalue: this.checkConcentrated.light,
              controllerid: this.ConcentratedData.controllerid,
              loops: loopsId
            }
          };
          this.getControlAPI(params);
        } else if (flag == "open2") {
          params = {
            msgid: "550e8400-e29b-41d4-a716-446655440000",
            modulecode: 102001,
            msgtype: 0,
            msgcode: 220008,
            timestamp: this.$getCurrentDate(),
            msg: {
              cmdtype: 5,
              lightvalue: this.checkConcentrated.light,
              controllerid: this.ConcentratedData.controllerid,
              loops: []
            }
          };
          this.getControlAPI(params);
        } else if (flag == "down2") {
          params = {
            msgid: "550e8400-e29b-41d4-a716-446655440000",
            modulecode: 102001,
            msgtype: 0,
            msgcode: 220008,
            timestamp: this.$getCurrentDate(),
            msg: {
              cmdtype: 6,
              lightvalue: this.checkConcentrated.light,
              controllerid: this.ConcentratedData.controllerid,
              loops: []
            }
          };
          this.getControlAPI(params);
        }
      }

      if (
        !loopsId.length &&
        flag != "down2" &&
        flag != "open2" &&
        flag != "rest"
      ) {
        this.$Message.closeAll();
        this.$Message({
          message: "请先选择回路",
          type: "warning"
        });
      } else {
        if (flag == "open") {
          params = {
            msgid: "550e8400-e29b-41d4-a716-446655440000",
            modulecode: 102001,
            msgtype: 0,
            msgcode: 220006,
            timestamp: this.$getCurrentDate(),
            msg: {
              cmdtype: 1,
              lightvalue: this.checkConcentrated.light,
              controllerid: this.ConcentratedData.controllerid,
              loops: loopsId
            }
          };
          this.getControlAPI(params);
        } else if (flag == "down") {
          params = {
            msgid: "550e8400-e29b-41d4-a716-446655440000",
            modulecode: 102001,
            msgtype: 0,
            msgcode: 220006,
            timestamp: this.$getCurrentDate(),
            msg: {
              cmdtype: 0,
              lightvalue: this.checkConcentrated.light,
              controllerid: this.ConcentratedData.controllerid,
              loops: loopsId
            }
          };
          this.getControlAPI(params);
        } else if (flag == "read") {
          params = {
            msgid: "550e8400-e29b-41d4-a716-446655440000",
            modulecode: 102001,
            msgtype: 0,
            msgcode: 220006,
            timestamp: this.$getCurrentDate(),
            msg: {
              cmdtype: 2,
              lightvalue: this.checkConcentrated.light,
              controllerid: this.ConcentratedData.controllerid,
              loops: loopsId
            }
          };
          this.getControlAPI(params);
        }
      }
    },
    ConcentratedSlider() {
      if (this.ConcentratedData.controllerid) {
        let params = {
          msgid: "550e8400-e29b-41d4-a716-446655440000",
          modulecode: 102001,
          msgtype: 0,
          msgcode: 220008,
          timestamp: this.$getCurrentDate(),
          msg: {
            cmdtype: 3,
            lightvalue: this.checkConcentrated.light,
            controllerid: this.ConcentratedData.controllerid,
            loops: []
          }
        };
        this.getControlAPI(params);
      }
    },

    //点选灯杆
    checkLightInput() {
      let flag = 0;
      for (const key in this.$store.state.checkedArray) {
        if (this.$store.state.checkedArray[key] && key != "all") {
          flag += 1;
        }
      }
      if (flag > 0) {
        this.checkLight.isSlider = false;
        if (flag == 1) {
          let keyId;
          for (const key in this.$store.state.checkedArray) {
            if (this.$store.state.checkedArray[key] && key != "all") {
              keyId = Number(key);
            }
          }
          this.LightFormData.linghts.forEach(item => {
            if (item.id == keyId) {
              this.checkLight.light = item.lightValue;
            }
          });
        } else {
          this.checkLight.light = 0;
        }
      } else {
        this.checkLight.isSlider = true;
        this.checkLight.light = 0;
      }
    },
    handleLightControl(flag) {
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
          message: "请先选择设备名称",
          type: "warning"
        });
      } else {
        if (flag == "open") {
          params = {
            msgid: "550e8400-e29b-41d4-a716-446655440000",
            modulecode: 102001,
            msgtype: 0,
            msgcode: 220010,
            timestamp: this.$getCurrentDate(),
            msg: {
              cmdtype: 1,
              lightvalue: this.checkLight.light,
              lights: lightsId
            }
          };
        } else if (flag == "down") {
          params = {
            msgid: "550e8400-e29b-41d4-a716-446655440000",
            modulecode: 102001,
            msgtype: 0,
            msgcode: 220010,
            timestamp: this.$getCurrentDate(),
            msg: {
              cmdtype: 0,
              lightvalue: this.checkLight.light,
              lights: lightsId
            }
          };
        }
        this.getControlAPI(params);
      }
    },
    handleLightSilder() {
      let lightsId = [];
      for (const key in this.$store.state.checkedArray) {
        if (this.$store.state.checkedArray[key] && key != "all") {
          lightsId.push(Number(key));
        }
      }
      if (!lightsId.length) {
        this.$Message.closeAll();
        this.$Message({
          message: "请先选择设备名称",
          type: "warning"
        });
      } else {
        let params = {
          msgid: "550e8400-e29b-41d4-a716-446655440000",
          modulecode: 102001,
          msgtype: 0,
          msgcode: 220010,
          timestamp: this.$getCurrentDate(),
          msg: {
            cmdtype: 3,
            lightvalue: this.checkLight.light,
            lights: lightsId
          }
        };
        this.getControlAPI(params);
      }
    },

    // 过滤出全部数据
    filterAllData(array, key) {
      let allArray = [];
      array.forEach(item => {
        let childrenArray = [].slice.call(item[key]);
        childrenArray.forEach(ele => {
          allArray.push(ele);
        });
      });
      return allArray;
    },

    // 处理单选框数据更新和勾选的问题
    changeChecked(oldData, newData, isLen) {
      var oldNum = 0;
      var newNum = 0;
      if (isLen && oldData.length > 0) {
        for (var i = 0; i < oldData.length; i++) {
          oldNum = 0;
          for (var s = 0; s < newData.length; s++) {
            if (oldData[i].id == newData[s].id) {
              oldData[i] = newData[s]; //找到推送数据和已有数据相同ID项进行替换
            } else {
              oldNum++;
              if (oldNum == newData.length) {
                //旧数据中的某一条不存在在新数据中，此条数据被删除
                oldData.splice(i, 1);
                this.checkedArray.splice(i, 1);
              }
            }
          }
        }
        for (var s = 0; s < newData.length; s++) {
          newNum = 0;
          for (var i = 0; i < oldData.length; i++) {
            if (newData[s].id != oldData[i].id) {
              newNum++;
              if (newNum == oldData.length) {
                //新推送的数据中的某一条是旧数据中不存在的，push进data中
                oldData.push(newData[s]);
                this.checkedArray.push({
                  id: newData[s].id,
                  checked: false
                });
              }
            }
          }
        }
      }
      return oldData.length > 0 ? oldData : [];
    },

    // 发送请求
    getControlAPI(data) {
      this.$api.post("/websocket/command", data).then(function(res) {
        console.log(res);
      });
    }
  },
  beforeRouteLeave(to, from, next) {
    this.leave();
    setTimeout(() => {
      next();
    }, 800);
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

.checkControl {
  .overview {
    position: absolute;
    top: 1.2rem;
    height: 88%;
    left: 0;
    width: 4.8rem;
    z-index: 999;

    .wrapbox {
      width: 4.8rem;
      height: 100%;
      font-size: 0.12rem;
      color: #fff;

      .o_box {
        position: relative;
        margin-bottom: 0.2rem;
        width: 100%;
        border-radius: 0.05rem;
        span {
          vertical-align: middle;
          letter-spacing: 0.04rem;
        }
        p {
          margin-top: 0.2rem;
          margin: 0.05rem 0 0 0.3rem;
          color: #fff;
          line-height: 0.36rem;
          font-size: 0.16rem;
          letter-spacing: 0.04rem;
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
        .temp_box {
          padding: 0.2rem 0 0 0.2rem;
          width: 100%;
          div {
            float: left;
          }
          .temp_bar_box {
            overflow: hidden;
            padding: 0.26rem 0 0 0.1rem;
            width: 1.5rem;
            height: 1.6rem;
            .temp_bar {
              position: relative;
              width: 1.48rem;
              height: 1.28rem;
              background: url("../../assets/img/temp_bar.png") no-repeat 0 0 /
                cover;
              .temp_cir {
                position: absolute;
                left: 0;
                right: 0;
                bottom: 0.16rem;
                margin: 0 auto;
                width: 0.26rem;
                height: 0.26rem;
                border-radius: 50%;
                background-color: yellow;
              }
              .temp_rod {
                position: absolute;
                left: 0;
                right: 0;
                bottom: 0.36rem;
                margin: 0 auto;
                width: 0.08rem;
                height: 0.6rem;
                border-radius: 0.05rem 0.05rem 0 0;
                background-color: yellow;
              }
            }
          }
        }
      }
    }
  }
  .o_display {
    visibility: hidden;
  }
  .Electro2-Control {
    .Electro-content {
      margin-top: 0.1rem;
      padding: 0 0.3rem;

      .loopChooseBox {
        margin-top: 0.1rem;
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
            margin-right: 0.1rem;
            padding: 0.08rem 0.07rem;
          }
          .down {
            background: #69b3b1;
            margin-right: 0.1rem;
            padding: 0.08rem 0.07rem;
          }
          .open2 {
            background: #62d3fd;
            margin-right: 0.1rem;
          }
          .down2 {
            background: #69b3b1;
          }
          .read {
            background: #7cae86;
            padding: 0.08rem 0.07rem;
          }
          .rest {
            background: #31a4a3;
            padding: 0.08rem 0.07rem;
          }
        }
        .loopChoose {
          float: left;
          width: 0.1rem;
        }
        span {
          font-size: 0.16rem;
        }
      }
    }
    .Electro-Form {
      padding: 0 0.3rem;
      margin-top: 0.1rem;
      .frombox {
        background: url("../../assets/img/control/ju.png") no-repeat
          center/cover;
        background-size: 4.23rem 6rem;
        width: 4.23rem;
        height: 6rem;
        margin: 0 auto;
        padding-top: 0.12rem;
        .fromItemBox {
          height: 5.9rem;
          padding: 0 0.03rem;
          .bgEven {
            background: rgba(0, 0, 0, 0.2);
          }
          .fromItem {
            display: flex;
            justify-content: center;
            align-items: center;
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
  .Lighting {
    padding: 0 0.2rem;
    margin: 0.2rem 0;
    color: #fff;
    height: 2.36rem;
    .Lighting-from {
      background: url("../../assets/img/control/ju.png") center/cover no-repeat;
      height: 2.36rem;
      width: 4.23rem;
      background-size: 4.23rem 2.36rem;
      padding: 0 0.03rem;
      margin: 0 auto;
      overflow: hidden;
      .frombox {
        margin-top: 0.1rem;
        .fromItem-title {
          line-height: 0.4rem;
          height: 0.4rem;
          // background: rgba(86, 255, 254, 0.3);
          background: linear-gradient(
            to,
            right,
            rgba(37, 95, 143, 0.9),
            rgba(0, 0, 0, 0)
          );
          .status {
            float: left;
            width: 25%;
            text-align: center;
            overflow: hidden;
          }
          .locationName {
            float: left;
            width: 25%;
            text-align: center;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
          }
          .checkedBox {
            width: 20%;
            line-height: 0.4rem;
            height: 0.4rem;
            float: left;
            display: flex;
            justify-content: center;
            align-items: center;
            cursor: pointer;
            .check {
              float: left;
              text-align: center;
              overflow: hidden;
              margin-left: 0.2rem;
              height: 0.15rem;
              width: 0.14rem;
              border: 0.012rem solid #62d3fd;
            }
          }
        }
        .fromItemBox {
          height: 2rem;
          .fromItem {
            height: 0.36rem;
            line-height: 0.36rem;
            overflow: hidden;
            &:hover {
              background: linear-gradient(
                to,
                right,
                rgba(86, 255, 254, 0.3),
                rgba(0, 0, 0, 0)
              );
            }
            .status {
              float: left;
              width: 25%;
              text-align: center;
              overflow: hidden;
            }
            .locationName {
              float: left;
              width: 25%;
              text-align: center;
              overflow: hidden;
              text-overflow: ellipsis;
              white-space: nowrap;
            }
            .checkedBox {
              width: 20%;
              line-height: 0.4rem;
              height: 0.4rem;
              float: left;
              display: flex;
              justify-content: center;
              align-items: center;
              cursor: pointer;
              .check {
                float: left;
                text-align: center;
                overflow: hidden;
                margin-left: 0.2rem;
                height: 0.15rem;
                width: 0.14rem;
                border: 0.012rem solid #62d3fd;
              }
            }
          }
        }
      }
    }

    .o_box_corner {
      position: absolute;
      width: 0.2rem;
      height: 0.2rem;
      border: 0.01rem solid #1ff7f2;
    }
    .Lighting-title {
      position: relative;
      margin: 0 0 0.1rem 0.28rem;
      padding-left: 0.1rem;
      border-bottom: #1ff7f2 solid 0.01rem;
      font-size: 0.16rem;
      line-height: 0.24rem;
      .iconfont {
        position: absolute;
        left: -0.28rem;
        bottom: -0.01rem;
        width: 0.3rem;
        height: 0.18rem;
        // background: url("../assets/img/control/icon.png") no-repeat center/cover;
      }
    }
    .Lighting-content {
      overflow: hidden;
      font-size: 0.16rem;
      .show-Control {
        line-height: 0.7rem;
        .open {
          background: #18b7b0;
          margin-right: 0.15rem;
          float: right;
        }
        .down {
          background: #ff992a;
          float: right;
        }
      }
      .btnBox {
        overflow: hidden;
        .active {
          // background: url("../assets/img/control/btnHover.png") no-repeat
          // center/cover !important;
        }
        .btn {
          padding-left: 0.12rem;
          float: left;
          width: 0.975rem;
          height: 0.35rem;
          color: #fff;
          line-height: 0.35rem;
          margin-right: 0.1rem;
          cursor: pointer;
          // background: url("../assets/img/control/btn.png") no-repeat center/cover;
          &:hover {
          }
        }
      }
    }
  }
  .control-content_item {
    line-height: 0.36rem;
    margin-top: 0.1rem;
    .item-type {
      display: inline-block;
      height: 0.36rem;
      line-height: 0.36rem;
    }
    .item-control {
      height: 0.36rem;
      width: 2.45rem;
      float: right;
    }
    .item-slider {
      height: 0.36rem;
      line-height: 0.36rem;
      width: 2.45rem;
      float: right;
    }
  }
  .fontsize {
    font-size: 0.18rem;
    font-family: PingFangSC-Regular;
    font-weight: 400;
    color: rgba(255, 255, 255, 1);
  }
  .fontz {
    font-size: 0.16rem;
  }
}

.checkLight {
  .overview {
    position: absolute;
    top: 1.2rem;
    height: 88%;
    left: 0;
    width: 4.8rem;
    z-index: 999;

    .wrapbox {
      width: 4.8rem;
      height: 100%;
      font-size: 0.12rem;
      color: #fff;

      .o_box {
        position: relative;
        margin-bottom: 0.2rem;
        width: 100%;
        border-radius: 0.05rem;
        span {
          vertical-align: middle;
          letter-spacing: 0.04rem;
        }
        p {
          margin: 0.3rem 0 0 0.3rem;
          color: #fff;
          line-height: 0.36rem;
          font-size: 0.16rem;
          letter-spacing: 0.04rem;
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
        .temp_box {
          padding: 0.2rem 0 0 0.2rem;
          width: 100%;
          div {
            float: left;
          }
          .temp_bar_box {
            overflow: hidden;
            padding: 0.26rem 0 0 0.1rem;
            width: 1.5rem;
            height: 1.6rem;
            .temp_bar {
              position: relative;
              width: 1.48rem;
              height: 1.28rem;
              background: url("../../assets/img/temp_bar.png") no-repeat 0 0 /
                cover;
              .temp_cir {
                position: absolute;
                left: 0;
                right: 0;
                bottom: 0.16rem;
                margin: 0 auto;
                width: 0.26rem;
                height: 0.26rem;
                border-radius: 50%;
                background-color: yellow;
              }
              .temp_rod {
                position: absolute;
                left: 0;
                right: 0;
                bottom: 0.36rem;
                margin: 0 auto;
                width: 0.08rem;
                height: 0.6rem;
                border-radius: 0.05rem 0.05rem 0 0;
                background-color: yellow;
              }
            }
          }
        }
      }
    }
  }

  .o_display {
    visibility: hidden;
  }

  .Electro2-Control {
    .LightingText {
      margin-left: 0.3rem;
      line-height: 0.5rem;
      height: 0.36rem;
      line-height: 0.36rem;
    }
    .Electro-content {
      margin-top: 0.1rem;
      padding: 0 0.3rem;
      .loopChooseBox {
        margin-top: 0.1rem;
        height: 0.36rem;
        line-height: 0.36rem;
        clear: both;
        .electroBtn {
          display: inline-block;
          margin-left: 0.15rem;
          .open {
            background: #62d3fd;
            margin-right: 0.1rem;
          }
          .down {
            background: #69b3b1;
            margin-right: 0.1rem;
          }
          .rest {
            background: #7cae86;
          }
        }
        .loopChoose {
          float: left;
          width: 0.1rem;
        }
        span {
          font-size: 0.16rem;
        }
      }
    }
    .Electro-Form {
      padding: 0 0.3rem;
      margin-top: 0.1rem;
      .frombox {
        background: url("../../assets/img/control/ju.png") no-repeat
          center/cover;
        background-size: 4.23rem 6rem;
        width: 4.23rem;
        height: 6rem;
        margin: 0 auto;
        padding-top: 0.12rem;
        .fromItemBox {
          height: 5.9rem;
          padding: 0 0.03rem;
          .bgEven {
            background: rgba(0, 0, 0, 0.2);
          }
          .fromItem {
            display: flex;
            justify-content: center;
            align-items: center;
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
  .Lighting {
    padding: 0 0.2rem;
    margin: 0.2rem 0;
    color: #fff;
    height: 2.36rem;
    .Lighting-from {
      background: url("../../assets/img/control/ju.png") center/cover no-repeat;
      height: 2.36rem;
      width: 4.23rem;
      background-size: 4.23rem 2.36rem;
      padding: 0 0.03rem;
      margin: 0 auto;
      overflow: hidden;
      .frombox {
        margin-top: 0.1rem;
        .fromItem-title {
          line-height: 0.4rem;
          height: 0.4rem;
          // background: rgba(86, 255, 254, 0.3);
          background: linear-gradient(
            to,
            right,
            rgba(37, 95, 143, 0.9),
            rgba(0, 0, 0, 0)
          );
          .status {
            float: left;
            width: 25%;
            text-align: center;
            overflow: hidden;
          }
          .locationName {
            float: left;
            width: 25%;
            text-align: center;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
          }
          .checkedBox {
            width: 20%;
            line-height: 0.4rem;
            height: 0.4rem;
            float: left;
            display: flex;
            justify-content: center;
            align-items: center;
            cursor: pointer;
            .check {
              float: left;
              text-align: center;
              overflow: hidden;
              margin-left: 0.2rem;
              height: 0.15rem;
              width: 0.14rem;
              border: 0.012rem solid #62d3fd;
            }
          }
        }
        .fromItemBox {
          height: 2rem;
          .fromItem {
            height: 0.36rem;
            line-height: 0.36rem;
            overflow: hidden;
            &:hover {
              background: linear-gradient(
                to,
                right,
                rgba(86, 255, 254, 0.3),
                rgba(0, 0, 0, 0)
              );
            }
            .status {
              float: left;
              width: 25%;
              text-align: center;
              overflow: hidden;
            }
            .locationName {
              float: left;
              width: 25%;
              text-align: center;
              overflow: hidden;
              text-overflow: ellipsis;
              white-space: nowrap;
            }
            .checkedBox {
              width: 20%;
              line-height: 0.4rem;
              height: 0.4rem;
              float: left;
              display: flex;
              justify-content: center;
              align-items: center;
              cursor: pointer;
              .check {
                float: left;
                text-align: center;
                overflow: hidden;
                margin-left: 0.2rem;
                height: 0.15rem;
                width: 0.14rem;
                border: 0.012rem solid #62d3fd;
              }
            }
          }
        }
      }
    }

    .o_box_corner {
      position: absolute;
      width: 0.2rem;
      height: 0.2rem;
      border: 0.01rem solid #1ff7f2;
    }
    .Lighting-title {
      position: relative;
      margin: 0 0 0.1rem 0.28rem;
      padding-left: 0.1rem;
      border-bottom: #1ff7f2 solid 0.01rem;
      font-size: 0.16rem;
      line-height: 0.24rem;
      .iconfont {
        position: absolute;
        left: -0.28rem;
        bottom: -0.01rem;
        width: 0.3rem;
        height: 0.18rem;
        // background: url("../assets/img/control/icon.png") no-repeat center/cover;
      }
    }
    .Lighting-content {
      overflow: hidden;
      font-size: 0.16rem;
      .show-Control {
        line-height: 0.7rem;
        .open {
          background: #18b7b0;
          margin-right: 0.15rem;
          float: right;
        }
        .down {
          background: #ff992a;
          float: right;
        }
      }
      .btnBox {
        overflow: hidden;
        .active {
          // background: url("../assets/img/control/btnHover.png") no-repeat
          // center/cover !important;
        }
        .btn {
          padding-left: 0.12rem;
          float: left;
          width: 0.975rem;
          height: 0.35rem;
          color: #fff;
          line-height: 0.35rem;
          margin-right: 0.1rem;
          cursor: pointer;
          // background: url("../assets/img/control/btn.png") no-repeat center/cover;
          &:hover {
          }
        }
      }
    }
  }
  .control-content_item {
    line-height: 0.36rem;
    margin-top: 0.1rem;
    .item-type {
      display: inline-block;
      height: 0.36rem;
      line-height: 0.36rem;
    }
    .item-control {
      height: 0.36rem;
      width: 2.45rem;
      float: right;
    }
    .item-slider {
      width: 2.45rem;
      display: inline-block;
      margin-left: 0.15rem;
    }
  }
  .fontsize {
    font-size: 0.18rem;
    font-family: PingFangSC-Regular;
    font-weight: 400;
    color: rgba(255, 255, 255, 1);
  }
  .fontz {
    font-size: 0.16rem;
  }
}

.checkLed {
  padding-top: 1.2rem;
  .basicInfoBox {
    .basicBox {
      font-size: 0.16rem;
      margin-left: 0.3rem;
      .name {
        margin-top: 0.2rem;
        line-height: 0.36rem;
      }
      .code {
        line-height: 0.5rem;
      }
    }
  }
  .statusBox {
    @extend .basicInfoBox;
  }
  .controlBox {
    .control-content {
      padding: 0 0.3rem;
      margin-top: 0.2rem;
      font-size: 0.16rem;
      .control-content_item {
        line-height: 0.36rem;
        margin-top: 0.2rem;
        .item-type {
          display: inline-block;
          height: 0.36rem;
          line-height: 0.36rem;
        }
        .item-btn {
          height: 0.36rem;
          width: 2.6rem;
          float: right;
          display: flex;
          justify-content: space-between;
          .open {
            background: #62d3fd;
          }
          .down {
            background: #69b3b1;
          }
          .rest {
            background: #7cae86;
          }
        }
        .item-slider {
          height: 0.36rem;
          width: 2.45rem;
          float: right;
        }
      }
    }
    .imgbox {
      span {
        margin-left: 0.3rem;
        line-height: 0.36rem;
        margin-top: 0.2rem;
      }
      .img {
        width: 100%;
        height: 2rem;
      }
    }
  }
}
.marr {
  margin-top: 0.3rem !important;
}
.widths {
  width: 0.8rem;
  padding: 0.08rem 0.07rem;
}
</style>
