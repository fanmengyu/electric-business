<template>
   <header class="header">
            <!-- 头部的第一行 -->
            <div class="top">
                <div class="container">
                    <div class="loginList">
                        <p>尚品汇欢迎您！</p>
                        <p v-if="!userName">
                            <span>请</span>
                            <router-link to="/login">登录</router-link>
                            <router-link to="/register" class="register">免费注册</router-link>
                        </p>
                        <p v-else>
                            <a href="">{{userName}}</a>
                            <a href="" @click="logOut">退出登录</a>
                        </p>
                    </div>
                    <div class="typeList">
                        <a href="###">我的订单</a>
                        <a href="###">我的购物车</a>
                        <a href="###">我的尚品汇</a>
                        <a href="###">尚品汇会员</a>
                        <a href="###">企业采购</a>
                        <a href="###">关注尚品汇</a>
                        <a href="###">合作招商</a>
                        <a href="###">商家后台</a>
                    </div>
                </div>
            </div>
            <!--头部第二行 搜索区域-->
            <div class="bottom">
                <h1 class="logoArea">
                    <router-link  class="logo" title="尚品汇" href="###"  to="/home">
                        <img src="./images/logo.png" alt="">
                    </router-link>
                </h1>
                <div class="searchArea">
                    <form action="###" class="searchForm">
                        <input type="text" id="autocomplete" class="input-error input-xxlarge" v-model="keyword"/>
                        <button class="sui-btn btn-xlarge btn-danger" type="button" @click="goSearch()">搜索</button>
                    </form>
                </div>
            </div>
        </header>
</template>

<script>
export default {
    name:"",
    data(){
        return{
            keyword:'',
        }
    },
    methods: {
        goSearch(){
            //路由传参（第一种字符串形式）
            // this.$router.push('/search/'+this.keyword+'?k='+this.keyword.toUpperCase());
            //路由传参（第二种：模板字符串）
            // this.$router.push(`/search/${this.keyword}?k=${this.keyword.toUpperCase()}`)
            //路由传参（第三中：对象形式）
            // this.$router.push({name:'search',params:{keyword:this.keyword},query:{k:this.keyword.toUpperCase()}})
         
         /*
            this.$router.push({name:'search',
            params:{keyword:''||undefined},
            query:{k:this.keyword.toUpperCase()}})
            */

           if(this.$route.query){
               let loction = {name:'search', params:{keyword:this.keyword||undefined}};
               loction.query = this.$route.query;
               this.$router.push(loction);
           }
        },
        async logOut(){
           //1.发请求给服务器退出登录--服务器清除token
           //2.清除项目中的数据【userInfo,token】
           try{
           await this.$store.dispatch('userLogOut')
           //回到首页
           this.$router.push("/home");
           }catch(erro){
            console.log(erro.message);
           }
        }
    },
    mounted() {
        //通过全局事件总线清除关键字
        this.$bus.$on("clear",()=>{
            this.keyword = "";
        })
    },
    computed:{
        userName(){
            return this.$store.state.user.userInfo.name;          
        }
    }

}
</script>

<style lang="less" scoped>
    .header {
        &>.top {
            background-color: #eaeaea;
            height: 30px;
            line-height: 30px;

            .container {
                width: 1200px;
                margin: 0 auto;
                overflow: hidden;

                .loginList {
                    float: left;

                    p {
                        float: left;
                        margin-right: 10px;

                        .register {
                            border-left: 1px solid #b3aeae;
                            padding: 0 5px;
                            margin-left: 5px;
                        }
                    }
                }

                .typeList {
                    float: right;

                    a {
                        padding: 0 10px;

                        &+a {
                            border-left: 1px solid #b3aeae;
                        }
                    }

                }

            }
        }

        &>.bottom {
            width: 1200px;
            margin: 0 auto;
            overflow: hidden;

            .logoArea {
                float: left;

                .logo {
                    img {
                        width: 175px;
                        margin: 25px 45px;
                    }
                }
            }

            .searchArea {
                float: right;
                margin-top: 35px;

                .searchForm {
                    overflow: hidden;

                    input {
                        box-sizing: border-box;
                        width: 490px;
                        height: 32px;
                        padding: 0px 4px;
                        border: 2px solid #ea4a36;
                        float: left;

                        &:focus {
                            outline: none;
                        }
                    }

                    button {
                        height: 32px;
                        width: 68px;
                        background-color: #ea4a36;
                        border: none;
                        color: #fff;
                        float: left;
                        cursor: pointer;

                        &:focus {
                            outline: none;
                        }
                    }
                }
            }
        }
    }
</style>