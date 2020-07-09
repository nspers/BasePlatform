import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

const state = {
    mainState: true,
    toggle: false,
    websocket: {},
    loctionId: 0,
    loctionName: "",
    nowTagName: "lightpole",
    singleIsShow: false,
    blank: 1,
    selectId: null,
    selectBoolean: 'noSelect',
    checkedArray: {},
    isClick: false,
    bcSwitch: 0,
};
const getters = {
    getMain(state) {
        return state.mainState
    },
    websocketData(state) {
        return state.websocket
    },
    getLoctionId(state) {
        return state.loctionId
    },
    getLoctionName(state) {
        return state.loctionName
    },
    getSingleIsShow(state) {
        return state.singleIsShow
    },
    getBlank(state) {
        return state.blank
    },
    getcheckedArray(state) {
        return state.checkedArray
    }
};
const mutations = {
    changeMain(state) {
        state.mainState = !state.mainState
    },
    toggleNav(state) {
        state.toggle = !state.toggle
    },
    get_WebsocketData(state, data) {
        if (data.msgcode) {
            state.websocket[data.msgcode] = {};
            state.websocket[data.msgcode] = data;
            Vue.set(state.websocket, 0, data);
            delete state.websocket[0];
            // console.log(state.websocket);
        }
    },
    LOCTIONID(state, id) {
        state.loctionId = id;
    },
    LOCTIONNAME(state, name) {
        state.loctionName = name;
    },
    NOWTAGNAME(state, name) {
        state.nowTagName = name;
    },
    SINGLEISSHOW(state, target) {
        state.singleIsShow = target;
    },
    BLANK(state, data) {
        state.blank = data;
    },
};
const actions = {
    comMain(context) {
        context.commit('true')
    },
    getWebsocketData({ commit }, data) {
        commit("get_WebsocketData", data);
    },
    setLoctionId({ commit }, id) {
        commit("LOCTIONID", id)
    },
    setLoctionName({ commit }, name) {
        commit("LOCTIONNAME", name)
    },
    setNowTagName({ commit }, target) {
        commit("NOWTAGNAME", target)
    },
    setSingleIsShow({ commit }, target) {
        commit("SINGLEISSHOW", target)
    },
    setBlank({ commit }, data) {
        commit("BLANK", data)
    },
};

const store = new Vuex.Store({
    state, getters, mutations, actions
});

export default store;
