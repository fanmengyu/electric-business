<template>
  <div>
    <TypeNav />
    <div class="main">
      <div class="py-container">
        <!--bread 面包屑-->
        <div class="bread">
          <ul class="fl sui-breadcrumb">
            <li>
              <a href="#">全部结果</a>
            </li>
          </ul>
          <ul class="fl sui-tag">
            <!-- <li class="with-x">手机</li> -->
            <!-- 分类的面包屑 -->
            <li class="with-x" v-if="searchParams.categoryName">
              {{ searchParams.categoryName
              }}<i @click="removeCategoryName">×</i>
            </li>
            <!-- <li class="with-x">华为<i>×</i></li>
            <li class="with-x">OPPO<i>×</i></li> -->
            <!-- 关键字的面包屑 -->
                <li class="with-x" v-if="searchParams.keyword">
              {{ searchParams.keyword
              }}<i @click="removeKeyword">×</i>
               <!-- 品牌的面包屑 -->
                <li class="with-x" v-if="searchParams.trademark">
              {{ searchParams.trademark.split(":")[1]
              }}<i @click="removeTradeMark">×</i>

              <!-- 平台的售卖的属性值展示 -->
              <li class="with-x" v-for="(attrValue,index) in searchParams.props" :key="index">
              {{ attrValue.split(":")[1]
              }}<i @click="removeAttr(index)">×</i>
            </li>
          </ul>
        </div>

        <!--selector-->
        <SearchSelector @trademarkInfo="trademarkInfo" @attrInfo="attrInfo" />

        <!--details-->
        <div class="details clearfix">
          <div class="sui-navbar">
            <div class="navbar-inner filter">
              <ul class="sui-nav">
                <li :class="{active:isOne}" @click="changeOrder(1)">
                  <a >综合 <span v-show="isOne"><i class="el-icon-top" v-show="isAsc"></i><i class="el-icon-bottom" v-show="isDesc"></i></span></a>
                </li>
                <li :class="{active:isTwo}"  @click="changeOrder(2)">
                  <a >价格<span v-show="isTwo"><i class="el-icon-top" v-show="isAsc"></i><i class="el-icon-bottom" v-show="isDesc"></i></span></a>
                </li>
              </ul>
            </div>
          </div>
          <div class="goods-list">
            <ul class="yui3-g">
              <li
                class="yui3-u-1-5"
                v-for="(good, index) in goodsList"
                :key="good.id"
              >
                <div class="list-wrap">
                  <div class="p-img">
                    <!-- 路由跳转时要带params参数 -->
                   <router-link :to="`/detail/${good.id}`"><img :src="good.defaultImg"/></router-link>
                  </div>
                  <div class="price">
                    <strong>
                      <em>¥</em>
                      <i>{{ good.price }}.00</i>
                    </strong>
                  </div>
                  <div class="attr">
                    <a
                      target="_blank"
                      href="item.html"
                      title="促销信息，下单即赠送三个月CIBN视频会员卡！【小米电视新品4A 58 火爆预约中】"
                      >{{ good.title }}</a
                    >
                  </div>
                  <div class="commit">
                    <i class="command">已有<span>2000</span>人评价</i>
                  </div>
                  <div class="operate">
                    <a
                      href="success-cart.html"
                      target="_blank"
                      class="sui-btn btn-bordered btn-danger"
                      >加入购物车</a
                    >
                    <a href="javascript:void(0);" class="sui-btn btn-bordered"
                      >收藏</a
                    >
                  </div>
                </div>
              </li>
            </ul>
          </div>
         <Pagination :pageNo="searchParams.pageNo" :pageSize="searchParams.pageSize" :total="total" :continues="5" @getPageNo="getPageNo"/>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import SearchSelector from "./SearchSelector/SearchSelector.vue";
