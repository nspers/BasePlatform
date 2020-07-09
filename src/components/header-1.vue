<template>
  <div class="header clearfix">
    <div class="header-l fl">
      <h2>物联网数据可视化平台</h2>
      <div class="logo-dess">DATA VISUALIZATION PLATFORM</div>
    </div>
    <div class="header-r fr">
      <p style="color:#fff">
        <span>{{tiemrObj.date}}</span>
        <span>{{tiemrObj.tiems}}</span>
      </p>
      <p>
        <span class="icons">&#xe638;</span>
        <span class="indexhover" @click="goIndex">返回首页</span>
      </p>
    </div>
    <div class="header-c-wrap fr">
      <ul class="header-c" :style="{width:menuList.length/8*100+'%'}">
      <!-- :class="{'menu-right':index>2,'active':activeIndex==index,'menu-havechild':item.childs}" -->
        <li
          class="menu-first"
          :class="{'active':activeIndex==index,'menu-havechild':item.childs}" 
          v-for="(item,index) of menuList"
          :key="index"
          :style="{left:100/menuList.length*index+'%'}"
          @click="menuClick(item.path,item.childs,index)"
        >
          <div class="icon-group">
            <div class="icons" v-html="item.icon">{{item.icon}}</div>
            <div class="icons-text">{{item.name}}</div>
          </div>
          <ul class="menu-second">
            <li
              @click="pushUrl(urls.path,index)"
              v-for="(urls,indexs) of item.childs"
              :key="urls.indexs"
              :class="{'active':urls.path==currentPath}"
            >{{urls.name}}</li>
          </ul>
        </li>
      </ul>
    </div>
        <transition name="menuhover">
      <div v-if="showBool" class="menu-second-hover" ></div>
    </transition>
  </div>
</template>
<script>
export default {
  name: "App",
  data() {
    return {
      showBool: false,
      currentPath: null,
      activeIndex: null,
      timer: null,
      tiemrObj: {
        tiems: ""
      },
      menuList: [
        {
          name: "智慧照明",
          icon: "&#xe610;",
          childs: [{ path: "/lightpole", name: "智慧灯杆" }]
        },
        {
          name: "环境市政",
          icon: "&#xe72b;",
          childs: [{ path: "/environment", name: "环境监测" }]
        },
        {
          name: "基础设施",
          icon: "&#xe686;",
          childs: [
            { path: "/led", name: "LED" },
            // { path: "/led", name: "集中控制器" }
          ]
        },
        // { name: "公共安全", icon:"&#xe60c;", },
        // { name: "智慧交通", icon:"&#xe607;", },
        {
          name: "告警统计",
          icon: "&#xe655;",
          childs: [
              { path: "/monitor", name: "监测预警" },
            { path: "/event", name: "事件管理" },
          ]
        },
        {
          name: "统计分析",
          icon: "&#xe65b;",
          childs: [{ path: "/analysis", name: "统计分析" }]
        }
        // { name: "运维管理", icon:"&#xe611;", }
      ]
    };
  },
  created() {
    this.setTimers();
  },
  mounted() {
    this.$nextTick(function() {
      this.timer = setInterval(this.setTimers, 1000);
    });
  },
  methods: {
    goIndex() {
      this.$router.push("/");
    },
    menuClick(path, list, index) {
      if (!list) {
        this.activeIndex = index;
        this.$router.push(path);
      }
    },
    pushUrl(path, index) {
      this.currentPath = path;
      this.activeIndex = index;
      this.$router.push(path);
    },
    muns(tiem) {
      return tiem < 10 ? "0" + tiem : tiem;
    },
    setTimers() {
      let oDate = new Date();
      let Year = oDate.getFullYear(); //获取年
      let Monthr = oDate.getMonth() + 1; //获取月
      let tian = oDate.getDate(); //获取天
      // let day = oDate.getDay(); //获取周
      let arrs = ["日", "一", "二", "三", "四", "五", "六"];

      this.tiemrObj.date = Year + "-" + Monthr + "-" + this.muns(tian);
      // this.tiemrObj.day = "星期" + arrs[day];

      let tiems = null;
      let hours = oDate.getHours();
      let minute = oDate.getMinutes();
      let seconds = oDate.getSeconds();

      hours = hours < 10 ? "0" + hours : hours;
      minute = minute < 10 ? "0" + minute : minute;
      seconds = seconds < 10 ? "0" + seconds : seconds;
      tiems = hours + ":" + minute + ":" + seconds;

      this.tiemrObj.tiems = tiems;
    }
  }
};
</script>

