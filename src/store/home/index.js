import {reqCategoryList} from '@/api'
import {reqGetBannerList} from '@/api'
//state可以理解为仓库，存储数据
const state = {
    categoryList:[],
    bannerList:[],

};
//mutations 修改state的唯一手段
const mutations = {
    CATEGORYLIST(state, categoryList){
        state.categoryList = categoryList;
    },
    GETBANNERLIST(state, bannerList){
        state.bannerList = bannerList;
    }

};
//action 可以书写自己的业务逻辑，也可以处理异步
const actions = {
    async categoryList({commit}){
        let result =await reqCategoryList();
        // console.log(result);
        if(result.code == 200){
            commit("CATEGORYLIST",result.data)
        }
    },

    async getBannerList({commit}){
        let result =await reqGetBannerList();
        console.log(result);
        if(result.code == 200){
            commit("GETBANNERLIST",result.data)
        }
    }

};
//getters可以理解为计算属性
const getters = {
    
};

export default{
state,
mutations,
actions,
getters
}