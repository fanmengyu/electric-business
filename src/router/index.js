import Vue from 'vue';
import VueRouter from 'vue-router';

let originPush = VueRouter.prototype.push;
let originReplace = VueRouter.prototype.replace;

//重写push|replace

VueRouter.prototype.push = function(location,reslove,reject){
    if(reslove && reject){
        originPush.call(this,location,reslove,reject);
    }else{
        originPush.call(this,location,() => {},() => {});
    }
}

VueRouter.prototype.replace = function(location,reslove,reject){
    if(reslove && reject){
        originReplace.call(this,location,reslove,reject);
    }else{
        originReplace.call(this,location,() => {},() => {});
    }
}

//使用插件，主要要使用Vue.use()
Vue.use(VueRouter);
const routes=[
    {
        path:"/home",
        component:(()=>import("@/pages/Home")),
        meta:{show:true}

    },
    {
        path:"/search/:keyword?",
        // 这里的？是正则， 表示params参数可传可不传
        component:(()=>import("@/pages/Search")),
        meta:{show:true},
        name:'search',
        // props:true, 布尔值写法
        // props:{a:1,b:2}, 对象写法
        props:($route) => {
            return {keyword:$route.params.keyword,k:$route.query.k}
        } //函数写法

    },
    {
        path:"/detail/:skuid",
        component:(()=>import("@/pages/Detail")),
        meta:{show:true}

    },
    {
        path:"/addcartsuccess",
        name:'addcartsuccess',
        component:(()=>import("@/pages/AddCartSuccess")),
        meta:{show:true}

    },
    {
        path:"/shopcart",
        component:(()=>import("@/pages/ShopCart")),
        meta:{show:true}

    },
    {
        path:"/login",
        component:(()=>import("@/pages/Login")),
        meta:{show:false}

    },
    {
        path:"/register",
        component:(()=>import("@/pages/Register")),
        meta:{show:false}
    },
    //重定向
    {
        path:'/',
        redirect:'/home'
    }
    ]
//配置路由
export default new VueRouter({
    routes,
    scrollBehavior(to, from, savePostion){
        return {y:0};
    }

})
