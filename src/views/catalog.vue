<template>
<div class="catalogWrap">
    <header class="wHeadBg pageHead">
        <div class="head-left"><a  @click="$router.back(-1)" class="back"></a></div>
        <div class="head-middle">
            <p><span>目录</span></p>
        </div>
    </header>
    <!-- 倒序  rev-order-->
    <p @click="sortChange" class="sort pos-order"><i class="icon iconfont icon-zhengxu"></i>
     <span v-if="sortBol">倒序</span><span  v-else>正序</span>
    </p>
    <!-- 列表 -->
    <ul class="catalog">
        <li v-for="item in charpterList.item" :key="item.id">
            <router-link :to="{
            path: '/reading',
            query:  {
                novalId: charpterList.novelid,
                chapterCode: item.chapter_code
            }}"><span>{{item.chapter_name}}</span><img v-show="item.isfree=='no'" src="../assets/Image/lock.png" alt=""></router-link>
        </li>
    </ul>
    <!-- 分页  next_page-->
    <div class="Turn_page">
        <div :class="[initNum==1? 'previous_page':'', 'fl']" @click="pre">上一页</div>
        <div class="page_num fl">
            <span class="choose_num">{{initNum}}</span>/<span>{{charpterList.pagecount}}</span>
            <img class="down"  src="../assets/Image/down.png" alt="">
            <select v-model="initNum" v-on:change="selectsData" class="selects" name="" id="">
                <option v-for="(item,index) in totalArr" :key="index" :value="item">{{item}}</option>
            </select>
        </div>
        <div :class="[initNum==charpterList.pagecount? 'previous_page':'', 'fr']" @click="next">下一页</div>
    </div>
     <!--加载动画图片 -->
     <!-- <div class="loadAnimation">
        <img src="../assets/Image/load.gif" alt="">
    </div> -->
    <!-- 选择章节区间 -->
    <div class="chooseCharpter" style="display:none;">
        <div class="charpterArea">
            <div class="top">
                <ul>
                    <li class="active">第1-50章</li>
                    <li class="init">第51-100章</li>
                    <li class="init">第101-150章</li>
                    <li class="init">第151-200章</li>
                    <li class="init">第201-250章</li>
                    <li class="init">第251-300章</li>
                    <li class="init">第301-350章</li>
                    <li class="init">第351-400章</li>
                    <li class="init">第401-450章</li>
                </ul>
            </div>
            <div class="bottom">
                <a class="loginOut" href="jaascript:;">取消</a>
            </div>
        </div>
    </div>
</div>
</template>
<script>
export default {
  name: 'catalog',
  props: ['cataList'],
  data () {
    return {
      getparam: '',
      charpterList: '',
      sort: '',
      asc: 'asc',
      desc: 'desc',
      sortBol: false,
      totalNum: '',
      initNum: 1,
      totalArr: [],
      backImg: require('../assets/Image/back.png')
    }
  },
  components: {},
  // 钩子函数  vue实例创建完成后，渲染完成之前执行
  mounted: function () {
    this.params()
    // 章节列表 第一次请求
    this.sortDataChnage()
    // this.$nextTick(function(){})
  },
  // 计算属性
  computed: {
  },
  methods: {
    getData: function (sortType) {
      var that = this
      this.$axios.get('/api/Product/Chapter/List.aspx?&sort=' + sortType + '&pageindex=' + this.initNum + '&NovelId=' + this.getparam)
        .then(function (response) {
          console.log(response.data)
          that.charpterList = response.data.list
          // 获取总页数
          that.totalNum = that.charpterList.pagecount
          that.paganation()
        })
        .catch(function (error) {
          console.log(error)
        })
    },
    params: function () {
      this.getparam = this.$route.query.novalId
    },
    // 分页 下拉框页码数
    paganation: function () {
      for (var index = 1; index <= this.totalNum; index++) {
        if (index <= this.totalNum) {
          this.totalArr.push(index)
        }
      }
      // console.log(this.totalArr)
    },
    // 上一页
    pre: function () {
      this.initNum--
      if (this.initNum < 1) {
        this.initNum = 1
        return
      }
      // this.getData()
      this.sortDataChnage()
    },
    // 下一页
    next: function () {
      this.initNum++
      if (this.initNum > this.totalNum) {
        this.initNum = this.totalNum
        return
      }
      // this.getData()
      this.sortDataChnage()
    },
    // 下拉框选择页码
    selectsData: function () {
      // this.getData()
      this.sortDataChnage()
    },
    sortChange: function () {
      this.sortBol = !this.sortBol
      this.sortDataChnage()
    },
    sortDataChnage: function () {
      if (this.sortBol) {
        this.getData(this.desc)
      } else {
        this.getData(this.asc)
      }
    }
  }
}
</script>
<style>
@import url("../assets/css/templateCss/templates.css");
@import url("../assets/css/pageCss/catalog.css");
</style>
