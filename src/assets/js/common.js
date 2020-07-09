import Vue from 'vue'
import store from '../../store'
// import * as mapWork from "../../map3d/work";
// import * as mapCover from "../../map3d/cover";
import * as mapCover from "../../amap/main";
import * as mapWork from "../../amap/main";

//覆盖物坐标信息
Vue.prototype.$arrMapPoint = {
    all: [
        { id: 1, lamppostid: 1, lamppostname: "金融街设备1", longitude: 116.381212, latitude: 39.942161, height: 40.275, isUpside: 1, haveLcd: 0 },
        { id: 2, lamppostid: 2, lamppostname: "金融街设备2", longitude: 116.383604, latitude: 39.941141, height: 40.275, isUpside: 0, haveLcd: 0 },
        { id: 3, lamppostid: 3, lamppostname: "金融街设备3", longitude: 116.388411, latitude: 39.943683, height: 40.28, isUpside: 1, haveLcd: 0 },
        { id: 4, lamppostid: 4, lamppostname: "金融街设备4", longitude: 116.385868, latitude: 39.944497, height: 40.1, isUpside: 0, haveLcd: 0 },
        { id: 11, lamppostid: 11, lamppostname: "金融街设备11", longitude: 116.381694, latitude: 39.944952, height: 32.7, isUpside: 1, haveLcd: 0 },
        { id: 12, lamppostid: 12, lamppostname: "金融街设备12", longitude: 116.37856, latitude: 39.943397, height: 33, isUpside: 0, haveLcd: 0 },
        { id: 13, lamppostid: 13, lamppostname: "金融街设备13", longitude: 116.385975, latitude: 39.942303, height: 34.6, isUpside: 1, haveLcd: 0 },
        { id: 14, lamppostid: 14, lamppostname: "金融街设备14", longitude: 116.384205, latitude: 39.943611, height: 35, isUpside: 0, haveLcd: 0 },
        { id: 9, lamppostid: 9, lamppostname: "金融街设备9", longitude: 116.381428, latitude: 39.945024, height: 33, isUpside: 1, haveLcd: 0 },
        { id: 10, lamppostid: 10, lamppostname: "金融街设备10", longitude: 116.386565, latitude: 39.939177, height: 33, isUpside: 0, haveLcd: 0 },
        { id: 5, lamppostid: 5, lamppostname: "金融街设备5", longitude: 116.389312, latitude: 39.94051, height: 31.2, isUpside: 1, haveLcd: 1 },
        { id: 6, lamppostid: 6, lamppostname: "金融街设备6", longitude: 116.39341, latitude: 39.942541, height: 31.3, isUpside: 0, haveLcd: 1 },
        { id: 7, lamppostid: 7, lamppostname: "金融街设备7", longitude: 116.385964, latitude: 39.94139, height: 32.3, isUpside: 1, haveLcd: 0 },
        { id: 8, lamppostid: 8, lamppostname: "金融街设备8", longitude: 116.386823, latitude: 39.940822, height: 32.3, isUpside: 0, haveLcd: 0 }
    ],
    broadcast: [
        { id: 3, lamppostid: 3, lamppostname: "E-005", longitude: 119.778979, latitude: 34.165867, height: 26, deviceType: "7" },
        { id: 4, lamppostid: 4, lamppostname: "E-004", longitude: 119.774816, latitude: 34.16608, height: 25, deviceType: "7" },
        { id: 5, lamppostid: 5, lamppostname: "E-003", longitude: 119.78473, latitude: 34.168175, height: 24, deviceType: "2,7" }
    ],
    lcd: [
        { id: 1, lamppostid: 1, lamppostname: "lcd设备1", longitude: 116.381212, latitude: 39.942161, height: 40.275, isUpside: 1, haveLcd: 0 },
        { id: 2, lamppostid: 2, lamppostname: "lcd设备2", longitude: 116.383604, latitude: 39.941141, height: 40.275, isUpside: 0, haveLcd: 0 },
        { id: 3, lamppostid: 3, lamppostname: "lcd设备3", longitude: 116.388411, latitude: 39.943683, height: 40.28, isUpside: 1, haveLcd: 0 },
        { id: 4, lamppostid: 4, lamppostname: "lcd设备4", longitude: 116.385868, latitude: 39.944497, height: 40.1, isUpside: 0, haveLcd: 0 },
        { id: 11, lamppostid: 11, lamppostname: "lcd设备11", longitude: 116.381694, latitude: 39.944952, height: 32.7, isUpside: 1, haveLcd: 0 },
        { id: 12, lamppostid: 12, lamppostname: "lcd设备12", longitude: 116.37856, latitude: 39.943397, height: 33, isUpside: 0, haveLcd: 0 },
        { id: 13, lamppostid: 13, lamppostname: "lcd设备13", longitude: 116.385975, latitude: 39.942303, height: 34.6, isUpside: 1, haveLcd: 0 },
        { id: 14, lamppostid: 14, lamppostname: "lcd设备14", longitude: 116.384205, latitude: 39.943611, height: 35, isUpside: 0, haveLcd: 0 },
        { id: 9, lamppostid: 9, lamppostname: "lcd设备9", longitude: 116.381428, latitude: 39.945024, height: 33, isUpside: 1, haveLcd: 0 },
        { id: 10, lamppostid: 10, lamppostname: "lcd设备10", longitude: 116.386565, latitude: 39.939177, height: 33, isUpside: 0, haveLcd: 0 },
        { id: 5, lamppostid: 5, lamppostname: "lcd设备5", longitude: 116.389312, latitude: 39.94051, height: 31.2, isUpside: 1, haveLcd: 1 },
        { id: 6, lamppostid: 6, lamppostname: "lcd设备6", longitude: 116.39341, latitude: 39.942541, height: 31.3, isUpside: 0, haveLcd: 1 },
        { id: 7, lamppostid: 7, lamppostname: "lcd设备7", longitude: 116.385964, latitude: 39.94139, height: 32.3, isUpside: 1, haveLcd: 0 },
        { id: 8, lamppostid: 8, lamppostname: "lcd设备8", longitude: 116.386823, latitude: 39.940822, height: 32.3, isUpside: 0, haveLcd: 0 }
    ],
    visualIntercom: []
};

