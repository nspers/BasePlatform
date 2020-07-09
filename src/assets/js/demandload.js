import Vue from 'vue'
import { Button, Loading, Message, Slider, Switch, DatePicker, Pagination, Timeline, TimelineItem, Select, Option, Input, RadioGroup, Radio, Badge, Progress, Form, FormItem, Autocomplete, Notification, MessageBox,Menu,Submenu,MenuItem,MenuItemGroup } from 'element-ui'
const Element = {
    install: function (Vue) {
        Vue.use(Button);
        Vue.use(Loading);
        Vue.component(Message);
        Vue.use(DatePicker);
        Vue.use(Slider);
        Vue.use(Switch);
        Vue.use(Pagination);
        Vue.use(Timeline);
        Vue.use(TimelineItem);
        Vue.use(Select);
        Vue.use(Option);
        Vue.use(Input);
        Vue.use(RadioGroup);
        Vue.use(Radio);
        Vue.use(Badge);
        Vue.use(Progress);
        Vue.use(Form);
        Vue.use(FormItem);
        Vue.use(Autocomplete);
        Vue.use(Menu);
        Vue.use(Submenu);
        Vue.use(MenuItem);
        Vue.use(MenuItemGroup);
    }
}
Vue.prototype.$Message = Message
Vue.prototype.$notify = Notification
Vue.prototype.$msgbox = MessageBox
Vue.prototype.$confirm = MessageBox.confirm
export default Element

