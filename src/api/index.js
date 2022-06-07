//管理所有的api接口
import requests from "./request";
import mockRequests from './mockAjax'
//三级联动的接口
export const reqCategoryList = () => {
    return requests({url:'/product/getBaseCategoryList', method:'get'});
}

//获取首页轮播图的接口
export const reqGetBannerList = () => mockRequests.get('/banner');

