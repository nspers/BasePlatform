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
            设备名称：
            <span>Y44</span>
          </p>
          <p>
            设备编码：
            <span>45623454674</span>
          </p>
          <p>
            运行状态：
            <span>在线</span>
          </p>
        </div>
      </div>
      <div class="monitoringContainer">
        <div class="box-title">
          <span class="icons color-huang">&#xe657;</span>
          <span>监视画面</span>
        </div>
        <div class="imgContainer">
          <p class="title">分机画面</p>
          <div class="imgBox">
            <img src alt />
          </div>
        </div>
        <div class="imgContainer">
          <p class="title">联通网络摄像头</p>
          <div class="imgBox">
            <img src alt />
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
      .title {
        line-height: 0.36rem;
        height: 0.36rem;
      }
      .imgBox {
        width: 100%;
        height: 2rem;
        img {
          display: block;
          width: 100%;
          height: 100%;
          background: gold;
        }
      }
    }
  }
}
</style>