import {reqGoodsInfo} from '@/api';
const state = {
    goodInfo:{}

};
//mutations 修改state的唯一手段
const mutations = {
    GETGOODINFO(state, goodInfo){
        state.goodInfo = goodInfo;
    },

};
//action 可以书写自己的业务逻辑，也可以处理异步
const actions = {
    async getGoodInfo({commit}, skuid){
        let result =await reqGoodsInfo(skuid);
        if(result.code == 200){
            commit("GETGOODINFO",result.data);
        }
    },

};

const getters = {
    //路径导航简化数据
    categoryView(state){
        return state.goodInfo.categoryView||{};
    },
    //简化产品信息的数据
    skuInfo(state){
        return state.goodInfo.skuInfo||{};
    },
    //产品售卖属性的简化
    spuSaleAttrList(state){
        return state.goodInfo.spuSaleAttrList||[];
    }
    
};

export default{
state,
mutations,
actions,
getters
}