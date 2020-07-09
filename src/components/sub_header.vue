<template>
  <div class="subHeader">
    
  </div>
</template>

<script>
export default {
    name: "App",
    data() {
        return {
            navlist:[],
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
                        { path: "/led", name: "LED", class: "ledIcon" }
                    ]
                },
                {
                    name: "告警统计",
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
            ]
        };
    },
  watch:{
    "$route":function (newValue, oldValue) {
        // console.log(newValue);
    }
  },
  created() {
    //   for(var key in this.menuList){
    //       if(this.menuList[key])
    //   }
    //   this.navlist = this.$router.history.current.name
    // console.log(this.$router.history.current);
    
  },
  mounted() {}
};
</script>