//创建覆盖物
Vue.prototype.$creatMapPoint = (that, toName, typeName) => {
    const arrImgUrl = [
        './static/data/image/light_',
        './static/data/image/evm_',
        './static/data/image/led_',
        './static/data/image/jkq_',
        './static/data/image/broadcast_'
    ];
    // 地图图标配置
    let imageConfig = {
        noSelect: {
            width: 36,
            height: 60,
            offsetX: 0,
            offsetY: -58
        },
        isSelect: {
            width: 88,
            height: 154,
            offsetX: 0,
            offsetY: -143
        }
    };

    //如果存在覆盖物 则移除所有覆盖物
    Vue.prototype.workCover ? Vue.prototype.workCover.destroy() : null;

    //设置覆盖物图标
    let sImgUrl = arrImgUrl[0];
    //设置覆盖物坐标
    let sMapPoint = [];
    switch (toName) {
        case 'index':
        case 'lightpole':
            if (typeName === "Concentrated") {
                sImgUrl = arrImgUrl[3];
                sMapPoint = sessionStorage.jizhong ? JSON.parse(sessionStorage.jizhong) : [];

                imageConfig.isSelect.height = 97;
                imageConfig.isSelect.offsetY = -75;
            } else {
                sImgUrl = arrImgUrl[0];
                sMapPoint = sessionStorage.lightpole ? JSON.parse(sessionStorage.lightpole) : [];
            }
            break;
        case 'environment':
            sImgUrl = arrImgUrl[1];
            sMapPoint = sessionStorage.environment ? JSON.parse(sessionStorage.environment) : [];

            imageConfig.noSelect.width = 26;
            imageConfig.noSelect.offsetX = 5;

            imageConfig.isSelect.width = 72;
            imageConfig.isSelect.offsetX = 8;
            imageConfig.isSelect.offsetY = -138;
            break;
        case 'led':
            sImgUrl = arrImgUrl[2];
            sMapPoint = sessionStorage.led ? JSON.parse(sessionStorage.led) : [];

            imageConfig.noSelect.width = 24;
            imageConfig.noSelect.offsetX = 5;

            imageConfig.isSelect.width = 66;
            imageConfig.isSelect.offsetX = 8;
            imageConfig.isSelect.offsetY = -145;
            break;
        case 'broadcast':
            sImgUrl = arrImgUrl[4];
            sMapPoint = sessionStorage.broadcast ? JSON.parse(sessionStorage.broadcast) : [];

            imageConfig.noSelect.width = 24;
            imageConfig.noSelect.offsetX = 5;

            imageConfig.isSelect.width = 66;
            imageConfig.isSelect.offsetX = 8;
            imageConfig.isSelect.offsetY = -145;
            break;
        case 'lcd':
            sImgUrl = arrImgUrl[2];
            sMapPoint = Vue.prototype.$arrMapPoint.lcd;
            break;
        case 'visualIntercom':
            sImgUrl = arrImgUrl[3];
            sMapPoint = Vue.prototype.$arrMapPoint.all;
            break;
        default:
            sImgUrl = arrImgUrl[0];
            sMapPoint = sessionStorage.lightpole ? JSON.parse(sessionStorage.lightpole) : [];
            break;
    }
    let statusImg = {
        on: {
            isSelect: `${sImgUrl}g_s.png`,
            noSelect: `${sImgUrl}g_ns.png`
        },
        off: {
            isSelect: `${sImgUrl}w_s.png`,
            noSelect: `${sImgUrl}w_ns.png`
        },
        offline: {
            isSelect: `${sImgUrl}o_s.png`,
            noSelect: `${sImgUrl}o_ns.png`
        },
        warning: {
            isSelect: `${sImgUrl}r_s.png`,
            noSelect: `${sImgUrl}r_ns.png`
        },
        abnormal: {
            isSelect: `${sImgUrl}z_s.png`,
            noSelect: `${sImgUrl}z_ns.png`
        }
    };
    // console.log(statusImg, imageConfig);

    let workCover = new mapCover.WorkCover(statusImg, imageConfig);
    workCover.crate("billboard", {
        isCluster: true,
        clickUpdate: true,
        heightControl: {
            open: true,
            height: 300
        }
    });
    for (let i = 0; i < sMapPoint.length; i++) {
        let coordinates = sMapPoint[i];
        let AddState = ''
        if (store.state.nowTagName == 'jizhong' && store.state.websocket[220005]) {
            for (let s = 0; s < store.state.websocket[220005].msg.controllers.length; s++) {
                if (sMapPoint[i].id == store.state.websocket[220005].msg.controllers[s].controllerid) {
                    if (store.state.websocket[220005].msg.controllers[s].state) {
                        AddState = 'on'
                    } else {
                        AddState = 'offline'
                    }
                }
            }
        }
        let statusNew = ''
        if (store.state.nowTagName == 'lightpole') {
            statusNew = AddState != '' ? AddState : "abnormal"
        } else {
            statusNew = AddState != '' ? AddState : "offline"
        }

        workCover.addBillboard(
            coordinates, {
                status: statusNew,
                select: "noSelect"
            }, {
                click: function(entity) {
                    store.state.isClick = true;
                    setTimeout(() => {
                        store.state.isClick = false;
                    }, 1000);
                    store.state.selectId = coordinates.id;
                    store.state.selectBoolean = 'isSelect';
                    // 3D覆盖物名牌位置切换
                    // $('.map_lp_name').stop().animate({
                    //     'marginTop': '-90px'
                    // });
                    // $('.' + coordinates.id).stop().animate({
                    //     'marginTop': '-150px'
                    // });
                    store.dispatch("setSingleIsShow", true);
                    mapWork.locationByJWD({
                        jd: sMapPoint[i].longitude,
                        wd: sMapPoint[i].latitude,
                        gd: sMapPoint[i].height,
                        cameraHeight: 60,
                        heading: 25,
                        pitch: -45,
                        duration: 1
                    });
                    switch (toName) {
                        case "environment":
                            if (that.$refs.rview.$refs.overview) {
                                that.$refs.rview.$refs.overview.leave()
                            } else if (that.$refs.rview.$refs.singleDevice && store.state.loctionId !== sMapPoint[i].lamppostid) {
                                that.$refs.rview.evmOutIn();
                            }
                            setTimeout(() => {
                                store.dispatch('setLoctionName', 'sd');
                                store.dispatch('setLoctionId', sMapPoint[i].lamppostid);
                            }, 600);
                            break;
                        case "lightpole":
                            if (store.state.loctionId !== sMapPoint[i].lamppostid) {
                                setTimeout(() => {
                                    store.dispatch('setLoctionId', sMapPoint[i].lamppostid);
                                }, 600);
                                that.$refs.rview.showSc(sMapPoint[i].lamppostid);
                            }
                            break;
                        case "led":
                            if (store.state.loctionId !== sMapPoint[i].lamppostid) {
                                setTimeout(() => {
                                    store.dispatch('setLoctionId', sMapPoint[i].lamppostid);
                                }, 600);
                                that.$refs.rview.showSc(sMapPoint[i].lamppostid);
                            }
                            break;
                        case "broadcast":
                            if (store.state.loctionId !== sMapPoint[i].lamppostid) {
                                // store.state.loctionName !== 'sd' ?
                                //     that.$refs.rview.showSd() :
                                //     that.$refs.rview.$refs.broadcontrol.sdOutIn();
                                setTimeout(() => {
                                    store.dispatch('setLoctionId', sMapPoint[i].lamppostid);
                                }, 600);
                                that.$refs.rview.showSc(sMapPoint[i].lamppostid);
                            }
                            break;
                        case "lcd":
                            if (store.state.loctionId !== sMapPoint[i].lamppostid) {
                                store.state.loctionName !== 'sd' ?
                                    that.$refs.rview.checklcd() :
                                    that.$refs.rview.$refs.lcdcontrol.sdOutIn();
                            }
                            break;
                        case "visualIntercom":
                            that.$refs.rview.showSc(sMapPoint[i].lamppostid);
                            break;
                        default:
                    }
                    setTimeout(() => {
                        store.dispatch('setLoctionName', 'sd');
                        store.dispatch('setLoctionId', sMapPoint[i].lamppostid);
                    }, 600);
                },
                id: sMapPoint[i].lamppostid,
                text: sMapPoint[i].lamppostname,
                divPointHtml: `<div><div class='map_lp_name ${sMapPoint[i].lamppostid}'>${sMapPoint[i].lamppostname}</div></div>`,
            }
        );
        var forceCluster = function() {
            if (workCover.dataSource && workCover.dataSource.clustering) {
                workCover.dataSource.clustering.pixelRange = 0;
                workCover.dataSource.clustering.pixelRange = 20;
            }
        };
        let t = setInterval(forceCluster);
        setTimeout(function() {
            clearInterval(t)
        }, 2000);
        // setInterval(forceCluster, 300);
        // setTimeout(forceCluster, 300);
        // setTimeout(forceCluster, 500);
        // setTimeout(forceCluster, 700);
    }

    //将生成的地图实例挂载到Vue上
    Vue.prototype.workCover = workCover;
};

