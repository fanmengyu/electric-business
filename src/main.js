import Vue from 'vue';
import App from './App.vue';

import TypeNav from '@/components/TypeNav';
import Carousel from '@/components/Carousel'
//第一个参数：全局组件的名字；第二个参数：哪一个组件
Vue.component(TypeNav.name,TypeNav)
Vue.component(Carousel.name,Carousel)
//引入路由
import router from '@/router';

import store from '@/store/index';
import {reqCategoryList} from '@/api/index';

reqCategoryList();
import '@/mock/mockServer';
//引入swiper样式
import 'swiper/css/swiper.css'

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  //注册路由
  router,
  //注册仓库：组件实例的身上会多一个属性 $store
  store
}).$mount('#app')
