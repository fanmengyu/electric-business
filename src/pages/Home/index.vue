<template>
  <div>
    <!-- 三级联动已经注册为全局组件，因此在这里不需要import -->
     <TypeNav></TypeNav>
     <ListContainer></ListContainer>
     <Recommend/>
     <Rank/>
     <Like/>
     <Floor v-for="(floor,index) in floorList" :key="floorList.id" :list="floor"/>
     <!-- <Floor/> -->
     <Brand/>
  </div>
</template>

<script>
import ListContainer from '@/pages/Home/ListContainer';
import Recommend from '@/pages/Home/Recommend';
import Rank from '@/pages/Home/Rank';
import Like from '@/pages/Home/Like';
import Floor from '@/pages/Home/Floor';
import Brand from '@/pages/Home/Brand';
import {mapState} from 'vuex';
export default {
  name:'',
  components:{
    ListContainer,
    Recommend,
    Rank,
    Like,
    Floor,
    Brand
    },
    mounted() {
      //派发action，获取floor组件中数据
      this.$store.dispatch('getFloorList');
      //获取用户信息在首页展示
      this.$store.dispatch('getUserInfo')
    },
    computed:{
      ...mapState({
        floorList:state=>state.home.floorList
        })
    }
}
</script>

<style scoped>

</style>