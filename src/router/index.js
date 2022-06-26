import Vue from 'vue';
import VueRouter from 'vue-router';
import store from '@/store'

let originPush = VueRouter.prototype.push;
let originReplace = VueRouter.prototype.replace;

//重写push|replace

VueRouter.prototype.push = function (location, reslove, reject) {
    if (reslove && reject) {
        originPush.call(this, location, reslove, reject);
    } else {
        originPush.call(this, location, () => { }, () => { });
    }
}

VueRouter.prototype.replace = function (location, reslove, reject) {
    if (reslove && reject) {
        originReplace.call(this, location, reslove, reject);
    } else {
        originReplace.call(this, location, () => { }, () => { });
    }
}

//使用插件，主要要使用Vue.use()
Vue.use(VueRouter);
const routes = [
    {
        path: "/home",
        component: (() => import("@/pages/Home")),
        meta: { show: true }

    },
    {
        path: "/search/:keyword?",
        // 这里的？是正则， 表示params参数可传可不传
        component: (() => import("@/pages/Search")),
        meta: { show: true },
        name: 'search',
        // props:true, 布尔值写法
        // props:{a:1,b:2}, 对象写法
        props: ($route) => {
            return { keyword: $route.params.keyword, k: $route.query.k }
        } //函数写法

    },
    {
        path: "/detail/:skuId?",
        component: (() => import("@/pages/Detail")),
        meta: { show: true }

    },
    {
        path: "/shopCart",
        component: (() => import("@/pages/ShopCart")),
        meta: { show: true }

    },
    {
        path: "/trade",
        component: (() => import("@/pages/Trade")),
        meta: { show: true }

    },
    {
        path: "/addcartsuccess",
        name: 'addcartsuccess',
        component: (() => import("@/pages/AddCartSuccess")),
        meta: { show: true }

    },
    {
        path: "/pay",
        component: (() => import("@/pages/Pay")),
        meta: { show: true }

    },
    {
        path: "/login",
        component: (() => import("@/pages/Login")),
        meta: { show: false }

    },
    {
        path: "/register",
        component: (() => import("@/pages/Register")),
        meta: { show: false }
    },
    //重定向
    {
        path: '/',
        redirect: '/home'
    }
]
//配置路由
let router = new VueRouter({
    routes,
    //滚动行为
    scrollBehavior(to, from, savePostion) {
        //返回的这个y=0，代表的滚动条在最上方
        return { y: 0 };
    }

})
//全局守卫
router.beforeEach(async (to, from, next) => {
    let token = store.state.user.token;
    let name = store.state.user.userInfo.name;
    if (token && token !== 'undefined') {
        //如果用户已经登录还想去login，则停留在首页
        if (to.path == '/login') {
            // console.log('yidenglu')
            next('/home')
        } else {
            //登录了但是去的不是login
            if (name) {
                next();
            } else {
                //没有用户信息，派发action让仓库存储用户信息再跳转
                try{
                    await store.dispatch('getUserInfo')
                    next();
                }catch(error){
                    //token过期,先清除登录再跳转到登录页
                   await store.dispatch('userLogOut')
                   next('/login')
                }
            }
        }
    } else {
        //未登录，先放行
        next();
    }

})

export default router;