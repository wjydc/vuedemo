<template>
<div class="indexWrap">
    <header class="wHeadBg indexHead">
        <div class="head-left">
          <router-link to="#"></router-link>
        </div>
        <div class="head-middle">
            <div class="headMiddleBox">
              <router-link
              v-on:click.native="tab(index)"
              v-for="(item, index) in channel"
              :key="item.id"
              :class='{choose:item.isCur}'
              to="/">{{item.tabname}}
              </router-link>
              <!-- <span class="active"></span> -->
             <!-- <transition v-on:enter="enter">
                <span class="active"></span>
             </transition> -->
            </div>
        </div>
        <div class="head-right">
            <p class="headRightBox">
              <router-link  class="search" to="#" ><img src="../assets/Image/search1.png" alt=""></router-link>
            </p>
        </div>
    </header>
    <!-- 轮播 -->
     <div class="adveRotation">
        <div class="swiper-container uterShadowo">
            <div class="swiper-wrapper" >
                <router-link :to="{path: '/detail', query: { novalId: item.func_id}}"
                class="swiper-slide"
                v-for="item in dataAd" :key="item.ad_id" :id="item.func_id">
                    <img :src="item.ad_cover" :alt="item.ad_title">
                </router-link>
            </div>
            <!-- Add Pagination -->
            <div class="swiper-pagination"></div>
        </div>
    </div>
    <!-- 导航 -->
    <div class="nav-vue initNav">
        <!-- 导航个数 2  navTwo   导航个数 1  navOne -->
        <ul class="">
            <li><a href="#">
                <img src="../assets/Image/nav1.png" alt=""><span>排行榜</span>
            </a></li>
            <li><a href="#">
                <img src="../assets/Image/nav2.png" alt=""><span>书库</span>
            </a></li>
            <li><a href="#;">
                <img src="../assets/Image/nav3.png" alt=""><span>充值</span>
            </a></li>
            <li><a href="#">
                <img src="../assets/Image/nav4.png" alt=""><span>收藏</span>
            </a></li>
            <li><a href="#">
                <img src="../assets/Image/nav5.png" alt=""><span>个人中心</span>
            </a></li>
        </ul>
    </div>
     <!--最近阅读  -->
    <div class="recentReading">
        <div class="recentBox">
            <a class="latest" href="#"><i class="icon iconfont icon-zuijinyuedu"></i>最近阅读：《延禧攻略》 第25章 皇帝《延禧攻略》 第25章 皇帝v </a>
            <a class="readHistory" href="#"><span>阅读记录</span><i class="icon iconfont icon-gengduo"></i></a>
        </div>
    </div>
     <!-- 热门推荐 -->
    <div class="hot-recommend">
        <div class="modalTitle">
            <p class="h4">热门推荐</p><a class="right-operation" href="#"><i>查看更多</i><i class="icon iconfont icon-gengduo"></i></a>
        </div>
        <div class="uterShadowo">
            <booklistVertical v-bind:msg="filtereFirstItems"/>
            <booklistHorizontal v-bind:msg="filtereOtherItems" />
        </div>
    </div>
     <!-- 主编推荐 -->
    <div class="Editor-Recommend">
        <div class="modalTitle">
            <p class="h4"  >主编推荐</p><a class="right-operation" href="#"><i>查看更多</i><i class="icon iconfont icon-gengduo"></i></a>
        </div>
        <booklistVertical  v-bind:msg="filtereEditorItems"/>
    </div>
     <!-- 广告 -->
    <div class="Advertisement" v-for="item in dataMidAd" :key='item.ad_id'>
        <a href="javascript:;" :id='item.func_id'><img :src=item.ad_cover alt=""></a>
    </div>
     <div class="hor Membership">
        <div class="modalTitle">
            <p class="h4">会员推荐</p>
            <a class="right-operation" href="#"><i>查看更多</i><i class="icon iconfont icon-gengduo"></i></a>
        </div>
        <div class="uterShadowo">
            <booklistHorizontal  v-bind:msg="filtereMemberItems" />
        </div>
    </div>
    <!-- 限时免费 -->
    <div class="hor Membership">
        <div class="modalTitle">
            <p class="h4">限时免费</p>
            <div class="countTime">
                <i class="day">20</i>天<i class="hours">20</i>时<i class="min">12</i>分<i class="seconds">08</i>秒
            </div>
            <a class="right-operation" href="#"><i>查看更多</i><i class="icon iconfont icon-gengduo"></i></a>
        </div>
        <div class="uterShadowo">
           <booklistHorizontal  v-bind:msg="freeRec"/>
        </div>
    </div>
    <!-- 底部 -->
    <footers />
