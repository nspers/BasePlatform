<template>
  <div class="equipmentState">
    <div class="content-left">
      <div class="box-title">
        <span class="icons color-huang">&#xe657;</span>
        <span>监视呼叫</span>
      </div>
      <div class="equipmentBox">
        <span class="equipmentName">主机001</span>
        <div class="equipmentBtn clearfix" v-if="status==0">
          <span class="num icons color-dgreen">&#xe657;</span>
          <span>在线</span>
          <!-- <el-button type="success" size="mini" class="open" @click="stateControl('open')">在线</el-button> -->
          <!-- <el-button type="success" size="mini" class="down" @click="stateControl('down')">空闲</el-button> -->
        </div>
        <div class="equipmentBtns clearfix" v-if="status==1">
          <span class="num icons dcheng">&#xe657;</span>
          <span>在线</span>
          <!-- <el-button type="success" size="mini" class="open" @click="stateControl('open')">在线</el-button> -->
          <!-- <el-button type="success" size="mini" class="down" @click="stateControl('down')">空闲</el-button> -->
        </div>
      </div>
      <div class="equipmentForm">
        <ul class="equipmentItemBox clearfix">
          <li class="equipmentItem" v-for="(item,index) in stateData.data" :key="index">
            <div :class="{'bg':item.staus==1,'bgs':!item.staus}">
              <span class="num icons color-huang">&#xe657;</span>
              <i class="name">{{index+1}}</i>
              <!-- <span class="name">{{item.name}}</span> -->
            </div>
          </li>
        </ul>
      </div>
      <div class="equipmentBox">
        <span class="equipmentName">主机001</span>
        <!-- <div class="equipmentBtn clearfix">
          <el-button type="success" size="mini" class="open" @click="stateControl('open')">在线</el-button>
          <el-button type="success" size="mini" class="down" @click="stateControl('down')">空闲</el-button>
        </div> -->
           <div class="equipmentBtn clearfix" v-if="sta==0">
          <span class="num icons color-dgreen">&#xe657;</span>
          <span>在线</span>
          <!-- <el-button type="success" size="mini" class="open" @click="stateControl('open')">在线</el-button> -->
          <!-- <el-button type="success" size="mini" class="down" @click="stateControl('down')">空闲</el-button> -->
        </div>
        <div class="equipmentBtns clearfix" v-if="sta==1">
          <span class="num icons dcheng">&#xe657;</span>
          <span>在线</span>
          <!-- <el-button type="success" size="mini" class="open" @click="stateControl('open')">在线</el-button> -->
          <!-- <el-button type="success" size="mini" class="down" @click="stateControl('down')">空闲</el-button> -->
        </div>
      </div>
      <div class="equipmentForm">
        <ul class="equipmentItemBox clearfix">
          <li class="equipmentItem" v-for="(item,index) in stateData.datas" :key="index">
            <div :class="{'bg':item.staus==1,'bg_r':item.staus==2}">
              <span v-if="item.staus==1" class="num icons color-huang">&#xe657;</span>
              <span v-if="item.staus==2" class="num icons color-huang">&#xe63b;</span>
              <i class="name">{{index+1}}</i>
              <!-- <span class="name">{{item.name}}</span> -->
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      status: 0,
      sta:1,
      stateData: {
        data: [
          { name: "在线", staus: 1 },
          { name: "在线", staus: 1 },
          { name: "在线", staus: 0 },
          { name: "在线", staus: 1 },
          { name: "在线", staus: 1 },
          { name: "在线", staus: 1 },
          { name: "在线", staus: 1 },
          { name: "在线", staus: 1 },
          { name: "在线", staus: 1 },
          { name: "在线", staus: 1 },
          { name: "在线", staus: 1 },
          { name: "在线", staus: 1 },
          { name: "在线", staus: 0 },
          { name: "在线", staus: 1 },
          { name: "在线", staus: 1 },
          { name: "在线", staus: 1 }
        ],
        datas: [
          { name: "在线", staus: 1 },
          { name: "在线", staus: 1 },
          { name: "在线", staus: 2 },
          { name: "在线", staus: 1 },
          { name: "在线", staus: 1 },
          { name: "在线", staus: 1 },
          { name: "在线", staus: 1 },
          { name: "在线", staus: 1 },
          { name: "在线", staus: 1 },
          { name: "在线", staus: 1 },
          { name: "在线", staus: 1 },
          { name: "在线", staus: 1 },
          { name: "在线", staus: 2 },
          { name: "在线", staus: 1 },
          { name: "在线", staus: 1 },
          { name: "在线", staus: 1 }
        ]
      }
    };
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
  .equipmentBox {
    margin: 0.2rem 0.3rem 0;
    .equipmentName {
      height: 0.36rem;
      line-height: 0.36rem;
    }
    .equipmentBtn {
      float: right;
      width: 0.88rem;
      height: 0.33rem;
      line-height: 0.33rem;
      border: 0.01rem solid rgba(0, 251, 154, 1);
      border-radius: 0.1rem;
      text-align: center;
      font-weight: 300;
      color: rgba(0, 251, 154, 1);
      span:nth-child(1) {
        vertical-align: sub;
        font-size: 0.18rem;
      }
    }
    .equipmentBtns {
      float: right;
      width: 0.88rem;
      height: 0.33rem;
      line-height: 0.33rem;
      border: 0.01rem solid rgba(251, 207, 0, 1);
      border-radius: 0.1rem;
      text-align: center;
      font-weight: 300;
      color: rgba(251, 207, 0, 1);
      span:nth-child(1) {
        vertical-align: sub;
        font-size: 0.18rem;
      }
    }
  }
  .equipmentForm {
    line-height: 0.6rem;
    text-align: center;
    margin-top: 0.2rem;
    padding: 0 0.3rem;
    .equipmentItemBox {
      .equipmentItem {
        height: 0.6rem;
        float: left;
        width: 0.97rem;
        margin-right: 0.1rem;
        margin-top: 0.1rem;
        .bg {
          background: rgba(13, 34, 41, 0.2);
          border-radius: 0.1rem;
        }
        .bgs {
          background: rgba(255, 255, 255, 1);
          border-radius: 0.1rem;
          color: rgba(0, 0, 0, 1);
        }
        .bg_r {
          background: rgba(210, 18, 18, 1);
          border-radius: 0.1rem;
        }
        .num {
          margin-right: 0.05rem;
          font-size: 0.16rem;
          vertical-align: baseline;
        }
        .name {
          font-size: 0.17rem;
        }
      }
      .equipmentItem:nth-child(4n) {
        margin-right: 0;
      }
    }
  }
}
</style>