import { mapGetters, mapState } from "vuex";
export default {
  name: "Search",
  data() {
    return {
      searchParams: {
        category1Id: "",
        category2Id: "",
        category3Id: "",
        categoryName: "",
        keyword: "",
        //排序
        order: "1:desc",
        //分页器用的，代表的是当前是第几页
        pageNo: 1,
        //代表的是每一页战术数据个数
        pageSize: 10,
        //平台售卖属性操作带的参数
        props: [],
        //品牌
        trademark: "",
      },
    };
  },
  components: {
    SearchSelector,
  },
  beforeMount() {
    //复杂的写法
    //this.searchParams.category1Id=this.$route.query.category1Id
    //object.assign :ES6新增的语法：合并对象
    Object.assign(this.searchParams, this.$route.query, this.$route.params);
  },
  mounted() {
    //在发请求之前带给服务器参数【searchParmas参数发生变化有数组带给服务器】
    this.getData();
  },
  computed: {
    ...mapGetters(["goodsList"]),
    isOne(){
      return this.searchParams.order.indexOf('1') != -1

    },
    isTwo(){
      return this.searchParams.order.indexOf('2') != -1

    },
    isAsc(){
      return this.searchParams.order.indexOf('asc') != -1
    },
    isDesc(){
      return this.searchParams.order.indexOf('desc') != -1
    },
    ...mapState({
      total:state=>state.search.searchList.total
    })
  },
  methods: {
    clearCategoryName(){
      //对象里的undefined字段不会带给服务器
      this.searchParams.category1Id = undefined;
      this.searchParams.category2Id = undefined;
      this.searchParams.category3Id = undefined;
    },
    //向服务器发请求获取search模块数据（根据参数不同返回不同的数据进行展示）
    //把这次请求封装为一个函数，当你需要在调用的时候调用即可。

    getData() {
      this.$store.dispatch("getSearchList", this.searchParams);
    },
    removeCategoryName() {
      this.searchParams.categoryName = undefined;
      this.clearCategoryName();
      //还需要再次向服务器发请求
      this.getData();
      //地址栏也需要改进：进行路由跳转
      if(this.$route.params){
        this.$router.push({name:"search",params:this.$route.params});
      }
    },
    removeKeyword(){
       this.searchParams.keyword = undefined;
      //删除关键字
      this.$bus.$emit("clear");
      //进行路由跳转
      if(this.$route.query){
        this.$router.push({name:"search",query:this.$route.query});
      }
    },
    trademarkInfo(trademark){
      this.searchParams.trademark = `${trademark.tmId}:${trademark.tmName}`
      // console.log('我是父组件'+trademark);
      this.getData();
   },
   removeTradeMark(){
     //删除品牌信息
     this.searchParams.trademark = undefined;
     this.getData();
   },
   //手机平台属性地方回调函数（自定义事件）
   attrInfo(attr,attrValue){
     let props = `${attr.attrId}:${attrValue}:${attr.attrName}`;
     //数组去重后再push
     if(this.searchParams.props.indexOf(props)==-1){
       this.searchParams.props.push(props);
     }
     this.getData();
   },
   removeAttr(index){
     this.searchParams.props.splice(index,1);
     this.getData();
   },
   //改变升序降序
   changeOrder(flag){
    //flag形参：表示点击的是1还是2【用户带年纪的时候传递进来的】
    let orginOrder = this.searchParams.order;
    let orginFlag = this.searchParams.order.split(":")[0];
    let orginSort = this.searchParams.order.split(":")[1];
    let newOrder = '';
    if(flag === orginFlag){
      //点击的是综合
      newOrder = `${orginFlag}:${orginSort=="desc"?"asc":"desc"}`;

    }else{
      //点击的是价格
      newOrder = `${flag}:${orginSort=="desc"?"asc":"desc"}`;
    }
  //修改order
  this.searchParams.order = newOrder;
  this.getData();

   },
   //自定义事件的回调函数--获取当前第几页
   getPageNo(pageNo){
     this.searchParams.pageNo = pageNo;
    this.getData();

   }

  },
  watch: {
    //监听路由的信息是否发生变化
    $route(newValue, oldValue) {
      Object.assign(this.searchParams, this.$route.query, this.$route.params);
      //再次发送Ajax请求
      this.getData();
      //每一次请求完毕，应该把相应的1、2、3分类的id置空
      this.clearCategoryName();
    },
  },
};
</script>

