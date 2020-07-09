<template>
  <div class="header clearfix">
    <div class="header-l fl">
      <h2>杨雁路物联网管控平台</h2>
      <div class="logo-dess">Iot Management Platform</div>
    </div>

    <div class="header-c-wrap fl">
      <ul class="header-c">
        <li
          class="menu-first headericons"
          v-for="(item,index) of menuList"
          :class="{'active':activeIndex==index,'menu-havechild':item.childs}"
          :key="index"
          @click="menuClick(item.path,item.childs,index)"
        >
          <div class="icon-group headericons">
            <div class="icons headericons" v-html="item.icon">{{item.icon}}</div>
            <div class="icons-text headericons">{{item.name}}</div>
          </div>
          <!-- <ul class="menu-second" :class="{'active': showSecond && activeIndex==index}" :style="{width:1.39 * item.childs.length + 'rem'}">
            <li
              @click="pushUrl(urls.path,index)"
              v-for="(urls,indexs) of item.childs"
              :key="urls.indexs"
              :class="{'active':urls.path == currentPath}"
            >
              <b class="header-font">{{urls.name}}</b>
            </li>
          </ul> -->
        </li>
      </ul>
    </div>
    <div class="header-r fr">
      <p style="color:#fff" class="time_p">
        <span>{{tiemrObj.date}}</span>
        <span>{{tiemrObj.tiems}}</span>
      </p>
      <p class="h_r_btn_p" :class="{'add' : !showBtn}">
          <i>
                <span class="mainBtn" @click="showBtn = true" :class="{'show' : showBtn}"></span>
          </i>
        <strong :class="{'come' : showBtn}">
            <b @click="goIndex">
                <span class="icons">&#xe638;</span>
            </b>
            <b @click="goLogin">
                <span class="icons">&#xe62c;</span>
            </b>
        </strong>
      </p>
    </div>
    <div class="floatSubNav" ref="floatSubNav" v-show="newtarge">
        <div class="overflowNav" ref="overflowNav">
            <ul class="menu-second clearfix">
                <li 
                    v-for="(item, index) in menuList[activeIndex].childs" 
                    :key="index"
                    :class="{'actice' : index == subMenuIndex}"
                    @click="pushUrl(item.path,activeIndex,index)"
                >{{item.name}}</li>
            </ul>
        </div>
        <!-- <div class="framerLayer" ref="framerLayer" @click="animNav"></div> -->
    </div>
    <transition name="menuhover">
      <div v-if="showBool" class="menu-second-hover"></div>
    </transition>
  </div>
