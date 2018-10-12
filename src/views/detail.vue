<template>
<div class="detailWrap">
    <header v-bind:class="[headWhiteBg ? 'nHeadBg' : '', 'pageHead']">
        <div class="head-left"><a  @click="$router.back(-1)" class="back"></a></div>
        <div class="head-right">
            <p class="headRightBox">
                <a to="" class="menu"><img src="../assets/Image/menu.png" alt=""></a>
            </p>
        </div>
    </header>
    <!-- 悬浮导航 -->
    <div class="nav-vue fixedNav">
        <!-- 导航个数 2  navTwo            导航个数 1  navOne -->
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
     <!-- 书及描述 -->
    <div class="detail-book">
        <ul class="bookList-Vertical bookDescription">
            <li>
                <a href="#">
                    <p class="bokkCover"><img :src=getData.bookDetail.thumb_cover alt=""></p>
                    <div class="bookDescript">
                        <h2 class="des-title">{{getData.bookDetail.title}}</h2>
                        <p class="des-label">
                            <span class="brown">{{getData.bookDetail.classname}}</span><span class="brown">{{getData.bookDetail.shortwordsize}}字</span><span :class="[isActive ? 'orange' : 'red']">{{getData.bookDetail.updatestatus}}</span>
                        </p>
                        <p class="des-satatu">
                            <span class="seeNum">{{getData.bookDetail.hits}}万人在看</span>
                        </p>
                        <p class="des-bookNum">书号 A{{getData.bookDetail.id}}</p>
                    </div>
                </a>
            </li>
        </ul>
    </div>
    <!-- 高斯模糊 -->
    <div class="gaussBlur">
        <img class="mainImg" :src=getData.bookDetail.thumb_cover alt="">
        <p class="blurImg"></p>
    </div>
     <!-- 文本描述 -->
    <div class="detail-descript" :class="[desBol ? 'showWord': 'hideWord']">
        <p>{{getData.bookDetail.longdesc}}</p>
        <span @click="showHide()" class="showHideIcon"></span>
    </div>
    <!-- 打赏 -->
    <div class="detail-deward">
        <div class="deward-wrap">
            <p class="deward-left"><span>本书获得打赏</span><em>10000+</em></p>
            <div class="deward-right">
                <p>
                    <img src="../assets/Image/cover/1.jpg" alt=""><img src="../assets/Image/cover/2.jpg" alt=""><img src="../assets/Image/cover/3.jpg"
                        alt="">
                </p>
                <a class="deward-btn" href="javascript:;">打赏</a>
            </div>
        </div>
    </div>
    <!-- 目录 -->
    <div class="detail-directory">
        <div class="modalTitle">
            <p class="h4">目录</p>
            <span class="num"><i class="icon iconfont icon-dian"></i>10条</span>
            <!-- 图标在后 -->
            <p @click="pageTo()" class="right-operation"><i>查看更多</i><i class="icon iconfont icon-gengduo"></i></p>
        </div>
        <div class="uterShadowo directory-list">
            <ul>
                <li v-for="(item, index) in getData.charpterList" v-if="index<3" :id="item.id" :key="item.id">
                    <router-link :to="{path: '/reading', query:{novalId: getparam, chapterCode: item.chapter_code}}">{{item.chapter_name}}</router-link></li>
                <li class="newest"><a href="#">
                    <span class="newTitle"> 第210章 凌冬将至的雾霭中看到的是她远</span>
                    <span class="time">2018-8-27 15:25</span>
                </a></li>
            </ul>
        </div>
    </div>
    <!-- 本书打赏 -->
    <div class="theBook-reward">
        <div class="modalTitle">
            <p class="h4">本书打赏</p>
            <span class="num"><i class="icon iconfont icon-dian"></i> 2100+</span>
        </div>
        <div class="uterShadowo reward-list">
            <ul>
                <li v-for="item in giftArr" :key="item.userid">
                    <img v-if="item.icon" :src=item.icon alt="">
                    <img v-else src="../assets/Image/person.png" alt="">
                    <div>
                        <p class="userNick"><span class="nickName">{{item.nickname}}</span><span class="nickTime">2018-8-6 21:12</span></p>
                        <p class="giftNum"><span>打赏给本书</span><em>{{item.levelinfo.levelname}} {{item.fee}}个</em></p>
                    </div>
                </li>
            </ul>
            <!--加载动画图片 -->
            <div v-show="load" class="loadAnimation">
                <img src="../assets/Image/load.gif" alt="">
            </div>
        </div>
    </div>
     <!-- 底部按钮 -->
    <div class="bottomBtn">
        <a class="bottab get cancleCollect " href="javascript:;"><i class="icon iconfont icon-shoucang"></i> 加入收藏</a>
        <router-link :to="{path: '/reading', query: {novalId: getparam}}" class="bottab go goReading"><i class="icon iconfont icon-yuedu"></i> 立即阅读</router-link>
    </div>