<style lang="scss" scoped>
$bg: #236a8a;
@mixin fd($type: row) {
  display: flex;
  align-items: center;
  justify-content: space-around;
  flex-direction: $type;
}
@mixin center {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
.header {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 1rem;
  background: url(../assets/img/header.png) 0 0 no-repeat;
  background-size: 100% 100%;
  z-index: 999999;
  color: #6cd5fd;
}
.header-l {
  width: 20%;
  padding-top: 0.2rem;
  text-align: center;
  h2 {
    font-size: 0.3rem;
  }
  .logo-dess {
    font-size: 0.14rem;
  }
}
.header-c-wrap {
  position: relative;
  width: 65%;
  height: 75%;
  top: 20%;
}
.header-c {
  margin: 0 auto;
  position: relative;
  height: 100%;
  // overflow: hidden;

  .menu-first {
    position: absolute;
    width: 0.6rem;
    height: 0.7rem;
    bottom: .01rem;
    cursor: pointer;
    // overflow: hidden;
    animation-delay: 0.4s;
    transition: all .6s cubic-bezier(1, 0, 1, 0.64);
    &:before {
      content: "";
      width: .6rem;
      height: .6rem;
      background: url(~@/assets/img/menu_activ.png) center/cover no-repeat;
      position: absolute;
      left: 0;
      bottom: 0;
      transition: all .6s cubic-bezier(0.18, 0.89, 0.05, 0.95);
      opacity: 0;
    }
  }
  .menu-havechild:hover {
    // width: 100%;
    // z-index: 9999;
    // overflow: visible;
    // background: linear-gradient(
    //   to right,
    //   rgba(0, 58, 93, 1),
    //   rgba(0, 64, 87, 1)
    // );
    .icon-group {
      .icons{
        text-shadow: 0 0 0.05rem #37d2fb;
        color:#fff;
        top:0.01rem;
        transform: scale(1.1)
      }
      .icons-text{
          bottom:-.3rem;
          opacity: 0;
      }
    }
    &::after {
      width: 100%;
    }
    &:before {
      content: "";
      opacity: 1;
      bottom:.11rem
    }
  }
  .menu-first.active {
    color: #fff;
    height: .7rem;
    bottom:.01rem;
    .icon-group {
      background: url(~@/assets/img/menu_activ.png) center/contain no-repeat;
      .icons{
        text-shadow: 0 0 0.05rem #37d2fb;
        color:#fff;
        top:0.01rem;
        transform: scale(1.1)
      }
      &::after{
        opacity: 1;
        bottom:-.03rem;
      }
    }
    .icons-text {
      display: none;
    }
  }
  .menu-first.active:hover{
      &::before{
        opacity: 0;
      }
      &::after{
          bottom: .1rem;
      }
  }
  .menu-first {
    .icon-group {
      float: left;
    }
    &:hover {

      .menu-second {
        opacity: 1;
        top: 0.7rem;
        height: 0.8rem;
      }
    }
  }


  .menu-second {
    z-index: -1;
    background: #004155;
    opacity: 0;
    position: absolute;
    width: 15.17rem;
    left: 0;
    top: 0;
    height: 0;
    line-height: 0.8rem;
    transition: all 0.3s ease-in;
    &:after {
      content: " ";
      display: block;
      clear: both;
    }
    
    li {
      position: relative;
      margin: 0 0.2rem;
      color: #fff;
      float: left;
      transition: all .6s linear;
      &::before{
        content:"";
        display: none;
        position: absolute;
        left: -0.13rem;
        top: 0.37rem;
        width: 0.06rem;
        height: 0.06rem;
        border-radius: 50%;
        background-color: #068f88;
      }
      &:hover{
        &::before{
          display: block;
        }
      }
    }
    li.active{
      &::before{
        display: block;
      }
    }
  }
  .icon-group {
    @include fd(column);
    width: 0.6rem;
    height: 0.6rem;
    position: relative;
    background: none;
    transition: background-image .3s linear;
      &::after{
        content:"";
        opacity: 0;
        width: 0.7rem;
        height: 0.04rem;
        background: url(~@/assets/img/sun.png) 0 0 no-repeat;
        background-size: 100% 100%;
        position: absolute;
        bottom: 0.05rem;
      }
  }
  .icons {
    font-size: 0.4rem;
    height: 0.5rem;
    text-shadow: 0.05rem 0 0.03rem #000;
    transition: all .3s linear;
    position:absolute;
    top:-0.09rem
  }
  .icons-text{
      position: absolute;
      bottom: 0;
      opacity: 1;
      transition: all .3s linear
  }
}
.header-r {
  @include fd(column);
  width: 13%;
  margin-top: 0.3rem;
}
.indexhover {
  cursor: pointer;
}
.bg-guang {
  opacity: 0;
  width: 0.7rem;
  height: 0.04rem;
  background: url(~@/assets/img/sun.png) 0 0 no-repeat;
  background-size: 100% 100%;
  position: absolute;
  bottom: 0;
}
.sanjiao_down {
  display: inline-block;
  width: 0;
  height: 0;
  overflow: hidden;
  font-size: 0;
  line-height: 0;
  border-width: 10px;
  border-style: solid dashed dashed dashed;
  border-color: #ccc transparent transparent transparent;
}

</style>
