<template>
    <ul class="bookList-Horizontal">
        <li v-for='(item,index) in msg' v-if="index<9" :key="item.id" :id="item.novelid">
          <router-link :to="{path: '/detail', query: { novalId: item.novelid}}">
            <img :src=item.thumb_cover alt="">
            <span>{{item.rec_title}}</span>
           </router-link>
        </li>
    </ul>
</template>

<script>
export default {
  name: 'Horizontal',
  props: ['msg']
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">

</style>