</div>
</template>
<script>
export default {
  name: 'detail',
  data () {
    return {
      headWhiteBg: true,
      getparam: '',
      isActive: 1,
      desBol: true,
      load: false,
      getData: {
        bookDetail: '',
        charpterList: '',
        gifts: ''
      },
      giftArr: [],
      giftPageIndex: 1,
      backImg: require('../assets/Image/back.png')
    }
  },
  created () {
    // var $this = this
    // window.addEventListener('scroll', $this.onScroll)
  },
  components: {},
  // 钩子函数  vue实例创建完成后，渲染完成之后执行
  mounted: function () {
    var _this = this
    _this.params()
    _this.windscrollHead()
    this.$nextTick(function () {
      setTimeout(function () {
        _this.winscroll()
      }, 200)
    })
    this.$axios.get('/api/Product/Detail.aspx?UN=&NovelId=' + this.getparam)
      .then(function (response) {
        _this.getData.bookDetail = response.data.detail
        if (_this.getData.bookDetail.updatestatus === '已完结') {
          _this.isActive = 1
        } else {
          _this.isActive = 0
        }
      })
      .catch(function (error) {
        console.log(error)
      })

    this.$axios.get('/api/Product/Chapter/List.aspx?pageIndex=1&NovelId=' + this.getparam)
      .then(function (response) {
        _this.getData.charpterList = response.data.list.item
        // console.log(_this.getData.charpterList)
      })
      .catch(function (error) {
        console.log(error)
      })
    this.getGiftData()
  },
  // 计算属性
  computed: {
  },
  methods: {
    // 打赏排行
    getGiftData: function () {
      var _this = this
      this.$axios.get('/api/Rank/Novel/List.aspx?pageIndex=' + this.giftPageIndex + '&NovelId=' + this.getparam)
        .then(function (response) {
          console.log(response.data)
          _this.getData.gifts = response.data.list
          for (var index = 0; index < response.data.list.item.length; index++) {
            _this.giftArr.push(response.data.list.item[index])
          }
        })
        .catch(function (error) {
          console.log(error)
        })
    },
    //   获取当前页面参数
    params: function () {
      var query = this.$route.query.novalId
      this.getparam = query
    },
    showHide: function () {
      this.desBol = !this.desBol
    },
    pageTo: function () {
      this.$router.push({
        path: '/catalog',
        query: { novalId: this.getparam }
      })
    },
    onScroll: function () {
      var clientHeight = document.documentElement.clientHeight
      var scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop
      var scrollHeight = document.documentElement.scrollHeight
      // console.log(clientHeight, scrollTop, scrollHeight)
      if (clientHeight + scrollTop >= scrollHeight) {
        this.ranklistGetmore()
      }
    },
    ranklistGetmore: function () {
      var _that = this
      if (this.giftPageIndex < this.getData.gifts.pagecount) {
        this.load = true
        setTimeout(function () {
          _that.giftPageIndex++
          _that.getGiftData()
        }, 1000)
      } else {
        this.load = false
      }
    },
    winscroll: function () {
      window.addEventListener('scroll', this.onScroll)
    },
    windscrollHead: function () {
      window.addEventListener('scroll', this.headChange)
    },
    headChange: function () {
      var scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop
      if (scrollTop > 80) {
        this.headWhiteBg = false
      } else {
        this.headWhiteBg = true
      }
    }
  },
  // 销毁事件
  destroyed () {
    // var $this = this
    window.removeEventListener('scroll', this.onScroll)
    window.addEventListener('scroll', this.headChange)
  }
}
</script>
<style scoped lang="less">
@import url("../assets/css/templateCss/templates.css");
@import url("../assets/css/pageCss/detail.css");
.detailWrap{
    padding-bottom:2.67rem;
}
</style>
