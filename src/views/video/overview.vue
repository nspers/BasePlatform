<template>
    <div ref="overview">
        <div class="content-left trans-up trans-up-delay-3"></div>
        <div class="overview">
            <div class="wrapbox">
                <!-- 广播 LCD 视频 -- 设备状态 -->
                <div class="o_box trans-up trans-up-delay-3" v-if="$route.name==='broadcast'||$route.name==='lcd'||$route.name==='visualIntercom'">
                    <div class="box-title">
                        <span class="icons color-huang">&#xe62a;</span>
                        <span>设备状态</span>
                    </div>
                    <div class="group">
                        <div class="group1 clearfix">
                            <div class="groupalgin">
                                <i class="icons" v-if="$route.name==='broadcast'">&#xe6ac;</i>
                                <i class="icons" v-if="$route.name==='lcd'">&#xe618;</i>
                                <i class="icons" v-if="$route.name==='visualIntercom'">&#xe62e;</i>
                                <span class="mleft">设备总数</span>
                                <num class="dl_num" :value="wsData.total"></num>
                            </div>
                        </div>
                        <div class="group1 clearfix">
                            <div class="groupalgin color-lv">
                                <i class="icons" v-if="$route.name==='broadcast'">&#xe6ac;</i>
                                <i class="icons" v-if="$route.name==='lcd'">&#xe618;</i>
                                <i class="icons" v-if="$route.name==='visualIntercom'">&#xe62e;</i>
                                <span class="mleft">在线数</span>
                                <num class="dl_num" :value="wsData.online"></num>
                            </div>
                            <div class="groupalgin iconleft color-huang">
                                <i class="icons" v-if="$route.name==='broadcast'">&#xe6ac;</i>
                                <i class="icons" v-if="$route.name==='lcd'">&#xe618;</i>
                                <i class="icons" v-if="$route.name==='visualIntercom'">&#xe62e;</i>
                                <span class="mleft">离线数</span>
                                <num class="dl_num" :value="wsData.offline"></num>
                            </div>
                        </div>
                    </div>
                </div>
                <!-- 广播 LCD 视频 -- 折线图 -->
                <div class="o_box trans-up trans-up-delay-5" v-if="$route.name==='broadcast'||$route.name==='lcd'||$route.name==='visualIntercom'">
                    <div class="box-title">
                        <span class="icons color-huang">&#xe657;</span>
                        <span>告警统计</span>
                    </div>
                    <div class="la_nodata" v-if="!this.wsData.alarms.date.length">暂无告警信息</div>
                    <div ref="myEchart" class="myEchart_box" v-if="this.wsData.alarms.date.length"></div>
                </div>
                <!-- 广播 LCD 视频 -- 离线设备 -->
                <div class="o_box trans-up trans-up-delay-7" v-if="$route.name==='broadcast'||$route.name==='lcd'||$route.name==='visualIntercom'">
                    <div class="box-title">
                        <span class="icons color-huang">&#xe779;</span>
                        <span>离线设备</span>
                    </div>
                    <div class="alog_box">
                        <div class="ab_title">
                            <span>设备名称</span>
                            <span>离线时间</span>
                            <span>状态</span>
                        </div>
                        <div class="alert_scroll sbar" :class="absHeight">
                            <div class="as_nodata" v-if="!wsData.offlines.length">暂无离线设备</div>
                            <ul class="scroll_ul" ref="sUl" v-if="wsData.offlines.length">
                                <li class="scroll_li" v-for="(item,index) in wsData.offlines" :key="index" @click="sdClick(item.id)">
                                    <span>{{item.name}}</span>
                                    <span>{{item.offlinetime}}</span>
                                    <span>
                                        <i class="a_type"></i>
                                    </span>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import num from "./number";

    export default {
        name: "overview",
        data() {
            return {
                tagName: "ov",
                msgCode: 0,
                msgCode2: 0,
                abScrollH: 0,
                abHeight: 0,
                absHeight: '',
                eLoading: 1,
                scrollSwitch: 1,
                wsData: {
                    currentmonth: "",
                    lastmonth: "",
                    thisyear: "",
                    oncount: "",
                    offcount: "",
                    total: 0,
                    online: 0,
                    offline: 0,
                    onnum: 0,
                    offnum: 0,
                    errornum: 0,
                    alarmsTag: '',
                    alarms: {
                        date: [],
                        times: [],
                        order: []
                    },
                    offlines: [], //离线设备
                    devStateList: []
                },
                deviceObj: {
                    light: 0,
                    line: 0
                },
                chart: null,
                chartData: []
            };
        },
        created() {
            //判断当前页对应的 msgcode
            switch (this.$route.path) {
                case "/broadcast":
                    this.msgCode = 230016;
                    this.msgCode2 = 230017;
                    this.absHeight = 'as_height3';
                    break;
                case "/lcd":
                    this.msgCode = 230003;
                    this.msgCode2 = 230004;
                    this.absHeight = 'as_height1';
                    break;
                case "/videoinfo":
                    this.msgCode = 0;
                    this.msgCode2 = 0;
                    this.absHeight = 'as_height2';
                    break;
                default:
                    break;
            }
        },
        components: {
            num
        },
        watch: {
            getWsData(nowval, oldval) {
                // console.log(nowval, oldval);
            }
        },
        computed: {
            //vuex
            getWsData() {
                this.tagName = this.$store.state.loctionName;
                if (this.$store.state.websocket.hasOwnProperty(this.msgCode)) {
                    this.eLoading = 0;
                    const wsMsg = this.$store.state.websocket[this.msgCode].msg;
                    this.deviceObj.light = Number(wsMsg.lightrate); //亮灯率
                    this.deviceObj.line = Number(wsMsg.onlinerate); //在线率npm
                    this.wsData.total = wsMsg.total; //灯杆(其他)总数
                    this.wsData.onnum = wsMsg.onnum; //亮灯数
                    this.wsData.offnum = wsMsg.offnum; //熄灯数
                    this.wsData.errornum = wsMsg.errornum; //故障数
                    this.wsData.online = wsMsg.online;
                    this.wsData.offline = wsMsg.offline;
                    //告警统计折线图
                    if (wsMsg.hasOwnProperty("sponAlarms")) {
                        this.wsData.alarms.date = [];
                        this.wsData.alarms.times = [];
                        this.wsData.alarms.order = [];
                        for (let item of wsMsg.sponAlarms) {
                            this.wsData.alarms.date.push(item.alarmtime);
                            this.wsData.alarms.times.push(item.times);
                            this.wsData.alarms.order.push(item.order);
                        }
                        //启动Echarts
                        this.initChart();
                    }
                    //告警统计折线图
                    if (wsMsg.hasOwnProperty("lightalarms")) {
                        this.wsData.alarms.date = [];
                        this.wsData.alarms.times = [];
                        this.wsData.alarms.order = [];
                        for (let item of wsMsg.lightalarms) {
                            this.wsData.alarms.date.push(item.date);
                            this.wsData.alarms.times.push(item.times);
                            this.wsData.alarms.order.push(item.order);
                        }
                        //启动Echarts
                        this.initChart();
                    }
                }
                //离线设备
                if (this.$store.state.websocket.hasOwnProperty(this.msgCode2)) {
                    this.eLoading = 0;
                    const wsMsg = this.$store.state.websocket[this.msgCode2].msg;
                    this.wsData.offlines = wsMsg.offlines;
                }
            }
        },
        mounted() {
            this.$nextTick(function () {
                setTimeout(() => {
                    this.entry();
                }, 100);
                setTimeout(() => {
                    this.deviceObj = {
                        light: this.deviceObj.light,
                        line: this.deviceObj.line
                    };
                }, 1000);
                //启动Echarts
                this.initChart();
            });
        },
        methods: {
            sdClick(sdId) {
                this.$sdClick(sdId,this.$route.name)
            },
            entry() {
                if (this.$refs.overview) {
                    this.$refs.overview.className = "is-visible";
                }
            },
            leave() {
                if (this.$refs.overview) {
                    this.$refs.overview.className = "";
                }
            },
            ovOutIn() {
                this.leave();
                setTimeout(() => {
                    this.entry();
                }, 800);
            },
            // 折线图
            initChart() {
                var self = this;
                if (this.$refs.myEchart) {
                    if (this.chartData.length > 0) {
                        if (
                            this.chartData.sort().toString() ==
                            this.wsData.alarms.date.sort().toString()
                        ) {
                            return false;
                        }
                    } else {
                        this.chartData = this.wsData.alarms.date;
                    }
                    this.chart = this.$echarts.init(this.$refs.myEchart, "dark");
                    this.chart.setOption({
                        backgroundColor: "", //背景颜色透
                        xAxis: {
                            type: "category",
                            boundaryGap: false,
                            data: this.wsData.alarms.date,
                            splitLine: {
                                show: true,
                                lineStyle: {
                                    color: ["#cccccc30"],
                                    width: 1,
                                    type: "solid"
                                }
                            },
                            axisLine: {
                                lineStyle: {
                                    color: "#cccccc30"
                                }
                            }
                        },
                        yAxis: {
                            type: "value",
                            splitLine: {
                                show: true,
                                lineStyle: {
                                    color: ["#cccccc30"],
                                    width: 1,
                                    type: "solid"
                                }
                            },
                            axisLine: {
                                lineStyle: {
                                    color: "#cccccc30"
                                }
                            }
                        },
                        grid: {
                            top: "6%",
                            left: "0",
                            right: "5%",
                            bottom: "5%",
                            containLabel: true
                        },
                        tooltip: {
                            show: true,
                            trigger: "axis",
                            axisPointer: {
                                type: "shadow",
                                axis: "auto",
                                snap: true
                            }
                        },
                        series: [
                            {
                                data: this.wsData.alarms.times,
                                type: "line",
                                smooth: true,
                                symbol: "emptyCircle", //拐点设置为实心
                                symbolSize: 5, //拐点大小
                                animation: true,
                                itemStyle: {
                                    normal: {
                                        color: "#00DED4",
                                        borderColor: "#275ECD"
                                    },
                                    emphasis: {
                                        color: "#00DED4"
                                    }
                                },
                                lineStyle: {
                                    width: 3,
                                    color: "#00DED4"
                                },
                                areaStyle: {
                                    normal: {
                                        color: {
                                            type: "linear",
                                            x: 0,
                                            y: 0,
                                            x2: 0,
                                            y2: 1,
                                            colorStops: [
                                                {offset: 0, color: "#00DED4"},
                                                {offset: 0.5, color: "#00DED450"},
                                                {offset: 1, color: "#000F2900"}
                                            ],
                                            globalCoord: false
                                        }
                                    }
                                }
                            }
                        ]
                    });
                }
            }
        }
    };
