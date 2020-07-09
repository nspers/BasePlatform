<template>
  <div class="control">
    <!-- 音乐播放 -->
    <div class="wrapbox" ref="music">
      <div class="music-Control content-left trans-up trans-up-delay-3">
        <div class="people">
          <div class="box-title">
            <i class="icons color-huang">&#xe6ae;</i>
            <span>分机广播</span>
          </div>
          <div class="peoplechild">
            <div class="linehgt">
              <span>播放/暂停</span>
              <div>
                <i
                  class="icons color-lan-62d"
                  style="font-size:0.3rem"
                  @click="handleMusicControl('open')"
                >&#xe706;</i>
                <i
                  class="icons"
                  style="margin-left:0.2rem;font-size:0.3rem"
                  @click="handleMusicControl('down')"
                >&#xe61e;</i>
                <!-- <i
                  class="icons color-huang"
                  style="margin-left:0.2rem;font-size:0.3rem"
                  @click="handleMusicControl('rest')"
                >&#xe63e;</i> -->
              </div>
            </div>
            <div class="linehgt">
              <span>音量</span>
              <div class="item-slider">
                <el-slider
                  v-model="music.volume"
                  :max="65"
                  :disabled="music.isSlide"
                  @change="handleMusicSlider('volume')"
                ></el-slider>
              </div>
              <strong style="float:right;">{{music.volume}}</strong>
            </div>

            <div class="equipmentCooseBox">
              <span class="titleText">选择分组</span>
              <div class="selectBox">
                <!-- <input class="showInput" type="text" v-model="ElectroSelectValue" /> -->
                <el-select
                  v-model="music.value"
                  placeholder="请选择"
                  size="mini"
                  :popper-append-to-body="false"
                  @change="handleMusicSelect"
                  @visible-change="visibleMusicChange($event,music.value)"
                >
                  <el-option key="-1" label="全部" :value="-1"></el-option>
                  <el-option
                    v-for="(item,index) in music.selectData"
                    :key="item.groupid"
                    :label="item.groupname"
                    :value="index"
                  ></el-option>
                </el-select>
                <div class="select">
                  <span :class="{'down':music.selecting,'up':!music.selecting}"></span>
                </div>
              </div>
            </div>
            <div class="Lighting">
              <div class="Lighting-from">
                <div
                  style="width:100%;height:100%"
                  v-if="!MusicFormData || music.loading"
                  v-loading="!MusicFormData || music.loading"
                  element-loading-text="拼命加载中"
                  element-loading-spinner="el-icon-loading"
                  element-loading-background="rgba(0, 0, 0, 0.4)"
                ></div>
                <ul class="frombox" v-if="MusicFormData && !music.loading">
                  <li class="fromItem-title">
                    <div class="w10 fl lineH40">
                      <checked :target="'all'" :key="wuyong" @clickChecked="handleMusicChecked" />
                    </div>
                    <span class="w40 fl">编号</span>
                    <span class="w25 fl">状态</span>
                    <span class="w25 fl">运行</span>
                  </li>
                  <div class="fromItemBox sbar">
                    <li class="fromItem" v-for="(item,index) in MusicFormData" :key="index">
                      <div class="checkedBoxs fl w10 lineH40">
                        <checked
                          :target="item.id"
                          :key="wuyong"
                          @clickChecked="handleMusicChecked"
                        />
                      </div>
                      <div class="w40 fl" @click="sdClick(item.lamppostid)"><i class="icons color-huang">&#xebc0;</i><b>{{item.devicecode}}</b></div>
                      <span class="w25 fl" @click="sdClick(item.lamppostid)">
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
                      </span>
                      <span class="w25 fl" @click="sdClick(item.lamppostid)">
                        <img
                            style="width:0.2rem;height:0.2rem;vertical-align:middle;"
                            src="../../assets/img/icon/radio_green.png"
                            v-if="item.onoff == 1"
                        />
                        <img
                            style="width:0.2rem;height:0.2rem;vertical-align:middle;"
                            src="../../assets/img/icon/music_green.png"
                            v-if="item.onoff == 2"
                        />
                        <img
                          style="width:0.2rem;height:0.2rem;vertical-align:middle;"
                          src="../../assets/img/icon/cuo_gray.png"
                          v-if="item.onoff == 0"
                        />
                      </span>
                    </li>
                  </div>
                </ul>
              </div>
            </div>

            <div class="equipmentCooseBox">
              <span class="titleText">音频选择</span>
              <!-- {{this.musicData}} -->
              <div class="selectBox">
                <!-- <input class="showInput" type="text" v-model="ElectroSelectValue" /> -->
                <el-select
                  v-model="music.value2"
                  placeholder="请选择"
                  size="mini"
                  :popper-append-to-body="false"
                  @change="handleMusicSelect2"
                  @visible-change="visibleMusicChange2($event,music.value2)"
                >
                  <el-option
                    v-for="(item,index) in musicData"
                    :key="item.musicgroupid"
                    :label="item.musicgroupname"
                    :value="index"
                  ></el-option>
                </el-select>
                <div class="select">
                  <span :class="{'down':music.selecting2,'up':!music.selecting2}"></span>
                </div>
              </div>
            </div>

            <div class="Lighting2">
              <ul class="frombox addtitle">
                <div
                  style="width:100%;height:100%"
                  v-if="!MusicFormData2 || music.loading2"
                  v-loading="!MusicFormData2 || music.loading2"
                  element-loading-text="拼命加载中"
                  element-loading-spinner="el-icon-loading"
                  element-loading-background="rgba(0, 0, 0, 0.4)"
                ></div>
                <li class="fromItem-title clearfix" v-if="MusicFormData2 && !music.loading2">
                  <span class="w50 fl lineH40">序号</span>
                  <span class="w50 fl lineH40">曲目</span>
                </li>
                <div class="fromItemBox sbar" v-if="true">
                  <li
                    class="fromItem"
                    v-for="(item,index) in MusicFormData2"
                    :class="{'bgEven':(index+1)%2 == 0}"
                    :key="item.musicid"
                  >
                    <span class="w50 fl lineH40">{{index+1}}</span>
                    <span class="w50 fl lineH40">{{item.musicname}}</span>
                  </li>
                </div>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 广播喊话 -->
    <div class="wrapbox" ref="broad">
        <div class="broad-Control content-left trans-up trans-up-delay-3">
        <div class="people">
            <div class="box-title">
            <i class="icons color-huang">&#xe891;</i>
            <span>广播喊话</span>
            </div>
            <div class="peoplechild">
            <div class="status">
                <span :class="radio ? 'iconBg_a' : 'iconBg'" @click="handleBoradControl">
                <i class="icons">&#xebc0;</i>
                </span>
            </div>
            <div class="linehgt">
                <span>音量</span>
                <div class="item-slider">
                <el-slider
                    v-model="borad.volume"
                    :max="65"
                    :disabled="music.isSlide"
                    @change="handleBoradSlider('volume')"
                ></el-slider>
                </div>
                <strong>{{borad.volume}}</strong>
            </div>
            <div class="equipmentCooseBox">
                <span class="titleText">选择分组</span>
                <div class="selectBox">
                <!-- <input class="showInput" type="text" v-model="radioSelect" /> -->
                <el-select
                    v-model="music.value"
                    placeholder="请选择"
                    size="mini"
                    :popper-append-to-body="false"
                    @change="handleMusicSelect"
                    @visible-change="visibleMusicChange($event,music.value)"
                >
                    <el-option key="-1" label="全部" :value="-1">全部</el-option>
                    <el-option
                        v-for="(item,index) in music.selectData"
                        :key="item.groupid"
                        :label="item.groupname"
                        :value="index"
                    ></el-option>
                </el-select>
                <div class="select">
                    <span :class="{'down':music.selecting,'up':!music.selecting}"></span>
                </div>
                </div>
            </div>
            <div class="Lighting">
                <div class="Lighting-from">
                <div
                    style="width:100%;height:100%"
                    v-if="!MusicFormData || music.loading"
                    v-loading="!MusicFormData || music.loading"
                    element-loading-text="拼命加载中"
                    element-loading-spinner="el-icon-loading"
                    element-loading-background="rgba(0, 0, 0, 0.4)"
                ></div>
                <ul class="frombox" v-if="MusicFormData && !music.loading">
                    <li class="fromItem-title">
                        <div class="checkedBoxs fl w10 lineH40">
                            <checked :target="'all'" :key="wuyong" @clickChecked="handleMusicChecked" />
                        </div>
                        <span class="w40 fl">设备编号</span>
                        <span class="w25 fl">状态</span>
                        <span class="w25 fl">运行</span>
                    </li>
                    <div class="fromItemBox sbar">
                    <li class="fromItem" v-for="(item,index) in MusicFormData" :key="index">
                        <div class="checkedBoxs fl w10 lineH40">
                        <checked
                            :target="item.id"
                            :key="wuyong"
                            @clickChecked="handleMusicChecked"
                        />
                        </div>
                        <div class="w40 fl" @click="sdClick(item.lamppostid)"><i class="icons color-huang">&#xebc0;</i><b>{{item.devicecode}}</b></div>
                        <span class="w25 fl" @click="sdClick(item.lamppostid)">
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
                        </span>
                        <span class="w25 fl" @click="sdClick(item.lamppostid)">
                        <img
                            style="width:0.2rem;height:0.2rem;vertical-align:middle;"
                            src="../../assets/img/icon/radio_green.png"
                            v-if="item.onoff == 1"
                        />
                        <img
                            style="width:0.2rem;height:0.2rem;vertical-align:middle;"
                            src="../../assets/img/icon/music_green.png"
                            v-if="item.onoff == 2"
                        />
                        <img
                            style="width:0.2rem;height:0.2rem;vertical-align:middle;"
                            src="../../assets/img/icon/cuo_gray.png"
                            v-if="item.onoff == 0"
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

    <!-- 点选设备 -->
    <div class="wrapbox" ref="singleDev">
      <div class="broad-check content-left trans-up trans-up-delay-3">
        <div class="people">
          <div class="inputtext">
            <!-- <input type="text" placeholder="请输入设备编号" value />
            <i class="icons">&#xe620;</i>-->
            <Search type="broadcast" />
          </div>
        </div>
        <div class="status">
          <div class="box-title">
            <i class="icons color-huang">&#xe6a5;</i>
            <span>基本信息</span>
          </div>
          <div class="numbers">
            <p>
              <span>设备名称 :</span>
              <span class="letter">{{broadcheck.selectData.lamppostname}}</span>
            </p>
            <p>
              <span>状态 :</span>
              <img
                src="../../assets/img/icon/wifi_green.png"
                v-if="broadcheck.selectData.state == 1"
              />
              <img
                src="../../assets/img/icon/error_yellow.png"
                v-if="broadcheck.selectData.state == 0"
              />
            </p>
            <p>
              <span>开关 :</span>
              <img src="../../assets/img/icon/radio_green.png" v-if="broadcheck.selectData.onoff == 1" />
              <img src="../../assets/img/icon/music_green.png" v-if="broadcheck.selectData.onoff == 2" />
              <img src="../../assets/img/icon/cuo_gray.png" v-if="broadcheck.selectData.onoff == 0" />
            </p>
          </div>
        </div>
        <div class="control trans-up trans-up-delay-5">
          <div class="box-title">
            <i class="icons color-huang">&#xe778;</i>
            <span>实时操作</span>
          </div>
          <div class="auto_m">
            <div class="control-content_item">
              <span>播放/暂停</span>
              <div>
                <i
                  class="icons color-lan-62d"
                  style="font-size:0.3rem"
                  @click="handleSingleControl('open')"
                >&#xe706;</i>
                <i
                  class="icons"
                  style="margin-left:0.5rem;font-size:0.3rem"
                  @click="handleSingleControl('down')"
                >&#xe61e;</i>
              </div>
            </div>
            <div class="control-content_item">
              <span class="item-type">音量</span>
              <div class="item-slider">
                <el-slider
                  v-model="broadcheck.volume"
                  :max="15"
                  @change="handleSingleSlider('volume')"
                ></el-slider>
              </div>
            </div>
            <div class="control-content_item">
              <span>喊话</span>
              <div>
                <i
                  class="icons color-lan-62d"
                  style="font-size:0.3rem;color: #00FFAE;"
                  @click="fnBroadcasting"
                >&#xe7a1;</i>
              </div>
            </div>

            <div class="equipmentCooseBox">
              <span class="titleText">音频选择</span>
              <!-- {{this.musicData}} -->
              <div class="selectBox">
                <!-- <input class="showInput" type="text" v-model="ElectroSelectValue" /> -->
                <el-select
                  v-model="music.value2"
                  placeholder="请选择"
                  size="mini"
                  :popper-append-to-body="false"
                  @change="handleMusicSelect2"
                  @visible-change="visibleMusicChange2($event,music.value2)"
                >
                  <!-- <el-option key="-1" label="全部" :value="-1"></el-option> -->
                  <el-option
                    v-for="(item,index) in musicData"
                    :key="item.musicgroupid"
                    :label="item.musicgroupname"
                    :value="index"
                  ></el-option>
                </el-select>
                <div class="select">
                  <span :class="{'down':music.selecting2,'up':!music.selecting2}"></span>
                </div>
              </div>
            </div>

            <div class="Lighting2">
              <ul class="frombox addtitle">
                <div
                  style="width:100%;height:100%"
                  v-if="!MusicFormData2 || music.loading2"
                  v-loading="!MusicFormData2 || music.loading2"
                  element-loading-text="拼命加载中"
                  element-loading-spinner="el-icon-loading"
                  element-loading-background="rgba(0, 0, 0, 0.4)"
                ></div>
                <li class="fromItem-title clearfix" v-if="MusicFormData2 && !music.loading2">
                  <span class="w50 fl lineH40">序号</span>
                  <span class="w50 fl lineH40">曲目</span>
                </li>
                <div class="fromItemBox sbar" v-if="true">
                  <li
                    class="fromItem"
                    v-for="(item,index) in MusicFormData2"
                    :class="{'bgEven':(index+1)%2 == 0}"
                    :key="item.musicid"
                  >
                    <span class="w50 fl lineH40">{{index+1}}</span>
                    <span class="w50 fl lineH40">{{item.musicname}}</span>
                  </li>
                </div>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>