//点击离线列表 //金融街
Vue.prototype.$sdClick = (sdId, toName, typeName) => {
    if (!sdId) { //如果id不存在则不向下执行
        return false
    }
    let that = Vue.prototype.$that;
    store.state.isClick = true;
    setTimeout(() => {
        store.state.isClick = false;
    }, 1000);
    store.state.selectId = sdId;
    store.state.selectBoolean = 'isSelect';
    // 3D覆盖物名牌位置切换
    // $('.map_lp_name').stop().animate({
    //     'marginTop': '-90px'
    // });
    // $('.' + coordinates.id).stop().animate({
    //     'marginTop': '-150px'
    // });
    store.dispatch("setSingleIsShow", true);
    //设置覆盖物坐标
    let sMapPoint = [];
    let nowSMapPoint = {};
    switch (toName) {
        case 'index':
        case 'lightpole':
            if (typeName === "jizhong") {
                sMapPoint = sessionStorage.jizhong ? JSON.parse(sessionStorage.jizhong) : [];
            } else {
                sMapPoint = sessionStorage.lightpole ? JSON.parse(sessionStorage.lightpole) : [];
            }
            break;
        case 'environment':
            sMapPoint = sessionStorage.environment ? JSON.parse(sessionStorage.environment) : [];
            break;
        case 'led':
            sMapPoint = sessionStorage.led ? JSON.parse(sessionStorage.led) : [];
            break;
        case 'broadcast':
            sMapPoint = sessionStorage.broadcast ? JSON.parse(sessionStorage.broadcast) : [];
            break;
        case 'lcd':
            sMapPoint = Vue.prototype.$arrMapPoint.lcd;
            break;
        case 'visualIntercom':
            sMapPoint = Vue.prototype.$arrMapPoint.visualIntercom;
            break;
        default:
            sMapPoint = Vue.prototype.$arrMapPoint.all;
            break;
    }
    for (let item of sMapPoint) {
        if (item.id === sdId) {
            nowSMapPoint = item
        }
    }

    // console.log(nowSMapPoint)

    mapWork.locationByJWD({
        jd: nowSMapPoint.longitude,
        wd: nowSMapPoint.latitude,
        gd: nowSMapPoint.height,
        cameraHeight: 60,
        heading: 25,
        pitch: -45,
        duration: 1
    });
    switch (toName) {
        case "environment":
            if (that.$refs.rview.$refs.overview) {
                that.$refs.rview.$refs.overview.leave()
            } else if (that.$refs.rview.$refs.singleDevice && store.state.loctionId !== nowSMapPoint.lamppostid) {
                that.$refs.rview.evmOutIn();
            }
            break;
        case "lightpole":
            that.$refs.rview.showSc(nowSMapPoint.lamppostid);
            break;
        case "led":
            that.$refs.rview.showSc(nowSMapPoint.lamppostid);
            break;
        case "broadcast":
            // if (store.state.loctionId !== nowSMapPoint.lamppostid) {
            //         store.state.loctionName !== 'sd' ? that.$refs.rview.showSd() : that.$refs.rview.$refs.broadcontrol.sdOutIn();
            // }
            that.$refs.rview.showSc(nowSMapPoint.lamppostid);
            break;
        case "lcd":
            if (store.state.loctionId !== nowSMapPoint.lamppostid) {
                store.state.loctionName !== 'sd' ?
                    that.$refs.rview.checklcd() :
                    that.$refs.rview.$refs.lcdcontrol.sdOutIn();
            }
            break;
        case "visualIntercom":
            that.$refs.rview.showSc(nowSMapPoint.lamppostid);
            break;
        default:
    }
    setTimeout(() => {
        store.dispatch('setLoctionName', 'sd');
        store.dispatch('setLoctionId', nowSMapPoint.lamppostid);
    }, 600);
};

