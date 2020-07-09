<template>
  <div class="voiceRadio">
    <div class="content-left">
      <div>
        <div class="box-title">
          <span class="icons color-huang">&#xe657;</span>
          <span>语音广播</span>
        </div>
      </div>
      <div class="controlBtn">
        <div class="equipmentBtn clearfix">
          <el-button type="success" size="mini" class="open" @click="stateControl('open')">在线</el-button>
          <el-button type="success" size="mini" class="down" @click="stateControl('down')">空闲</el-button>
        </div>
      </div>
      <div class="controlBtn">
        <div class="equipmentBtn clearfix">
          <el-button type="success" size="mini" class="open" @click="stateControl('open')">开启</el-button>
          <el-button type="success" size="mini" class="down" @click="stateControl('down')">关闭</el-button>
        </div>
      </div>
      <div class="voiceRadioFrom">
        <ul class="fromBox">
          <!-- <li class="fromItem fromItem-title">
            <div class="checkedBox" @click="handleChecked(ele.id,index)">
              <span class="check" v-if="!checkedArray[index].checked"></span>
              <span
                class="icons color-lan-62d"
                style="margin-left: -0.1rem;"
                v-if="checkedArray[index].checked"
              >&#xe7b3;</span>
            </div>
            <span class="code">设备编号</span>
            <span class="status">状态</span>
            <span class="run">运行</span>
          </li>
          <li class="fromItem">
            <div class="checkedBox" @click="handleChecked(ele.id,index)">
              <span class="check" v-if="!checkedArray[index].checked"></span>
              <span
                class="icons color-lan-62d"
                style="margin-left: -0.1rem;"
                v-if="checkedArray[index].checked"
              >&#xe7b3;</span>
            </div>
            <span></span>
          </li> -->
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      voiceRadio: {
        allChecked: false
      },
      checkedArray: []
    };
  },
  mounted() {
    this.$nextTick(() => {});
  },
  methods: {
    stateControl() {},
    handleChecked() {}
  }
};
</script>

<style lang="scss" scoped>
.el-button + .el-button {
  margin-left: 0rem;
}
.el-button--mini {
  // width: 70rem;
  // height: 36rem;
  padding: 0.1rem 0.2rem;
  font-size: 0.16rem;
  border: 0.01px solid;
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

.content-left {
  padding-top: 1.2rem;
  .controlBtn {
    margin-top: 0.2rem;
    padding: 0 0.3rem;
    line-height: 0.5rem;
    height: 0.5rem;
    .equipmentBtn {
      float: right;
      .open {
        background: #62d3fd;
        margin-right: 0.1rem;
      }
      .down {
        background: #74bbb9;
      }
    }
  }
  .Gateway-from {
    margin-top: 0.2rem;
    padding: 0 0.3rem;
    .frombox {
      background: url("../../assets/img/control/fromBg.png") no-repeat
        center/cover;
      background-size: 4.23rem 6rem;
      width: 4.23rem;
      height: 6rem;
      margin: 0 auto;
      padding-top: 0.12rem;
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
        height: 5.25rem;
        padding: 0 0.03rem;
        .bgEven {
          background: rgba(0, 0, 0, 0.2);
        }
        .fromItem {
          display: flex;
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
</style>