import h from '../../components/foot.vue'
import Vertical from '../../components/bookList-Vertical.vue'
import Horizontal from '../../components/bookList-Horizontal.vue'
function pluGin (Vue) {
  if (pluGin.install) {
    return
  }
  Vue.component('footers', h)
  Vue.component('booklistVertical', Vertical)
  Vue.component('booklistHorizontal', Horizontal)
}

export default pluGin
