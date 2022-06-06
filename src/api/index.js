//管理所有的api接口
import requests from "./request";

//三级联动的接口
export const reqCategoryList = () => {
    return requests({url:'/product/getBaseCategoryList', method:'get'});
}