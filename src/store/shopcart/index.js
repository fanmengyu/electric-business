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