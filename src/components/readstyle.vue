<template>
<div class="readstyle">
    <p class="set-btns">
        <a href="javascript:;" v-for="(item, index) in bgColor" :key='index' :class="item.btnClass" @click="color(index)"></a>
        <a class="font-large" @click="large()" href="javaScript:;"></a>
        <a class="font-small" @click="small()" href="javaScript:;"></a>
    </p>
</div>
</template>
<script>
export default {
  name: 'readstyle',
  data () {
    return {
      chooseColor: '',
      fontNum: '',
      lc: 12,
      sc: 1,
      ic: 6,
      fontClass: '',
      bgColor: [
        { btnClass: 'day-bg1', pageBgColor: 'dayBg1' },
        { btnClass: 'day-bg2', pageBgColor: 'dayBg2' },
        { btnClass: 'day-bg3', pageBgColor: 'dayBg3' },
        { btnClass: 'day-bg4', pageBgColor: 'dayBg4' },
        { btnClass: 'day-bg5', pageBgColor: 'dayBg5' },
        { btnClass: 'night-modal', pageBgColor: 'dayBg6' }
      ],
      backImg: require('../assets/Image/back.png')
    }
  },
  components: {},
  // 钩子函数  vue实例创建完成后，渲染完成之前执行
  mounted: function () {
    this.initNum()
  },
  // 计算属性
  computed: {},
  methods: {
    color: function (index) {
      var _that = this
      this.bgColor.map(function (v, i) {
        if (index === i) {
          _that.chooseColor = v.pageBgColor
        }
      })
      // 存 cookie
      this.$cookies.set('backgroundClass', this.chooseColor, 3000000)
      this.$emit('bgChange', this.chooseColor)
    },
    // 页面刷新时，获取原始值
    initNum: function () {
      var ininNumStr = this.$cookies.get('fontSizeClass')
      if (ininNumStr) {
        this.fontNum = ininNumStr.split('e')[1]
      } else {
        this.fontNum = this.ic
      }
    },
    large: function () {
      var $that = this
      if (this.fontNum < 12) {
        this.fontNum++
      } else {
        $that.fontNum = this.lc
      }
      this.fontClass = 'fontsize' + this.fontNum
      this.$cookies.set('fontSizeClass', this.fontClass, 3000000)
      this.$emit('fontSizeChange', this.fontClass)
    },
    small: function () {
      if (this.fontNum > 1) {
        this.fontNum--
      } else {
        this.fontNum = this.sc
      }
      this.fontClass = 'fontsize' + this.fontNum
      this.$cookies.set('fontSizeClass', this.fontClass, 3000000)
      this.$emit('fontSizeChange', this.fontClass)
    }
  }
}
</script>
<style >
@import url("../assets/css/templateCss/templates.css");
@import url("../assets/css/pageCss/reading.css");
</style>