</template>
<script>
export default {
  name: "App",
  data() {
    return {
        newtarge:false,
        subMenuIndex:0,
      showSecond:false,
        showBtn:false,
      Router: "",
      innerW: 1920,
      pageW: 1920,
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
          childs: [
            { path: "/lightpole", name: "智慧灯杆", class: "lightpoleIcon" }
          ]
        },
        {
          name: "环境市政",
          icon: "&#xe72b;",
          childs: [
            { path: "/environment", name: "环境监测", class: "environmentIcon" }
          ]
        },
        {
          name: "基础设施",
          icon: "&#xe686;",
          childs: [
            { path: "/led", name: "LED", class: "ledIcon" },
            // { path: "/led", name: "集中控制器" }
            // { path: "/broadcast", name: "智能广播", class: "broadcastIcon" },
            // { path: "/video", name: "视频监控", class: "videoIcon" }
          ]
        },
        // {
        //   name: "智能广播",
        //   icon: "&#xe686;",
        //   childs: [
        //     { path: "/broadcast", name: "智能广播", class: "broadcastIcon" }
        //   ]
        // },
        // { name: "公共安全", icon:"&#xe60c;", },
        // { name: "智慧交通", icon:"&#xe607;", },
        {
          name: "告警管理",
          icon: "&#xe655;",
          childs: [
            { path: "/monitor", name: "告警管理", class: "monitorIcon" },
            { path: "/event", name: "事件管理", class: "eventIcon" }
          ]
        },
        {
          name: "统计分析",
          icon: "&#xe65b;",
          childs: [
            { path: "/analysis", name: "统计分析", class: "analysisIcon" },
            { path: "/warningAnalysis", name: "警告分析", class: "analysisIcon" },
            { path: "/lightingAnalysis", name: "照明统计", class: "analysisIcon" }
          ]
        }
        // { name: "运维管理", icon:"&#xe611;", }
      ]
    };
  },
  watch:{
    "$route":function (newValue, oldValue) {
        // console.log(newValue);
        // this.activeIndex = newValue.name
        for (let index = 0; index < this.menuList.length; index++) {
            for (let i = 0; i < this.menuList[index].childs.length; i++) {
                if(this.menuList[index].childs[i].path == newValue.path){
                    this.activeIndex = index
                }
            }            
        }
        this.hiddenNav()
    }
  },
  created() {
      var self = this
    for (var i = 0; i < this.menuList.length; i++) {
      for (var s = 0; s < this.menuList[i].childs.length; s++) {
        if (this.$route.path == this.menuList[i].childs[s].path) {
          this.activeIndex = i;
          this.currentPath = this.menuList[i].childs[s].path;
          this.subMenuIndex = s
            if(i == 3 || i == 4){
                this.newtarge = false
            }else{
                setTimeout(() => {
                    self.newtarge = true
                }, 1000);
            }
          
        }
      }
    }
    // this.currentPath = this.$route.path
  },
  mounted() {
    this.$nextTick(function() {
        this.timer = setInterval(this.setTimers, 1000);
        this.innerW = window.innerWidth;
        this.pageW = $('.header-c-wrap').width() / this.menuList.length;
        this.setTimers();
        document.getElementById("app").addEventListener("click", (e) => {
            if(e.target.className.indexOf("show") == -1){
              this.showBtn = false;
            }
        });
        this.hiddenNav()
    });
    window.addEventListener("resize", () => {
      this.innerW = window.innerWidth;
      this.pageW = $('.header-c-wrap').width() / this.menuList.length;
    });
    setTimeout(() => {        
        if(this.menuList[this.activeIndex].childs.length > 3){
            this.$refs.floatSubNav.className = "floatSubNav moreNav"
        }else{
            this.$refs.floatSubNav.className = "floatSubNav"
        }
        $('.overflowNav').width($('.overflowNav ul li').length * 1.2 + 'rem')
    }, 500);
  },
  methods: {
      goLogin() {
        var self = this
        this.$api.post2('/user/logout').then(function(res){
            sessionStorage.login = false
            // self.$router.push({name:'login'})
            location.reload()
            // console.log(res)
        })
      },
      hiddenNav(){
          switch (this.$router.history.current.name){
            case 'event':
                this.$refs.floatSubNav.className = 'floatSubNav hidden'
                break;
            case 'monitor':
                this.$refs.floatSubNav.className = 'floatSubNav hidden'
                break;
            case 'analysis':
                this.$refs.floatSubNav.className = 'floatSubNav hidden'
                break;
            case 'warningAnalysis':
                this.$refs.floatSubNav.className = 'floatSubNav hidden'
                break;
            case 'lightingAnalysis':
                this.$refs.floatSubNav.className = 'floatSubNav hidden'
                break;
            default:
                if(this.menuList[this.activeIndex].childs.length > 3){
                    this.$refs.floatSubNav.className = "floatSubNav moreNav"
                }else{
                    this.$refs.floatSubNav.className = "floatSubNav"
                }
                break;
        }
      },
    goIndex() {
      this.$router.push("/");
      // console.log(this.$store.state)
    },
    menuClick(path, list, index) {  
        var self = this      
        if(index == 3 || index == 4){
            this.newtarge = false
        }else{
            setTimeout(() => {
                self.newtarge = true
            }, 2000);
        }
        if(this.activeIndex != index){
            this.subMenuIndex = 0
            this.pushUrl(list[0].path,index)
        }
    },
    pushUrl(path, index,acitceI) {
        if(this.subMenuIndex != acitceI){
            setTimeout(() => {
                this.currentPath = path;
                this.activeIndex = index;
                this.subMenuIndex = acitceI ? acitceI : 0
                this.$router.push(path);
                setTimeout(() => {
                    if(this.menuList[this.activeIndex].childs.length > 3){
                        this.$refs.floatSubNav.className = "floatSubNav moreNav"
                    }else{
                        this.$refs.floatSubNav.className = "floatSubNav"
                    }
                    $('.overflowNav').width($('.overflowNav ul li').length * 1.2 + 'rem')
                }, 500);
            }, 500);
        }
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
.h_r_btn_p{position: relative;text-align: center;width: 1.4rem;height: .6rem;overflow: hidden;}
.h_r_btn_p i{position: absolute;left:0;top:0;width:100%;height: 100%;z-index: 2;}
.h_r_btn_p span{transition: all .2s linear;}

.mainBtn{background: url(../assets/img/btn_top.png) no-repeat;width: .4rem;height: .25rem;display: inline-block;background-size: contain;position: relative;margin-top: .08rem;}
.mainBtn.show{opacity: 0;}
.mainBtn::after{content: '';display: block;width: .4rem;height: .2rem;background: url(../assets/img/btn_middle.png) no-repeat;background-size: contain;position: absolute;top: .16rem;transition: all .3s ease-out;}
.mainBtn::before{content: '';display: block;width: .4rem;height: .2rem;background: url(../assets/img/btn_middle.png) no-repeat;background-size: contain;position: absolute;top: .23rem;transition: all .5s ease-out;}
.mainBtn:hover::after{top: .18rem;}
.mainBtn:hover::before{top: .26rem;}

.time_p{width: 100%;padding-left: 1.2rem}

.header-r .icons,.mainBtn{cursor: pointer;}
.header-r strong{position: absolute;left:0;top: 0;width: 100%;opacity: 0;transition: all 1s linear;}

.add.h_r_btn_p span{transition: all 2s linear;}
.header-r .add strong{transition: all .3s linear;}


.header-r strong.come{opacity: 1;}
.header-r strong span{margin: 0 .05rem;}
.header-r strong b{display: inline-block;cursor: pointer;padding-top:.1rem}
.come{text-align: center;z-index: 3;}
.come span{font-size: .25rem;display: block;width: .3rem;}

.header-icon {
  display: inline-block;
  width: 0.18rem;
  height: 0.18rem;
  margin-right: 0.05rem;
  vertical-align: middle;
}
.header-font {
  display: inline-block;
  font-weight: normal;
  vertical-align: middle;
}
.lightpoleIcon {
  background: url(../assets/img/11.png) 0 0 no-repeat;
  background-size: 100% 100%;
}
.environmentIcon {
  background: url(../assets/img/22.png) 0 0 no-repeat;
  background-size: 100% 100%;
}
.ledIcon {
  background: url(../assets/img/33.png) 0 0 no-repeat;
  background-size: 100% 100%;
}
.monitorIcon {
  background: url(../assets/img/11.png) 0 0 no-repeat;
  background-size: 100% 100%;
}
.eventIcon {
  background: url(../assets/img/22.png) 0 0 no-repeat;
  background-size: 100% 100%;
}
.analysisIcon {
  background: url(../assets/img/33.png) 0 0 no-repeat;
  background-size: 100% 100%;
}
.header {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 1.09rem;
  background: url(../assets/img/header.png) 0 0 no-repeat;
  background-size: cover;
  z-index: 999; // cy
  color: #00fffc;
}
.header-l {
  width: 3.8rem;
  padding-top: 0.26rem;
  text-align: center;
  h2 {
    font-size: 0.3rem;
  }
  .logo-dess {
    font-size: 0.14rem;
  }
}
.header-c-wrap {
  position: absolute;
  width: calc(100vw - 7.2rem);
  height: 0.75rem;
  bottom: 0rem;
  left: 4.8rem;
}
.header-c {
  display: flex;
  align-items: center;
  width: 100%;
  position: relative;
  height: 100%;
  .menu-first {
    width: 20%;
    height: 0.7rem;
    cursor: pointer;
    animation-delay: 0.4s;
    margin-top:-.1rem;
    transition: all 0.6s cubic-bezier(1, 0, 1, 0.64);
  }
  .menu-havechild:hover {
    .icon-group {
      &:before {
        content: "";
        opacity: 1;
        bottom: 0;
      }

      position: relative;
      .icons {
        text-shadow: 0 0 0.05rem #37d2fb;
        color: #fff;
        top: 0.04rem;
        transform: scale(1.3);
      }
      .icons-text {
        bottom: -0.1rem;
        opacity: 0;
      }
    }
    &::after {
      width: 100%;
    }
    &:before {
      content: "";
      opacity: 1;
      bottom: 0.11rem;
    }
  }
  .menu-first.active {
    color: #fff;
    height: 0.7rem;
    bottom: 0.01rem;
    .icon-group {
      .icons {
        text-shadow: 0 0 0.05rem #37d2fb;
        color: #fff;
        top: 0.01rem;
        transform: scale(1.3);
      }
      &::after {
        opacity: 1;
        bottom: -0.2rem;
      }
      &:before {
        content: "";
        opacity: 1;
        bottom: 0;
      }
    }
    .icons-text {
      display: none;
    }
  }
  .active.menu-second {
    opacity: 1;
    top:.2rem
  }



  .menu-second {
    position: relative;
    top: -.4rem;
    z-index: -1;
    opacity: 0;
    line-height: 0.4rem;
    transition: all 0.3s ease-in;
    left:50%;
    transform: translate(-50%,0);
    &:after {
      content: " ";
      display: block;
      clear: both;
      background: rgba(0, 65, 85, 0.9);
      width:100%;
      height:.4rem;
      transform: skewX(-30deg);
      border-radius: 4px;
      opacity: .8;
      position: absolute;
      left:0;
      top:0;
    }
    li {
      width: 1.39rem;
      position: relative;
      text-align: center;
      color: #fff;
      transition: all 0.6s linear;
      z-index: 2;
      display: inline-block;
      b{
          z-index: 2;
          position: relative;
      }
      &::after {
          content: " ";
          display: block;
          transition: all 0.3s ease-in;
          transform: skewX(-30deg);
      }
      &:hover {
        color: #00FEF5;
        &::after {
            content: " ";
            display: block;
            clear: both;
            background:red;
            width:100%;
            height:.4rem;
            transform: skewX(-30deg);
            border-radius: 4px;
            opacity: .8;
            position: absolute;
            left:0;
            top:0;
        }
      }
      
    }
    li.active {
      color: #003F55;
      b{
          position: relative;
          z-index: 2;
      }
      &::after {
        content: " ";
        display: block;
        clear: both;
        background:red;
        width:100%;
        height:.4rem;
        transform: skewX(-30deg);
        border-radius: 4px;
        opacity: .8;
        position: absolute;
        left:0;
        top:0;
      }
    }
  }


  .icon-group {
    @include fd(column);
    width: 100%;
    height: 0.6rem;
    position: relative;
    background: none;
    transition: background-image 0.3s linear;
    &::after {
      content: "";
      opacity: 0;
      width: 0.7rem;
      height: 0.04rem;
      background: url(~@/assets/img/sun.png) 0 0 no-repeat;
      background-size: 100% 100%;
      position: absolute;
      bottom: 0.05rem;
    }
    &:before {
      content: "";
      width: 0.6rem;
      height: 0.6rem;
      //   background: url(~@/assets/img/menu_activ.png) center/cover no-repeat;
      position: absolute;
      transform: translateX(-50%);
      left: 50%;
      bottom: 0.11rem;
      transition: all 0.4s ease-out;
      opacity: 0;
    }
  }
  .icons {
    font-size: 0.4rem;
    height: 0.5rem;
    text-shadow: 0.05rem 0 0.03rem #000;
    transition: all 0.3s linear;
    position: absolute;
    top: -0.1rem;
  }
  .icons-text {
    position: absolute;
    bottom: -0.06rem;
    opacity: 1;
    transition: all 0.3s linear;
  }
}
.header-r {
  @include fd(column);
  width: 2.4rem;
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
</style>
