//管理所有的api接口
import requests from "./request";
import mockRequests from './mockAjax'
//三级联动的接口
export const reqCategoryList = () => {
    return requests({url:'/product/getBaseCategoryList', method:'get'});
}

//获取首页轮播图的接口
export const reqGetBannerList = () => mockRequests.get('/banner');


//获取Floor组件的数据
export const reqFloorList = () => mockRequests.get('/floor');

//获取搜索模块数据 地址:/api/list
export const reqGetSearchInfo = (params) => {
    return requests({url:'/list', method:'post',data:params})
}
//获取商品详情
export const reqGoodsInfo=(skuid)=>requests({url:`/item/${skuid}`, method:'get'})

//将商品添加到购物车中
export const reqAddOrUpdateShopCart=(skuId,skuNum)=>requests({url:`/cart/addToCart/${skuId}/${skuNum}`,method:'post'})

//获取购物车列表数据接口
export const reqCartList=()=>requests({url:'/cart/cartList',method:'get'})

//删除购物产品的接口
export const reqDeleteCartById=(skuId)=>requests({url:`/cart/deleteCart/${skuId}`,method:'delete'})

//修改商品的选中状态
export const reqUpdateCheckedByid = (skuId,isChecked)=>requests({url:`/cart/checkCart/${skuId}/${isChecked}`,method:'get'})

//获取验证码 /api/user/passport/sendCode/{phone}
export const reqGetCode = (phone)=>requests({url:`/user/passport/sendCode/${phone}`,method:'get'})

//注册 /api/user/passport/register post
export const reqUserRegister = (data)=>requests({url:`/user/passport/register`,data,method:'post'})

//登录 /api/user/passport/login post phone&password   key-val一致时可以只写一个
export const reqUserLogin = (data) => requests({url:'/user/passport/login',data,method:'post'})

//登陆后获取用户信息，需要带着用户token   /user/passport/auth/getUserInfo
export const reqUserInfo = () => requests({url:'/user/passport/auth/getUserInfo',method:'get'})

//退出登录 /api/user/passport/logout
export const reqLogOut = () => requests({url:'/user/passport/logout',method:'get'})

//获取用户地址信息 /api/user/userAddress/auth/findUserAddressList
export const reqAddressInfo = () => requests({url:'/user/userAddress/auth/findUserAddressList',method:'get'})

//获取商品清单   /api/order/auth/trade get
export const reqOrderInfo = () => requests({url:'/order/auth/trade',method:'get'})

//提交订单 /order/auth/submitOrder?tradeNo={tradeNo}
export const reqSubmitOrder = (tradeNo,data) => requests({url:`/order/auth/submitOrder?tradeNo={tradeNo}`,data,method:'post'})

//获取订单支付信息 /payment/weixin/createNative/{orderId}
export const reqPayInfo = (orderId) => requests({url:`/payment/weixin/createNative/{orderId}`,method:'get'})