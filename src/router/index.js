import Vue from 'vue'
import Router from 'vue-router'
import store from '../store'
Vue.use(Router);

const router = new Router({
    mode: 'history',
    routes: [
        {
            path: '/',
            name: 'index',
            meta: {
                keepAlive: false
            },
            component: (resolve) => require(['@/views/index/index'], resolve)
        },
        // {
        //     path: '/',
        //     name: 'index',
        //     meta: {
        //         keepAlive: true
        //     },
        //     component: (resolve) => require(['@/views/index/index'], resolve)
        // },
        {
            path: '/login',
            name: 'login',
            meta: {
                keepAlive: false
            },
            component: (resolve) => require(['@/views/login/login'], resolve)

        },
        {
            path: '/analysis',
            name: 'analysis',
            meta: {
                keepAlive: true
            },
            component: (resolve) => require(['@/views/analysis'], resolve), //数据分析

        },
        {
            path: '/warningAnalysis',
            name: 'warningAnalysis',
            meta: {
                keepAlive: true
            },
            component: (resolve) => require(['@/views/warningAnalysis'], resolve), //告警分析

        },
        {
            path: '/lightingAnalysis',
            name: 'lightingAnalysis',
            meta: {
                keepAlive: true
            },
            component: (resolve) => require(['@/views/lightingAnalysis'], resolve), //照明统计

        },
        {
            path: '/monitor',
            name: 'monitor',
            meta: {
                keepAlive: true
            },
            component: (resolve) => require(['@/views/monitor'], resolve), //监测预警

        },
        {
            path: '/event',
            name: 'event',
            meta: {
                keepAlive: true
            },
            component: (resolve) => require(['@/views/event'], resolve), //事件管理
        },
        {
            path: '/lightpole',
            name: 'lightpole',
            meta: {
                keepAlive: true
            },
            component: (resolve) => require(['@/views/lightpole/lightpole'], resolve) //智能灯杆
        },
        {
            path: '/environment',
            name: 'environment',
            meta: {
                keepAlive: true
            },
            component: (resolve) => require(['@/views/environment/environment'], resolve) //环境监测
        },
        {
            path: '/singleDevice',
            name: 'singleDevice',
            meta: {
                keepAlive: true
            },
            component: (resolve) => require(['@/views/environment/single_device'], resolve)
        },
        {
            path: '/broadcast',
            name: 'broadcast',
            meta: {
                keepAlive: true
            },
            component: (resolve) => require(['@/views/broadcast/broadcast'], resolve) //智能广播
        },
        {
            path: '/lcd',
            name: 'lcd',
            meta: {
                keepAlive: true
            },
            component: (resolve) => require(['@/views/lcd/lcd'], resolve) //lcd
        },
        {
            path: '/led',
            name: 'led',
            meta: {
                keepAlive: true
            },
            component: (resolve) => require(['@/views/led/led'], resolve) //led
        },
        {
            path: '/singleControl',
            name: 'singleControl',
            meta: {
                keepAlive: true
            },
            component: (resolve) => require(['@/views/singleControl/singleControl'], resolve) //点选灯杆
        },
        {
            path: '/checkcontrol',
            name: 'checkcontrol',
            meta: {
                keepAlive: true
            },
            component: (resolve) => require(['@/views/checkcontrol/checkcontrol'], resolve) //点选控制器
        },
        {
            path: '/alarm',
            name: 'alarm',
            meta: {
                keepAlive: true
            },
            component: (resolve) => require(['@/views/alarm/alarm'], resolve) //一建告警
        },
        {
            path: '/alarmlog',
            name: 'alarmlog',
            meta: {
                keepAlive: true
            },
            component: (resolve) => require(['@/views/alarmlog/alarmlog'], resolve) //公共安全 报警记录
        },
        {
            path: '/videoinfo',
            name: 'videoinfo',
            meta: {
                keepAlive: true
            },
            component: (resolve) => require(['@/views/alarmlog/videoinfo'], resolve) //公共安全 报警记录 视频
        },
        {
            path: '/visualIntercom',
            name: 'visualIntercom',
            meta: {
                keepAlive: true
            },
            component: (resolve) => require(['@/views/visualIntercom/visualIntercom'], resolve) //公共安全 可视对讲
        },
        {
            path: '/broadcast',
            name: 'broadcast',
            meta: {
                keepAlive: true
            },
            component: (resolve) => require(['@/views/broadcast/broadcast'], resolve) //智能广播
        },
        {
            path: '/video',
            name: 'video',
            meta: {
                keepAlive: true
            },
            component: (resolve) => require(['@/views/video/video'], resolve) //视频监控
        },
        {
            path: "*",
            name: "error",
            component: (resolve) => require(['@/views/error'], resolve)
        }
    ]
});


router.beforeEach((to, from, next) => {
    function Next(){
    //搜索匹配
    switch (to.name) {
        case "lightpole":
            store.dispatch('setNowTagName', 'lightpole');
            break;
        case "environment":
            store.dispatch('setNowTagName', 'environment');
            break;
        case "led":
            store.dispatch('setNowTagName', 'led');
            break;
        case "broadcast":
            store.dispatch('setNowTagName', 'broadcast');
            break;
        case "lcd":
            store.dispatch('setNowTagName', 'lcd');
            break;
        case "visualIntercom":
            store.dispatch('setNowTagName', 'visualIntercom');
            break;
        default:
            store.dispatch('setNowTagName', 'lightpole');
            break;
    }
    store.state.selectId = null;
    //路由变化时根据 modulecode 请求 ws数据
    let modulecode = Vue.prototype.modulecode[to.name];
    // console.log('modulecode:', modulecode);
    if (modulecode) {
        store.state.websocket = {};
        Vue.prototype.$getWebsocketData(modulecode);
        //路由变化时重置地图高度
        Vue.prototype.$resetMapHeight();
        //切换板块更换车站图标
        if(Vue.prototype.workCover&&to.name!=='alarm'&&to.name!=='statistics') {
            Vue.prototype.$creatMapPoint(Vue.prototype.$that, to.name);
        }
    }
    store.dispatch('setLoctionName', 'ov');
    // console.log(from);
    
    if (to.meta.keepAlive && from.name != 'index' && from.name != null && to.name !== 'analysis' && to.name !== 'monitor' && to.name !== 'event') {
        Vue.prototype.$creatMapPoint(Vue.prototype.$that, to.name);
        store.state.singleIsShow = false
    }
    //路由变化时重置地图高度
    Vue.prototype.$resetMapHeight();
    
    next()
    }

    if(to.path != '/login'){
        if(sessionStorage.login != undefined && sessionStorage.login == 'true'){
            Next()
        }else{
            // next({name:'login',params:{reload:1}})
            next('/login')
        }
    }else if(sessionStorage.login != undefined && sessionStorage.login== 'true'){
        next('/')
    }else{
        Next()
    }
});
export default router