</script>

<style lang="scss" scoped>
    .dl_num {
        margin-left: 0.2rem;
    }
    .mleft {
        letter-spacing: 0.02rem;
    }

    .overview {
        position: absolute;
        top: 1.2rem;
        left: 0;
        width: 4.8rem;
        z-index: 999;

        .wrapbox {
            width: 4.8rem;
            height: 100%;
            font-size: 0.12rem;
            color: #fff;

            .obox_h100p {
                height: 100%;
            }

            .o_box {
                position: relative;
                margin-bottom: 0.2rem;
                width: 100%;
                border-radius: 0.05rem;

                .group {
                    display: flex;
                    flex-direction: column;
                    width: 92%;
                    margin-left: 5%;
                    font-size: 0.16rem;

                    .group1 {
                        display: flex;
                        flex: 1;
                        margin-top: 0.2rem;

                        .groupalgin {
                            display: flex;
                            align-items: baseline;

                            i {
                                font-size: .45rem;
                                vertical-align: bottom;
                            }

                            span {
                                vertical-align: bottom;
                            }


                            .fontsize {
                                font-size: 0.4rem !important;
                            }

                            .ledfontsize {
                                font-size: 0.5rem !important;
                            }
                        }

                        .iconleft {
                            margin-left: 0.6rem;
                        }
                    }
                }

                .o_title {
                    position: relative;
                    margin: 0 auto;
                    padding-left: 0.1rem;
                    width: 4.38rem;
                    height: 0.34rem;
                    border-bottom: #fff solid 0.01rem;
                    font-size: 0.18rem;
                }

                .myEchart_box {
                    margin: 0.2rem auto;
                    width: 90%;
                    height: 2rem;
                    background-color: transparent;
                    border-radius: 0.05rem;
                }

                .la_nodata {
                    margin: 0.2rem auto;
                    width: 90%;
                    height: 2rem;
                    color: #ccc;
                    font-size: 0.16rem;
                    line-height: 2rem;
                    text-align: center;
                }

                .alog_box {
                    margin: 0 auto;
                    width: 90%;
                    font-size: 0;
                }

                .ab_title {
                    margin-top: 0.16rem;
                    width: 100%;
                    height: 0.4rem;
                    background: linear-gradient(
                        to right,
                        rgba(66, 85, 144, 0.8),
                        rgba(66, 85, 144, 0.1)
                    );

                    span {
                        display: inline-block;
                        font-size: 0.16rem;
                        line-height: 0.4rem;
                        text-align: center;
                        box-sizing: border-box;
                    }

                    span:nth-child(1) {
                        padding-left: 0.3rem;
                        width: 30%;
                        text-align: left;
                    }

                    span:nth-child(2) {
                        width: 50%;
                    }

                    span:nth-child(3) {
                        width: 20%;
                    }
                }
                .alert_scroll {
                    position: relative;
                    width: 100%;
                    height: calc(100vh - 7.5rem);
                    min-height: 1.6rem;

                    .as_nodata {
                        position: absolute;
                        top: 0;
                        bottom: 0;
                        margin: auto 0;
                        width: 100%;
                        height: .2rem;
                        font-size: 0.16rem;
                        line-height: .2rem;
                        color: #ccc;
                        text-align: center;
                    }

                    .scroll_ul {
                        position: absolute;
                        width: 100%;
                        .scroll_li:hover{
                            background-color: rgba(255,255,255,.2);
                            cursor: pointer;
                        }
                        li span {
                            overflow: hidden;
                            display: inline-block;
                            height: 0.4rem;
                            line-height: .4rem;
                            font-size: 0.14rem;
                            text-align: center;
                            box-sizing: border-box;
                        }

                        li span:nth-child(1) {
                            padding-left: 0.3rem;
                            width: 30%;
                            text-align: left;
                        }

                        li span:nth-child(2) {
                            width: 50%;
                        }

                        li span:nth-child(3) {
                            width: 20%;
                        }

                        li .a_type {
                            display: inline-block;
                            width: .2rem;
                            height: .2rem;
                            background: url("../assets/img/icon/error_yellow.png") no-repeat center/contain;
                            vertical-align: middle;
                        }
                    }
                }
            }
        }
    }

    .list-wrap {
        display: flex;
        align-items: center;
        padding-left: 0.2rem;
        font-size: 0.18rem;

        span {
            flex: 1;
        }
    }

    .list-wrap-text {
        position: relative;
        top: 0.05rem;
    }

    .mar-top {
        margin-top: 0.1rem;
    }

    .shebei-top {
        display: flex;
        align-items: center;
        justify-content: space-around;
        height: 1rem;
    }

    .flex-wrap {
        display: flex;
        align-items: center;
        justify-content: space-around;
        min-width: 1.8rem;

        .light-wrap {
            position: relative;
            width: 0.7rem;
            height: 0.7rem;

            .light-bg {
                width: 0.6rem;
                height: 0.6rem;
                background: url("~@/assets/img/light@2x.png") center/contain no-repeat;
                position: absolute;
                left: 0.05rem;
                top: 0.05rem;
            }

            .icons-wrap {
                width: 0.7rem;
                height: 0.7rem;
                transform: rotate(180deg);
                display: flex;
                align-items: center;
                justify-content: center;

                & > .icons {
                    font-size: 0.35rem;
                    color: yellow;
                }
            }

            .light-svg {
                display: block;
                position: absolute;
                top: -0.05rem;
                left: -0.05rem;
            }
        }

        .light-detail {
            width: 0.76rem;
            display: flex;
            flex-direction: column;

            p {
                height: 100%;
                text-align: center;

                &:nth-child(1) {
                    font-size: 0.18rem;
                    color: #00fff4;
                }

                &:nth-child(2) {
                    width: 100%;
                    height: 0.3rem;
                    line-height: 0.3rem;
                    color: #fff;
                    font-size: 0.14rem;
                    border-top: 1px solid #00fff4;
                    background: linear-gradient(
                                    to bottom,
                                    rgba(10, 34, 142, 0.3),
                                    rgba(40, 80, 212, 0.7)
                    );
                }
            }
        }
    }

    .deng-wrap {
        font-size: 0.16rem;
    }

    .deng-list {
        display: inline-block;
        float: left;
        margin: 0.2rem 5% 0;
        width: 40%;

        i {
            display: inline-block;
            margin-right: 0.1rem;
            width: 0.4rem;
            height: 0.3rem;
            vertical-align: middle;
        }

        .light1 {
            background: url("../assets/img/overview/light_w.png") no-repeat center/contain;
        }

        .light2 {
            background: url("../assets/img/overview/light_g.png") no-repeat center/contain;
        }

        .light3 {
            background: url("../assets/img/overview/light_o.png") no-repeat center/contain;
        }

        .light4 {
            background: url("../assets/img/overview/light_r.png") no-repeat center/contain;
        }

        span {
            vertical-align: middle;
        }
    }

    .deng-font .icons {
        font-size: 0.5rem;
    }

    .nenghao-list {
        width: 1.29rem;
        height: 100%;
        display: flex;
        align-items: center;

        .nenghao-icon {
            display: flex;
            align-items: center;
            justify-content: center;
            position: relative;
            width: 0.6rem;

            & > .icons {
                position: absolute;
                font-size: 0.2rem;
            }

            & > .nenghao-bg-nei {
                position: absolute;
                width: 0.6rem;
                height: 0.6rem;
                background: url("~@/assets/img/nenghao_bg_zhuan.png") center/contain no-repeat;
                animation: draw 5s linear infinite;
            }

            & > .nenghao-bg-wai {
                position: absolute;
                width: 0.54rem;
                height: 0.54rem;
                background: url("~@/assets/img/nenghao_bg.png") center/contain no-repeat;
                animation: draw 20s linear infinite;
            }
        }

        .light-detail {
            position: relative;
            top: -0.1rem;
            left: -0.03rem;
            z-index: -1;
        }
    }

    .overview .wrapbox .o_box .group .group1 .groupalgin i{height: .3rem;line-height: .3rem;font-size: .3rem;margin-right: .3rem;}

    @keyframes draw {
        from {
            transform: rotate(0deg);
        }
        to {
            transform: rotate(360deg);
        }
    }

    @-webkit-keyframes draw {
        from {
            transform: rotate(0deg);
        }
        to {
            transform: rotate(360deg);
        }
    }
</style>