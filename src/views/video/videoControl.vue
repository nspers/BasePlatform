<template>
  <div class="control">
    <div class="o_box">
      <div class="box-title">
        <span class="icons color-huang">&#xe62a;</span>
        <span>设备状态</span>
      </div>
    </div>
    <div class="bg"></div>
    <div class="wrapbox" ref="live">
      <div class="video clearfix">
        <div class="videoLeft">
          <Search></Search>
          <div class="videoNav">
            <el-menu
              default-active="2"
              class="el-menu-vertical-demo"
              :unique-opened="true"
              @open="handleOpen"
              @close="handleClose"
            >
              <el-submenu index="1">
                <template slot="title">
                  <i class="el-icon-location"></i>
                  <span>导航一</span>
                </template>
                <el-menu-item index="1-4-1" @click="showSg">
                  <i class="el-icon-video-camera"></i>选项1
                </el-menu-item>
                <el-menu-item index="1-4-1" @click="showSg">
                  <i class="el-icon-video-camera"></i>选项1
                </el-menu-item>
                <el-menu-item index="1-4-1" @click="showSg">
                  <i class="el-icon-video-camera"></i>选项1
                </el-menu-item>
              </el-submenu>
              <el-submenu index="2">
                <template slot="title">
                  <i class="el-icon-location"></i>
                  <span>导航一</span>
                </template>
                <el-menu-item index="1-4-1" @click="showSg">
                  <i class="el-icon-video-camera"></i>选项1
                </el-menu-item>
                <el-menu-item index="1-4-1" @click="showSg">
                  <i class="el-icon-video-camera"></i>选项1
                </el-menu-item>
                <el-menu-item index="1-4-1" @click="showSg">
                  <i class="el-icon-video-camera"></i>选项1
                </el-menu-item>
              </el-submenu>
            </el-menu>
          </div>
        </div>
        <div class="videoRight">
          <div id="playWnd" class="playWnd" ref="playWnd"></div>
        </div>
      </div>
    </div>

    <div class="wrapbox" ref="rc">2</div>
  </div>
</template>

<script>
import Search from "../../components/search";
import * as video from "../../config/hik";
export default {
  name: "videocontrol",
  components: {
    Search
  },
  props: {
    musicData: Array
  },
  data() {
    return {
      wuyong: 0
    };
  },
  computed: {
    bcSwitch() {
      return this.$store.state.bcSwitch;
    }
  },
  mounted() {
    var self = this;
    this.$nextTick(function() {});

    video.init({
      playMode: 1,
      callback: function() {
        video.playback({});
        
        window.re = function() {
          video.uninit(function() {
            video.init({
              callback: function() {
                video.preview({});
              }
            });
          });
        };
      }
    });
  },
  methods: {
    entry(controlModule) {
      this.$refs[controlModule].className = "";
      this.$refs[controlModule].className = "wrapbox is-visible";
    },
    leave(controlModule) {
      this.$refs[controlModule].className = "wrapbox";
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

    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
    showSg() {
      alert(1);
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

<style lang="scss" scoped>
.videoRight {
  box-sizing: border-box;
  padding: 30px 3px 6px 0px;
  .playWnd {
    border: 0px solid #ff0;
    width: 100%;
    height: 100%;
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