//重置地图高度
Vue.prototype.$resetMapHeight = () => {
    mapWork.locationByJWD({
        jd: 116.669789,
        wd: 40.294119,
        gd: 30,
        cameraHeight: 3000,
        heading: 5,
        pitch: -50,
        duration: 1
    });
    Vue.prototype.workCover ? Vue.prototype.workCover.revertBillboardsStatus() : null;
    store.state.selectId = 0;
    store.state.last = 0;
    store.state.now = 0;
    store.state.loctionId = 0;
    store.state.loctionName = 'ov';
    store.state.selectBoolean = 'noSelect';
};

//获取websocket数据
Vue.prototype.$getWebsocketData = function getWebsocketData(modulecode) {
    let data = {
        msgid: "",
        modulecode: modulecode,
        msgtype: 2,
        msgcode: 200000,
        timestamp: this.$getCurrentDate(),
        msg: {}
    };
    this.ws.sendSock(data, res => {
        if (Vue.prototype.workCover) {
            if (res.msgcode === 230015) { //智能广播
                for (let i = 0; i < res.msg.groups.length; i++) {
                    for (let s = 0; s < res.msg.groups[i].bcsts.length; s++) {
                        let State = '';
                        if (res.msg.groups[i].bcsts[s].state) {
                            if (res.msg.groups[i].bcsts[s].onoff) {
                                State = 'on'
                            } else {
                                State = 'off'
                            }
                        } else {
                            State = 'offline'
                        }

                        if (res.msg.groups[i].bcsts[s].lamppostid === store.state.selectId) {
                            this.workCover ? Vue.prototype.workCover.changeBillBoardstatusAttr(res.msg.groups[i].bcsts[s].lamppostid, State, store.state.selectBoolean) : null;
                        } else {
                            this.workCover ? Vue.prototype.workCover.changeBillBoardstatusAttr(res.msg.groups[i].bcsts[s].lamppostid, State, 'noSelect') : null;
                        }
                    }
                }
            } else if (res.msgcode === 230001) { //lcd
                for (let i = 0; i < res.msg.groupsLcd.length; i++) {
                    for (let s = 0; s < res.msg.groupsLcd[i].lcds.length; s++) {
                        let State = '';
                        if (res.msg.groupsLcd[i].lcds[s].status) {
                            if (res.msg.groupsLcd[i].lcds[s].onoff) {
                                State = 'on'
                            } else {
                                State = 'off'
                            }
                        } else {
                            State = 'offline'
                        }
                        if (res.msg.groupsLcd[i].lcds[s].id === store.state.selectId) {
                            this.workCover ? Vue.prototype.workCover.changeBillBoardstatusAttr(res.msg.groupsLcd[i].lcds[s].id, State, store.state.selectBoolean) : null;
                        } else {
                            this.workCover ? Vue.prototype.workCover.changeBillBoardstatusAttr(res.msg.groupsLcd[i].lcds[s].id, State, 'noSelect') : null;
                        }
                    }
                }
            } else if (res.msgcode === 230011) { //led
                for (let i = 0; i < res.msg.groups.length; i++) {
                    for (let s = 0; s < res.msg.groups[i].leds.length; s++) {
                        let State = '';
                        if (res.msg.groups[i].leds[s].online) {
                            if (res.msg.groups[i].leds[s].onoff) {
                                State = 'on'
                            } else {
                                State = 'off'
                            }
                        } else {
                            State = 'offline'
                        }

                        if (res.msg.groups[i].leds[s].lamppostid === store.state.selectId) {
                            this.workCover ? Vue.prototype.workCover.changeBillBoardstatusAttr(res.msg.groups[i].leds[s].lamppostid, State, store.state.selectBoolean) : null;
                        } else {
                            this.workCover ? Vue.prototype.workCover.changeBillBoardstatusAttr(res.msg.groups[i].leds[s].lamppostid, State, 'noSelect') : null;
                        }

                    }
                }
            } else if (res.msgcode === 240001) { //环测
                for (let i = 0; i < res.msg.frt.length; i++) {
                    let State = '';
                    if (res.msg.frt[i].state) {
                        State = 'on'
                    } else {
                        State = 'offline'
                    }

                    if (res.msg.frt[i].lamppostid === store.state.selectId) {
                        this.workCover ? Vue.prototype.workCover.changeBillBoardstatusAttr(res.msg.frt[i].lamppostid, State, store.state.selectBoolean) : null;
                    } else {
                        this.workCover ? Vue.prototype.workCover.changeBillBoardstatusAttr(res.msg.frt[i].lamppostid, State, 'noSelect') : null;
                    }

                }
            } else if (res.msgcode === 220002 && store.state.nowTagName === 'lightpole') { //灯杆
                let loops = res.msg.groups;
                for (let i = 0; i < loops.length; i++) {
                    for (let s = 0; s < loops[i].lampposts.length; s++) {
                        let State = '';

                        switch (loops[i].lampposts[s].lamppoststate) {
                            case 0:
                                State = 'off';
                                break;
                            case 1:
                                State = 'on';
                                break;
                            case 2:
                                State = 'on';
                                break;
                            case 3:
                                State = 'offline';
                                break;
                            case 9:
                                State = 'abnormal';
                                break;
                        }

                        if (loops[i].lampposts[s].lamppostid === store.state.selectId) {
                            this.workCover ? Vue.prototype.workCover.changeBillBoardstatusAttr(loops[i].lampposts[s].lamppostid, State, store.state.selectBoolean) : null;
                        } else {
                            this.workCover ? Vue.prototype.workCover.changeBillBoardstatusAttr(loops[i].lampposts[s].lamppostid, State, 'noSelect') : null;
                        }

                    }
                }
            } else if (res.msgcode === 220005 && store.state.nowTagName === 'jizhong') { //集控器
                let controllers = res.msg.controllers;
                for (let i = 0; i < controllers.length; i++) {
                    let State = '';
                    if (controllers[i].state) {
                        State = 'on'
                    } else {
                        State = 'offline'
                    }

                    if (controllers[i].controllerid === store.state.selectId) {
                        this.workCover ? Vue.prototype.workCover.changeBillBoardstatusAttr(controllers[i].controllerid, State, store.state.selectBoolean) : null;
                    } else {
                        this.workCover ? Vue.prototype.workCover.changeBillBoardstatusAttr(controllers[i].controllerid, State, 'noSelect') : null;
                    }

                }
            }
        }
        store.dispatch('getWebsocketData', res)
    });
};

