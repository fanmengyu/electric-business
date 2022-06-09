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