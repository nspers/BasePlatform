"use strict";

// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.

import Vue from 'vue';
import Axios from 'axios';
import Element from './assets/js/demandload.js';
import 'element-ui/lib/theme-chalk/index.css';
import store from "../src/store";
import App from './App';
import './assets/css/components.scss';
import './assets/css/reset.css';
import './assets/js/common.js';
import api from './config';
import * as ws from './config/ws';
import router from './router';
import './assets/css/amap.css';


var echarts = require('echarts/lib/echarts');
require('echarts/lib/chart/bar');
require('echarts/lib/chart/line');
require('echarts/lib/chart/pie');

Vue.prototype.$axios = Axios;
Vue.prototype.ws = ws;
Vue.prototype.$api = api;
Vue.prototype.$echarts = echarts;
Vue.config.productionTip = false;
Vue.config.devtools = true;

Vue.use(api);
Vue.use(Element);

// UI
import sun from './icon/sun';
Vue.component('Sun', sun)
import wind from './icon/wind';
Vue.component('Wind', wind)//风速
import water from './icon/water';
Vue.component('Water', water)//湿度
import sound from './icon/sound';
Vue.component('Sound', sound)//噪音
import dashboard from './icon/dashboard';
Vue.component('Qiya', dashboard)//气压
import direction from './icon/direction';
Vue.component('Fenxiang', direction)//风向
import pm25 from './icon/pm25';
Vue.component('Pm25', pm25)//pm2.5
import pm10 from './icon/pm10';
Vue.component('Pm10', pm10)//pm10
import good from './icon/good';
Vue.component('Good', good)//优

/* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    Element,
    store,
    components: { App },
    template: '<App/>',
}).$mount('#app')
