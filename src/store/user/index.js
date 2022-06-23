import { reqGetCode, reqUserRegister } from '@/api';

const state = {
    code: ''

};
//mutations 修改state的唯一手段
const mutations = {
    GETCODE(state, code) {
        state.code = code;
    },

};
//action 可以书写自己的业务逻辑，也可以处理异步
const actions = {
    async getCode({commit},phone) {
        let result = await  reqGetCode(phone);
        console.log(result);
        if (result.code == 200) {
            commit("GETCODE", result.data);
            return 'ok';
        } else {
            return Promise.reject(new Error('fail'));
        }
    },
    async userRegister({commit}, user) {
        let result = await reqUserRegister(user);
        if (result.code == 200) {
            return 'ok';
        } else {
            return Promise.reject(new Error('fail'));
        }
    },

};

const getters = {

};

export default {
    state,
    mutations,
    actions,
    getters
}