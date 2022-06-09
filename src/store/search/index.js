import {reqGetSearchInfo} from '@/api'
const state = {
    searchList:{}

};
//mutations 修改state的唯一手段
const mutations = {
    GETSEARCHLIST(state,searchList){
        state.searchList = searchList
    }

};
//action 可以书写自己的业务逻辑，也可以处理异步
const actions = {
    async  getSearchList({commit},params={}){
        //params形参:当用户派发action时，i二哥参数传递过来的，至少是一个空对象
        let result =await reqGetSearchInfo(params);
        if(result.code == 200){
            commit("GETSEARCHLIST",result.data)
        }
    },

};
//getters可以理解为计算属性,主要作用是简化仓库中的数据
const getters = {
    goodsList(state){
        return state.searchList.goodsList||[];
    },
    trademarkList(state){
        return state.searchList.trademarkList||[];
    },
    attrsList(state){
        return state.searchList.attrsList||[];
    }
    
    
};

export default{
state,
mutations,
actions,
getters
}