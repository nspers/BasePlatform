<template>
  <div class="wrapbox" ref="Police">
    <div class="Police-Control content-left trans-up trans-up-delay-3">
      <div class="people">
        <div class="inputtext">
          <input type="text" placeholder="请输入设备编号" value />
          <i class="icons" style="position:absolute;top:0;right:0.1rem">&#xe620;</i>
        </div>
      </div>
      <div class="status">
        <div class="box-title">
          <i class="icons color-huang">&#xe6a5;</i>
          <i style="font-size: 0.18rem;">设备信息</i>
        </div>
        <div class="numbers">
          <p>
            <span>主机编号 :</span>
            <span class="letter">001</span>
          </p>
          <p>
            <span>设备编号 :</span>
            <span class="letter">Y44</span>
          </p>

          <p>
            <span>设备编码 :</span>
            <span class="letter">2132344</span>
          </p>

          <p>
            <span>运行状态 :</span>
            <span class="letter">在线</span>
          </p>
          <span class="iphonep">
            <i class="icons color-hong">&#xe621;</i>
          </span>
        </div>
      </div>
      <div class="control">
        <div class="box-title">
          <i class="icons color-huang">&#xe72c;</i>
          <i style="font-size: 0.18rem;">监视画面</i>
        </div>
        <div class="border">
          <div class="num">
            <div class="hua">分机画面</div>
            <video src="https://www.w3school.com.cn/i/movie.mp4" controls></video>
          </div>
          <div class="num">
            <div class="hua1">联通摄像头</div>
            <video src="https://www.w3school.com.cn/i/movie.mp4" controls></video>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "callPolice",
  data() {
    return {};
  },
  methods: {
    entry() {
      this.$refs.Police.className = "";
      this.$refs.Police.className = "wrapbox is-visible";
    },
    leave() {
      this.$refs.Police.className = "wrapbox";
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

.wrapbox {
  position: absolute;
  top: 0;
  left: 0;
}
.Police-Control {
  padding-top: 1.2rem;
  .people {
    width: 4.5rem;
    height: 0.4rem;
    .inputtext {
      position: relative;
      width: 4.21rem;
      height: 0.4rem;
      margin: 0 auto;
      border: 0.01rem solid rgba(255, 255, 255, 1);
      opacity: 0.8;
      border-radius: 0.04rem;
      input {
        color: #fff;
        width: 92%;
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
      }
    }
  }
  .status {
    width: 4.5rem;
    margin-top: 4%;
    .box-title {
      i {
        font-size: 0.2rem;
      }
    }
    .numbers {
      width: 4.21rem;
      margin: 0 auto;
      p {
        margin-top: 0.1rem;
        width: 100%;
        height: 0.28rem;
        font-size: 0.16rem;
        font-family: Source Han Sans CN;
        font-weight: 400;
        color: rgba(255, 255, 255, 1);
        line-height: 0.28rem;
        text-shadow: 0rem 0.01rem 0.02rem rgba(0, 21, 20, 0.2);
        .letter {
          padding-left: 0.1rem;
          letter-spacing: 0.02rem;
        }
      }
      .iphonep {
        position: relative;
        float: right;
        top: -1rem;
        width: 0.62rem;
        height: 0.62rem;
        background: rgba(255, 255, 255, 0.3);
        border-radius: 50%;
        i {
          position: relative;
          margin-left: 21%;
          top: 18%;
        }
      }
    }

    // {

    // }
  }
  .control {
    width: 4.5rem;
    margin-top: 4%;
    .box-title {
      i {
        font-size: 0.2rem;
      }
    }
    .border {
      width: 4.21rem;
      margin: 0 auto;
      margin-top: 0.1rem;
      .num {
        .hua {
          width: 1.1rem;
          height: 0.3rem;
          font-size: 0.16rem;
          background: url(~@/assets/img/hua.png) no-repeat;
          background-size: 100% 100%;
          text-align: center;
          line-height: 0.3rem;
        }
        .hua1 {
          width: 1.1rem;
          height: 0.3rem;
          font-size: 0.16rem;
          background: url(~@/assets/img/hua1.png) no-repeat;
          background-size: 100% 100%;
          text-align: center;
          line-height: 0.3rem;
        }
        video {
          width: 100%;
          // background: red;
          height: 2.3rem;
          margin-top: 0.2rem;
          margin-bottom: 0.2rem;
        }
      }
    }
  }
}
</style>