<style lang="less" scoped>
.main {
  margin: 10px 0;

  .py-container {
    width: 1200px;
    margin: 0 auto;

    .bread {
      margin-bottom: 5px;
      overflow: hidden;

      .sui-breadcrumb {
        padding: 3px 15px;
        margin: 0;
        font-weight: 400;
        border-radius: 3px;
        float: left;

        li {
          display: inline-block;
          line-height: 18px;

          a {
            color: #666;
            text-decoration: none;

            &:hover {
              color: #4cb9fc;
            }
          }
        }
      }

      .sui-tag {
        margin-top: -5px;
        list-style: none;
        font-size: 0;
        line-height: 0;
        padding: 5px 0 0;
        margin-bottom: 18px;
        float: left;

        .with-x {
          font-size: 12px;
          margin: 0 5px 5px 0;
          display: inline-block;
          overflow: hidden;
          color: #000;
          background: #f7f7f7;
          padding: 0 7px;
          height: 20px;
          line-height: 20px;
          border: 1px solid #dedede;
          white-space: nowrap;
          transition: color 400ms;
          cursor: pointer;

          i {
            margin-left: 10px;
            cursor: pointer;
            font: 400 14px tahoma;
            display: inline-block;
            height: 100%;
            vertical-align: middle;
          }

          &:hover {
            color: #28a3ef;
          }
        }
      }
    }

    .details {
      margin-bottom: 5px;

      .sui-navbar {
        overflow: visible;
        margin-bottom: 0;

        .filter {
          min-height: 40px;
          padding-right: 20px;
          background: #fbfbfb;
          border: 1px solid #e2e2e2;
          padding-left: 0;
          border-radius: 0;
          box-shadow: 0 1px 4px rgba(0, 0, 0, 0.065);

          .sui-nav {
            position: relative;
            left: 0;
            display: block;
            float: left;
            margin: 0 10px 0 0;

            li {
              float: left;
              line-height: 18px;

              a {
                display: block;
                cursor: pointer;
                padding: 11px 15px;
                color: #777;
                text-decoration: none;
              }

              &.active {
                a {
                  background: #e1251b;
                  color: #fff;
                }
              }
            }
          }
        }
      }

      .goods-list {
        margin: 20px 0;

        ul {
          display: flex;
          flex-wrap: wrap;

          li {
            height: 100%;
            width: 20%;
            margin-top: 10px;
            line-height: 28px;

            .list-wrap {
              .p-img {
                padding-left: 15px;
                width: 215px;
                height: 255px;

                a {
                  color: #666;

                  img {
                    max-width: 100%;
                    height: auto;
                    vertical-align: middle;
                  }
                }
              }

              .price {
                padding-left: 15px;
                font-size: 18px;
                color: #c81623;

                strong {
                  font-weight: 700;

                  i {
                    margin-left: -5px;
                  }
                }
              }

              .attr {
                padding-left: 15px;
                width: 85%;
                overflow: hidden;
                margin-bottom: 8px;
                min-height: 38px;
                cursor: pointer;
                line-height: 1.8;
                display: -webkit-box;
                -webkit-box-orient: vertical;
                -webkit-line-clamp: 2;

                a {
                  color: #333;
                  text-decoration: none;
                }
              }

              .commit {
                padding-left: 15px;
                height: 22px;
                font-size: 13px;
                color: #a7a7a7;

                span {
                  font-weight: 700;
                  color: #646fb0;
                }
              }

              .operate {
                padding: 12px 15px;

                .sui-btn {
                  display: inline-block;
                  padding: 2px 14px;
                  box-sizing: border-box;
                  margin-bottom: 0;
                  font-size: 12px;
                  line-height: 18px;
                  text-align: center;
                  vertical-align: middle;
                  cursor: pointer;
                  border-radius: 0;
                  background-color: transparent;
                  margin-right: 15px;
                }

                .btn-bordered {
                  min-width: 85px;
                  background-color: transparent;
                  border: 1px solid #8c8c8c;
                  color: #8c8c8c;

                  &:hover {
                    border: 1px solid #666;
                    color: #fff !important;
                    background-color: #666;
                    text-decoration: none;
                  }
                }

                .btn-danger {
                  border: 1px solid #e1251b;
                  color: #e1251b;

                  &:hover {
                    border: 1px solid #e1251b;
                    background-color: #e1251b;
                    color: white !important;
                    text-decoration: none;
                  }
                }
              }
            }
          }
        }
      }

      .page {
        width: 733px;
        height: 66px;
        overflow: hidden;
        float: right;

        .sui-pagination {
          margin: 18px 0;

          ul {
            margin-left: 0;
            margin-bottom: 0;
            vertical-align: middle;
            width: 490px;
            float: left;

            li {
              line-height: 18px;
              display: inline-block;

              a {
                position: relative;
                float: left;
                line-height: 18px;
                text-decoration: none;
                background-color: #fff;
                border: 1px solid #e0e9ee;
                margin-left: -1px;
                font-size: 14px;
                padding: 9px 18px;
                color: #333;
              }

              &.active {
                a {
                  background-color: #fff;
                  color: #e1251b;
                  border-color: #fff;
                  cursor: default;
                }
              }

              &.prev {
                a {
                  background-color: #fafafa;
                }
              }

              &.disabled {
                a {
                  color: #999;
                  cursor: default;
                }
              }

              &.dotted {
                span {
                  margin-left: -1px;
                  position: relative;
                  float: left;
                  line-height: 18px;
                  text-decoration: none;
                  background-color: #fff;
                  font-size: 14px;
                  border: 0;
                  padding: 9px 18px;
                  color: #333;
                }
              }

              &.next {
                a {
                  background-color: #fafafa;
                }
              }
            }
          }

          div {
            color: #333;
            font-size: 14px;
            float: right;
            width: 241px;
          }
        }
      }
    }
  }
}
</style>