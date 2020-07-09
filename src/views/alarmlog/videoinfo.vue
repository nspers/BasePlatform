
<template>
  <div ref="contentleft">
    <div class="content-left trans-up trans-up-delay-3">
      <div class="y-headerseat"></div>
      <div class="left">
        <div class="y-box left-top">
          <div class="y-box-title">
            <span class="icons color-huang">&#xe656;</span> 报警记录
          </div>
          <div class="date-select">
            <el-date-picker class="y-date" v-model="dates" type="date" placeholder="选择日期"></el-date-picker>
          </div>
          <div class="alog_box">
            <div class="alert_scroll clearfix">
              <ul class="scroll_ul" ref="sUl1" style="left:0">
                <li class="scroll_li clearfix" v-for="(item,index) in alertLog" :key="index">
                  <div class="s-left">
                    <span>{{item.aName}}</span>
                    <br />
                    <span>{{item.aTime}}</span>
                  </div>
                  <div class="s-right">
                    <span>{{item.aType}}</span>
                    <span @click="$router.push('/videoinfo')">{{item.aStatus}}</span>
                  </div>
                </li>
              </ul>
              <video src="https://www.w3school.com.cn/i/movie.mp4" controls></video>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "App",
  data() {
    return {
      dates: null,
      leftX: 0,
      alertLog: [
        {
          aName: "Y52号灯杆照明设备离线",
          aTime: "2019-12-12  12:12:12",
          aType: "咨询",
          aStatus: "查看视频"
        }
      ]
    };
  },
  created() {},
  mounted() {
    this.$nextTick(function() {
      setTimeout(() => {
        this.$refs.contentleft.className = "";
        this.$refs.contentleft.className = "is-visible";
      }, 400);
    });
  },
  methods: {
  },
  beforeRouteLeave(to, from, next) {
    this.$refs.contentleft.className = "";
    setTimeout(() => {
      next();
    }, 700);
  }
};
</script>
<style lang="scss" scoped>
.left {
  height: 87vh;
}

.left-top {
  height: 100%;
  display: flex;
  flex-flow: column;
}
.alog_box {
  overflow: hidden;
  margin-left: 0.1rem;
  width: 4rem;
  font-size: 0;
  flex: 1;
}

.alert_scroll {
  position: relative;
  overflow: hidden;
  margin-top: 0.1rem;
  width: 100%;
  height: 100%;
  transition: all 0.3s ease-in-out;
  .scroll_ul {
    width: 4rem;
    overflow-y: auto;
    .scroll_li {
      width: 100%;
      height: 0.6rem;
      > .s-left {
        float: left;
        padding-left: 0.02rem;
        width: 60%;
        display: inline-block;
      }
      > .s-right {
        float: right;
        width: 40%;
        display: inline-block;
        span {
          padding: 0.03rem 0.08rem;
          margin-right: 0.1rem;
          background-color: red;
          &:nth-child(2) {
            cursor: pointer;
          }
        }
      }
    }

    li span {
      overflow: hidden;
      font-size: 0.14rem;
      text-align: center;
    }

    li .a_type {
      display: inline-block;
      padding: 0.01rem 0.1rem;
      letter-spacing: 1px;
      border-radius: 0.11rem;
      background-color: red;
      color: #fff;
      font-size: 0.14rem;
      line-height: 0.22rem;
    }
  }
}
</style>