<div class="reciprocal" v-if="kg">{{reciprocal}}</div>

<div class="1">{{$store.state.loctionId}}</div>

<!-- 正在喊话 -->
<transition name="tstion">
    <broadcasting ref="broadcasting" v-if="radio" :use="use" />
</transition>

</div>
</template>

<script>
import checked from "../../components/checked";
import Search from "../../components/search";
import broadcasting from "../../components/broadcasting";
import { Message,Notification,MessageBox } from 'element-ui';
export default {
  name: "broadcontrol",
  components: {
    checked,
    broadcasting,
    Search
  },
  // props: {
  //   musicData: Array
  // },
  data() {
    return {
      radio:false,
      musicData: [],
      kg:false,
      reciprocal:3,
      wuyong: 0,
      music: {
        light: 0,
        volume: 0,
        value: -1,
        value2: 0,
        isSlide: true,
        selectData: [],
        selecting: true,
        selecting2: true,
        loading: false,
        loading2: false
      },

      borad: {
        volume: 0
      },
      running:[],
      broadcheck: {
        selectData: {},
        volume: 0
      }
    };
  },
  watch: {
      use(){

      }
  },
  computed: {
    bcSwitch() {
      return this.$store.state.bcSwitch;
    },
    MusicFormData: function() {
        if (this.$store.getters.websocketData[230015]) {
        this.music.selectData = this.$store.getters.websocketData[230015].msg.groups;
        if (this.music.value == -1) {
            let array = this.$store.getters.websocketData[230015].msg.groups;
            return this.filterAllData(array, "bcsts");
        } else {
            return this.$store.getters.websocketData[230015].msg.groups[
            this.music.value
            ].bcsts;
        }
        } else {
        return false;
        }

    },
    MusicFormData2: function() {
      if (this.musicData.length) {
        return this.musicData[this.music.value2].musics;
      } else {
        return false;
        // return [{index:1,name:'namesa'},{index:1,name:'namesa'}];
      }
    },
    use:function(){
        if (this.$store.getters.websocketData[230015] && this.$store.getters.websocketData[230015].msg.groups.length > 0) {
            this.running = []
            this.radio = false
            let groupDV = this.$store.getters.websocketData[230015].msg.groups
            for (let index = 0; index < groupDV.length; index++) {
                for (let s = 0; s < groupDV[index].bcsts.length; s++) {
                    if(groupDV[index].bcsts[s].onoff){
                        this.running.push(groupDV[index].bcsts[s])
                        // return groupDV[index].bcsts[s]
                        if(groupDV[index].bcsts[s].onoff == 1){
                            this.radio = true
                        }
                        console.log(this.running);
                    }
                    if(groupDV[index].bcsts[s].lamppostid == this.$store.state.loctionId){
                        this.broadcheck.selectData = groupDV[index].bcsts[s]
                    }
                }                
            }
            return this.running
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
    entry(controlModule) {
      this.$refs[controlModule].className = "";
      this.$refs[controlModule].className = "wrapbox is-visible";
        if(this.$store.getters.websocketData[230020]){
          this.musicData = this.$store.getters.websocketData[230020].msg;
        }
      if (controlModule == "singleDev") {
        if (this.$store.getters.websocketData[230015]) {
          this.music.selectData = this.$store.getters.websocketData[230015].msg.groups;
          let array = this.$store.getters.websocketData[230015].msg.groups;
          let allArray = this.filterAllData(array, "bcsts");
          allArray.forEach(item => {
            if (item.lamppostid == this.$store.state.loctionId) {
              this.broadcheck.selectData = item;
            }
          });
        }
      }
    },
    leave(controlModule) {
      this.$refs[controlModule].className = "wrapbox";
      this.music.value = -1;
      this.music.volume = 0;
      this.borad.volume = 0;
      this.music.isSlide = true;
      if (controlModule == "singleDev") {
        this.broadcheck.selectData = [];
      }
    },
    sdOutIn() {
      this.leave("singleDev");
      setTimeout(() => {
        this.entry("singleDev");
      }, 800);
    },
    sdClick(id) {
      this.$sdClick(id, this.$route.name);
    },

    // 音乐播放
    visibleMusicChange($event, vlaueSelect) {
      this.music.selecting = !this.music.selecting;
    },
    visibleMusicChange2($event, vlaueSelect) {
      this.music.selecting2 = !this.music.selecting2;
    },
    handleMusicControl(target) {
        let bcstsId = [];
        for (const key in this.$store.state.checkedArray) {
            if (this.$store.state.checkedArray[key] && key != "all") {
                bcstsId.push(Number(key));
            }
        }      
        if (!bcstsId.length) {
            this.$Message.closeAll();
            this.$Message({
                message: "请先选择设备",
                type: "warning"
            });
        } else {
            if(target == 'down'){
                return MessageBox.confirm('确定要停止播放音乐吗？', '操作提醒', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.play('down',bcstsId)
                }).catch(()=>{
                    console.log('cancel');
                })
                return
            }
            if(this.use && this.use.length > 0){
                let radio = []
                let music = []
                for (let index = 0; index < this.use.length; index++) {
                    for (let s = 0; s < bcstsId.length; s++) {
                        if(this.use[index].id == bcstsId[s]){
                            if(this.use[index].onoff == 1){//已选设备中，有设备正在进行喊话任务
                                radio.push(this.use[index].id)
                            }else if(this.use[index].onoff == 2){
                                music.push(this.use[index].id)
                            }
                        }
                    }
                }
                if(radio.length > 0){
                    return MessageBox.confirm('设备正在被占用,请先确定停止喊话', '操作提醒', {
                        confirmButtonText: '停止喊话任务',
                        cancelButtonText: '取消',
                        type: 'warning'
                    }).then(() => {
                        this.handleBoradControlD('down',radio)
                    }).catch(()=>{
                        console.log('cancel');
                    })
                    return
                }else if(music.length > 0){
                    return MessageBox.confirm('设备正在被占用,请先停止音乐播放', '操作提醒', {
                        confirmButtonText: '停止音乐任务',
                        cancelButtonText: '取消',
                        type: 'warning'
                    }).then(() => {
                        this.play('down',music)
                    }).catch(()=>{
                        console.log('cancel');
                    })
                    return
                }else{
                    return MessageBox.confirm('确定要播放音乐吗？', '操作提醒', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning'
                    }).then(() => {
                        this.play('open',bcstsId)
                    }).catch(()=>{
                        console.log('cancel');
                    })
                    return
                }
            }else{
                return MessageBox.confirm('确定要播放音乐吗？', '操作提醒', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.play('open',bcstsId)
                }).catch(()=>{
                    console.log('cancel');
                })
                return
            }
        }
    },
    play(target,bcstsId,volume) {
        let params = {}
        switch (target) {
            case 'open':
                params = {
                    msgid: "550e8400-e29b-41d4-a716-446655440000",
                    modulecode: 103003,
                    msgtype: 0,
                    msgcode: 200009,
                    timestamp: this.$getCurrentDate(),
                    msg: {
                        cmdtype: 1,
                        volume: volume ? volume : this.music.volume,
                        musicgroup: this.musicData[this.music.value2].musicgroupid,
                        bcsts: bcstsId
                    }
                }
            break;
            case 'down':
                params = {
                    msgid: "550e8400-e29b-41d4-a716-446655440000",
                    modulecode: 103003,
                    msgtype: 0,
                    msgcode: 200009,
                    timestamp: this.$getCurrentDate(),
                    msg: {
                        cmdtype: 2,
                        volume: volume ? volume : this.music.volume,
                        musicgroup: this.musicData[this.music.value2].musicgroupid,
                        bcsts: bcstsId
                    }
                };
            break;
        
            default:
                break;
        }
        this.getControlAPI(params);
    },
    handleMusicSlider(target) {
      let params;
      let bcstsId = [];
      for (const key in this.$store.state.checkedArray) {
        if (this.$store.state.checkedArray[key] && key != "all") {
          bcstsId.push(Number(key));
        }
      }
      if (target == "volume") {
        params = params = {
          msgid: "550e8400-e29b-41d4-a716-446655440000",
          modulecode: 103003,
          msgtype: 0,
          msgcode: 200009,
          timestamp: this.$getCurrentDate(),
          msg: {
            cmdtype: 5,
            volume: this.music.volume,
            musicgroup: this.musicData[this.music.value2].musicgroupid,
            bcsts: bcstsId
          }
        };
      }
      this.getControlAPI(params);
    },
    handleMusicChecked() {
      let flag = 0;
      for (const key in this.$store.state.checkedArray) {
        if (this.$store.state.checkedArray[key] && key != "all") {
          flag += 1;
        }
      }
      if (flag > 0) {
        this.music.isSlide = false;
        if (flag == 1) {
          let keyId;
          for (const key in this.$store.state.checkedArray) {
            if (this.$store.state.checkedArray[key] && key != "all") {
              keyId = Number(key);
            }
          }
          this.MusicFormData.forEach(item => {
            if (item.id == keyId) {
              // this.LCD.light = item.light;
              this.music.volume = item.volume;
              this.borad.volume = item.volume;
            }
          });
        } else {
          this.music.light = 0;
          this.music.volume = 0;
          this.borad.volume = 0;
        }
      } else {
        this.music.isSlide = true;
        this.music.volume = 0;
        this.borad.volume = 0;
        this.music.light = 0;
      }
    },
    handleMusicSelect() {
      let array;
      if (this.music.value == -1) {
        let allArray = this.$store.getters.websocketData[230015].msg.groups;
        array = this.filterAllData(allArray, "bcsts");
      } else {
        array = this.music.selectData[this.music.value].bcsts;
      }
      this.$store.state.checkedArray = {};
      this.$store.state.checkedArray["all"] = false;
      array.forEach((item, index) => {
        this.$store.state.checkedArray[item.id] = false;
      });
      this.music.isSlide = true;
      this.music.light = 0;
      this.music.volume = 0;
      this.borad.volume = 0;
      this.music.loading = true;
      setTimeout(() => {
        this.music.loading = false;
      }, 500);
    },
    handleMusicSelect2() {
      this.borad.volume = 0;
      this.music.loading2 = true;
      setTimeout(() => {
        this.music.loading2 = false;
      }, 500);
    },

    // 广播喊话
    handleBoradControl() {
        let bcstsId = [];
        for (const key in this.$store.state.checkedArray) {
            if (this.$store.state.checkedArray[key] && key != "all") {
                bcstsId.push(Number(key));
            }
        }      
        // this.handleBoradControlD('down',bcstsId)
        // return
        console.log(this.use);
        if (!bcstsId.length) {
            this.$Message.closeAll();
            this.$Message({
                message: "请先选择设备",
                type: "warning"
            });
        } else {
            if(this.use && this.use.length > 0){
                let num = 0
                for (let index = 0; index < this.use.length; index++) {
                    for (let s = 0; s < bcstsId.length; s++) {
                        if(this.use[index].id == bcstsId[s]){
                            if(this.use[index].onoff == 1){//已选设备中，有设备正在进行喊话任务
                                num++
                            }else if(this.use[index].onoff == 2){//已选设备中，有设备正在进行音乐播放任务
                                return MessageBox.confirm('设备正在被占用,请先确定停止音乐播放', '操作提醒', {
                                    confirmButtonText: '停止音乐播放任务',
                                    cancelButtonText: '取消',
                                    type: 'warning'
                                }).then(() => {
                                    this.play('down',bcstsId)
                                }).catch(()=>{
                                    console.log('cancel');
                                })
                                return
                            }
                        }
                    }
                }
                if(num == bcstsId.length){//已选设备全部正在执行喊话任务，正常关闭
                    return MessageBox.confirm('确定要关闭喊话操作吗？', '操作提醒', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning'
                    }).then(() => {
                        this.handleBoradControlD('down',bcstsId)
                    }).catch(() => {
                        console.log('cancel');
                    })
                    return
                }else if(num > 0 ){//已选设备中有部分正在执行喊话任务，全部关闭
                    return MessageBox.confirm('设备正在被占用,请先确定停止喊话', '操作提醒', {
                        confirmButtonText: '停止喊话任务',
                        cancelButtonText: '取消',
                        type: 'warning'
                    }).then(() => {
                        this.handleBoradControlD('down',bcstsId)
                    }).catch(()=>{
                        console.log('cancel');
                    })
                    return
                }else{
                    return MessageBox.confirm('确定要进行喊话操作吗？', '操作提醒', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning'
                    }).then(() => {
                        this.handleBoradControlD('open',bcstsId)
                    }).catch(() => {
                        console.log('cancel');
                    })
                    return
                }
            }else{
                return MessageBox.confirm('确定要进行喊话操作吗？', '操作提醒', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.handleBoradControlD('open',bcstsId)
                }).catch(() => {
                    console.log('cancel');
                })
                return
            }
        }
    },
    handleBoradControlD(target,bcstsId){
        let params;
        switch (target) {
            case 'open':
                this.reciprocal = 3
                this.kg = true
                let t = setInterval(() => {
                    this.reciprocal--
                    if(this.reciprocal == 0){
                        this.kg = false
                        params = {
                            msgid: "550e8400-e29b-41d4-a716-446655440000",
                            modulecode: 103003,
                            msgtype: 0,
                            msgcode: 200009,
                            timestamp: this.$getCurrentDate(),
                            msg: {
                                cmdtype: 3,
                                volume: this.borad.volume,
                                bcsts: bcstsId
                            }
                        }
                        this.getControlAPI(params);
                        clearInterval(t)
                    }
                }, 1000);
            break;
            case 'down':
                params = {
                    msgid: "550e8400-e29b-41d4-a716-446655440000",
                    modulecode: 103003,
                    msgtype: 0,
                    msgcode: 200009,
                    timestamp: this.$getCurrentDate(),
                    msg: {
                        cmdtype: 4,
                        volume: this.borad.volume,
                        bcsts: bcstsId
                    }
                };
                this.getControlAPI(params);
            break;
            default:
            break;
        }
    },
    handleBoradSlider(target) {
      let params;
      let bcstsId = [];
      for (const key in this.$store.state.checkedArray) {
        if (this.$store.state.checkedArray[key] && key != "all") {
          bcstsId.push(Number(key));
        }
      }
      if (target == "volume") {
        params = {
          msgid: "550e8400-e29b-41d4-a716-446655440000",
          modulecode: 103002,
          msgtype: 0,
          msgcode: 200009,
          timestamp: this.$getCurrentDate(),
          msg: {
            cmdtype: 5,
            volume: this.borad.volume,
            bcsts: bcstsId
          }
        };
      }
      this.getControlAPI(params);
    },

    // 单个站点
    handleSingleControl(target) {
        console.log(this.broadcheck);        
        let params;
        if (!this.broadcheck.selectData.id) {
            this.$Message.closeAll();
            this.$Message({
                message: "暂无数据",
                type: "warning"
            });
        } else {
            switch (this.broadcheck.selectData.onoff) {
                case 0:
                    if(target == 'open'){
                        return MessageBox.confirm('确定要播放音乐吗？', '操作提醒', {
                            confirmButtonText: '确定',
                            cancelButtonText: '取消',
                            type: 'warning'
                        }).then(() => {
                            this.play('open',[this.broadcheck.selectData.id],this.broadcheck.selectData.volume)
                        }).catch(()=>{
                            console.log('cancel');
                        })
                        return
                    }
                break;

                case 1:
                    return MessageBox.confirm('设备正在被占用,请先确定停止喊话', '操作提醒', {
                        confirmButtonText: '停止喊话任务',
                        cancelButtonText: '取消',
                        type: 'warning'
                    }).then(() => {
                        this.handleBoradControlD('down',[this.broadcheck.selectData.id])
                    }).catch(()=>{
                        console.log('cancel');
                    })
                    return
                break;
                case 2:
                    if(target == 'down'){
                        return MessageBox.confirm('确定要停止播放音乐吗？', '操作提醒', {
                            confirmButtonText: '确定',
                            cancelButtonText: '取消',
                            type: 'warning'
                        }).then(() => {
                            this.play('down',[this.broadcheck.selectData.id],this.broadcheck.selectData.volume)
                        }).catch(()=>{
                            console.log('cancel');
                        })
                        return
                    }else{
                        return MessageBox.confirm('设备正在被占用,请先停止音乐播放', '操作提醒', {
                            confirmButtonText: '停止音乐任务',
                            cancelButtonText: '取消',
                            type: 'warning'
                        }).then(() => {
                            this.play('down',[this.broadcheck.selectData.id],this.broadcheck.selectData.volume)
                        }).catch(()=>{
                            console.log('cancel');
                        })
                        return
                    }
                    
                break;
                default:
                break;
            }
        }
    },
    handleSingleSlider(target) {
      if (!this.broadcheck.selectData.id) {
        this.$Message.closeAll();
        this.$Message({
          message: "暂无数据",
          type: "warning"
        });
        this.broadcheck.volume = 0;
      } else {
        let params;
        if (target == "volume") {
          params = {
            msgid: "550e8400-e29b-41d4-a716-446655440000",
            modulecode: 103002,
            msgtype: 0,
            msgcode: 200009,
            timestamp: this.$getCurrentDate(),
            msg: {
              cmdtype: 5,
              volume: this.broadcheck.volume,
              musicgroup: this.musicData[this.music.value2].musicgroupid,
              bcsts: [this.broadcheck.selectData.id]
            }
          };
        }
        this.getControlAPI(params);
      }
    },
    fnBroadcasting() {
        if (!this.broadcheck.selectData.id) {
            this.$Message.closeAll();
            this.$Message({
                message: "暂无数据",
                type: "warning"
            });
        } else {

            console.log(this.broadcheck.selectData);

            switch (this.broadcheck.selectData.onoff) {
                case 0:
                    return MessageBox.confirm('确定要进行喊话操作吗？', '操作提醒', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning'
                    }).then(() => {
                        this.handleBoradControlD('open',[this.broadcheck.selectData.id])
                    }).catch(() => {
                        console.log('cancel');
                    })
                    return
                break;
                case 1:
                    return MessageBox.confirm('确定要关闭喊话操作吗？', '操作提醒', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning'
                    }).then(() => {
                        this.handleBoradControlD('down',[this.broadcheck.selectData.id])
                    }).catch(() => {
                        console.log('cancel');
                    })
                    return
                break;
                case 2:
                    return MessageBox.confirm('设备正在被占用,请先确定停止音乐播放', '操作提醒', {
                        confirmButtonText: '停止音乐播放任务',
                        cancelButtonText: '取消',
                        type: 'warning'
                    }).then(() => {
                        this.play('down',[this.broadcheck.selectData.id])
                    }).catch(()=>{
                        console.log('cancel');
                    })
                    return
                break;
            
                default:
                break;
            }

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