//modulecode ws请求代码
Vue.prototype.modulecode = {
    "index": 103004,
    "login": 0,
    "analysis": 0,
    "monitor": 0,
    "lightpole": 102001,
    "environment": 104001,
    "led": 103002,
    "broadcast": 103003,
    "lcd": 103001,
    "visualIntercom": 0
};

Vue.prototype.msgcode = {
    "first": 200000,
    "index": [201001, 201999], //首页
    "site": [202001, 202999], //站台管理
    "illumine": [203001, 203999], //照明管理
    "lcd": [204001, 204999], //LCD
    "led": [205001, 205999], //LED
    "electricity": [206001, 206999], //用电管理
    "alarm": [207001, 207999], //告警
    "statistics": [208001, 208999] //统计分析
};

//告警滚动
Vue.prototype.$alertScroll = function(dom, sHeight, sSpeed, sDelay) {
    dom.style.top = 0;

    function sIscroll() {
        let timer = setInterval(() => {
            let sulH = parseInt(dom.style.top);
            if (sulH > -sHeight) {
                sulH--;
                dom.style.top = sulH + "px";
                if (sulH <= -sHeight) {
                    let fristLi = dom.children;
                    dom.appendChild(fristLi[0]);
                    dom.style.top = 0;
                    clearInterval(timer);
                    setTimeout(() => {
                        sIscroll()
                    }, sDelay)
                }
            }
        }, sSpeed);
    }

    sIscroll();
};

