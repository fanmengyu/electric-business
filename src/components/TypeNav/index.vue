<template>
  <!-- 商品分类导航 -->
  <div class="type-nav">
    <!-- <h1>{{categoryList}}</h1> -->
    <div class="container">
      <div  @mouseleave="leaveIndex" @mouseenter="enterShow">
        <h2 class="all">全部商品分类</h2>
        <!-- 三级联动 -->
        <transition name="sort">
                <div class="sort" v-show="show">
          <div class="all-sort-list2" @click="goSearch">
            <div
              class="item"
              v-for="(c1, index) in categoryList"
              :key="c1.categoryId"
              :class="{ cur: currentIndex==index }">
              <h3 @mouseenter="changeIndex(index)">
                  <!-- <router-link to="/search">{{c1.categoryName}}</router-link> -->
                <a :data-categoryName="c1.categoryName" :data-category1Id="c1.categoryId">{{ c1.categoryName }}</a>
              </h3>
                            <!-- 二级三级分类 -->
              <div class="item-list clearfix" :style="{display:currentIndex==index?'block':'none'}">
                <div
                  class="subitem"
                  v-for="(c2, index) in c1.categoryChild"
                  :key="c2.categoryId">
                  <dl class="fore">
                    <dt>
                      <a :data-categoryName="c2.categoryName" :data-category2Id="c2.categoryId">{{ c2.categoryName }}</a>
                       <!-- <router-link to="/search">{{c2.categoryName}}</router-link> -->
                    </dt>
                    <dd>
                      <em
                        v-for="(c3, index) in c2.categoryChild"
                        :key="c3.categoryId"
                      >
                        <a :data-categoryName="c3.categoryName" :data-category3Id="c3.categoryId">{{ c3.categoryName }}</a>
                         <!-- <router-link to="/search">{{c3.categoryName}}</router-link> -->
                      </em>
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>
        </div>
        </transition>
      </div>
      <nav class="nav">
        <a href="###">服装城</a>
        <a href="###">美妆馆</a>
        <a href="###">尚品汇超市</a>
        <a href="###">全球购</a>
        <a href="###">闪购</a>
        <a href="###">团购</a>
        <a href="###">有趣</a>
        <a href="###">秒杀</a>
      </nav>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
// import _ from 'loadsh';
// console.log(_)
export default {
  name: "TypeNav",
  data() {
    return {
      currentIndex: -1,
      show:true,
    };
  },
  mounted() { 
    
    //如果不是home组件，将该组件进行隐藏
    if(this.$route.path != '/home'){
      this.show = false;
    }
  },
  computed: {
    ...mapState({
      //右侧需要的是一个函数，当使用这个计算属性时，右侧函数会立即执行一次
      //注入一个参数state，其实即为大仓库中的数据
      categoryList: (state) => {
        return state.home.categoryList.slice(0, 16);
      },
    }),
  },
  methods: {
    // 鼠标进入修改响应式数据 currentIndex属性
    changeIndex(index) {
      //index 鼠标移上某一个一级分类的元素的索引值
      this.currentIndex = index;
    },
    //一级分类鼠标移出的事件回调
    leaveIndex() {
        this.currentIndex = -1;
        if(this.$route.path!='/home'){
        this.show = false;
        }
    },
    //进行路由跳转的方法
    goSearch(event){
        //如果使用事件委派，会存在事件冒泡的问题；此外如何区分点击的是几级标签？

        //解决办法：1.给a标签加上自定义属性data-categoryName
        let element = event.target;

        //节点有一个dataset属性，可以获取节点的自定义属性与属性值
        let {categoryname,category1id,category2id,category3id,} = element.dataset;
        //区分点击的是几级标签
        // this.$router.push('/search')
        if(categoryname){
          //整理路由跳转的参数
          let location = {name:'search'};
          let query = {categoryName:categoryname};
          if(category1id){
            query.category1Id = category1id;
          }else if(category2id){
            query.category2Id = category2id;
          }else{
            query.category3Id = category3id;
          }

          //判断是否有params参数
          if(this.$route.params){
            location.params = this.$route.params;
          }
          //整理完参数
          location.query = query;
          //路由跳转
          this.$router.push(location);
        }
    },
    //当鼠标移入时，让商品分类列表展示出来
    enterShow(){
      this.show = true;
    }
  },
};
</script>

<style lang="less" scoped>
.type-nav {
  border-bottom: 2px solid #e1251b;

  .container {
    width: 1200px;
    margin: 0 auto;
    display: flex;
    position: relative;

    .all {
      width: 210px;
      height: 45px;
      background-color: #e1251b;
      line-height: 45px;
      text-align: center;
      color: #fff;
      font-size: 14px;
      font-weight: bold;
    }

    .nav {
      a {
        height: 45px;
        margin: 0 22px;
        line-height: 45px;
        font-size: 16px;
        color: #333;
      }
    }

    .sort {
      position: absolute;
      left: 0;
      top: 45px;
      width: 210px;
      height: 461px;
      position: absolute;
      background: #fafafa;
      z-index: 999;

      .all-sort-list2 {
        .item {
          h3 {
            line-height: 30px;
            font-size: 14px;
            font-weight: 400;
            overflow: hidden;
            padding: 0 20px;
            margin: 0;

            a {
              color: #333;
            }
          }

          .item-list {
            // display: none;
            position: absolute;
            width: 734px;
            min-height: 460px;
            background: #f7f7f7;
            left: 210px;
            border: 1px solid #ddd;
            top: 0;
            z-index: 9999 !important;

            .subitem {
              float: left;
              width: 650px;
              padding: 0 4px 0 8px;

              dl {
                border-top: 1px solid #eee;
                padding: 6px 0;
                overflow: hidden;
                zoom: 1;

                &.fore {
                  border-top: 0;
                }

                dt {
                  float: left;
                  width: 54px;
                  line-height: 22px;
                  text-align: right;
                  padding: 3px 6px 0 0;
                  font-weight: 700;
                }

                dd {
                  float: left;
                  width: 415px;
                  padding: 3px 0 0;
                  overflow: hidden;

                  em {
                    float: left;
                    height: 14px;
                    line-height: 14px;
                    padding: 0 8px;
                    margin-top: 5px;
                    border-left: 1px solid #ccc;
                  }
                }
              }
            }
          }

        //   &:hover {
        //     .item-list {
        //       display: block;
        //     }
        //   }
        }
        // .item:hover{
        //     background-color: skyblue;
        // }
        .cur {
          background-color: skyblue;
        }
      }
    }

    //过渡动画
    .sort-enter{
      height: 0;
    }
    .sort-enter-to{
      height: 461px;
    }
    //定义动画时间
    .sort-enter-active{
      transition:all .5s linear ;
    }
  }
}
</style>