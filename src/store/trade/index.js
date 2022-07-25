import {reqAddressInfo, reqOrderInfo,reqSubmitOrder} from '@/api'
const state = {
    address: [],
    orderInfo:{},
    payId:''
};
//mutations 修改state的唯一手段
const mutations = {
    GETUSERADDRESS(state, address) {
        state.address = address;
    },
    GETORDERINFO(state, orderInfo){
        state.orderInfo = orderInfo;
    },
    GETUERINFO(state,userInfo){
        state.userInfo = userInfo;
    },
    SUBMITINFO(state,payId){
        state.payId = payId;
    }
};

const actions = {
    async getUserAddress({commit}) {
        let result = await reqAddressInfo();
        if (result.code == 200) {
            commit("GETUSERADDRESS", result.data);
            return 'ok';
        } else {
            return Promise.reject(new Error('fail'));
        }
    },

//获取商品清单数据
    async getOrderInfo({commit}){
        let result = await reqOrderInfo();
        console.log(result)
        if (result.code == 200) {
            commit("GETORDERINFO", result.data);
        } else {
            return Promise.reject(new Error('fail-log'));
        }
    },
 //提交订单:tradeNO 交易编码   data:付款人信息
 async submitInfo({ commit, state, dispatch }, { tradeNo, data }) {
    //提交订单的时候：返回一个很重要数据->订单ID【这笔交易唯一标识符:付款人、收款人】
    let result = await reqSubmitOrder(tradeNo, data);
    console.log('result',result)
    if (result.code == 200) {
        commit('SUBMITINFO', result.data);
        return 'ok';
    } else {
        return Promise.reject(new Error(result.message));
    }
}


};

const getters = {

};

export default {
    state,
    mutations,
    actions,
    getters
}