// 获取当前时间
Vue.prototype.$getCurrentDate = function getCurrentDate(time) {
    let date = time ? new Date(time) : new Date();
    let Y = date.getFullYear() + "-";
    let M =
        (date.getMonth() + 1 < 10 ?
            "0" + (date.getMonth() + 1) :
            date.getMonth() + 1) + "-";
    let D = ('0' + date.getDate()).slice(-2) + " ";
    let h = ('0' + date.getHours()).slice(-2) + ":";
    let m = ('0' + date.getMinutes()).slice(-2) + ":";
    let s = ('0' + date.getSeconds()).slice(-2);
    return Y + M + D + h + m + s;
};

// 风-等级
Vue.prototype.$metres2Grade = (metres) => {
    var grade = metres;

    if (metres <= 0.2) {
        grade = 0;
    } else if (metres > 0.2 && metres <= 1.5) {
        grade = 1;
    } else if (metres > 1.5 && metres <= 3.3) {
        grade = 2;
    } else if (metres > 3.3 && metres <= 5.4) {
        grade = 3;
    } else if (metres > 5.4 && metres <= 7.9) {
        grade = 4;
    } else if (metres > 7.9 && metres <= 10.7) {
        grade = 5;
    } else if (metres > 10.7 && metres <= 13.8) {
        grade = 6;
    } else if (metres > 13.8 && metres <= 17.1) {
        grade = 7;
    } else if (metres > 17.1 && metres <= 20.7) {
        grade = 8;
    } else if (metres > 20.7 && metres <= 24.4) {
        grade = 9;
    } else if (metres > 24.4 && metres <= 28.4) {
        grade = 10;
    } else if (metres > 28.4 && metres <= 32.6) {
        grade = 11;
    } else if (metres > 32.6 && metres < 36.9) {
        grade = 12;
    } else {
        grade = 0;
    }

    return grade;
};

// 风-方向
Vue.prototype.$degree2Direction = (degree) => {
    var dir;

    degree = parseFloat(degree);
    if (degree >= 337.5 || degree < 22.5) {
        dir = "北";
    } else if (degree >= 22.5 && degree < 67.5) {
        dir = "东北";
    } else if (degree >= 67.5 && degree < 112.5) {
        dir = "东";
    } else if (degree >= 112.5 && degree < 157.5) {
        dir = "东南";
    } else if (degree >= 157.5 && degree < 202.5) {
        dir = "南";
    } else if (degree >= 202.5 && degree < 247.5) {
        dir = "西南";
    } else if (degree >= 247.5 && degree < 292.5) {
        dir = "西";
    } else if (degree >= 292.5 && degree < 337.5) {
        dir = "西北";
    } else {
        dir = '无';
    }

    return dir;
};