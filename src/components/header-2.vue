<template>
  <div class="header clearfix">
    <div class="header-l fl">
      <div class="header-logo"></div>
    </div>
    <ul class="header-c fl">
      <li
        v-for="(item,index) of menuList"
        :key="index"
        :class="{'active':activeIndex==index,'menu-havechild':item.childs}"
        @click="menuClick(item.path,item.childs,index)"
      >
        <div class="icon-group">
          <div :class="item.icon" class="tab_icon"></div>
          <div class="icons-text">{{item.name}}</div>
        </div>
        <ul class="menu-second" :style="{'padding-left':(pageW/menuList.length*index+10)+'px'}">
          <li
            @click="pushUrl(urls.path,index)"
            v-for="(urls,indexs) of item.childs"
            :key="urls.indexs"
            :class="{'active':urls.path==currentPath}"
          >{{urls.name}}</li>
        </ul>
      </li>
    </ul>
    <div class="header-r">
      <p>
        <span class="tab_icon_home"></span>
        <span class="indexhover" @click="goIndex">返回首页</span>
      </p>
      <p style="font-size:0.2rem">
        <span>{{tiemrObj.date}}</span>
        <span>{{tiemrObj.tiems}}</span>
      </p>
    </div>
    <!-- <transition name="menuhover">
      <div v-if="showBool" class="menu-second-hover" ></div>
    </transition> -->
  </div>
</template>
<script>
export default {
  name: "App",
  data() {
    return {
      pageW:1920,
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
          icon: "tab_icon_zhaoming",
          childs: [{ path: "/lightpole", name: "智慧灯杆" }]
        },
        {
          name: "环境市政",
          icon: "tab_icon_huanjing",
          childs: [{ path: "/environment", name: "环境监测" }]
        },
        {
          name: "基础设施",
          icon: "tab_icon_jichu",
          childs: [
            { path: "/led", name: "LED" }
            // { path: "/led", name: "集中控制器" }
          ]
        },
        // { name: "公共安全", icon:"&#xe60c;", },
        // { name: "智慧交通", icon:"&#xe607;", },
        {
          name: "监测预警",
          icon: "tab_icon_jiance",
          childs: [
            { path: "/monitor", name: "监测预警" },
            { path: "/event", name: "事件管理" }
          ]
        },
        {
          name: "数据分析",
          icon: "tab_icon_fenxi",
          childs: [{ path: "/analysis", name: "统计分析" }]
        }
        // { name: "运维管理", icon:"&#xe611;", }
      ]
    };
  },
  created() {
    this.setTimers();
    this.pageW = window.innerWidth*0.55;
  },
  mounted() {
    this.$nextTick(function() {
      this.timer = setInterval(this.setTimers, 1000);

    });
    window.addEventListener("resize",()=>{
      this.pageW = window.innerWidth*0.55;
    })

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
    mouseenter(index, list) {
          this.showBool = true;
    },
    mouseleave(index) {
        this.showBool = false;

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
@mixin flex($direction: row, $alingn: center, $justify: center) {
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
@mixin bgs($img) {
  background-image: url($img);
  background-size: contain;
  background-repeat: no-repeat;
}
.header {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 1rem;
  background: #061729;
  background-size: 100% 100%;
  z-index: 999999;
  color: #068f88;
  font-size: 0.16rem;
}
.header-l {
  position: relative;
  width: 21%;
  height: 100%;
  .header-logo {
    width: 3.2rem;
    height: 0.63rem;
    @include bgs("~@/assets/img/header/logo.png");
    @include center();
  }
}
.header-c {
  width: 55%;
  height: 0.8rem;
  position: relative;
  top: 0.2rem;
  z-index: 1;
  @include flex();
  > li {
    flex: 1;
    height: 100%;
    cursor: pointer;
    transition: all .6s ease-in-out;
    &:hover {
      background-color: #0f2841;
      .menu-second {
        opacity: 1;
        background-color: #0f2841;
        top: 0.8rem;
        height: 0.8rem;
        overflow: none;
      }
    }
  }
  >li.active{
    background-color: #0f2841;
  }
  .icon-group {
    height: 100%;
    @include flex();
    color: #fff;
    .icons-text {
      margin-left: 0.14rem;
    }
  }

  .menu-second {
    z-index: -1;
    opacity: 0;
    overflow: hidden;
    position: absolute;
    width: 15.17rem;
    left: 0;
    top: 0.4rem;
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
}
.header-r {
  width: 24%;
  height: 100%;
  position: absolute;
  top: 0;
  right: 0;
  padding-top: 0.2rem;
  padding-right: 0.5rem;
  @include flex(column);
  justify-content: space-around;
  align-items: flex-end;
  
  font-size: 0.16rem;
  z-index: 999999999;
  .indexhover {
    cursor: pointer;
    color: #fff;
    transition: all 0.3s ease-in;
    &:hover{
          color: #068f88;
    }
  }
}
// tab icon
.tab_icon {
  width: 0.5rem;
  height: 0.5rem;
}
.tab_icon_zhaoming {
  @include bgs("~@/assets/img/header/tab_icon_zhaoming.png");
}
.tab_icon_huanjing {
  @include bgs("~@/assets/img/header/tab_icon_huanjing.png");
}
.tab_icon_jichu {
  @include bgs("~@/assets/img/header/tab_icon_jichu.png");
}
.tab_icon_fenxi {
  @include bgs("~@/assets/img/header/tab_icon_fenxi.png");
}
.tab_icon_jiance {
  @include bgs("~@/assets/img/header/tab_icon_jiance.png");
}
.tab_icon_home {
  display: inline-block;
  width: 0.3rem;
  height: 0.26rem;
  @include bgs("~@/assets/img/header/tab_icon_home.png");
}

.menu-second-hover {
  position: absolute;
  top: 1rem;
  right: 0;
  left: 21%;
  height: 0.8rem;
  background: rgba(15, 40, 65, 0.9);
  z-index: -1;
}

.menuhover-enter-active {
  animation: menuhover-in 0.4s;
}
.menuhover-leave-active {
  animation: menuhover-in 0.4s reverse;
}
@keyframes menuhover-in {
  0% {
    top: 0rem;
    background: rgba(15, 40, 65, 0);
  }
  100% {
    top: 1rem;
    background: rgba(15, 40, 65, 0.9);
  }
}
</style>
