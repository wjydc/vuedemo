<template>
<div class="readingWrap">
    <header class="wHeadBg pageHead">
        <div class="head-left"><a  @click="$router.back(-1)" class="back"><img src="../assets/Image/back.png" alt=""></a></div>
    </header>
   <div :class="[wrap, bgBackground]">
        <p class="title">{{contentDetail.chapter_name}}</p>
        <div class="seeting">
            <readStyle v-on:bgChange="showColor" v-on:fontSizeChange="showFont"></readStyle>
            <router-link :to="{path: '/'}" class="toIndex">首页</router-link>
        </div>
        <!--  fontsize1 fontsize2 fontsize3 fontsize4 fontsize5 fontsize6 fontsize7 fontsize8 fontsize9 fontsize10 fontsize11 fontsize12-->
        <div :class="[readingarea, fontsize]" v-if="yes">
           <p v-for="(item,index) in word" :key="index">{{item}}</p>
        </div>
        <div :class="[readingarea, fontsize]" v-else>
           <p>收费章节，请先充值！</p>
        </div>

        <div class="paging">
            <a class="prePage gray" href="javascript:;" @click="preCharpter">上一页</a>
            <router-link :to="{path: '/catalog',query:{novalId: novalId}}"  class="page-menu">&nbsp;</router-link>
            <a class="nextPage" href="javascript:;" @click="nextCharpter">下一页</a>
        </div>

        <div class="Chasing"><span>【追书宝典】 先人一步阅读最新章</span><i class="icon iconfont icon-gengduo"></i></div>

        <!-- 强关页面 去掉此部分 -->
        <div class="read-recommend">
            <!-- 推荐 -->
            <div class="recom-top">
                <div class="modalTitle">
                    <p class="h4">热门推荐</p>
                </div>
                <div class="uterShadowo list">
                    <ul>
                        <li><a href="javascript:;">
                        <span class="tobook">遇见你是我最温遇见你是我最温遇见你是我最温遇见你是我最温遇见你是我最温暖的光</span><span class="toread">阅读 <i class="icon iconfont icon-gengduo"></i></span>
                    </a></li>
                        <li><a href="javascript:;">
                            <span class="tobook">遇见你是我最温遇见你是我最温遇见你是我最温遇见你是我最温遇见你是我最温暖的光</span><span class="toread">阅读 <i class="icon iconfont icon-gengduo"></i></span>
                        </a></li>
                        <li><a href="javascript:;">
                                <span class="tobook">遇见你是我最温遇见你是我最温遇见你是我最温遇见你是我最温遇见你是我最温暖的光</span><span class="toread">阅读 <i class="icon iconfont icon-gengduo"></i></span>
                            </a></li>
                        <li><a href="javascript:;">
                                    <span class="tobook">遇见你是我最温遇见你是我最温遇见你是我最温遇见你是我最温遇见你是我最温暖的光</span><span class="toread">阅读 <i class="icon iconfont icon-gengduo"></i></span>
                                </a></li>
                        <li><a href="javascript:;">
                                        <span class="tobook">遇见你是我最温遇见你是我最温遇见你是我最温遇见你是我最温遇见你是我最温暖的光</span><span class="toread">阅读 <i class="icon iconfont icon-gengduo"></i></span>
                                    </a></li>
                    </ul>
                </div>
            </div>

            <!-- 二维码 -->
            <div class="read-wechat">
                <p class="we-icon"><span></span></p>
                <p class="p1">“关注官方微信公众号，方便下次阅读”</p>
                <p class="p2">长按二维码可识别</p>
                <img class="wx" src="../assets/Image/weixin.png" alt="">
            </div>
        </div>

    </div>
</div>
</template>
<script>
import readStyle from '../components/readstyle.vue'
export default {
  name: 'reading',
  data () {
    return {
      novalId: '',
      charpterCode: '',
      newCharpter: '',
      contentDetail: '',
      word: '',
      pre: 'pre',
      next: 'next',
      yes: 1,
      backImg: require('../assets/Image/back.png'),
      // 原始cookie 值
      bgBackground: 'dayBg1',
      wrap: 'wrap',
      readingarea: 'reading-area',
      fontsize: 'fontsize6'
    }
  },
  components: {
    'readStyle': readStyle
  },
  // 钩子函数  vue实例创建完成后，渲染完成之前执行
  mounted: function () {
    // var _this = this
    this.params()
    // 详情
    this.getData(null)
    this.nomarlColor()
  },
  // 计算属性
  computed: {
  },
  methods: {
    params: function () {
      this.novalId = Math.round(this.$route.query.novalId)
      this.charpterCode = this.$route.query.chapterCode
      console.log(this.novalId, this.charpterCode)
    },
    getData: function (type) {
      var _this = this
      this.$axios.get(
        '/api/Product/Chapter/Content.aspx?ChapterCode=' + _this.charpterCode + '&UN=i149813920191049&NovelId=' + this.novalId + '&clientid=1&Direction=' + type)
        .then(function (response) {
          console.log(response.data.detail)
          console.log('请求完后:' + response.data.detail.chapter_code)
          _this.contentDetail = response.data.detail
          _this.charpterCode = response.data.detail.chapter_code
          // 文本换行处理
          var text = response.data.detail.content
          if (text !== '') {
            _this.yes = 1
            var element = text.split('\r\n　　')
            _this.word = element
          } else {
            _this.yes = 0
            // _this.word = '收费章节，请先充值'
          }
        })
        .catch(function (error) {
          console.log(error)
        })
    },
    // 上一页
    preCharpter: function () {
      this.scrollTop()
      this.getData(this.pre)
    },
    nextCharpter: function () {
      this.scrollTop()
      this.getData(this.next)
    },
    // 默认为第一种样式
    nomarlColor: function () {
      var initColor = this.$cookies.get('backgroundClass')
      console.log(initColor)
      if (initColor) {
        this.bgBackground = initColor
      } else {
        this.bgBackground = 'dayBg1'
      }
      var initFont = this.$cookies.get('fontSizeClass')
      if (initFont) {
        this.fontsize = initFont
      } else {
        this.fontsize = 'fontsize6'
      }
    },
    showColor: function (data) {
      var coloring = this.$cookies.get('backgroundClass')
      console.log(coloring)
      this.bgBackground = coloring
    },
    showFont: function () {
      var fontsizeing = this.$cookies.get('fontSizeClass')
      console.log(fontsizeing)
      this.fontsize = fontsizeing
    }
  }
}
</script>
<style >
@import url("../assets/css/templateCss/templates.css");
@import url("../assets/css/pageCss/reading.css");
</style>
