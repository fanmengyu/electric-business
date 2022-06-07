//引入mock(主义大写)
import Mock from 'mockjs';
//把JSON数据格式引入进来
import banner from './banner.json';
import floor from './floor.json';

//mock数据
Mock.mock('/mock/banner',{code:200,data:banner});

Mock.mock('/mock/floor',{code:200,data:floor});