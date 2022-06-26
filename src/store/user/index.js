import { reqGetCode, reqUserRegister,reqUserLogin,reqUserInfo,reqLogOut } from '@/api';
import {setToken, getToken, removeToken} from '@/utils/token'
const state = {
    code: '',
    token:getToken("TOKEN"),
    userInfo:'',
};
//mutations 修改state的唯一手段
const mutations = {
    GETCODE(state, code) {
        state.code = code;
    },
    USERLOGIN(state, token){
        state.token = token;
    },
    GETUERINFO(state,userInfo){
        state.userInfo = userInfo;
    },
    CLEAR(state){
        state.token = '';
        state.userInfo = {};
        removeToken();
    }

};
//action 可以书写自己的业务逻辑，也可以处理异步
const actions = {
    async getCode({commit},phone) {
        let result = await  reqGetCode(phone);
        // console.log(result);
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

    //登陆业务
    async userLogin({commit}, user){
        let result = await reqUserLogin(user);
        // console.log(result)
        if (result.code == 200) {
            commit("USERLOGIN", result.data);
            return 'ok';
        } else {
            return Promise.reject(new Error('fail-log'));
        }
    },

//获取用户信息
    async getUserInfo({commit}){
        let result = await reqUserInfo();
        console.log(result);
        if (result.code == 200) {
            commit("GETUERINFO", result.data);
            setToken(result.data.token)
            return 'ok';
        }else{
            
        }
    },

    //退出登录
    async userLogOut({commit}){
        let result = await reqLogOut();
        if (result.code == 200) {
            commit("CLEAR", result.data);
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