<template>
  <div class="search">
    <!-- <el-select :popper-append-to-body=false v-model="search" :placeholder="selectName" filterable>
            <el-option
                    v-for="item in baseData"
                    :key="item.lamppostid"
                    :label="item.lamppostname"
                    :value="item.lamppostid"
            >
            </el-option>
    </el-select>-->
    <el-autocomplete
      class="inline-input"
      v-model="search"
      :fetch-suggestions="querySearch"
      placeholder="搜索设备编号"
      :trigger-on-focus="false"
      @select="handleSelect"
    ></el-autocomplete>
  </div>
</template>
<script>
import Vue from "vue";
import * as mapWork from "../map3d/work";

export default {
  name: "App",
  props: ["type"],
  data() {
    return {
      searchData: [],
      search: "",
      baseData: [],
      tagName: "",
      selectName: "选择设备"
    };
  },
  watch: {
    getTagName(newVal, oldVal) {
      this.setBaseData(newVal);
    },
    getSelectId(newVal, oldVal) {
      for (let item of this.baseData) {
        if (item.lamppostid === newVal) {
          this.selectName = item.lamppostname;
          setTimeout(() => {
            this.search = item.lamppostname;
          }, 600);
        }
      }
    }
    // search(newVal, oldVal) {
    //     if (newVal !== oldVal) {
    //         for (let item of this.baseData) {
    //             if(item.lamppostname === newVal){
    //                 mapWork.locationByJWD({
    //                     jd: item.longitude,
    //                     wd: item.latitude,
    //                     gd: item.height,
    //                     cameraHeight: 60,
    //                     heading: 25,
    //                     pitch: -45,
    //                     duration: 1
    //                 });
    //                 this.$parent.leave();
    //                 setTimeout(() => {
    //                     Vue.prototype.workCover.updateSelById(item.lamppostid);
    //                     $('.map_lp_name').stop().animate({'marginTop':'-90px'});
    //                     $('.' + item.lamppostid).stop().animate({'marginTop': '-150px'});
    //                     this.$store.state.selectId = item.lamppostid;
    //                     this.$store.state.selectBoolean = 'isSelect';
    //                     this.$store.dispatch('setLoctionName', 'sd');
    //                     this.$store.dispatch('setLoctionId', item.lamppostid);
    //                     this.$parent.entry()
    //                 }, 800);
    //                 return false;
    //             }
    //         }
    //     }
    // }
  },
  async created() {
    this.setBaseData(this.$store.state.nowTagName);
  },
  computed: {
    getTagName() {
      return this.$store.state.nowTagName;
    },
    getSelectId() {
      return this.$store.state.selectId;
    }
  },
  mounted() {},
  methods: {
    querySearch(queryString, cb) {
      // var restaurants = this.baseData;
      // var results = queryString ? restaurants.filter(this.createFilter(queryString)) : restaurants;
      // 调用 callback 返回建议列表的数据
      cb(this.createFilter(queryString.toUpperCase()));
    },
    createFilter(queryString) {
      // console.log(this.baseData)
      var newArry = [];
      let s = 0;
      for (var i = 0; i < this.baseData.length; i++) {
        if (this.baseData[i].lamppostname.indexOf(queryString) >= 0) {
          newArry.push(this.baseData[i]);
          newArry[s].value = this.baseData[i].lamppostname;
          s++;
        }
      }
      return newArry;
    },
    handleSelect(item) {
      // console.log(this.$store.state.nowTagName);
      // mapWork.locationByJWD({
      //   jd: item.longitude,
      //   wd: item.latitude,
      //   gd: item.height,
      //   cameraHeight: 60,
      //   heading: 25,
      //   pitch: -45,
      //   duration: 1
      // });
      // this.$parent.leave();
      // setTimeout(() => {
      //   Vue.prototype.workCover.updateSelById(item.lamppostid);
      //   $(".map_lp_name")
      //     .stop()
      //     .animate({ marginTop: "-90px" });
      //   $("." + item.lamppostid)
      //     .stop()
      //     .animate({ marginTop: "-150px" });
      //   this.$store.state.selectId = item.lamppostid;
      //   this.$store.state.selectBoolean = "isSelect";
      //   this.$store.dispatch("setLoctionName", "sd");
      //   this.$store.dispatch("setLoctionId", item.lamppostid);
      //   this.$store.state.checkedArray = {};
      //   this.$parent.wuyong ? this.$parent.wuyong++ : null;
      // }, 800);
      // this.$parent.entry();
      // return false;
        this.$store.state.selectId = item.lamppostid;
        this.$store.state.loctionId = item.lamppostid;
        this.$sdClick(this.$store.state.selectId, this.$route.name,this.$store.state.nowTagName);
    },
    setBaseData(ntg) {
      //nowTagName
      switch (ntg) {
        case "led":
          // this.searchData = this.filterAllData(this.$store.getters.websocketData[230011].msg.groups, "leds")
          this.baseData = JSON.parse(sessionStorage.led);
          break;
        case "environment":
          // this.searchData = this.$store.getters.websocketData[240001].msg.frt
          this.baseData = JSON.parse(sessionStorage.environment);
          break;
        case "lightpole":
          // this.searchData = this.filterAllData(this.$store.getters.websocketData[220002].msg.groups, "lampposts")
          this.baseData = JSON.parse(sessionStorage.lightpole);
          break;
        case "jizhong":
          this.baseData = JSON.parse(sessionStorage.jizhong);
          break;
        case "lcd":
          this.baseData=this.$arrMapPoint['lcd']
          break;
        default:
          break;
      }
    }
    // 过滤出全部数据
    // filterAllData(array, key) {
    //     let allArray = [];
    //     array.forEach(item => {
    //         let A = [].slice.call(item[key]);
    //         A.forEach(ele => {
    //             allArray.push(ele);
    //         });
    //     });
    //     return allArray;
    // }
  }
};
</script>