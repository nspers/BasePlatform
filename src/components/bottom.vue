<template>
  <div class="Footer" :class="{index:indexBool}">
    <div class="foot">
      <div class="countlight" v-for="(item,index) of lightlist" :key="index">
        <div ref="light" class="light lightbg" :class="{lightclickbg:istrue==index}" @click="chooselight(index)">{{item.name}}</div>
        <div class="lightimg">
          <img src="../assets/img/zu.png" />
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "App",
  watch:{
    "$route"(val){
      if(val.path =='/'){
        this.indexBool = true;
      }else{
        this.indexBool = false;
      }
    }
  },
  data() {
    return {
      indexBool:false,
      istrue:-1,
      lightlist: [
        { path: "/monitor", name: "全部灯组" },
        { path: "/analysis", name: "东延灯组" },
        { path: "/lightpole", name: "南延灯组" },
        { path: "/environment", name: "南延灯组" },
        { path: "/monitor", name: "西延灯组" }
      ]
    };
  },
  async created() {
      if(this.$route.path =='/'){
        this.indexBool = true;
      }
  },
  mounted() {
    
  },
  methods: {
    chooselight(index) {
      this.istrue=index
       
    }
  }
};
</script>
<style lang="scss" scoped>
.index.Footer{
  left: 23%;
  width: 54%;
  background: linear-gradient(to right, rgba(0, 0, 0, 0) 1%,rgba(0, 0,0, 0.4) 30%,rgba(0, 0, 0, 0.4) 30%,rgba(0,0, 0, 0) 100%);
  .foot .countlight .light{
    width: 1.29rem;
  }
}

.Footer {
  position: fixed;
  display: flex;
  bottom: 0;
  right: 0;
  height: 0.94rem;
  width: 77%;
  z-index: 555555;
  color: #fff;
  border-radius: 0.02rem 0.02rem 0.05rem 0.02rem;
  background: linear-gradient(to right, rgba(0, 0, 0, 0) 1%,rgba(0, 0,0, 0.1) 30%,rgba(0, 0, 0, 0.1) 30%,rgba(0,0, 0, 0.4) 100%);
}
  .lightbg{
    background: url(../assets/img/zongzu.png) no-repeat center/cover;
  }
.lightclickbg{
  background: url(../assets/img/dongzu.png) no-repeat center/cover;
  color:#fff;
}
.foot {
  position: relative;
  width: 100%;
  height: 0.46rem;
  margin-top: 0.25rem;
  font-size: 0.2rem;
  font-family: Microsoft YaHei;
  font-weight: 400;
  color: rgba(0, 255, 252, 1);
  display: flex;
  justify-content: flex-end;
  .countlight {
    display: flex;
    .light {
      align-items: center;
      justify-content: center;
      display: flex;
      background-size: 100% 100%;
      z-index: 999999;
      width: 1.59rem;
      height: 0.46rem;
       cursor: pointer;
      // background: url(../assets/img/zongzu.png) no-repeat center/cover;
    }

    .lightimg {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 0.6rem;
      height: 0.46rem;
      img {
        width: 90%;
        height: 0.1rem;
      }
    }
  }
}
</style>