<style>
.el-autocomplete{
  display: block;
}
.music-Control .el-input__inner {
    opacity: 1;
}
</style>
<style lang="scss" scoped>
.control.active {
  z-index: 999;
}

.leftm {
  margin-left: 0.1rem;
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

.music-Control {
  padding-top: 1.2rem;
  .people {
    .peoplechild {
      height: 98%;
      margin: 0 auto;
      .linehgt {
        padding: 0 0.3rem;
        height: 0.36rem;
        line-height: 0.36rem;
        justify-content: space-between;
        margin-top: 0.1rem;
        display: flex;
        align-items: center;
        i {
          text-shadow: none;
        }
        .paly_stop {
          margin-left: 0.5rem;
        }
        .item-slider {
          width: 2.45rem;
        }
      }
      .equipmentCooseBox {
        padding: 0 0.3rem;
        margin-top: 0.16rem;
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
          background: url("../../assets/img/control/selectBox.png") no-repeat
            center/cover;
          .showInput {
            position: absolute;
            top: 0rem;
            right: 0rem;
            text-align: center;
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
            background: url("../../assets/img/control/down.png") no-repeat
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
            background: url("../../assets/img/control/down.png") no-repeat
              center/cover;
          }
        }
      }
      .Lighting {
        padding: 0 0.2rem;
        margin-top: 0.1rem;
        color: #fff;
        height: 2.36rem;
        .Lighting-from {
          background: url(~@/assets/img/control/ju.png) no-repeat center 0/100%
            100%;
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
              // background: rgba(86, 255, 254, 0.3);
              background: linear-gradient(
                to right,
                rgba(37, 95, 143, 0.9),
                rgba(0, 0, 0, 0)
              );
            }
            .fromItemBox {
              height: 1.8rem;
              .fromItem {
                height: 0.4rem;
                line-height: 0.4rem;
                cursor: pointer;
                overflow: hidden;
                &:hover {
                  background: linear-gradient(
                    to right,
                    rgba(86, 255, 254, 0.3),
                    rgba(0, 0, 0, 0)
                  );
                }
              }
            }
          }
        }
      }
      .Lighting2 {
        padding: 0 0.2rem;
        margin-top: 0.1rem;
        color: #fff;
        .frombox {
          background: url(../../assets/img/control/fromBg.png) no-repeat
            center/cover;
          background-size: 4.23rem calc(100vh - 6.5rem);
          width: 4.23rem;
          height: calc(100vh - 6.5rem);
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
            }
          }
        }
      }
    }
  }
}

