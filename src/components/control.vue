<template>
  <div class="control">
    <!-- 回路控制 -->
    <div class="wrapbox" ref="Electro" v-if="$route.path == '/lightpole'">
      <div class="Electro-Control content-left trans-up trans-up-delay-3">
        <div class="box-title">
          <i class="icons color-huang">&#xe778;</i>
          <span>回路控制</span>
        </div>
        <div class="Electro-content">
          <div class="equipmentCooseBox">
            <span class="titleText">选择回路</span>
            <div class="selectBox">
              <input class="showInput" type="text" v-model="ElectroSelectValue" />
              <el-select
                v-model="Electro.value"
                placeholder="请选择"
                size="mini"
                :popper-append-to-body="false"
                @change="handleSelect"
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
          <div
            class="loopChooseBox"
            v-show="this.Electro.value != -1"
            style="transition:all 1s ease"
          >
            <!--<span>回路状态</span>-->
            <div class="electroBtn" style="margin: 0 auto;padding-top: .06rem;">
              <p style="line-heihgt:0.23rem;margin-right:0.1rem;line-height: 0.23rem;">开关</p>
              <span class="onoff" style="display: inline-block;margin: 0 auto;">
                <img
                  style="width:0.2rem;height:0.2rem"
                  src="../assets/img/icon/dui_green.png"
                  v-if="loctionData.onoff == 1"
                />
                <img
                  style="width:0.2rem;height:0.2rem"
                  src="../assets/img/icon/cuo_gray.png"
                  v-if="loctionData.onoff == 0"
                />
              </span>
              <p style="line-heihgt:0.23rem;margin:0 .1rem 0 1rem;line-height: 0.23rem;">状态</p>
              <span class="state" style="display: inline-block;margin: 0 auto;">
                <img
                  style="width:0.2rem;height:0.2rem"
                  src="../assets/img/icon/wifi_green.png"
                  v-if="loctionData.state == 1"
                />
                <img
                  style="width:0.2rem;height:0.2rem"
                  src="../assets/img/icon/error_yellow.png"
                  v-if="loctionData.state == 0"
                />
              </span>
            </div>
          </div>
          <div id="choosebox" class="loopChooseBox">
            <span>控制方式</span>
            <div class="electroBtn" style="width:2.45rem">
              <el-button
                type="success"
                size="mini"
                class="open fontz"
                @click="handleElectroControl('open')"
              >闭合回路</el-button>
              <el-button
                type="warning"
                size="mini"
                class="down fontz"
                @click="handleElectroControl('down')"
              >断开回路</el-button>
              <el-button
                type="primary"
                size="mini"
                class="rest fontz"
                @click="handleElectroControl('read')"
              >读取回路</el-button>
            </div>
          </div>
        </div>
        <div class="Electro-Form">
          <ul
            :class="{'frombox addtitle':ElectroSelectValue=='全部','fromboxs addtitle ':ElectroSelectValue!='全部'}"
          >
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
              <div class="equipmentBox" style="width:60%">
                <div class="lamppostname" style="width:24%">灯头</div>
                <div class="lamppostname" style="width:24%">开关</div>
                <div class="lamppostname" style="width:24%">状态</div>
                <div class="equipmentBox" style="width:28%">亮度</div>
              </div>
            </li>
            <div
              :class="{'fromItemBox sbar':ElectroSelectValue=='全部','fromItemBoxs sbar ':ElectroSelectValue!='全部'}"
              v-if="isElectroShow && !Electro.loading"
            >
              <li
                class="fromItem"
                v-for="(item,index) in ElectroFormData"
                :class="{'bgEven':(index+1)%2 == 0}"
                :key="item.index"
                @click="dsClick(item.lamppostid,'lightpole','Electro')"
              >
                <div class="lamppostname" style="font-size: .12rem;">
                  <i class="lampostImg">
                      <img src="../../static/data/image/light_g_s.png" />
                      <!-- <img v-if="ele.onoff == 1" src="../../static/data/image/light_g_s.png" />
                      <img v-if="ele.onoff == 0" src="../../static/data/image/light_o_s.png" /> -->
                  </i>
                  {{item.lamppostname}}
                </div>
                <div class="equipmentBox">
                  <div class="equipmentStatus" v-for="(ele,index) in item.lights" :key="index">
                    <!-- <span class="openLigthing" :title="ele.name">
                      <span class="icons" :class="{'color-lv':ele.state == 1}">&#xe7eb;</span>
                      {{ele.name}}
                    </span>-->
                    <span class="num" style="width:24%;">
                      <i>{{ele.name}}</i>
                    </span>
                    <span class="onoff" style="width:24%;">
                      <img src="../assets/img/icon/dui_green.png" v-if="ele.onoff == 1" />
                      <img src="../assets/img/icon/cuo_gray.png" v-if="ele.onoff == 0" />
                    </span>
                    <span class="state" style="width:24%;">
                      <img src="../assets/img/icon/wifi_green.png" v-if="ele.state == 1" />
                      <img src="../assets/img/icon/error_yellow.png" v-if="ele.state == 0" />
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

    <!-- LED设备控制 -->
    <div class="wrapbox" ref="led" v-if="$route.path == '/led'">
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
                style="background-color:rgb(84, 175, 16);width:0.8rem;padding: 0.08rem 0.07rem;font-size:0.13rem"
                @click="handleLEDControl('open')"
              >开启</el-button>

              <el-button
                type="success"
                size="mini"
                style="background-color:#CE9351;width:0.8rem;padding: 0.08rem 0.07rem;font-size:0.13rem"
                class="down"
                @click="handleLEDControl('down')"
              >关闭</el-button>

              <el-button
                type="primary"
                size="mini"
                class="rest"
                style="background: #31a4a3;width:0.8rem;padding: 0.08rem 0.07rem; font-size:0.13rem"
                @click="handleLEDControl('rest')"
              >重启</el-button>
            </div>
          </div>
          <div class="control-content_item">
            <span class="item-type">自动调光</span>
            <div style="text-align:right;float:right;margin-right:0.5rem">
              <el-switch
                v-model="LED.autolight"
                :disabled="LED.isLedSlide"
                active-color="#72EED2"
                @change="handleLEDSlider('autolight')"
              ></el-switch>
            </div>
          </div>
          <div class="control-content_item">
            <span class="item-type">亮度</span>
            <span style="float:right;margin-left: 0.12rem;width: 0.2rem;">{{ LED.light}}</span>
            <div class="item-slider" style="width:2.2rem">
              <el-slider
                v-model="LED.light"
                :max="255"
                :disabled="LED.isLedSlide || LED.autolight"
                @change="handleLEDSlider('light')"
              ></el-slider>
            </div>
          </div>
          <div class="control-content_item">
            <span class="item-type">音量</span>
            <span style="float:right;margin-left: 0.12rem;width: 0.2rem;">{{ LED.volume}}</span>

            <div class="item-slider" style="width:2.2rem">
              <el-slider
                v-model="LED.volume"
                :max="15"
                :disabled="LED.isLedSlide"
                @change="handleLEDSlider('volume')"
              ></el-slider>
            </div>
          </div>
        </div>
        <div id="ledtop" class="equipmentCooseBox">
          <span class="titleText">选择分组</span>
          <div class="selectBox">
            <input class="showInput" type="text" v-model="LEDSelectValue" />
            <el-select
              v-model="LED.value"
              placeholder="请选择"
              size="mini"
              :popper-append-to-body="false"
              @change="handleLEDSelect"
              @visible-change="visibleChanges($event,LED.value)"
            >
              <el-option key="-1" label="全部" :value="-1"></el-option>
              <el-option
                v-for="(item,index) in LED.selectData"
                :key="item.value"
                :label="item.groupname"
                :value="index"
              ></el-option>
            </el-select>
            <div class="select">
              <span :class="{'down':LED.selecting,'up':!LED.selecting}"></span>
            </div>
          </div>
        </div>
        <div class="LED-from">
          <ul class="frombox">
            <div
              style="width:100%;height:100%"
              v-if="!isLedShow || LED.loading"
              v-loading="!isLedShow || LED.loading"
              element-loading-text="拼命加载中"
              element-loading-spinner="el-icon-loading"
              element-loading-background="rgba(0, 0, 0, 0.4)"
            ></div>
            <div v-if="isLedShow && !LED.loading">
              <li class="fromItem-title">
                <checked :target="'all'" @clickChecked="handleLEDInput" />
                <!-- <div class="checkedBox">
                  <div class="checked" @click="handleAllInput">
                    <span class="check" v-if="!LED.allChecked"></span>
                    <span class="icons color-lan-62d" v-if="LED.allChecked">&#xe7b3;</span>
                  </div>
                </div>-->
                <div class="locationName">设备名称</div>
                <span class="onoff">开关</span>
                <span class="number">状态</span>
              </li>
              <div class="fromItemBox sbar">
                <li class="fromItem" v-for="item in LEDFormData" :key="item.id">
                  <checked :target="item.id" @clickChecked="handleLEDInput" :key="wuyong" />
                  <!-- <div class="checkedBox">
                    <div class="checked" @click="handleLEDInput(item.id,index)">
                      <span class="check" v-if="!checkedArray[index].checked"></span>
                      <span class="icons color-lan-62d" v-if="checkedArray[index].checked">&#xe7b3;</span>
                    </div>
                  </div>-->
                  <div class="locationName" @click="dsClick(item.lamppostid,'led','led')">
                    <!-- <i class="icons color-huang">&#xe618;</i> -->
                    <i class="addLedIcon"></i>
                    <span>{{item.lamppostname}}</span>
                  </div>
                  <span
                    class="state"
                    style="float: left;width: 15%;text-align: center;"
                    @click="dsClick(item.lamppostid,'led','led')"
                  >
                    <img
                      style="width:0.2rem;height:0.2rem;vertical-align: middle;"
                      src="../assets/img/icon/dui_green.png"
                      v-if="item.onoff == 1"
                    />
                    <img
                      style="width:0.2rem;height:0.2rem;vertical-align: middle;"
                      src="../assets/img/icon/cuo_gray.png"
                      v-if="item.onoff == 0"
                    />
                  </span>
                  <span
                    class="state"
                    style="float: left;width: 15%;text-align: center;"
                    @click="dsClick(item.lamppostid,'led','led')"
                  >
                    <img
                      style="width:0.2rem;height:0.2rem;vertical-align: middle;"
                      src="../assets/img/icon/wifi_green.png"
                      v-if="item.online == 1"
                    />
                    <img
                      style="width:0.2rem;height:0.2rem;vertical-align: middle;"
                      src="../assets/img/icon/error_yellow.png"
                      v-if="item.online == 0"
                    />
                  </span>
                </li>
              </div>
            </div>
          </ul>
        </div>
      </div>
    </div>

    <!-- 集中控制器 -->
    <div class="wrapbox" ref="Concentrated" v-if="$route.path == '/lightpole'">
      <div class="Concentrated-Control content-left trans-up trans-up-delay-3">
        <div class="o_box obox_h340 Electro-Control">
          <div class="box-title">
            <span class="icons color-huang">&#xe657;</span>
            <span>集中控制器</span>
          </div>
          <div class="Lighting">
            <div class="Lighting-from">
              <div
                style="width:100%;height:100%"
                v-if="!isConcentratedShow"
                v-loading="!isConcentratedShow"
                element-loading-text="拼命加载中"
                element-loading-spinner="el-icon-loading"
                element-loading-background="rgba(0, 0, 0, 0.4)"
              ></div>
              <ul class="frombox" v-if="isConcentratedShow">
                <li class="fromItem-title">
                  <!-- <div class="checkedBox" @click="handleConcentratedAllChecked1">
                    <span class="check" v-if="!Concentrated.allChecked1"></span>
                    <span
                      class="iconsSmall color-lan-62d"
                      style="margin-left:0.2rem"
                      v-if="Concentrated.allChecked1"
                    >&#xe7b3;</span>
                  </div>-->
                  <div class="locationName2">设备编号</div>
                  <span class="locationName2">状态</span>
                </li>
                <div class="fromItemBox sbar">
                  <li
                    class="fromItem"
                    v-for="(item,index) in Concentrated.selectData"
                    :key="index"
                    @click="dsClick(item.controllerid,'jizhong','Concentrated',1)"
                  >
                    <div class="locationName2">{{item.controllername}}</div>
                    <span class="status2">
                      <img
                        style="width:0.2rem;height:0.2rem;vertical-align:middle;"
                        src="../assets/img/icon/wifi_green.png"
                        v-if="item.state == 1"
                      />
                      <img
                        style="width:0.2rem;height:0.2rem;vertical-align:middle;"
                        src="../assets/img/icon/error_yellow.png"
                        v-if="item.state == 0"
                      />
                    </span>
                  </li>
                </div>
              </ul>
            </div>
          </div>
        </div>
        <!-- 离线设备 -->
        <div class="o_box obox_h355">
          <div class="Electro2-Control">
            <div class="box-title">
              <i class="icons color-huang">&#xe778;</i>
              <span>回路控制</span>
            </div>
            <div class="Electro-content">
              <div class="equipmentCooseBox">
                <span class="titleText fontsize">选择设备</span>
                <div class="selectBox">
                  <input class="showInput fontz" type="text" v-model="ConcentratedSelectValue" />
                  <el-select
                    v-model="Concentrated.value"
                    placeholder="请选择"
                    size="mini"
                    :popper-append-to-body="false"
                    @change="handleConcentratedSelect"
                    @visible-change="visibleConcentratedChange($event,Concentrated.value)"
                  >
                    <!--<el-option key="-1" label="全部" :value="-1"></el-option> -->
                    <el-option
                      v-for="(item,index) in Concentrated.selectData"
                      :key="index"
                      :label="item.controllername"
                      :value="index"
                    ></el-option>
                  </el-select>
                  <div class="select">
                    <span :class="{'down':Concentrated.selecting,'up':!Concentrated.selecting}"></span>
                  </div>
                </div>
              </div>
              <div class="loopChooseBox">
                <span class="fontsize">状态</span>
                <span class="state">
                  <img
                    style="float:right;margin-right: 1.26rem;width:0.2rem;height:0.2rem;margin-top:0.08rem;"
                    src="../assets/img/icon/wifi_green.png"
                    v-if="currentConcentrated.state == 1"
                  />
                  <img
                    style="float:right;margin-right: 1.26rem;width:0.2rem;height:0.2rem;margin-top:0.08rem;"
                    src="../assets/img/icon/error_yellow.png"
                    v-if="currentConcentrated.state == 0"
                  />
                </span>
              </div>
              <div class="loopChooseBox">
                <span class="fontsize">控制</span>
                <div class="electroBtn" style="width:2.7rem">
                  <el-button
                    type="success"
                    size="mini"
                    class="open2 fontz"
                    style="background-color:rgb(84, 175, 16);width:0.8rem;padding: 0.08rem 0.07rem;"
                    @click="handleConcentratedControl('open2')"
                  >开灯</el-button>
                  <el-button
                    type="success"
                    size="mini"
                    style="background-color:#CE9351;width:0.8rem;padding: 0.08rem 0.07rem;"
                    class="open2 fontz"
                    @click="handleConcentratedControl('down2')"
                  >关灯</el-button>
                  <el-button
                    type="success"
                    size="mini"
                    class="rest fontz"
                    style="width:0.8rem;padding: 0.08rem 0.07rem;"
                    @click="handleConcentratedControl('rest')"
                  >重启</el-button>
                </div>
              </div>
              <div class="control-content_item">
                <span class="item-type fontsize">调光</span>
                <span
                  style="float:right;margin-left: 0.12rem;width: 0.2rem;"
                >{{ currentConcentrated.lightvalue}}</span>
                <div class="item-slider" style="width:2.28rem">
                  <el-slider
                    v-model="currentConcentrated.lightvalue"
                    @change="handleConcentratedSlider"
                  ></el-slider>
                </div>
              </div>
              <div class="loopChooseBox">
                <span class="fontsize">回路控制</span>
                <div class="electroBtn" style="width:2.7rem">
                  <el-button
                    type="success"
                    size="mini"
                    style="width:0.8rem;padding: 0.08rem 0.07rem;"
                    class="open fontz"
                    @click="handleConcentratedControl('open')"
                  >闭合回路</el-button>
                  <el-button
                    type="warning"
                    size="mini"
                    style="width:0.8rem;padding: 0.08rem 0.07rem;"
                    class="down fontz"
                    @click="handleConcentratedControl('down')"
                  >断开回路</el-button>
                  <el-button
                    type="primary"
                    size="mini"
                    style="width:0.8rem;padding: 0.08rem 0.07rem;"
                    class="read fontz"
                    @click="handleConcentratedControl('read')"
                  >读取回路</el-button>
                </div>
              </div>
            </div>
            <div class="Lighting">
              <div class="Lighting-from">
                <div
                  style="width:100%;height:100%"
                  v-if="!isConcentratedShow || Concentrated.loading"
                  v-loading="!isConcentratedShow || Concentrated.loading"
                  element-loading-text="拼命加载中"
                  element-loading-spinner="el-icon-loading"
                  element-loading-background="rgba(0, 0, 0, 0.4)"
                ></div>
                <ul class="frombox" v-if="isConcentratedShow && !Concentrated.loading">
                  <li class="fromItem-title">
                    <checked :target="'all'" @clickChecked="handleConcentratedChecked2" />
                    <!-- <div class="checkedBox" @click="handleConcentratedAllChecked2">
                      <span class="check" v-if="!Concentrated.allChecked2"></span>
                      <span
                        class="iconsSmall color-lan-62d"
                        style="margin-left:0.2rem"
                        v-if="Concentrated.allChecked2"
                      >&#xe7b3;</span>
                    </div>-->
                    <div class="locationName">回路名称</div>
                    <span class="locationName">开关</span>
                  </li>
                  <div class="fromItemBox sbar">
                    <li class="fromItem" v-for="(item,index) in ConcentratedFormData" :key="index">
                      <checked
                        :target="item.id"
                        @clickChecked="handleConcentratedChecked2"
                        :key="wuyong"
                      />
                      <!-- <div class="checkedBox" @click="handleConcentratedChecked2(item.id,index)">
                        <span class="check" v-if="!checkedArray[index].checked"></span>
                        <span
                          class="iconsSmall color-lan-62d"
                          style="margin-left:0.2rem"
                          v-if="checkedArray[index].checked"
                        >&#xe7b3;</span>
                      </div>-->
                      <div class="locationName">{{item.name}}</div>
                      <span class="status">
                        <img
                          style="width:0.22rem;height:0.22rem;vertical-align:middle;"
                          src="../assets/img/icon/cuo_gray.png"
                          v-if="item.onoff == 0"
                        />
                        <img
                          style="width:0.22rem;height:0.22rem;vertical-align:middle;"
                          src="../assets/img/icon/dui_green.png"
                          v-if="item.onoff == 1"
                        />
                      </span>
                    </li>
                  </div>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import checked from "./checked";
