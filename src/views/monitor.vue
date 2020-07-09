<template>
  <div class="monitor" ref="monitor">
    <div class="commitBg">
        <div class="monitor-bar">
            <div class="sbarBox-main">
            <div class="sbarBox">
                <span class="active"></span>
                <span class="sbar now">告警管理</span>
                <span class="sbar" @click="jump">事件管理</span>
            </div>
            </div>
        </div>
        <div class="monitor-t">
            <div class="monitor-t-left">
                <div class="content">
                <el-form
                    ref="form"
                    :model="sizeForm"
                    label-width="1rem"
                    size="mini"
                    style="width:8rem;"
                    class="y-form"
                >
                    <el-form-item label="告警时间">
                    <el-date-picker
                        :clearable="false"
                        type="date"
                        placeholder="开始时间"
                        v-model="startTime"
                        style="width: 100%;"
                        :picker-options="startTimeOption"
                    ></el-date-picker>
                    <span class="y-form-heng"></span>
                    <el-date-picker
                        :clearable="false"
                        type="date"
                        placeholder="结束时间"
                        v-model="endTime"
                        style="width: 100%;"
                        :picker-options="endTimeOption"
                    ></el-date-picker>
                    </el-form-item>
                    <el-form-item label="告警设备">
                    <el-select
                        v-model="sizeForm.deviceType"
                        placeholder="请选择"
                        :popper-append-to-body="false"
                    >
                        <el-option label="LED" value="2"></el-option>
                        <el-option label="集中控制器" value="4"></el-option>
                        <el-option label="单灯控制器" value="8"></el-option>
                        <el-option label="环测" value="5"></el-option>
                    </el-select>
                    </el-form-item>

                    <el-form-item label="告警类型">
                    <el-select
                        v-model="sizeForm.type"
                        placeholder="请选择"
                        :popper-append-to-body="false"
                        style="widht:100%"
                    >
                        <el-option label="离线告警" value="201"></el-option>
                        <el-option label="在线告警" value="202"></el-option>
                    </el-select>
                    </el-form-item>
                    <el-form-item label="设备名称" class="y-form-btn-wrap">
                    <input type="text" v-model="sizeForm.deviceName" class="numbersb"/>
                    </el-form-item>
                    <!-- <el-form-item label="设备编号" class="y-form-btn-wrap">
                    <input type="text" v-model="sizeForm.did" class="numbersb"/>
                    </el-form-item> -->
                    <!-- <el-form-item label class="y-form-btn-wrap">
                    <el-select v-model="sizeForm.shebei" placeholder="请选择" :popper-append-to-body="false">
                        <el-option label="LED" value="shanghai"></el-option>
                        <el-option label="LCD" value="beijing"></el-option>
                    </el-select>
                    
                    </el-form-item> -->
                    <!-- <input type="text" class="numbersb" style="opacity:0" /> -->
                    <div class="y-form-btn" style="margin-left:0.2rem" @click="searchTable_s">搜索</div>
                </el-form>
                </div>
            </div>
            <!-- <div class="monitor-t-right">
                <div class="content">
                <div class="monitor-title">今日告警总数</div>
                <div class="monitor-draw">
                    {{waringCount}}
                    <div class="monitor-draw-zhuan move1"></div>
                </div>
                </div>
            </div> -->
        </div>
    </div>
    <div class="monitor-b trans-left trans-left-delay-5">
      <div class="table-bg-t"></div>
      <div class="table-bg-c">
        <table class="alarm_section_table" cellspacing="0">
          <colgroup>
            <col width="261" />
            <col width="261" />
            <col width="261" />
            <col width="261" />
            <col width="261" />
          </colgroup>
          <thead>
            <tr>
              <th>编号</th>
              <th>设备名称</th>
              <th>设备编号</th>
              <th>告警类型</th>
              <th>告警时间</th>
            </tr>
          </thead>
          <tbody v-show="tabelData.length>0">
            <tr v-for="(item,index) in tabelData" :key="index">
              <td>{{index+1}}</td>
              <td>{{item.deviceName}}</td>
              <td>{{item.did}}</td>
              <td>{{item.typeStr}}</td>
              <td>{{item.createtime}}</td>
            </tr>
          </tbody>
          <div v-show="tabelData.length==0" class="noData">
            <span v-show="!loadingShow">暂无数据</span>
            <div v-show="loadingShow" class="el-loading-spinner">
              <i class="el-icon-loading"></i>
              <p class="el-loading-text">加载中</p>
            </div>
          </div>
        </table>
      </div>
      <div class="table-bg-b">
        <div class="y-page" v-show="tabelData.length>0">
          <div class="y-page-btn" @click="changePage(-1)">上一页</div>
          <el-pagination
            background
            :total="total"
            :page-size="limit"
            :page-sizes="pagesizes"
            :current-page="cuurrentPage"
            layout=" pager "
            @current-change="currentChange"
            @size-change="sizeChange"
          />
          <div class="y-page-number">第{{cuurrentPage}}页/共{{total | formatTotal}}页</div>
          <div class="y-page-btn" @click="changePage(+1)">下一页</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "App",
  filters: {
    formatTotal(total) {
      return Math.ceil(total / 10);
    }
  },
  watch: {
    "sizeForm.deviceType"(val) {
      let obj = Object.assign({}, this.sizeForm);
      obj.pageNumber = this.cuurrentPage;
      obj.startTime = this.formatDate(new Date()) + " 00:00:00";
      obj.endTime = this.formatDate(new Date()) + " 23:59:59";
      this.$api.post("/warning/findWarningAlarm", obj).then(res => {
        if (res.rows) {
          this.waringCount = res.total;
        }
      });
    },
    startTime(val) {
      let d = new Date(val);
      this.endTimeOption.disabledDate = time => {
        return time.getTime() > Date.now() || time.getTime() < d.getTime();
      };
    },
    endTime(val) {
      let d = new Date(val);
      this.startTimeOption.disabledDate = time => {
        return time.getTime() > d.getTime();
      };
    }
  },
  data() {
    return {
      loadingShow: false,
      waringCount: 0,
      total: 0,
      startTime: null,
      endTime: null,
      sizeForm: {
        startTime: null,
        endTime: null,
        deviceType: null,
        type: null,
        did: "",
        pageNumber: 1
      },
      detailList: [
        {
          time: "2019-6-10  12:23:23",
          content:
            "王小虎 提交于王小虎 提交于王小虎 提交于王小虎 提交于 2018/4/12 20:46",
          status: 0
        },
        {
          time: "2019-6-11  13:23:23",
          content: "王小虎 提交于王小虎",
          status: 1
        }
      ],
      showSeeModal: false,
      show: false,
      show1: true,
      Devic: 0,
      states: 0,
      limit: 10,
      cuurrentPage: 1,
      page: 1,
      pagesizes: [8],
      flsa: false,
      value1: "",
      value2: "",
      tabelData: [],
      Devicegroup: [
        {
          name: "全部"
        },
        {
          name: "集中控制器"
        },
        {
          name: "LED屏"
        },
        {
          name: "LCD屏"
        }
      ],
      Bystate: [
        {
          name: "已处理"
        },
        {
          name: "未处理"
        }
      ],
      startTimeOption: {
        disabledDate(time) {
          return time.getTime() > Date.now();
        }
      },
      endTimeOption: {
        disabledDate(time) {
          return (
            time.getTime() > Date.now() ||
            time.getTime() < Date.now() - 86400000
          );
        }
      }
    };
  },
  created() {
    this.startTime = this.formatDate(new Date()) + " 00:00:00";
    this.endTime = this.formatDate(new Date()) + " 23:59:59";
    this.sizeForm.deviceType = "2";
    this.sizeForm.type = "201";
  },
  mounted() {
    this.$nextTick(function() {
      this.$refs.monitor.className = "";
      this.$refs.monitor.className = "monitor subMain is-visible";
      this.searchTable(true);
    });
  },
  methods: {
      jump(){
        this.$router.push({name:'event'})
      },
    formatType(name) {
      if (!name || name == "") {
        return "";
      } else if (name == "201") {
        return "离线告警";
      } else if (name == "202") {
        return "在线告警";
      }
      return name;
    },
    formatDate(date) {
      let d = new Date(date);
      let year = d.getFullYear();
      let month = ("0" + (d.getMonth() + 1)).slice(-2);
      let day = ("0" + d.getDate()).slice(-2);
      return `${year}-${month}-${day}`;
    },
    searchTable() {
      this.tabelData = [];
      this.loadingShow = true;
      this.sizeForm.pageNumber = this.cuurrentPage;
      this.sizeForm.startTime = this.formatDate(this.startTime) + " 00:00:00";
      this.sizeForm.endTime = this.formatDate(this.endTime) + " 23:59:59";
      this.$api.post("/warning/findWarningAlarm", this.sizeForm).then(res => {
        if (res.rows) {
          this.tabelData = res.rows.map(item => {
            item.typeStr = this.formatType(item.type);
            return item;
          });
          this.total = res.total;
        }

        this.loadingShow = false;
      });
    },
    searchTable_s() {
      this.cuurrentPage = 1;
      this.searchTable();
    },
    changePage(num) {
      if (
        (num == -1 && this.cuurrentPage > 1) ||
        (num == 1 && this.total / this.limit > this.cuurrentPage)
      ) {
        this.cuurrentPage += num;
        this.searchTable();
      }
    },
    colorFormat(status) {
      if (status === 0) return "#66cc66"; //绿
      if (status === 1) return "#ff0000"; //红
      if (status === 2) return "#ff9966"; //黄
      return "#909399"; //灰
    },
    handleSee(item) {
      this.showSeeModal = true;
    },
    //自定义
    customize() {
      this.show1 = !this.show1;
    },
    //选择时间
    heddeAlear() {
      console.log(111);
    },

    //设备组
    DevicegroupEvent(ind) {
      this.Devic = ind;
    },

    //按状态
    BystateEvnet(itn) {
      this.states = itn;
    },

    //已处理事件
    tdOneSpanClcikEvnet(item) {
      console.log(item);
      this.show = !this.show;
    },

    //提交事件
    btoSclick() {
      this.show = !this.show;
    },

    //分页1
    currentChange(val) {
      this.cuurrentPage = val;
      this.searchTable();
    },
    //分页2
    sizeChange(val) {
      this.limit = val;
    }
  },
  beforeRouteLeave(to, from, next) {
    this.$refs.monitor.className = "monitor subMain";
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
@mixin center {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
@mixin after-t($img) {
  content: "";
  position: absolute;
  top: -0.26rem;
  left: 0;
  width: 100%;
  height: 0.26rem;
  background-size: 100% 100%;
  background-image: url($img);
  background-repeat: no-repeat;
  z-index: -1;
}
@mixin after-b($img) {
  content: "";
  position: absolute;
  bottom: -0.26rem;
  left: 0;
  width: 100%;
  height: 0.26rem;
  background-size: 100% 100%;
  background-image: url($img);
  background-repeat: no-repeat;
  z-index: -1;
}
@mixin bgs($img) {
  background-image: url($img);
  background-size: 100% 100%;
  background-repeat: no-repeat;
}

.monitor {
  width: 100%;
  position: absolute;
  top: 1.1rem;
  padding: 0 0.1rem;
  z-index: 1;
  font-size: 0.18rem;
  box-sizing: border-box;
}

.commitBg{
    @include bgs("~@/assets/img/monitor/monitor_topbg.png");
    margin-top:.1rem;
}

.monitor-bar {
  margin: 0 0.5rem;
  height: .8rem;
  @include flex(row, center, center);
  border-bottom:1px solid #00fff9;
  .sbarBox-main {
    margin: 0 auto;
    width: 2.78rem;
    height: 0.48rem;
    @include bgs("../assets/img/alarm/bar.png");
    .sbarBox {
      line-height: 0.48rem;
      font-size: 0.16rem;
      position: relative;
      .sbar {
        display: inline-block;
        color: #00fff9;
        width: 49%;
        cursor: pointer;
        text-align: center;
        position: relative;
      }
      .active {
        position: absolute;
        transition: all 0.2s ease;
        width: 1.51rem;
        height: 0.44rem;
        top:.02rem;
        @include bgs("../assets/img/alarm/hover.png");
      }
      .right {
        transform: translateX(85%);
      }
      .now{color:#fff;position: relative;}
    }
  }
}
.monitor-t {
  position: relative;
  z-index: 99999999999999;
  height: 1rem;
  margin: 0.1rem 0;
  @include flex();
}
.monitor-b {
  @include flex(column);
  position: relative;
  height: calc(100vh - 3.3rem);
  .table-bg-t {
    height: 0.69rem;
    width: 100%;
    background: url(~@/assets/img/monitor/monitor_th_bg.png) 0 0 no-repeat;
    background-size: 100% 100%;
  }
  .table-bg-c {
    position: relative;
    flex: 1;
    width: 100%;
    background: url(~@/assets/img/monitor/bottom_1px.png) 0 0 repeat-y;
    background-size: 100% 100%;
  }
  .table-bg-b {
    position: relative;
    height: 0.29rem;
    width: 100%;
    background: url(~@/assets/img/monitor/monitor_bottom.png) 0 0 repeat-y;
    background-size: 100% 100%;
    .y-page {
      position: absolute;
      bottom: 0;
    }
  }
}
.content {
  position: relative;
  width: 100%;
  height: 100%;
  background-size: 100% 100% !important;
}
.monitor-t-left {
  width: calc(100% - 25% - 0.1rem);
  height: calc(100% - 0.52rem);
  .content {
    // background: url(~@/assets/img/monitor/1_mid.png) 0 0 repeat-y;
    // &::after {
    //   @include after-t("~@/assets/img/monitor/1_top.png");
    // }
    // &::before {
    //   @include after-b("~@/assets/img/monitor/1_btm.png");
    // }
  }
}
.monitor-t-right {
  width: 25%;
  height: calc(100% - 0.52rem);
  .content {
    position: relative;
    // background: url(~@/assets/img/monitor/2_midd.png) 0 0 repeat-y;
    // &::after {
    //   @include after-t("~@/assets/img/monitor/2_top.png");
    // }
    // &::before {
    //   @include after-b("~@/assets/img/monitor/2_btm.png");
    // }

    .monitor-title {
      position: absolute;
      left: 0.2rem;
      top: -0.1rem;

      width: 1.71rem;
      height: 0.28rem;
      line-height: 0.28rem;
      text-align: center;
      color: #fff;
      @include bgs("~@/assets/img/monitor/monitor_title.png");
    }
    .monitor-draw {
      position: absolute;
      left: 2.5rem;
      top: -.2rem;
      width: 1rem;
      height: 1rem;
      text-align: center;
      line-height: 1rem;
      font-size: 0.15rem;
      color: #fff;

      .monitor-draw-zhuan {
        position: absolute;
        width: 100%;
        height: 100%;
        left: 0;
        top: 0;
        @include bgs("~@/assets/img/monitor/pic.png");
      }
    }
  }
}

.alarm_section_table {
  position: absolute;
  top: -0.69rem;
  font-size: 0.16rem;
  width: 100%;
  color: #fff;
  padding: 0 0.4rem;
  // background: rgba(42, 106, 120, 0.7);
  // border-bottom: 1px solid #0ea9ac;

  thead {
    width: 100%;
    tr {
      height: 0.69rem;
      font-size: 0.16rem;
      // width: 100%;
      // background: url(~@/assets/img/monitor_th_bg.png) 0 0 no-repeat;
      // background-size: 100% 100%;
    }
  }
  tbody {
    width: 100%;
    height: 100%;
    tr {
      transition: all 0.3s linear;
      // &:nth-child(even):hover{
      //       background: rgba(204, 204, 204, 0.3)
      // }
      // &:nth-child(odd):hover{
      //       background: rgba(0, 0, 0, 0.3)
      // }
      &:nth-child(even) {
        background: #0e3753;
      }
      &:nth-child(odd) {
        // background: rgba(0, 0, 0, 0.3)
      }
      .urgent {
        position: relative;
        i {
          position: absolute;
          top: 50%;
          left: 30%;
          transform: translate(-50%, -30%);
          margin-right: 10px;
          display: block;
          width: 10px;
          height: 10px;
          background-color: #ff0000;
          border-radius: 50%;
        }
      }
      .carryout {
        position: relative;
        i {
          position: absolute;
          top: 50%;
          left: 30%;
          transform: translate(-50%, -30%);
          margin-right: 10px;
          display: block;
          width: 10px;
          height: 10px;
          background-color: #66cc66;
          border-radius: 50%;
        }
      }
      td {
        width: 20%;
        height: calc((100vh - 4.8rem) / 10);
        text-align: center;
        font-size: 0.16rem;
        vertical-align: middle;
        border-bottom: 1px solid #56abce;
        span {
          cursor: pointer;
          display: inline-block;
          width: 50px;
          font-size: 12px;
          height: 22px;
          background-color: #ff0000;
          /* padding: 5px 10px; */
          line-height: 22px;
        }
        .activeSpan {
          background-color: #66cc66;
        }
      }
    }
  }
}

.y-form-btn {
  flex:none;
}
.y-form {
  position: relative;
  height: 100%;
}
.numbersb {
  width: 1.7rem;
  font-size: 0.16rem;
  padding-left: 0.05rem;
  height: 0.34rem;
  color: #fff;
  background: url(~@/assets/img/monitor/btn_large.png) 0 0 no-repeat;
  background-size: 100% 100%;
}
.noData {
  text-align: center;
  line-height: 0.47rem;
  position: absolute;
  width: 100%;
}
.noData .el-loading-spinner {
  margin: 0;
}
.noData .el-loading-spinner i,
.noData .el-loading-spinner .el-loading-text {
  color: #00ffea;
}
</style>


