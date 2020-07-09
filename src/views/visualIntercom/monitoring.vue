<template>
  <div class="monitoring">
    <div class="content-left">
      <div class="basicContainer">
        <div class="box-title">
          <span class="icons color-huang">&#xe657;</span>
          <span>基本信息</span>
        </div>
        <div class="infoContainer">
          <p>
            主机编号：
            <span>Y4Y4</span>
          </p>
          <p>
            设备名称：
            <span>Y44</span>
          </p>
          <p>
            设备编码：
            <span>45623454674</span>
          </p>
          <p>
            运行状态：
            <span class="state" style="display:inline-block;">
              <!-- <img
                style="width:0.2rem;height:0.2rem;vertical-align: middle;"
                src="../../assets/img/icon/wifi_green.png"
              /> -->
              <img
                style="width:0.2rem;height:0.2rem;vertical-align: middle;"
                src="../../assets/img/icon/error_yellow.png"
              />
            </span>
          </p>
          <p>
            设备编码：
            <span>
              <i class="icons color-hong">&#xe677;</i>
            </span>
          </p>
        </div>
      </div>
      <div class="monitoringContainer">
        <div class="box-title">
          <span class="icons color-huang">&#xe657;</span>
          <span>监视画面</span>
        </div>
        <div class="imgContainer">
          <div class="imgBox">
            <div class="title">当前设备被占用是否继续执行监视操作</div>
            <div class="btnBox">
              <span>是</span>
              <span>否</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  mounted() {
    this.$nextTick(() => {});
  },
  methods: {
    stateControl() {}
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
  .infoContainer {
    margin: 0.1rem 0;
    padding: 0 0.3rem;
    p {
      font-size: 0.16rem;
      line-height: 0.36rem;
      height: 0.36rem;
    }
  }
  .monitoringContainer {
    .imgContainer {
      margin-top: 0.2rem;
      padding: 0 0.3rem;
      .imgBox {
        width: 100%;
        height: 1.6rem;
        background: url("../../assets/img/control/prompt.png") no-repeat
          center/cover;
        overflow: hidden;
        .title {
          width: 1.5rem;
          margin: 0.3rem auto 0rem;
          color: red;
        }
        .btnBox {
          width: 100%;
          margin: 0.1rem auto 0;
          text-align: center;
          span {
            display: inline-block;
            width: 0.5rem;
            height: 0.25rem;
            border: 0.01rem solid rgba(255, 255, 255, 1);
            border-radius: 0.03rem;
            cursor: pointer;
            &:hover {
              border: 0.01rem solid rgba(160, 191, 213, 1);
              box-shadow: inset 0 0 0.08rem 0.04rem #04705e;
              color: #06ff00;
            }
          }
        }
      }
    }
  }
}
</style>