import * as mapWork from "../map3d/work";
export default {
  name: "App",
  data() {
    return {
      Electro: {
        value: -1,
        loading: false,
        selecting: true, // 下拉框的显示和隐藏
        allChecked: false,
        selectData: []
      },
      LED: {
        light: 0,
        isLedSlide: true,
        selecting: true, // 下拉框的显示和隐藏
        volume: 0,
        loading: false,
        value: -1,
        allChecked: false,
        oldSelectData: [],
        selectData: [],
        autolight: false
      },
      Concentrated: {
        value: 0,
        light: 0,
        loading: false,
        allChecked1: false,
        allChecked2: false,
        checkedData: [],
        selecting: true,
        isSlider: true,
        oldSelectData: [],
        selectData: []
      },
      timer: "",
      wuyong: 0,
      checkedArray: []
    };
  },
  computed: {
    loctionData: function() {
      return (
        this.Electro.selectData[this.Electro.value] || { state: 1, onoff: 1 }
      );
    },

    ElectroSelectValue: function() {
      if (this.Electro.value == -1) {
        return "全部";
      } else {
        return this.Electro.selectData.length
          ? this.Electro.selectData[this.Electro.value].loopname
          : null;
      }
    },
    ConcentratedSelectValue: function() {
      if (this.Concentrated.value == -1) {
        return "全部";
      } else {
        return this.Concentrated.selectData.length
          ? this.Concentrated.selectData[this.Concentrated.value].controllername
          : null;
      }
    },
    currentConcentrated: function() {
      if (this.Concentrated.value == -1) {
        return { state: 1, lightvalue: 0 };
      } else {
        return this.Concentrated.selectData.length
          ? this.Concentrated.selectData[this.Concentrated.value]
          : { state: 1, lightvalue: 0 };
      }
    },
    LEDSelectValue: function() {
      if (this.LED.value == -1) {
        return "全部";
      } else {
        return this.LED.selectData.length
          ? this.LED.selectData[this.LED.value].groupname
          : null;
      }
    },
    isLedShow: function() {
      return this.$store.getters.websocketData[230011] ? true : false;
    },
    isElectroShow: function() {
      return this.$store.getters.websocketData[220001] ? true : false;
    },
    isConcentratedShow: function() {
      return this.$store.getters.websocketData[220005] ? true : false;
    },

    LEDFormData: function() {
      if (this.$store.getters.websocketData[230011]) {
        this.LED.selectData = this.$store.getters.websocketData[230011].msg.groups;
        if (this.LED.value == -1) {
          let array = this.$store.getters.websocketData[230011].msg.groups;
          return this.filterAllData(array, "leds");
        } else {
          let isLen = this.$store.getters.websocketData[230011];
          let newData = isLen
            ? this.$store.getters.websocketData[230011].msg.groups[
                this.LED.value
              ].leds
            : [];
          return newData;
        }
      }
    },
    ElectroFormData: function() {
      if (this.$store.getters.websocketData[220001]) {
        var compare = function(obj1, obj2) {
          var val1 = obj1.loopname;
          var val2 = obj2.loopname;
          if (val1 < val2) {
            return -1;
          } else if (val1 > val2) {
            return 1;
          } else {
            return 0;
          }
        };

        this.Electro.selectData = this.$store.getters.websocketData[220001].msg.loops.sort(
          compare
        );
        if (this.Electro.value == -1) {
          let array = this.$store.getters.websocketData[220001].msg.loops;
          return this.filterAllData(array, "lampposts");
        } else {
          return this.$store.getters.websocketData[220001].msg.loops[
            this.Electro.value
          ].lampposts;
        }
      }
    },
    ConcentratedFormData: function() {
      if (this.$store.getters.websocketData[220005]) {
        this.Concentrated.selectData = this.$store.getters.websocketData[220005].msg.controllers;
        if (this.Concentrated.value == -1) {
          let array = this.$store.getters.websocketData[220005].msg.controllers;
          return this.filterAllData(array, "loopsList");
        } else {
          let isLen = this.$store.getters.websocketData[220005];
          let newData = isLen
            ? this.$store.getters.websocketData[220005].msg.controllers[
                this.Concentrated.value
              ].loopsList
            : [];
          return newData;
        }
      }
    }
  },
  components: {
    checked
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
    //   offheight(){
    //       console.log($("#ledtop"));
    //     let Height=$("#ledtop").offset().top;
    //     console.log(Height)
    //   },
    entry(controlModule) {
      this.$refs[controlModule].className = "";
      this.$refs[controlModule].className = "wrapbox is-visible";
    },
    leave(controlModule) {
        // console.log(controlModule);
        
      this.$refs[controlModule].className = "wrapbox";
    },

    dsClick(lId, type, refName,boom) {
      this.leave(refName);
      this.$sdClick(lId, this.$route.name, boom ? type : refName);
      // let sMapPoint = JSON.parse(sessionStorage[type]) || [];
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
      //     this.leave(refName);
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
    handleSelect() {
      this.Electro.loading = true;
      setTimeout(() => {
        this.Electro.loading = false;
      }, 500);
    },

    // LED控制
    visibleChanges($event, vlaueSelect) {
      this.LED.selecting = !this.LED.selecting;
    },
    handleLEDInput() {
      let flag = 0;
      for (const key in this.$store.state.checkedArray) {
        if (this.$store.state.checkedArray[key] && key != "all") {
          flag += 1;
        }
      }
      if (flag > 0) {
        this.LED.isLedSlide = false;
        if (flag == 1) {
          let keyId;
          for (const key in this.$store.state.checkedArray) {
            if (this.$store.state.checkedArray[key] && key != "all") {
              keyId = Number(key);
            }
          }
          this.LEDFormData.forEach(item => {
            if (item.id == keyId) {
              this.LED.light = item.light;
              this.LED.volume = item.volume;
              this.LED.autolight = item.autolight == 0 ? false : true;
            }
          });
        } else {
          this.LED.light = 0;
          this.LED.volume = 0;
          this.LED.autolight = false;
        }
      } else {
        this.LED.isLedSlide = true;
        this.LED.volume = 0;
        this.LED.light = 0;
        this.LED.autolight = false;
      }
    },
    handleLEDSelect() {
      let array;
      if (this.LED.value == -1) {
        let allArray = this.$store.getters.websocketData[230011].msg.groups;
        array = this.filterAllData(allArray, "leds");
      } else {
        array = this.LED.selectData[this.LED.value].leds;
      }
      this.$store.state.checkedArray = {};
      array.forEach((item, index) => {
        this.$store.state.checkedArray[item.id] = false;
      });
      this.LED.isLedSlide = true;
      this.LED.light = 0;
      this.LED.volume = 0;
      this.LED.loading = true;
      setTimeout(() => {
        this.LED.loading = false;
      }, 500);
    },
    handleLEDControl(flag) {
      let params;
      let ledId = [];
      for (const key in this.$store.state.checkedArray) {
        if (this.$store.state.checkedArray[key] && key != "all") {
          ledId.push(Number(key));
        }
      }
      if (!ledId.length) {
        this.$Message.closeAll();
        this.$Message({
          message: "请先选择设备编号",
          type: "warning"
        });
      } else {
        if (flag == "open") {
          params = {
            msgid: "550e8400-e29b-41d4-a716-446655440000",
            modulecode: 103002,
            msgtype: 0,
            msgcode: 200001,
            timestamp: this.$getCurrentDate(),
            msg: {
              cmdtype: 1,
              light: this.LED.light,
              volume: this.LED.volume,
              leds: ledId
            }
          };
        } else if (flag == "down") {
          params = {
            msgid: "550e8400-e29b-41d4-a716-446655440000",
            modulecode: 103002,
            msgtype: 0,
            msgcode: 200001,
            timestamp: this.$getCurrentDate(),
            msg: {
              cmdtype: 2,
              light: this.LED.light,
              volume: this.LED.volume,
              leds: ledId
            }
          };
        } else if (flag == "rest") {
          params = {
            msgid: "550e8400-e29b-41d4-a716-446655440000",
            modulecode: 103002,
            msgtype: 0,
            msgcode: 200001,
            timestamp: this.$getCurrentDate(),
            msg: {
              cmdtype: 3,
              light: this.LED.light,
              volume: this.LED.volume,
              leds: ledId
            }
          };
        }
        this.getControlAPI(params);
      }
    },
    handleLEDSlider(target) {
      let params;
      let ledId = [];
      for (const key in this.$store.state.checkedArray) {
        if (this.$store.state.checkedArray[key] && key != "all") {
          ledId.push(Number(key));
        }
      }
      if (!ledId.length) {
        this.$Message.closeAll();
        this.$Message({
          message: "请先选择设备编号",
          type: "warning"
        });
      } else {
        if (target == "light") {
          params = params = {
            msgid: "550e8400-e29b-41d4-a716-446655440000",
            modulecode: 103002,
            msgtype: 0,
            msgcode: 200001,
            timestamp: this.$getCurrentDate(),
            msg: {
              cmdtype: 4,
              light: this.LED.light,
              volume: this.LED.volume,
              autolight: this.LED.autolight ? 1 : 0,
              leds: ledId
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
              light: this.LED.light,
              volume: this.LED.volume,
              autolight: this.LED.autolight ? 1 : 0,
              leds: ledId
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
              light: this.LED.light,
              volume: this.LED.volume,
              autolight: this.LED.autolight ? 1 : 0,
              leds: ledId
            }
          };
        }
        this.getControlAPI(params);
      }
    },

    // 集中控制器
    handleConcentratedChecked2() {
      let flag = 0;
      for (const key in this.$store.state.checkedArray) {
        if (this.$store.state.checkedArray[key] && key != "all") {
          flag += 1;
        }
      }
      if (flag > 0) {
        this.Concentrated.isSlider = false;
      } else {
        this.Concentrated.isSlider = true;
      }
    },
    handleConcentratedControl(flag) {
      let params;
      let controllerId = this.Concentrated.selectData.length
        ? this.Concentrated.selectData[this.Concentrated.value].controllerid
        : false;
      let loopsId = [];
      for (const key in this.$store.state.checkedArray) {
        if (this.$store.state.checkedArray[key] && key != "all") {
          loopsId.push(Number(key));
        }
      }
      if (controllerId) {
        if (flag == "rest") {
          params = {
            msgid: "550e8400-e29b-41d4-a716-446655440000",
            modulecode: 102001,
            msgtype: 0,
            msgcode: 220007,
            timestamp: this.$getCurrentDate(),
            msg: {
              cmdtype: 4,
              lightvalue: this.currentConcentrated.lightvalue,
              controllerid: controllerId,
              loops: loopsId
            }
          };
          this.getControlAPI(params);
        } else if (flag == "open2") {
          params = {
            msgid: "550e8400-e29b-41d4-a716-446655440000",
            modulecode: 102001,
            msgtype: 0,
            msgcode: 220007,
            timestamp: this.$getCurrentDate(),
            msg: {
              cmdtype: 5,
              lightvalue: this.currentConcentrated.lightvalue,
              controllerid: controllerId,
              loops: []
            }
          };
          this.getControlAPI(params);
        } else if (flag == "down2") {
          params = {
            msgid: "550e8400-e29b-41d4-a716-446655440000",
            modulecode: 102001,
            msgtype: 0,
            msgcode: 220007,
            timestamp: this.$getCurrentDate(),
            msg: {
              cmdtype: 6,
              lightvalue: this.currentConcentrated.lightvalue,
              controllerid: controllerId,
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
              lightvalue: this.currentConcentrated.lightvalue,
              controllerid: controllerId,
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
              lightvalue: this.currentConcentrated.lightvalue,
              controllerid: controllerId,
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
              lightvalue: this.currentConcentrated.lightvalue,
              controllerid: controllerId,
              loops: loopsId
            }
          };
          this.getControlAPI(params);
        }
      }
    },

    handleConcentratedSlider() {
      let controllerId = this.Concentrated.selectData.length
        ? this.Concentrated.selectData[this.Concentrated.value].controllerid
        : false;
      if (controllerId) {
        let params = {
          msgid: "550e8400-e29b-41d4-a716-446655440000",
          modulecode: 102001,
          msgtype: 0,
          msgcode: 220007,
          timestamp: this.$getCurrentDate(),
          msg: {
            cmdtype: 3,
            lightvalue: this.currentConcentrated.lightvalue,
            controllerid: controllerId,
            loops: []
          }
        };
        this.getControlAPI(params);
      }
    },

    handleConcentratedSelect() {
      let array = [];
      if (this.Concentrated.value == -1) {
        let allArray = this.$store.getters.websocketData[220005].msg;
        array = this.filterAllData(allArray, "loopsList");
        this.Concentrated.light = 0;
      } else {
        array = this.Concentrated.selectData[this.Concentrated.value].loopsList;
        this.Concentrated.light = this.Concentrated.selectData[
          this.Concentrated.value
        ].lightvalue;
      }
      this.$store.state.checkedArray = {};
      array.forEach((item, index) => {
        this.$store.state.checkedArray[item.id] = false;
      });
      this.Concentrated.isSlider = true;
      this.Concentrated.light = 0;
      this.Concentrated.loading = true;
      setTimeout(() => {
        this.Concentrated.loading = false;
      }, 500);
    },
    // 下拉框状态
    visibleConcentratedChange($event, vlaueSelect) {
      this.Concentrated.selecting = !this.Concentrated.selecting;
    },

    // 发送请求
    getControlAPI(data) {
      this.$api.post("/websocket/command", data).then(function(res) {
        // console.log(res);
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
// .control.active {
//   z-index: 999;
// }
.lampostImg img{width:20px;height:30px;vertical-align: middle;display: inline-block;}
.addLedIcon{
    background: url(../assets/img/overview/ledIcon.png) no-repeat;
    width:.12rem;
    height:.21rem;
    display: inline-block;
    background-size: contain;
    margin-right:.1rem;
}

.iconsSmall {
  font-family: "iconfont" !important;
  font-size: 0.11rem;
  font-style: normal;
  -webkit-font-smoothing: antialiased;
}

// .el-select-dropdown {
//   background-color: rgba(1, 30, 38, 0.6);
// }

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

.Electro-Control {
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
        height: 0.4rem;
        line-height: 0.4rem;
        background: url(~@/assets/img/control/selectBox.png) no-repeat
          center/cover;

        background-size: 100% 100%;
        .showInput {
          position: absolute;
          top: 0rem;
          right: 0rem;
          padding-left: 20px;
          text-align: left;
          width: 2.45rem;
          height: 0.4rem;
          color: #fff;
          box-sizing: border-box;
        }
        .down {
          position: absolute;
          display: inline-block;
          right: 0.2rem;
          top: 0.16rem;
          width: 0.14rem;
          height: 0.13rem;
          margin-right: 0.04rem;
          background: url(~@/assets/img/control/down.png) no-repeat center/cover;
        }
        .up {
          position: absolute;
          display: inline-block;
          right: 0.2rem;
          top: 0.16rem;
          width: 0.14rem;
          height: 0.13rem;
          transform: rotate(180deg);
          background: url(~@/assets/img/control/down.png) no-repeat center/cover;
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
          margin-right: 0.1rem;
          padding: 0.08rem 0.07rem;
        }
        .down {
          background: #69b3b1;
          margin-right: 0.1rem;
          padding: 0.08rem 0.07rem;
          margin-right: 0.04rem;
        }
        .open2 {
          background: #62d3fd;
          margin-right: 0.1rem;
        }
        .down2 {
          background: #69b3b1;
        }
        .rest {
          background: #7cae86;
          padding: 0.08rem 0.07rem;
          margin-right: 0.04rem;
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
    .fromboxs {
      background: url(~@/assets/img/control/fromBg.png) no-repeat center/cover;
      background-size: 4.23rem calc(100vh - 3.6rem);
      width: 4.23rem;
      height: calc(100vh - 3.6rem);
      overflow: hidden;
      margin: 0 auto;
      padding-top: 0.12rem;
    }
    .frombox {
      background: url(~@/assets/img/control/fromBg.png) no-repeat center/cover;
      background-size: 4.23rem calc(100vh - 3rem);
      width: 4.23rem;
      height: calc(100vh - 3rem);
      overflow: hidden;
      margin: 0 auto;
      padding-top: 0.12rem;

      .fromItem-title {
        background-color: rgba(0, 0, 0, 0.2);
        padding: 0 0.11rem 0 0.03rem;
      }

      .fromItemBox {
        height: calc(100% - 0.8rem);
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

.LED-Control {
  padding-top: 1.2rem;
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
          margin-right: 0.04rem;
        }
      }
      .item-slider {
        height: 0.36rem;
        width: 2.45rem;
        float: right;
      }
    }
  }
  .equipmentCooseBox {
    padding: 0 0.3rem;
    margin-top: 0.2rem;
    height: 0.36rem;
    line-height: 0.36rem;
    .titleText {
      font-size: 0.16rem;
    }
    .selectBox {
      position: relative;
      float: right;
      width: 2.6rem;
      font-size: 0.16rem;
      height: 0.4rem;
      line-height: 0.4rem;
      background: url(~@/assets/img/control/selectBox.png) no-repeat
        center/cover;
      background-size: 100% 100%;
      .showInput {
        position: absolute;
        top: 0rem;
        right: 0rem;
        padding-left: 20px;
        text-align: left;
        width: 2.6rem;
        height: 0.4rem;
        color: #fff;
        box-sizing: border-box;
      }
      .down {
        position: absolute;
        display: inline-block;
        right: 0.2rem;
        top: 0.16rem;
        width: 0.14rem;
        height: 0.13rem;
        background: url(~@/assets/img/control/down.png) no-repeat center/cover;
      }
      .up {
        position: absolute;
        display: inline-block;
        right: 0.2rem;
        top: 0.16rem;
        width: 0.14rem;
        height: 0.13rem;
        transform: rotate(180deg);
        background: url(~@/assets/img/control/down.png) no-repeat center/cover;
      }
    }
  }

  .LED-from {
    padding: 0 0.3rem;
    margin-top: 0.2rem;
    .frombox {
      background: url("../assets/img/control/fromBox.png") no-repeat
        center/cover;
      background-size: 4.23rem calc(100vh - 5rem);
      width: 4.23rem;
      height: calc(100vh - 5rem);
      margin: 0 auto;
      padding-top: 0.1rem;
      overflow: hidden;
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
        .number {
          float: left;
          width: 15%;
          line-height: 0.6rem;
          text-align: center;
        }
        .onoff {
          float: left;
          width: 15%;
          line-height: 0.6rem;
          text-align: center;
        }
        .locationName {
          float: left;
          width: 50%;
          text-align: center;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          line-height: 0.6rem;
          display: flex;
          justify-content: center;
          align-items: center;
          span {
            margin-left: 0.05rem;
          }
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
      .fromItemBox {
        height: calc(100vh - 5.7rem);
        .fromItem {
          height: 0.6rem;
          line-height: 0.6rem;
          overflow: hidden;
          cursor: pointer;
          &:hover {
            background: rgba(86, 255, 254, 0.3);
          }
          .number {
            float: left;
            width: 15%;
            text-align: center;
          }
          .onoff {
            float: left;
            width: 15%;
            line-height: 0.6rem;
            text-align: center;
          }
          .locationName {
            float: left;
            width: 50%;
            text-align: center;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            line-height: 0.6rem;
            display: flex;
            justify-content: center;
            align-items: center;
            span {
              margin-left: 0.05rem;
            }
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

.Concentrated-Control {
  .Electro2-Control {
    margin-top: 0.1rem;
    .Electro-content {
      margin-top: 0.1rem;
      padding: 0 0.3rem;
      .equipmentCooseBox {
        margin-top: 0.2rem;
        height: 0.36rem;
        line-height: 0.36rem;
        .titleText {
          font-size: 0.16rem;
        }
        .selectBox {
          position: relative;
          float: right;
          font-size: 0.16rem;
          width: 2.7rem;
          height: 0.4rem;
          line-height: 0.4rem;
          background: url(~@/assets/img/control/selectBox.png) no-repeat
            center/cover;
          background-size: 100% 100%;
          .showInput {
            position: absolute;
            top: 0rem;
            right: 0rem;
            padding-left: 20px;
            text-align: left;
            width: 2.7rem;
            height: 0.4rem;
            color: #fff;
            box-sizing: border-box;
          }
          .down {
            position: absolute;
            display: inline-block;
            right: 0.2rem;
            top: 0.14rem;
            width: 0.14rem;
            height: 0.13rem;
            background: url(~@/assets/img/control/down.png) no-repeat
              center/cover;
          }
          .up {
            position: absolute;
            display: inline-block;
            right: 0.2rem;
            top: 0.1rem;
            width: 0.14rem;
            height: 0.13rem;
            transform: rotate(180deg);
            background: url(~@/assets/img/control/down.png) no-repeat
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
          width: 2.45rem;
          float: right;
          display: flex;
          justify-content: space-between;
          // margin-left: 0.1rem;
          float: right;
          .el-button {
            float: left;
          }
          // line-height: 0.28rem;
          .open {
            background: #62d3fd;
            // margin-right: 0.1rem;
            padding: 0.08rem 0.07rem;
          }
          .down {
            background: #69b3b1;
            // margin-right: 0.1rem;
            padding: 0.08rem 0.07rem;
          }
          .open2 {
            background: #31a4a3;
            // margin-right: 0.1rem;
            // padding: 0.08rem 0.07rem;
          }
          .down2 {
            background: #69b3b1;
          }
          .read {
            background-color: #7cae86;
            padding: 0.08rem 0.07rem;
          }
          .rest {
            background: #31a4a3;
            padding: 0.08rem 0.07rem;
            margin-right: 0.04rem;
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
        background: url(~@/assets/img/control/ju.png) no-repeat center/cover;
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
    margin-top: 0.1rem;
    color: #fff;
    height: 2.36rem;
    .Lighting-from {
      background: url(~@/assets/img/control/ju.png) center/cover no-repeat;
      height: 2.36rem;
      width: 4.23rem;
      background-size: 4.23rem 2.36rem;
      padding: 0 0.03rem;
      margin: 0rem auto;
      overflow: hidden;
      .frombox {
        margin-top: 0.1rem;
        .fromItem-title {
          line-height: 0.4rem;
          height: 0.4rem;
          padding-right: 0.08rem;
          // background: rgba(86, 255, 254, 0.3);
          background: linear-gradient(
            to,
            right,
            rgba(37, 95, 143, 0.9),
            rgba(0, 0, 0, 0)
          );
          .status {
            float: left;
            width: 40%;
            text-align: center;
            overflow: hidden;
          }
          .locationName {
            float: left;
            width: 40%;
            text-align: center;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
          }
          .status2 {
            float: left;
            width: 50%;
            text-align: center;
            overflow: hidden;
          }
          .locationName2 {
            float: left;
            width: 50%;
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
          height: 1.8rem;
          .fromItem {
            cursor: pointer;
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
              width: 40%;
              text-align: center;
              overflow: hidden;
            }
            .locationName {
              float: left;
              width: 40%;
              text-align: center;
              overflow: hidden;
              text-overflow: ellipsis;
              white-space: nowrap;
            }
            .status2 {
              float: left;
              width: 50%;
              text-align: center;
              overflow: hidden;
            }
            .locationName2 {
              float: left;
              width: 50%;
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
        // background: url(~@/assets/img/control/icon.png) no-repeat center/cover;
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
          // background: url(~@/assets/img/control/btnHover.png) no-repeat
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
          // background: url(~@/assets/img/control/btn.png) no-repeat center/cover;
          &:hover {
          }
        }
      }
    }
  }
  .control-content_item {
    line-height: 0.36rem;
    margin-top: 0.2rem;
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
      width: 2.45rem;
      float: right;
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
  font-size: 0.13rem;
}
.fromboxs {
  .fromItem-title {
    padding: 0 0.11rem 0 0.03rem;
  }
}
.fromItemBoxs {
  height: calc(100vh - 4.4rem);
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
</style>