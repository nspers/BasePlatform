<template>
  <div ref="overview">
    <div class="r-btn-box">
      <div class="r-btn-item">
        <div class="r-btn-control"></div>
        <div>点选灯杆</div>
      </div>
    </div>
    <div class="content-left trans-up trans-up-delay-3"></div>
    <div class="overview">
      <div class="wrapbox">
        <!-- 基本信息 -->
        <div class="o_box trans-up trans-up-delay-5">
          <div class="box-title">
            <span class="icons color-huang">&#xe675;</span>
            <span>基本信息</span>
          </div>
          <p>
            设备名称：
            <span>Y77</span>
          </p>
          <p>
            设备编码：
            <span>1号灯</span>
            <span>27874827825</span>
          </p>
          <p v-for="(item,index) in Datalist" :key="index">
            <span class="o_display">设备编码：</span>
            <span>{{item.value}}</span>
            <span>27874827825</span>
          </p>
        </div>
        <!-- 设备状态 -->
        <div class="o_box trans-up trans-up-delay-7">
          <div class="box-title">
            <span class="icons color-huang">&#xe62a;</span>
            <span>实施操作</span>
          </div>
          <div class="Electro2-Control">
            <div class="Electro-content">
          
              <div class="loopChooseBox">
                <span class="fontsize">开关</span>
                <div class="electroBtn">
                  <el-button
                    type="success"
                    size="mini"
                    class="open fontz"
                    @click="handleElectroControl('open')"
                  >开灯</el-button>
                  <el-button
                    type="warning"
                    size="mini"
                    class="rest fontz"
                    @click="handleElectroControl('rest')"
                  >关灯</el-button>
                </div>
              </div>
              <div class="control-content_item">
                <span class="item-type fontsize">调光</span>
                <div class="item-slider">
                  <el-slider v-model="Concentrated"></el-slider>
                </div>
              </div>
            </div>
            <div class="Lighting">
              <div class="Lighting-from">
     
                <ul class="frombox" v-if="checkedArray.length">
                  <li class="fromItem-title">
                    <div class="checkedBox" >
               
                      <span
                     
                      >1</span>
                    </div>
                    <div class="locationName">编号</div>
                    <span class="locationName">开关</span>
                    <span class="locationName">状态</span>

                  </li>
                  <div class="fromItemBox sbar">
                    <li class="fromItem" v-for="(item,index) in Datalist" :key="index">
                      <div
                        class="checkedBox"
                      >
                        <span class="check">1</span>
                   
                      </div>
                      <div class="locationName">{{item.value}}</div>
                      <span class="status">
                        <span
                          class="icons"
                          :class="item.lamphouseline == 0 ? 'color-hong' : 'color-lv'"
                        >&#xe6bc;</span>
                      </span>
                      <span class="status">
                        <span
                          class="icons"
                          :class="item.lamphouseline == 0 ? 'color-hong' : 'color-lv'"
                        >&#xe6bc;</span>
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
export default {
  name: "singleDevice",
  data() {
    return {
      allChecked: false,
      Concentrated: 70,
      Datalist: [
        {
          value: "1号灯",
          label: "27874827825",
          platfondline: 0,
          lamphouseline: 0
        },
        {
          value: "1号灯",
          label: "27874827825",
          platfondline: 0,
          lamphouseline: 0
        },
        {
          value: "1号灯",
          label: "27874827825",
          platfondline: 0,
          lamphouseline: 0
        },

        {
          value: "1号灯",
          label: "27874827825",
          platfondline: 0,
          lamphouseline: 0
        }
      ],
      checkedArray: [
        {
          checked: false
        },

        {
          checked: false
        },
        {
          checked: false
        },
        {
          checked: false
        }
      ]
    };
  },
  created() {},

  mounted() {
    this.$nextTick(function() {
      setTimeout(() => {
        this.entry();
      }, 100);
    });
  },
  methods: {
    entry() {
      if (this.$refs.overview) {
        this.$refs.overview.className = "is-visible";
      }
    },
    leave() {
      if (this.$refs.overview) {
        this.$refs.overview.className = "";
      }
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
.overview {
  position: absolute;
  top: 9%;
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
        margin: 0.05rem 0 0 0.3rem;
        color: #fff;
        line-height: 0.22rem;
        font-size: 0.18rem;
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
        font-size: 0.18rem;
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
      background: url("../../assets/img/control/ju.png") no-repeat center/cover;
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
</style>