.broad-Control {
  padding-top: 1.2rem;
  .people {
    /*height: 100%;*/
    .peoplechild {
      height: 98%;
      margin: 0 auto;
      .status {
        display: flex;
        justify-content: center;
        align-items: center;
        height: 3rem;
        .iconBg {
          background-color: #00fbf3;
          border-radius: 50%;
          width: 1rem;
          height: 1rem;
          line-height: 1rem;
          .icons {
            display: block;
            font-size: 0.6rem;
            text-align: center;
            text-shadow: none;
          }
        }
        .iconBg_a {
          border-radius: 50%;
          width: 1.2rem;
          height: 1.2rem;
          background: url("../../assets/img/control/bc_circle.png") no-repeat
            center/contain;
          line-height: 1.2rem;
          color: #00ff54;
          .icons {
            display: block;
            font-size: 0.6rem;
            text-align: center;
            text-shadow: none;
          }
        }
      }
      .linehgt {
        padding: 0 0.3rem;
        height: 0.36rem;
        display: flex;
        align-items: center;
        justify-content: space-between;
        .paly_stop {
          margin-left: 0.5rem;
        }
        .item-slider {
          width: 2.45rem;
        }
      }
      .equipmentCooseBox {
        padding: 0 0.3rem;
        margin-top: 0.1rem;
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
          background: url("../../assets/img/control/selectBox.png") no-repeat
            center/cover;
          .showInput {
            position: absolute;
            top: 0rem;
            right: 0rem;
            text-align: center;
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
            background: url("../../assets/img/control/down.png") no-repeat
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
            background: url("../../assets/img/control/down.png") no-repeat
              center/cover;
          }
        }
      }
      .Lighting {
        padding: 0 0.2rem;
        margin-top: 0.1rem;
        color: #fff;
        height: calc(100vh - 6rem);
        .Lighting-from {
          background: url(~@/assets/img/control/ju.png) no-repeat center 0/100%
            100%;
          height: 100%;
          width: 4.23rem;
          background-size: 4.23rem 100%;
          padding: 0 0.03rem;
          margin: 0rem auto;
          overflow: hidden;
          .frombox {
            margin-top: 0.1rem;
            .fromItem-title {
              line-height: 0.4rem;
              height: 0.4rem;
              // background: rgba(86, 255, 254, 0.3);
              background: linear-gradient(
                to right,
                rgba(37, 95, 143, 0.9),
                rgba(0, 0, 0, 0)
              );
            }
            .fromItemBox {
              height: 1.8rem;
              .fromItem {
                cursor: pointer;
                height: 0.4rem;
                line-height: 0.4rem;
                overflow: hidden;
                &:hover {
                  background: linear-gradient(
                    to right,
                    rgba(86, 255, 254, 0.3),
                    rgba(0, 0, 0, 0)
                  );
                }
              }
            }
          }
        }
      }
    }
  }
}
//点选设备
.broad-check {
  padding-top: 1.2rem;
  .people {
    width: 4.5rem;
    height: 0.4rem;
    .inputtext {
      width: 4.21rem;
      height: 0.37rem;
      margin: 0 auto;
      // border: 0.01rem solid rgba(255, 255, 255, 1);
      // opacity: 0.8;
      border-radius: 0.04rem;
      // .search{
      //   left: auto;
      //   width: 4.21rem;
      // }
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
        text-shadow: none;
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
        line-height: 0.36rem;
        span {
          vertical-align: middle;
        }
        img {
          margin-left: 0.4rem;
          width: 0.2rem;
          height: 0.2rem;
          vertical-align: middle;
        }
        .letter {
          padding-left: 0.1rem;
          letter-spacing: 0.02rem;
        }
      }
    }
  }
  .control {
    width: 100%;
    margin-top: 4%;
    .auto_m {
      width: 88%;
      margin: 0 auto;
      font-size: 0.16rem;
      .control-content_item {
        line-height: 0.36rem;
        margin-top: 0.1rem;
        display: flex;
        justify-content: space-between;
        align-items: center;
        i {
          text-shadow: none;
        }
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
          width: 2.45rem;
          float: right;
        }
      }
      .lint_h {
        line-height: 0.36rem;
        margin-bottom: 0.2rem;
      }
      .equipmentCooseBox {
        // padding: 0 0.3rem;
        margin-top: 0.1rem;
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
          background: url("../../assets/img/control/selectBox.png") no-repeat
            center/cover;
          .showInput {
            position: absolute;
            top: 0rem;
            right: 0rem;
            text-align: center;
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
            background: url("../../assets/img/control/down.png") no-repeat
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
            background: url("../../assets/img/control/down.png") no-repeat
              center/cover;
          }
        }
      }
      .Lighting2 {
        // padding: 0 0.2rem;
        margin: 0.1rem auto 0;
        color: #fff;
        .frombox {
          background: url(../../assets/img/control/fromBg.png) no-repeat center
            0/100% 100%;
          /*background-size: 4.23rem calc(100vh - 6.6rem);*/
          width: 4.23rem;
          height: calc(100vh - 6.5rem);
          overflow: hidden;
          margin: 0 auto;
          padding-top: 0.12rem;
          .fromItem-title {
            // background-color: rgba(0, 0, 0, 0.2);
            background: linear-gradient(
            to,
            right,
            rgba(37, 95, 143, 0.9),
            rgba(0, 0, 0, 0)
          );
          }
          .fromItemBox {
            height: calc(100vh - 4.12rem);
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
            }
          }
        }
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