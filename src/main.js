import Vue from 'vue';
import App from './App.vue';
import ElementUI from 'element-ui';

import 'element-ui/lib/theme-chalk/index.css';

import TypeNav from '@/components/TypeNav';
import Carousel from '@/components/Carousel'
import Pagination from '@/components/Pagination';
//第一个参数：全局组件的名字；第二个参数：哪一个组件
Vue.component(TypeNav.name,TypeNav)
Vue.component(Carousel.name,Carousel)
Vue.component(Pagination.name,Pagination)
//引入路由
import router from '@/router';

import store from '@/store/index';
import {reqGetSearchInfo} from '@/api';
// console.log(reqGetSearchInfo({}))
//统一接口appi文件夹里面全部请求
import * as API from '@/api'

import '@/mock/mockServer';
//引入swiper样式
import 'swiper/css/swiper.css'
Vue.use(ElementUI);
Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  //配置全局事件总线
  beforeCreate(){
    Vue.prototype.$bus = this;
    Vue.prototype.$API = API;
  },
  //注册路由
  router,
  //注册仓库：组件实例的身上会多一个属性 $store
  store
}).$mount('#app')
