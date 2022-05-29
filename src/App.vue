<template>
  <div id="app">
    <Header/>
    <router-view></router-view>
    <!-- Footer组件在Home 和Search显示，在登录和注册隐藏 -->
    <!-- 方法一：借助$route.path -->
    <!-- <Footer v-show="$route.path=='/home'||$route.path=='/search'"></Footer> -->
    <!-- 方法二：在路由元信息中meta里进行设置 -->
    <Footer v-show="$route.meta.show"></Footer>
  </div>
</template>

<script>
import Header from './components/Header';
import Footer from './components/Footer';
export default {
  name: 'App',
  components: {
    Header,
    Footer
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