</div>
</template>
<script>
import Swiper from 'swiper'
import 'swiper/dist/css/swiper.min.css'
// const API_PROXY = 'https://bird.ioliu.cn/v1/?url='
export default {
  name: 'home',
  data () {
    return {
      channel: [
        { 'tabname': '女生', isCur: true, id: 1 },
        { 'tabname': '男生', isCur: false, id: 2 }
      ],
      dataAd: '',
      dataMidAd: '',
      hotRec: '',
      editorRec: '',
      memberRec: '',
      freeRec: '',
      mySwiper: ' ',
      backImg: require('../assets/Image/back.png')
    }
  },
  components: {},
  // 钩子函数  vue实例创建完成后，渲染完成之前执行
  mounted: function () {
    var _this = this
    // 广告位 -top
    this.$axios.get('/api/Product/Ad/List.aspx?ClassId=21')
      .then(function (response) {
        console.log(response)
        _this.dataAd = response.data.list.item
        _this.$nextTick(() => { // 下一个UI帧再初始化swiper
          _this.initSwiper()
        })
      })
      .catch(function (error) {
        console.log(error)
      })
    //   广告位 -middle
    this.$axios.get('/api/Product/Ad/List.aspx?ClassId=24')
      .then(function (response) {
        _this.dataMidAd = response.data.list.item
        console.log(_this.dataMidAd)
      })
      .catch(function (error) {
        console.log(error)
      })
    // 推荐位 -主编力推
    this.$axios.get('/api/Product/Recommend/List.aspx?ClassId=78')
      .then(function (response) {
        _this.hotRec = response.data.list.item
      })
      .catch(function (error) {
        console.log(error)
      })
    // 推荐位 -主编力推
    this.$axios.get('/api/Product/Recommend/List.aspx?ClassId=79')
      .then(function (response) {
        _this.editorRec = response.data.list.item
      })
      .catch(function (error) {
        console.log(error)
      })
    // 会员推荐
    this.$axios.get('/api/Product/Recommend/List.aspx?ClassId=80')
      .then(function (response) {
        console.log(response)
        _this.memberRec = response.data.list.item
      })
      .catch(function (error) {
        console.log(error)
      })
    // 限时免费
    this.$axios.get('/api/Product/Recommend/List.aspx?ClassId=81')
      .then(function (response) {
        console.log(response)
        _this.freeRec = response.data.list.item
      })
      .catch(function (error) {
        console.log(error)
      })
  },
  // 计算属性
  computed: {
    filtereFirstItems: function () {
      return this.hotRec.slice(0, 1)
    },
    filtereOtherItems: function () {
      return this.hotRec.slice(1, 7)
    },
    filtereEditorItems: function () {
      return this.editorRec.slice(0, 6)
    },
    filtereMemberItems: function () {
      return this.memberRec.slice(0, 6)
    }
  },
  methods: {
    initSwiper: function () {
      this.mySwiper = new Swiper('.swiper-container', {
        pagination: {
          el: '.swiper-pagination'
        },
        loop: true,
        autoplay: true,
        observer: true, // 修改swiper自己或子元素时，自动初始化swiper
        observeParents: true // 修改swiper的父元素时，自动初始化swiper
      })
    },
    tab: function (index) {
      this.channel.map(function (item, i) {
        if (index === i) {
          item.isCur = true
        } else {
          item.isCur = false
        }
      })
    }
  }
}
</script>
<style >
@import url("../assets/css/templateCss/templates.css");
@import url("../assets/css/pageCss/index.css");
</style>
