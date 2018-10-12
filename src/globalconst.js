export default {
  install (Vue, options) {
    // Vue.prototype.hostUrl = 'http://127.0.0.1/'
    // Vue.prototype.colorList = {
    //   color: '#C5E417'
    // }
    Vue.prototype.scrollTop = function () {
      // 回到顶部
      window.scrollTo(0, 0)
    }
    // Vue.prototype.scrollBottom = function (callback) {
    //   // 回到顶部
    //   var clientHeight = document.documentElement.clientHeight
    //   var scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop
    //   var scrollHeight = document.documentElement.scrollHeight
    //   console.log(clientHeight, scrollTop, scrollHeight)
    //   if (clientHeight + scrollTop >= scrollHeight) {
    //     callback()
    //   }
    // }
    // Vue.prototype.readBg = function () {
    //   this.$cookies.set('backgroundClass', 'dayBg1', 3000000)
    // }
  }
}
