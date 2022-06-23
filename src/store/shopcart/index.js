import { reqCartList, reqDeleteCartById, reqUpdateCheckedByid } from '@/api';

const state = {
    cartList: []

};
//mutations 修改state的唯一手段
const mutations = {
    GETCARTLIST(state, cartList) {
        state.cartList = cartList;
    },

};
//action 可以书写自己的业务逻辑，也可以处理异步
const actions = {
    async getCartList({ commit }) {
        let result = await reqCartList();
        console.log(result);
        if (result.code == 200) {
            commit("GETCARTLIST", result.data);
        }
    },
    async deleteCartListBySkuID({ commit }, skuId) {
        let result = await reqDeleteCartById(skuId);
        // console.log(result);
        if (result.code == 200) {
            return 'ok';
        } else {
            return Promise.reject(new Error('fail'));
        }
    },
    async updateCheckedById({ commit }, { skuId, isChecked }) {
        let result = await reqUpdateCheckedByid(skuId, isChecked);
        // console.log(result);
        if (result.code == 200) {
            return 'ok';
        } else {
            return Promise.reject(new Error('fail'));
        }
    },
    //!!!一个难点
    deleteAllCheckedCart({dispatch,getters}){
        let PromiseAll = [];
        getters.cartList.cartInfoList.forEach(item=>{
            let promise=item.isChecked==1?dispatch('deleteCartListBySkuID',item.skuId):'';
            PromiseAll.push(promise);
        })
        return Promise.all(PromiseAll);
    },//
    updateAllCartIsChecked({dispatch,state},isChecked){
        let PromiseAll = [];
        state.cartList[0].cartInfoList.forEach(item=>{
            let promise = dispatch('updateCheckedById',{
                skuId:item.skuId,
                isChecked,
            });
            PromiseAll.push(promise);
        })
        return Promise.all(PromiseAll);
    }

};

const getters = {
    cartList(state) {
        return state.cartList[0] || {}
    },

};

export default {
    state,
    mutations,
    actions,
    getters
}